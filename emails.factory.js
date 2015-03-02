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
                    emails = response;
                    return emails;
                });
            }
        }
    }]);