/* global api */

converse.plugins.add('converse-desktop-settings', {
    initialize () {
        const { _converse } = this;
        api.settings.changed(async function (key, newValue) {
            if (['omemo_default', 'play_sounds', 'show_desktop_notifications'].includes(key)) {
                await _converse.api.settings.set(key, newValue);
            }
            if ('show_self_in_roster' === key) {
                await _converse.api.settings.set(key, newValue);
                document.querySelector('converse-roster')?.requestUpdate();
            }
            if ('theme' === key) {
                await _converse.api.settings.set('theme', await api.theme.getTheme());
                await _converse.api.settings.set('dark_theme', await api.theme.getDarkTheme());
                document.querySelector('converse-root')?.setThemeAttributes();
                document.querySelector('converse-bg')?.setThemeAttributes();
            }
        });
    }
});
