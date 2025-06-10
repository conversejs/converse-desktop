/* global api */

converse.plugins.add('converse-desktop-settings', {
    initialize() {
        const {_converse} = this;
        api.settings.changed(function (key, newValue) {
            if (['omemo_default', 'play_sounds', 'show_desktop_notifications'].includes(key)) {
                _converse.api.settings.set(key, newValue);
            }
            if ('show_self_in_roster' === key) {
                _converse.api.settings.set(key, newValue);
                document.querySelector('converse-roster')?.requestUpdate();
            }
        });
    }
});
