/* global api */

await import('./app/converse-plugins/desktop-credentials.js')
await import('./app/converse-plugins/desktop-trayicon.js')
await import('./app/converse-plugins/desktop-settings.js')


let websocket_url, bosh_service_url;
const { connectionManager, login, password } = await api.credentials.get();
const priority = await api.settings.get('priority', 0);
const omemo_default = await api.settings.get('omemo_default', false);
const show_self_in_roster = await api.settings.get('show_self_in_roster', false);
const play_sounds = await api.settings.get('play_sounds', true);
const show_desktop_notifications = await api.settings.get('show_desktop_notifications', true);
const theme = await api.theme.getTheme();
const dark_theme = await api.theme.getDarkTheme();

if (connectionManager?.startsWith('ws')) {
    websocket_url = connectionManager
} else if (connectionManager?.startsWith('http')) {
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
    notification_icon: './resources/images/logo.svg',
    auto_login: login && password,
    bosh_service_url,
    i18n: navigator.language,
    jid: login,
    loglevel: 'warn',
    muc_show_logs_before_join: true,
    omemo_default,
    password,
    show_desktop_notifications,
    play_sounds,
    priority,
    show_background: true,
    show_self_in_roster,
    dark_theme,
    theme,
    websocket_url,
    whitelisted_plugins: ['converse-desktop-credentials', 'converse-desktop-trayicon', 'converse-desktop-settings'],
}).catch((reason) => {
    console.log(reason);
    api.app.quit();
});
