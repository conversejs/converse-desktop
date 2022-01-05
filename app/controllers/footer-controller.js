const angApp = (await import('../init.js')).default;

angApp.controller('FooterController', function($scope, AppInfo) {

    $scope.appInfo = AppInfo

})