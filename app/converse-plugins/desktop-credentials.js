const { addCredentials } = require('../credentials.js');
const { getCredentials, removeCredentials } = require('../credentials.js');

converse.plugins.add('converse-desktop-credentials', {

    initialize () {
        const { _converse } = this;
        const { api } = _converse;

        api.listen.on('afterResourceBinding', () => {
            if (_converse.connection.pass) {
                addCredentials(
                    converse.connectionManager,
                    _converse.bare_jid,
                    _converse.connection.pass
                );
            }
        });

        api.listen.on('logout', () => {
            getCredentials().then((result) => removeCredentials(result.login))
        });
    }
});
