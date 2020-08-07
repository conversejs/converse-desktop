let desktopPlugin = {}

desktopPlugin.register = (login) => {
    converse.plugins.add('converseDesktop', {
        initialize: (event) => {
            let _converse = event.properties._converse
            let Strophe = converse.env.Strophe

            /**
             * Check if message stanza has some body payload
             * @param {*} stanzaNodes
             */
            let isBodyMessage = (stanzaNodes) => {
                let result = false
                Object.keys(stanzaNodes).some((key) => {
                    if (stanzaNodes[key].nodeName == 'body') {
                        result = true
                    }
                })
                return result
            }

            Promise.all([
                _converse.api.waitUntil('rosterContactsFetched'),
                _converse.api.waitUntil('chatBoxesFetched')
            ]).then(() => {
                _converse.api.listen.on('logout', () => {
                    let event = new CustomEvent('conversejs-logout')
                    document.dispatchEvent(event)
                })
                _converse.api.listen.on('message', (data) => {
                    // Display notifications only for "payloaded" messages
                    if (isBodyMessage(data.stanza.childNodes)) {
                        let sender = data.stanza.attributes.from.nodeValue
                        let senderJid = Strophe.getBareJidFromJid(sender)
                        let loginJid = Strophe.getBareJidFromJid(login)
                        if (senderJid != loginJid) {
                            console.log(senderJid)
                            let event = new CustomEvent('conversejs-unread', {detail: senderJid})
                            document.dispatchEvent(event)
                        }
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
                    _converse.api.user.logout()
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

module.exports = desktopPlugin