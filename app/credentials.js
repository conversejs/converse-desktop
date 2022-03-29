/* global api */

async function addCredentials (connectionManager, login, password) {
    const xmppService = login.split('@').pop()
    await api.settings.set('connectionManager', connectionManager)
    await api.settings.set('login', login)
    await api.keytar.setPassword(xmppService, login, password)
}

async function getCredentials () {
    const credentials = {}
    credentials.login = (await api.settings.get('login')) || '';
    if (credentials.login) {
        credentials.connectionManager = await api.settings.get('connectionManager') || null
        credentials.xmppService = credentials.login.split('@').pop()
        credentials.password = await api.keytar.getPassword(credentials.xmppService, credentials.login)
    }

    return credentials;
}

async function removeCredentials (login) {
    const xmppService = login.split('@').pop();
    await api.keytar.deletePassword(xmppService, login);
    await api.settings.unset('login');
    await api.settings.unset('connectionManager');
}

export {
    addCredentials,
    getCredentials,
    removeCredentials
}
