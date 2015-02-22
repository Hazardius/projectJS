angular.module('app')
    .factory('emails', ['$http', function ($http) {
        var emails = [];

        return {
            getEmails: function () {
                return $http.get('/emails').then(function (response) {
                    emails = response.data;
                    return emails;
                });
            },
            deleteEmails: function (id) {
                return $http.delete('/emails/' + id).then(function (response) {
                    emails = response.data;
                    return emails;
                });
            },
            getOneEmail: function (id) {
                return $http.get('/emails/' + id).then(function (response) {
                    emails = response.data;
                    return emails;
                });
            },
            update: function (id, data) {
                return $http.put('/emails/' + id, data).then(function (response) {
                    console.log('update ' + response);
                });
            }
        }
    }])
    .factory('sent', ['$http', function ($http) {
        var sent = [];

        return {
            getSentEmails: function (id) {
                return $http.get('/sent').then(function (response) {
                    sent = response.data;
                    return sent;
                });
            },
            getOneSentEmail: function (id) {
                return $http.get('/sent').then(function (response) {
                    sent = response.data;
                    var thatMail = sent.find(function (element, index, array) {
                        return element.id == id;
                    });
                    console.log(thatMail);
                    return thatMail;
                });
            },
            postOneEmail: function (email) {
                email.id = Date.now();
                email.sent = Date.now();
                return $http.post('/sent', email);
            }
        }
    }]);
