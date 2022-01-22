/* global api */

converse.plugins.add('converse-desktop-trayicon', {

    initialize() {
        const {_converse} = this;
        let envelopeIsShowing = false;

        function hideEnvelope() {
            if (envelopeIsShowing) {
                api.trayService.hideEnvelope();
                envelopeIsShowing = false;
            }
        }

        window.addEventListener('focus', hideEnvelope);
        _converse.api.listen.on('chatBoxInitialized', hideEnvelope);
        _converse.api.listen.on('chatBoxFocused', hideEnvelope);
        _converse.api.listen.on('messageNotification', () => {
            api.trayService.showEnvelope();
            envelopeIsShowing = true;
        });
    }
});
