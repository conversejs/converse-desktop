const angApp = (await import('../init.js')).default;

angApp.controller('AboutController', function ($scope, AppStateService, AppInfo, DesktopService) {

    $scope.appInfo = AppInfo;
    $scope.converseVersion = 'unknown';
    DesktopService.getConverseVersion().then((version) => {
        $scope.converseVersion = version;
        $scope.$apply();
    });

    $scope.closeAbout = () => {
        AppStateService.set(AppStateService.APP_STATE_DEFAULT)
    }
})