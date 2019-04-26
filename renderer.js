// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const angular = require('angular')

var angApp = angular.module('app', [])


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


angApp.factory('SystemService', () => {

    const remote = require('electron').remote

    let systemService = {}

    systemService.playAudio = () => {
        var audio = new Audio(__dirname + '/sounds/graceful.ogg')
        audio.play()
    }

    systemService.showEnvelope = () => {
        remote.require('./main').showEnvelope()
    }

    systemService.hideEnvelope = () => {
        remote.require('./main').hideEnvelope()
    }

    systemService.reloadWindow = () => {
        remote.getCurrentWindow().reload()
    }

    return systemService

})


angApp.factory('ChimeVerseService', (SettingsServise, SystemService) => {

    let chimeverseService = {}

    chimeverseService.settings = SettingsServise
    chimeverseService.system = SystemService

    chimeverseService._notifyMessage = (data) => {
        if (data.message.attributes.sender === 'me') {
            chimeverseService.system.hideEnvelope()
            return ;
        }
        if (data.message.attributes.chat_state === 'active') {
            chimeverseService.system.playAudio()
            chimeverseService.system.showEnvelope()
        }
    }

    chimeverseService.addChimeVersePluign = () => {
        converse.plugins.add('chimeVerse', {
            initialize: (event) => {
                var _converse = event.properties._converse
                Promise.all([
                    _converse.api.waitUntil('rosterContactsFetched'),
                    _converse.api.waitUntil('chatBoxesFetched')
                ]).then(() => {
                    _converse.api.listen.on('logout', () => {
                        let credentials = SettingsServise.getCredentials()
                        credentials.then((result) => {
                            let remove = chimeverseService.settings.removeCredentials(result.login)
                            remove.then(() => {
                                chimeverseService.system.reloadWindow()
                            })
                        })
                    })
                    _converse.api.listen.on('messageAdded', (data) => {
                        chimeverseService._notifyMessage(data)
                    })
                    _converse.api.listen.on('chatBoxFocused', () => {
                        chimeverseService.system.hideEnvelope()
                    })
                })
            }
        })
    }

    chimeverseService.initConverse = (bosh, login, password) => {
        chimeverseService.addChimeVersePluign()
        let lang = navigator.language
        converse.initialize({
            bosh_service_url: bosh,
            view_mode: 'fullscreen',
            jid: login + '/chimeverse',
            password: password,
            auto_login: true,
            whitelisted_plugins: ['chimeVerse'],
            i18n: lang,
            priority: 50,
            //debug: true,
            auto_reconnect: true
        })
    }

    return chimeverseService

})


angApp.controller('AppController', function ($scope, ChimeVerseService) {

    $scope.showLoginForm = false

    $scope.addAccountAction = function() {
        ChimeVerseService.settings.addCredentials($scope.bosh, $scope.login, $scope.password)
        $scope.showLoginForm = false
        ChimeVerseService.initConverse($scope.bosh, $scope.login, $scope.password)
    }

    $scope.getCredentialsAndLogin = () => {
        let credentials = ChimeVerseService.settings.getCredentials()
        credentials.then((result) => {
            ChimeVerseService.initConverse(result.bosh, result.login, result.password)
        }, (error) => {
            $scope.showLoginForm = true
            $scope.$apply()
        })
    }

    $scope.getCredentialsAndLogin()

})
