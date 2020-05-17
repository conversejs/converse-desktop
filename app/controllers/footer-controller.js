let angApp = require(__dirname+'/../init')

angApp.controller('FooterController', function($scope, AppInfo) {

    $scope.appInfo = AppInfo

})