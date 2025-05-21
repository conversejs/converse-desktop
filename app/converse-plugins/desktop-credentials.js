const credentials = await import('../credentials.js');

converse.plugins.add('converse-desktop-credentials', {

    initialize () {
        const { _converse } = this;
        const { api } = _converse;

        api.listen.on('afterResourceBinding', () => {
            const connection = api.connection.get();
            if (connection.pass) {
                credentials.addCredentials(
                    connection.service,
                    _converse.bare_jid,
                    connection.pass
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
