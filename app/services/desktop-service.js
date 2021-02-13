let angApp = require(__dirname + '/../init')

const desktopPlugin = require(__dirname +'/../../libs/converse.js/converse-desktop/desktop-plugin')

angApp.factory('DesktopService', (
        $window, $timeout, CredentialsService, SystemService, AppStateService,
        SettingsService, XmppHelperService
    ) => {

    let desktopService = {}

    desktopService._notifyMessage = () => {
        SystemService.playAudio()
        SystemService.showEnvelope()
    }

    desktopService._hideNotifyMessage = () => {
        SystemService.hideEnvelope()
    }

    desktopService.logout = () => {
        let credentials = CredentialsService.getCredentials()
        credentials.then((result) => {
            let remove = CredentialsService.removeCredentials(result.login)
            console.log('Remove credentials on logout')
            remove.then(() => {
                AppStateService.set(AppStateService.APP_STATE_LOGIN)
            })
        })
    }

    desktopService.initConverse = (connectionManager, login, password) => {
        AppStateService.set(AppStateService.APP_STATE_DEFAULT) // Always set to default state before init
        desktopPlugin.register(login)
        let lang = navigator.language
        let allowBookmarks = SettingsService.get('allowBookmarks')
        let omemoDefault = SettingsService.get('omemoDefault')
        let xmppResource = XmppHelperService.getResourceFromJid(login)
        if (!xmppResource) {
            xmppResource = '.' + (Math.random().toString(36)+'00000000000000000').slice(2, 7) // Generate 5 char unique str
            login = login + '/converseDesktop'+xmppResource
        }
        let conversejsParams = {
            assets_path: './node_modules/converse.js/dist/',
            allow_bookmarks: allowBookmarks,
            auto_login: true,
            auto_reconnect: true,
            // debug: true,
            i18n: lang,
            jid: login,
            omemo_default: omemoDefault,
            password: password,
            play_sounds: false,
            priority: 50,
            view_mode: 'embedded',
            whitelisted_plugins: ['converseDesktop'],
        }
        if (connectionManager.startsWith('ws')) {
            conversejsParams.websocket_url = connectionManager
        } else {
            conversejsParams.bosh_service_url = connectionManager
        }
        $timeout(() => {
            converse.initialize(conversejsParams)
        }, 50)
    }

    desktopService.getCredentialsAndLogin = () => {
        let credentials = CredentialsService.getCredentials()
        credentials.then((result) => {
            desktopService.initConverse(result.connectionManager, result.login, result.password)
        }, (error) => {
            AppStateService.set(AppStateService.APP_STATE_LOGIN)
        })
    }


    desktopService.chatToOpen = null

    $window.document.addEventListener('conversejs-logout', function (e) {
        desktopService.logout()
    })

    $window.document.addEventListener('conversejs-unread', function (e) {
        let sender = e.detail
        desktopService.chatToOpen = sender
        desktopService._notifyMessage()
    })

    $window.document.addEventListener('conversejs-no-unread', function (e) {
        desktopService._hideNotifyMessage()
    })

    return desktopService

})