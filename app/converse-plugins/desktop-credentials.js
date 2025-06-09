/* global api */

converse.plugins.add('converse-desktop-credentials', {
    initialize () {
        const { _converse } = this;

        _converse.api.listen.on('afterResourceBinding', () => {
            const connection = _converse.api.connection.get();
            if (connection.pass) {
                api.credentials.save(
                    connection.service,
                    _converse.bare_jid,
                    connection.pass
                ).catch((reason) => {
                    console.log(reason);
                });
            }
        });
        _converse.api.listen.on('logout', () => {
            api.credentials.clear();
        });
    }
});
