let angApp = require(__dirname+'/../init')

angApp.factory('SettingsServise', () => {

    const keytar = require('keytar')
    const settings = require('electron-settings')

    let settingsService = {}

    settingsService.getCredentials = () => {
        let credentials = {}
        credentials.login = settings.get('login')
        let promise = new Promise((resolve, reject) => {
            if (credentials.login) {
                credentials.bosh = settings.get('bosh')
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

    settingsService.addCredentials = (bosh, login, password) => {
        let xmppService = login.split('@').pop()
        settings.set('bosh', bosh)
        settings.set('login', login)
        keytar.setPassword(xmppService, login, password)
    }

    settingsService.removeCredentials = (login) => {
        let xmppService = login.split('@').pop()
        passwordDelete = keytar.deletePassword(xmppService, login)
        let promise = new Promise((resolve, reject) => {
            passwordDelete.then((result) => {
                settings.delete('login')
                settings.delete('bosh')
                resolve()
            }, (error) => {
                reject(error)
            })
        })
        return promise
    }

    return settingsService
})

