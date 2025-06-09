const keytar = require('keytar');
const settings = require('./settings-service')

async function saveCredentials (connectionManager, login, password) {
    const xmppService = login.split('@').pop()
    await settings.set('connectionManager', connectionManager)
    await settings.set('login', login)
    await keytar.setPassword(xmppService, login, password)
}

async function getCredentials () {
    const credentials = {}
    credentials.login = (await settings.get('login')) || '';
    if (credentials.login) {
        credentials.connectionManager = await settings.get('connectionManager') || null
        credentials.xmppService = credentials.login.split('@').pop()
        credentials.password = await keytar.getPassword(credentials.xmppService, credentials.login)
    }

    return credentials;
}

async function clearCredentials () {
    const creds = await getCredentials()
    if (creds.login) {
        await keytar.deletePassword(creds.xmppService, creds.login);
        await settings.unset('login');
        await settings.unset('connectionManager');
    }
}

module.exports = {
    saveCredentials,
    getCredentials,
    clearCredentials,
}
