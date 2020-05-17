let angApp = require(__dirname+'/../init')

angApp.controller('DefaultController', function($scope, $timeout, $http, AppInfo) {

    $scope.appInfo = AppInfo

    let getUpdateInfo = () => {
        $http({
            url: $scope.appInfo.APP_RELEASES_CHECK_URL,
            method: 'GET'
        }).then((response) => {
            let releaseVersion = response.data[0].tag_name
            if (releaseVersion == $scope.appInfo.APP_VERSION) {
                $scope.checkingForUpdate = 'latest'
            }
            else {
                $scope.checkingForUpdate = 'updateAvailable'
            }
        }, (error) => {
            $scope.checkingForUpdate = 'checkErr'
        })
    }

    let checkForUpdate = (timeout = 5000) => {
        $scope.checkingForUpdate = 'inProgress'
        $timeout(() => {
            getUpdateInfo()
        }, timeout)
    }

    let checkForUpdateDelayed = (timeout = 5000) => {
        $timeout(() => {
            checkForUpdate()
        }, timeout)
    }

    checkForUpdateDelayed()

    $scope.checkRetry = ($event) => {
        $event.preventDefault()
        checkForUpdate()
    }


})