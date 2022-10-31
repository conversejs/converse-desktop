/* global api */

converse.plugins.add('converse-desktop-settings', {
    initialize () {
        const { _converse } = this;
        api.settings.changed(function (key, newValue) {
            if (['omemo_default'].indexOf(key) !== -1){
                _converse.api.settings.set(key, newValue);
            }
        });
    }
});
