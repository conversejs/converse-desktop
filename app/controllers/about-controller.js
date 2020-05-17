let angApp = require(__dirname+'/../init')

angApp.controller('AboutController', function($scope, AppStateService, AppInfo) {

    $scope.appInfo = AppInfo

    $scope.closeAbout = () => {
        AppStateService.set(AppStateService.previousState)
    }
})