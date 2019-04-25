// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const keytar = require('keytar');
const angular = require('angular');
const settings = require('electron-settings');

var angApp = angular.module('app', []);

angApp.controller('AppController', function ($scope) {
    $scope.loginExist = false;
    $scope.login = settings.get('login');
    if ($scope.login) {
        $scope.loginExist = true;
        $scope.boshService = settings.get('bosh');
        var xmppService = $scope.login.split('@').pop();
        var password = keytar.getPassword(xmppService, $scope.login);
        password.then((result) => {
            $scope.password = result;

            converse.plugins.add('chimeVerse', {
                initialize: function() {
                  var _converse = this._converse;
                  Promise.all([
                      _converse.api.waitUntil('rosterContactsFetched'),
                      _converse.api.waitUntil('chatBoxesFetched')
                  ]).then(function() {
                    _converse.on('message', function (data) {
                        //_converse.api.archive.query({'with': 'admin2@localhost'});
                        console.log(data);
                    });
                  });
                }
              });

            converse.initialize({
                bosh_service_url: $scope.boshService,
                view_mode: 'fullscreen',
                jid: $scope.login,
                password: $scope.password,
                auto_login: true,
                whitelisted_plugins: ['chimeVerse'],
            });
        });
    }
});

angApp.controller('LoginController', function ($scope) {
    $scope.addAccountAction = function() {
        var xmppService = $scope.login.split('@').pop();
        settings.set('bosh', $scope.boshService);
        settings.set('login', $scope.login);
        keytar.setPassword(xmppService, $scope.login, $scope.password);

    }
});
