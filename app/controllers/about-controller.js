const angApp = (await import('../init.js')).default;

angApp.controller('AboutController', function($scope, AppStateService, AppInfo) {

    $scope.appInfo = AppInfo

    $scope.closeAbout = () => {
        AppStateService.set(AppStateService.APP_STATE_DEFAULT)
    }
})