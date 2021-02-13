let angApp = require(__dirname+'/../init')

angApp.controller('LoginController', function($scope, DesktopService, CredentialsService) {

    $scope.help = {}

    $scope.showHelp = (item) => {
        $scope.help[item] = typeof $scope.help[item] === 'undefined' ? true : !$scope.help[item];
    }

    $scope.addAccountAndLoginAction = () => {
        CredentialsService.addCredentials($scope.credentials.connectionManager,
            $scope.credentials.login,
            $scope.credentials.password
        )
        DesktopService.getCredentialsAndLogin()
        $scope.accountForm.$setPristine()
        $scope.accountForm.$setUntouched()
        $scope.credentials = {}
    }
})