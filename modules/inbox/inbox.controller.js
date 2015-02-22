angular.module('app')
    .controller('emailsCtrl', ['$scope', '$rootScope', 'localStorageService', 'emails', 'inboxFactory',
        function ($scope, $rootScope, localStorageService, emails, inboxFactory) {
            var emailsList = []; // list of emails from request
            $scope.emails = localStorageService.get('localEmails'); // check if local storage has emails

            if ($scope.emails === null) { // local storage has no emails
                console.log('http required');
                emails.getEmails().then(function(response){ // get emails
                    $scope.emails = inboxFactory.reverse(response); // save emails to scope
                    emailsList = response;
                    localStorageService.add('localEmails',$scope.emails); // save emails to localstorage
                });
            } else { //local storage has emails
                console.log('On local storage. Nothing do be done.');
            }

            var load = function() {
                emails.getEmails().then(function(response) {
                    emailsList = response;
                    var newLength = emailsList.length;
                    var oldLength = $scope.emails.length;
                    if (newLength > oldLength) { // check new emails
                        var diff = newLength - oldLength; // amount of new emails
                        for(var i=1; i<=diff; i++) { // for more new emails
                            addEmail(emailsList[newLength-i]);
                        }
                    }
                });
            };

            var addEmail = function(elem) {
                $scope.emails.unshift(elem); // add to the beginning of an array
                console.log('new email added');
                localStorageService.add('localEmails', $scope.emails);
            };

            $scope.removeEmail = function(id) {
                emails.deleteEmails(id).then(function(response) { });
                $scope.emails = inboxFactory.removeEmail($scope.emails,id);
            };

            $scope.updateStorage = function(id) {
                inboxFactory.updateStorage($scope.emails,id);
            };

            $scope.showEmail = function(id) {
                console.log('show email');
                $scope.emailToShow = id;
                $scope.go(id);
                $rootScope.$broadcast('emailId',id);
            };

            $rootScope.$on('removeEmail', function(e,i){
                $scope.emails = inboxFactory.removeEmail($scope.emails,i);
            });

            $rootScope.$on('updateStorage', function(e,i){
                $scope.updateStorage(i);
            });

            setInterval(load,7000); // every 7 sec

    }]);