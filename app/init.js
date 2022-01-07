const angApp = angular.module('app', [])
angApp.constant('AppInfo', {
    APP_NAME: 'Converse Desktop',
    APP_VERSION: await api.getApplicationVersion(),
    APP_HOME: 'https://github.com/conversejs/converse-desktop',
    APP_RELEASES_CHECK_URL: 'https://api.github.com/repos/conversejs/converse-desktop/releases',
    APP_RELEASES_URL: 'https://github.com/conversejs/converse-desktop/releases',
    ELECTRON_VERSION: await api.getElectronVersion()
});

export default angApp;
