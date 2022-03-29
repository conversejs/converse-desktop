/* global api */

converse.plugins.add('converse-desktop-trayicon', {

    initialize () {
        const { _converse } = this;
        let envelopeIsShowing = false;

        async function hideEnvelope () {
            if (envelopeIsShowing) {
                await api.trayService.hideEnvelope();
                envelopeIsShowing = false;
            }
        }

        window.addEventListener('focus', hideEnvelope);
        _converse.api.listen.on('chatBoxInitialized', hideEnvelope);
        _converse.api.listen.on('chatBoxFocused', hideEnvelope);
        _converse.api.listen.on('messageNotification', async () => {
            await api.trayService.showEnvelope();
            envelopeIsShowing = true;
        });
    }
});
