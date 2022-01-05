// This file is required by the index.html file and will
// be executed in the renderer process for that window.

const angApp = (await import('./app/init.js')).default;

await import('./app/services/credentials-service.js')
await import('./app/services/settings-service.js')
await import('./app/services/system-service.js')
await import('./app/services/app-state-service.js')
await import('./app/services/xmpp-helper-service.js')
await import('./app/services/desktop-service.js')
await import('./app/controllers/settings-controller.js')
await import('./app/controllers/login-controller.js')
await import('./app/controllers/default-controller.js')
await import('./app/controllers/about-controller.js')
await import('./app/controllers/footer-controller.js')


angApp.controller('AppController', function ($scope, $timeout, DesktopService, SettingsService, AppStateService) {

    // Menu force logout event
    api.receive('force-logout-event', () => {
        DesktopService.logout()
        let event = new CustomEvent("converse-force-logout") // Dispatch to the plugin
        document.dispatchEvent(event)
    })

    // Menu settings event
    api.receive('preferences-event', () => {
        AppStateService.set(AppStateService.APP_STATE_SETTINGS)
    })

    // Menu about event
    api.receive('about-page-event', () => {
        AppStateService.set(AppStateService.APP_STATE_ABOUT)
    })

    // Menu about event
    api.receive('open-unread-chat', () => {
        let event = new CustomEvent('conversejs-open-chat', {detail: DesktopService.chatToOpen})
        document.dispatchEvent(event)
    })

    AppStateService.set(AppStateService.APP_STATE_DEFAULT)

    $scope.$on('app:state:changed', (event, data) => {
        // @see https://docs.angularjs.org/error/$rootScope/inprog
        $timeout(() => {
            $scope.state = data
            console.log('Switch to the "' + $scope.state +'" state')
        }, 0)
    })

    $scope.$on('app:restart', (event, data) => {
        api.send('app-restart')
    })

    SettingsService.initDefaults()

    DesktopService.getCredentialsAndLogin()

});

angular.bootstrap(document.body, ['app']);
