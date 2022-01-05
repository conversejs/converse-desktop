const angApp = (await import('../init.js')).default;

angApp.factory('SettingsService', () => {

    let settingsService = {}
    const settings = {
        converseDesktop: {
            runMinimized: {
                default: false,
                title: 'Run minimized',
                hint: 'Default: false. Whether run Converse Desktop minimized to tray or not.'
            },
            minimizeOnClose: {
                default: false,
                title: 'Minimize on close',
                hint: 'Default: false. Minimize or close Converse Desktop window.'
            },
            preserveWindowSize: {
                default: true,
                title: 'Preserve window size',
                hint: 'Default: true, 800x600 otherwise.'
            },
            preserveWindowPosition: {
                default: true,
                title: 'Preserve window position',
                hint: 'Default: true, screen center otherwise.'
            }
        },
        conversejs: {
            allowBookmarks: {
                default: false,
                title: 'Allow server bookmarks',
                hint: 'Default: false. Enables/disables chatroom bookmarks functionality.'
            },
            omemoDefault: {
                default: false,
                title: 'Use OMEMO encryption by default',
                hint: 'Default: false. Use OMEMO encryption by default when the chat supports it.'
            }
        }
    }

    const iterateSettings = (callback, settingsObj) => {
        if (typeof settingsObj === "undefined") {
            settingsObj = settings
        }
        angular.forEach(settingsObj, (value, key) => {
            let settingsList = settingsObj[key]
            angular.forEach(settingsList, (value, key) => {
                let itemDefault = settingsList[key]['default']
                callback(key, itemDefault, settingsList)
            })
        })
    }

    // Callback
    // TODO: replace with promise?
    const saveDefault = (key, value) => {
        if (!api.electronSettings.hasSync(key)) {
            api.electronSettings.setSync(key, value)
        }
    }

    // Callback
    const save = (key, defaultValue, settingsList) => {
        let value = settingsList[key]['value']
        api.electronSettings.setSync(key, value)
    }

    // Callback
    const loadAll = (key, defaultValue, settingsList) => {
        if (!api.electronSettings.hasSync(key)) {
            settingsList[key]['value'] = defaultValue
        }
        settingsList[key]['value'] = api.electronSettings.getSync(key)
    }

    /**
     * SettingsService
     */
    settingsService.initDefaults = () => {
        iterateSettings(saveDefault)
        // Logout for versions with BOSH only
        if (api.electronSettings.hasSync('bosh')) {
            api.electronSettings.unsetSync('bosh')
            api.electronSettings.unsetSync('login')
        }
    }

    settingsService.get = (key) => {
        return api.electronSettings.getSync(key)
    }

    settingsService.loadAll = () => {
        let currentSettings = angular.copy(settings)
        iterateSettings(loadAll, currentSettings)
        return currentSettings
    }

    settingsService.saveAll = (currentSettings) => {
        iterateSettings(save, currentSettings)
    }

    return settingsService
})

