const angular = require('angular')
let angApp = angular.module('app', [])

angApp.constant('AppInfo', {
    APP_NAME: 'Chimeverse',
    APP_VERSION: 'v0.1.53',
    APP_HOME: 'https://github.com/nick-denry/Chimeverse',
    APP_RELEASES_CHECK_URL: 'https://api.github.com/repos/nick-denry/Chimeverse/releases',
    APP_RELEASES_URL: 'https://github.com/nick-denry/Chimeverse/releases'
});

module.exports = angApp