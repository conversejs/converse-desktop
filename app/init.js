const angular = require('angular')
let angApp = angular.module('app', [])

angApp.constant('AppInfo', {
    APP_NAME: 'Converse Desktop',
    APP_VERSION: 'v0.1.0',
    APP_HOME: 'https://github.com/conversejs/converse-desktop',
    APP_RELEASES_CHECK_URL: 'https://api.github.com/repos/conversejs/converse-desktop/releases',
    APP_RELEASES_URL: 'https://github.com/conversejs/converse-desktop/releases',
    CONVERSE_VERSION: 'v9.0.0',
    ELECTRON_VERSION: '13.6.6'
});

module.exports = angApp
