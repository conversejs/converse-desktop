require('./app/converse-plugins/desktop-credentials.js');
const{ getCredentials } = require('./app/credentials.js')


async function initialize () {
    let websocket_url, bosh_service_url;
    const { connectionManager, login, password } = await getCredentials()

    converse.connectionManager = connectionManager;

    if (connectionManager?.startsWith('ws')) {
        websocket_url = connectionManager
    } else if (connectionManager?.startsWith('http')) {
        bosh_service_url = connectionManager
    } else {
        bosh_service_url = 'https://conversejs.org/http-bind/';
    }

    converse.plugins.add('converse-debug', {
        initialize () {
            const { _converse } = this;
            window._converse = _converse;
        }
    });

    converse.initialize({
        assets_path: './node_modules/converse.js/dist/',
        auto_login: login && password,
        bosh_service_url,
        i18n: navigator.language,
        jid: login,
        loglevel: 'debug',
        muc_respect_autojoin: true,
        muc_show_logs_before_join: true,
        password: password,
        play_sounds: false,
        priority: 50,
        prune_messages_above: 250,
        theme: 'concord',
        view_mode: 'fullscreen',
        websocket_url,
        whitelisted_plugins: ['converse-debug', 'converse-desktop-credentials'],
    });
}

initialize();
