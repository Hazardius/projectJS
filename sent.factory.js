angular.module('app')
    .factory('sent', ['$http', function ($http) {
        var sent = [];

        return {
            getSentEmails: function () {
                return $http.get('/sent').then(function (response) {
                    sent = response.data;
                    return sent;
                });
            },
            getOneSentEmail: function (id) {
                return $http.get('/sent').then(function (response) {
                    sent = response.data;
                    for(var i=0; i<sent.length; i++) {
                        if (sent[i].id == id) {
                            return sent[i];
                        }
                    }
                });
            },
            postOneEmail: function (email) {
                email.id = Date.now();
                email.sent = Date.now();
                return $http.post('/sent', email);
            },
            deleteOneEmail: function (id) {
                return $http.delete('/sent/' + id).then(function (response) { });
            }
        }
    }]);