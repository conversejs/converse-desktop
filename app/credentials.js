/* global require, module */

const settings = require('electron-settings');
const keytar = require('keytar')

function addCredentials (connectionManager, login, password) {
    const xmppService = login.split('@').pop()
    settings.setSync('connectionManager', connectionManager)
    settings.setSync('login', login)
    keytar.setPassword(xmppService, login, password)
}

function getCredentials () {
    const credentials = {}
    credentials.login = settings.getSync('login')
    return new Promise((resolve) => {
        if (credentials.login) {
            credentials.connectionManager = settings.getSync('connectionManager')
            credentials.xmppService = credentials.login.split('@').pop()
            let password = keytar.getPassword(credentials.xmppService, credentials.login)
            password.then((result) => {
                credentials.password = result
                resolve(credentials)
            })
        } else {
            resolve({});
        }
    });
}

function removeCredentials (login) {
    const xmppService = login.split('@').pop()
    const passwordDelete = keytar.deletePassword(xmppService, login)
    return new Promise((resolve, reject) => {
        passwordDelete.then(() => {
            settings.unsetSync('login')
            settings.unsetSync('connectionManager')
            resolve()
        }, (error) => {
            reject(error)
        })
    })
}

module.exports = {
    addCredentials,
    getCredentials,
    removeCredentials
}
