let chimeversePlugin = {}

chimeversePlugin.register = (login) => {
    converse.plugins.add('chimeVerse', {
        initialize: (event) => {
            let _converse = event.properties._converse
            Promise.all([
                _converse.api.waitUntil('rosterContactsFetched'),
                _converse.api.waitUntil('chatBoxesFetched')
            ]).then(() => {
                _converse.api.listen.on('logout', () => {
                    let event = new CustomEvent('conversejs-logout')
                    document.dispatchEvent(event)
                })
                _converse.api.listen.on('message', (data) => {
                    let sender = data.stanza.attributes.from.nodeValue
                    let senderJid = sender
                    if (sender.indexOf('/') !== -1) {
                        senderJid = sender.substr(0, sender.lastIndexOf('/'))
                    }
                    if (senderJid != login) {
                        console.log(senderJid)
                        let event = new CustomEvent('conversejs-unread', {detail: senderJid})
                        document.dispatchEvent(event)
                    }
                })
                _converse.api.listen.on('chatBoxFocused', () => {
                    let event = new CustomEvent('conversejs-no-unread')
                    document.dispatchEvent(event)
                    //chimeverseService._hideNotifyMessage()
                })
                window.document.addEventListener('converse-force-logout', function (e) {
                    console.log('Get converse-force-logout event')
                    console.log('Logout form plugin')
                    _converse.api.user.logout();
                    //chimeverseService.logout()
                })
                window.document.addEventListener('conversejs-open-chat', function (e) {
                    let chatToOpen = e.detail
                    console.log('Get open-unread-chat event: '+chatToOpen)
                    if (chatToOpen !== null) {
                        _converse.api.chats.open(chatToOpen)
                    }
                })
            })
        }
    })
}

module.exports = chimeversePlugin