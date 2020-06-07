let angApp = require(__dirname+'/../init')

angApp.factory('CredentialsServise', () => {

    const keytar = require('keytar')
    const settings = require('electron-settings')

    let credentialsService = {}

    credentialsService.getCredentials = () => {
        let credentials = {}
        credentials.login = settings.get('login')
        let promise = new Promise((resolve, reject) => {
            if (credentials.login) {
                credentials.connectionManager = settings.get('connectionManager')
                credentials.xmppService = credentials.login.split('@').pop()
                let password = keytar.getPassword(credentials.xmppService, credentials.login)
                password.then((result) => {
                    credentials.password = result
                    resolve(credentials)
                })
            }
            else {
                reject(Error('No login stored'))
            }
        })
        return promise
    }

    credentialsService.addCredentials = (connectionManager, login, password) => {
        let xmppService = login.split('@').pop()
        settings.set('connectionManager', connectionManager)
        settings.set('login', login)
        keytar.setPassword(xmppService, login, password)
    }

    credentialsService.removeCredentials = (login) => {
        let xmppService = login.split('@').pop()
        passwordDelete = keytar.deletePassword(xmppService, login)
        let promise = new Promise((resolve, reject) => {
            passwordDelete.then((result) => {
                settings.delete('login')
                settings.delete('connectionManager')
                resolve()
            }, (error) => {
                reject(error)
            })
        })
        return promise
    }

    return credentialsService
})

