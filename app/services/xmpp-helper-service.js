let angApp = require(__dirname + '/../init')

angApp.factory('XmppHelperService', [() => {

    let xmppHelperService = {}

    /**
     * Use function copy from Strophe js lib because converse.js Strophe library
     * is under private _api and unavailable before converse.js is initialized.
     * This function is used _before_ converse.js is initialized.
     *
     * Get the resource portion of a JID String.
     * @param {string} jid     A JID.
     * @return {string | null} A String containing the resource.
     */
    xmppHelperService.getResourceFromJid = (jid) => {
        if (!jid) { return null }
        const s = jid.split("/")
        if (s.length < 2) { return null }
        s.splice(0, 1)
        return s.join('/')
    }

    return xmppHelperService
}])