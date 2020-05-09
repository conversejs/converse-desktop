let chimeversePlugin = {}

chimeversePlugin.register = () => {
    converse.plugins.add('chimeVerse', {
        initialize: (event) => {
            let _converse = event.properties._converse
            Promise.all([
                _converse.api.waitUntil('rosterContactsFetched'),
                _converse.api.waitUntil('chatBoxesFetched')
            ]).then(() => {
                _converse.api.listen.on('logout', () => {
                    let event = new CustomEvent("conversejs-logout")
                    document.dispatchEvent(event)
                })
                _converse.api.listen.on('message', (data) => {
                    let event = new CustomEvent("conversejs-unread")
                    document.dispatchEvent(event)
                    //chimeverseService._notifyMessage(data)
                })
                _converse.api.listen.on('chatBoxFocused', () => {
                    let event = new CustomEvent("conversejs-no-unread")
                    document.dispatchEvent(event)
                    //chimeverseService._hideNotifyMessage()
                })
                window.document.addEventListener('converse-force-logout', function (e) {
                    console.log('Get converse-force-logout event')
                    console.log('Logout form plugin')
                    _converse.api.user.logout();
                    //chimeverseService.logout()
                });
            })
        }
    })
}

module.exports = chimeversePlugin