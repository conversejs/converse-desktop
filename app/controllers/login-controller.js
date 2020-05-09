let angApp = require(__dirname+'/../init')

angApp.controller('LoginController', function($scope, ChimeVerseService, SettingsServise) {
    $scope.addAccountAndLoginAction = () => {
        SettingsServise.addCredentials($scope.bosh,
            $scope.login,
            $scope.password
        )
        ChimeVerseService.initConverse($scope.bosh, $scope.login, $scope.password)
    }
});