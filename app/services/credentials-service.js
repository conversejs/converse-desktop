const angApp = (await import('../init.js')).default;

angApp.factory('CredentialsService', () => {
    let credentialsService = {}
    credentialsService.getCredentials = () => {
        let credentials = {}
        credentials.login = api.electronSettings.getSync('login')
        let promise = new Promise((resolve, reject) => {
            if (credentials.login) {
                credentials.connectionManager = api.electronSettings.getSync('connectionManager')
                credentials.xmppService = credentials.login.split('@').pop()
                let password = api.keytar.getPassword(credentials.xmppService, credentials.login)
                password.then((result) => {
                    credentials.password = result
                    resolve(credentials)
                })
            } else {
                reject(Error('No login stored'))
            }
        })
        return promise
    }

    credentialsService.addCredentials = (connectionManager, login, password) => {
        let xmppService = login.split('@').pop()
        api.electronSettings.setSync('connectionManager', connectionManager)
        api.electronSettings.setSync('login', login)
        return api.keytar.setPassword(xmppService, login, password)
    }

    credentialsService.removeCredentials = (login) => {
        let xmppService = login.split('@').pop()
        let passwordDelete = api.keytar.deletePassword(xmppService, login)
        let promise = new Promise((resolve, reject) => {
            passwordDelete.then((result) => {
                api.electronSettings.unsetSync('login')
                api.electronSettings.unsetSync('connectionManager')
                resolve()
            }, (error) => {
                reject(error)
            })
        })
        return promise
    }

    return credentialsService
})
