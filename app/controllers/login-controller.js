let angApp = require(__dirname+'/../init')

angApp.controller('LoginController', function($scope, ChimeVerseService, CredentialsServise) {

    $scope.addAccountAndLoginAction = () => {
        CredentialsServise.addCredentials($scope.credentials.bosh,
            $scope.credentials.login,
            $scope.credentials.password
        )
        ChimeVerseService.getCredentialsAndLogin()
        $scope.accountForm.$setPristine()
        $scope.accountForm.$setUntouched()
        $scope.credentials = {}
    }
})