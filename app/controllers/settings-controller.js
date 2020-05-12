let angApp = require(__dirname+'/../init')

angApp.controller('SettingsController', function ($scope, AppStateService, SettingsService) {

    $scope.closeSettings = () => {
        AppStateService.set(AppStateService.previousState)
    }

    $scope.saveSettings = () => {
        SettingsService.saveAll($scope.settings)
        $scope.closeSettings()
    }

    $scope.settings = SettingsService.loadAll()

})