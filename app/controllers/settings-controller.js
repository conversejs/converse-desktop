let angApp = require(__dirname+'/../init')

angApp.controller('SettingsController', function ($scope, $rootScope, AppStateService, SettingsService) {

    let formInitialized = false
    $scope.settingsChanged = false
    $scope.settingsSaved = false

    const settingsSetPristine = () => {
        $scope.settingsChanged = false
        formInitialized = false
    }

    $scope.closeSettings = () => {
        $scope.settings = SettingsService.loadAll()
        settingsSetPristine()
        AppStateService.set(AppStateService.APP_STATE_DEFAULT)
    }

    $scope.saveSettings = () => {
        $scope.settingsSaved = true
        SettingsService.saveAll($scope.settings)
        settingsSetPristine()
    }

    $scope.restartApp = () => {
        $rootScope.$broadcast('app:restart')
    }

    $scope.settings = SettingsService.loadAll()

    $scope.$watch("settings", () => {
        if (!formInitialized) {
            formInitialized = true
        } else {
            $scope.settingsChanged = true
        }
    }, true)

})