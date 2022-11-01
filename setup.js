/* global api */

await import('./app/converse-plugins/desktop-credentials.js')
await import('./app/converse-plugins/desktop-trayicon.js')
await import('./app/converse-plugins/desktop-settings.js')
const getCredentials = (await import('./app/credentials.js')).getCredentials;


let websocket_url, bosh_service_url;
const { connectionManager, login, password } = await getCredentials();
const priority = await api.settings.get('priority') || 0;
const omemo_default = await api.settings.get('omemo_default') || false;

if (connectionManager?.startsWith('ws')){
    websocket_url = connectionManager
} else if (connectionManager?.startsWith('http')){
    bosh_service_url = connectionManager
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
    password,
    play_sounds: false,
    priority,
    prune_messages_above: 250,
    theme: 'concord',
    view_mode: 'fullscreen',
    websocket_url,
    whitelisted_plugins: ['converse-debug', 'converse-desktop-credentials', 'converse-desktop-trayicon', 'converse-desktop-settings'],
    omemo_default
}).catch((reason) => {
    console.log(reason);
    api.app.quit();
});
