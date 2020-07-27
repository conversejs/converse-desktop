let angApp = require(__dirname + '/../init')

const chimeversePlugin = require(__dirname +'/../../libs/converse.js/converse-desktop/chimeverse-plugin')

angApp.factory('ChimeVerseService', (
        $window, $timeout, CredentialsServise, SystemService, AppStateService,
        SettingsService, XmppHelperService
    ) => {

    let chimeverseService = {}

    chimeverseService._notifyMessage = () => {
        SystemService.playAudio()
        SystemService.showEnvelope()
    }

    chimeverseService._hideNotifyMessage = () => {
        SystemService.hideEnvelope()
    }

    chimeverseService.logout = () => {
        let credentials = CredentialsServise.getCredentials()
        credentials.then((result) => {
            let remove = CredentialsServise.removeCredentials(result.login)
            console.log('Remove credentials on logout')
            remove.then(() => {
                AppStateService.set(AppStateService.APP_STATE_LOGIN)
            })
        })
    }

    chimeverseService.initConverse = (connectionManager, login, password) => {
        AppStateService.set(AppStateService.APP_STATE_DEFAULT) // Always set to default state before init
        chimeversePlugin.register(login)
        let lang = navigator.language
        let allowBookmarks = SettingsService.get('allowBookmarks')
        let omemoDefault = SettingsService.get('omemoDefault')
        let xmppResource = XmppHelperService.getResourceFromJid(login)
        if (!xmppResource) {
            xmppResource = '.' + (Math.random().toString(36)+'00000000000000000').slice(2, 7) // Generate 5 char unique str
            login = login + '/Chimeverse'+xmppResource
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
            whitelisted_plugins: ['chimeVerse'],
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

    chimeverseService.getCredentialsAndLogin = () => {
        let credentials = CredentialsServise.getCredentials()
        credentials.then((result) => {
            chimeverseService.initConverse(result.connectionManager, result.login, result.password)
        }, (error) => {
            AppStateService.set(AppStateService.APP_STATE_LOGIN)
        })
    }


    chimeverseService.chatToOpen = null

    $window.document.addEventListener('conversejs-logout', function (e) {
        chimeverseService.logout()
    })

    $window.document.addEventListener('conversejs-unread', function (e) {
        let sender = e.detail
        chimeverseService.chatToOpen = sender
        chimeverseService._notifyMessage()
    })

    $window.document.addEventListener('conversejs-no-unread', function (e) {
        chimeverseService._hideNotifyMessage()
    })

    return chimeverseService

})