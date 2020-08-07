let angApp = require(__dirname+'/../init')

angApp.controller('DefaultController', function($scope, $timeout, $http, AppInfo) {

    $scope.appInfo = AppInfo

    let getUpdateInfo = () => {
        $http({
            url: $scope.appInfo.APP_RELEASES_CHECK_URL,
            method: 'GET'
        }).then((response) => {
            let releaseTag = response.data[0].tag_name
            let releaseVersion = parseInt(releaseTag.replace(/v|\./g, ''))
            let appVersion = parseInt($scope.appInfo.APP_VERSION.replace(/v|\./g, ''))
            if (appVersion < releaseVersion ) {
                $scope.checkingForUpdate = 'updateAvailable'
            }
            else {
                $scope.checkingForUpdate = 'latest'
            }
        }).catch((error) => {
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