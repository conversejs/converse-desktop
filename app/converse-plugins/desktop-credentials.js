const credentials = await import('../credentials.js');

converse.plugins.add('converse-desktop-credentials', {

    initialize () {
        const { _converse } = this;
        const { api } = _converse;

        api.listen.on('afterResourceBinding', () => {
            if (_converse.connection.pass) {
                credentials.addCredentials(
                    _converse.connection.service,
                    _converse.bare_jid,
                    _converse.connection.pass
                ).catch((reason) => {
                    console.log(reason);
                });
            }
        });

        api.listen.on('logout', () => {
            credentials.getCredentials().then((result) => credentials.removeCredentials(result.login))
        });
    }
});
