let angApp = require(__dirname + '/../init')

angApp.factory('ChimeVerseService', ($window, CredentialsServise, SystemService, AppStateService, SettingsService) => {

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
            console.log('Remove credential on logout')
            remove.then(() => {
                AppStateService.set(AppStateService.APP_STATE_LOGIN)
            })
        })
    }

    chimeverseService.initConverse = (bosh, login, password) => {
        AppStateService.set(AppStateService.APP_STATE_DEFAULT) // Always set to default state before init
        let lang = navigator.language
        let allowBookmarks = SettingsService.get('allowBookmarks')
        converse.initialize({
            allow_bookmarks: allowBookmarks,
            bosh_service_url: bosh,
            view_mode: 'embedded',
            jid: login + '/chimeverse',
            password: password,
            auto_login: true,
            whitelisted_plugins: ['chimeVerse'],
            i18n: lang,
            priority: 50,
            // debug: true,
            auto_reconnect: true
        })
    }

    $window.document.addEventListener('conversejs-logout', function (e) {
        chimeverseService.logout()
    });

    $window.document.addEventListener('conversejs-unread', function (e) {
        chimeverseService._notifyMessage()
    });

    $window.document.addEventListener('conversejs-no-unread', function (e) {
        chimeverseService._hideNotifyMessage()
    });

    return chimeverseService

})