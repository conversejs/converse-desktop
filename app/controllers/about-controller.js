let angApp = require(__dirname+'/../init')

angApp.controller('AboutController', function($scope, AppStateService) {
    $scope.closeAbout = () => {
        AppStateService.set(AppStateService.previousState)
    }
})