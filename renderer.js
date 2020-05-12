// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var angApp = require('./app/init')

require('./app/services/credentials-service')
require('./app/services/settings-service')
require('./app/services/system-service')
require('./app/services/app-state-service')
require('./app/services/chimeverse-service')
require('./app/controllers/settings-controller')
require('./app/controllers/login-controller')
require('./app/controllers/default-controller')
require('./app/controllers/about-controller')
const chimeversePlugin = require('./libs/converse.js/3rdparty/chimeverse-plugin')
chimeversePlugin.register()

angApp.controller('AppController', function ($scope, $timeout, ChimeVerseService, CredentialsServise, SettingsService, AppStateService) {

    //const { remote, ipcRenderer } = require('electron')
    const { ipcRenderer } = require('electron')

    // Menu force logout event
    ipcRenderer.on('force-logout-event', () => {
        ChimeVerseService.logout()
        let event = new CustomEvent("converse-force-logout") // Dispatch to the plugin
        document.dispatchEvent(event)
        //remote.getCurrentWindow().reload()
    })
    // Menu settings event
    ipcRenderer.on('preferences-event', () => {
        AppStateService.set(AppStateService.APP_STATE_SETTINGS)
    })
    // Menu about event
    ipcRenderer.on('about-page-event', () => {
        AppStateService.set(AppStateService.APP_STATE_ABOUT)
    })

    $scope.state = AppStateService.APP_STATE_DEFAULT

    $scope.$on('app:state:changed', (event, data) => {
        // @see https://docs.angularjs.org/error/$rootScope/inprog
        $timeout(() => {
            $scope.state = data
            console.log('Switch to the "' + $scope.state +'" state')
        }, 0)
    });

    SettingsService.initDefaults()

    $scope.getCredentialsAndLogin = () => {
        let credentials = CredentialsServise.getCredentials()
        credentials.then((result) => {
            ChimeVerseService.initConverse(result.bosh, result.login, result.password)
        }, (error) => {
            AppStateService.set(AppStateService.APP_STATE_LOGIN)
        })
    }

})
