angular.module('app')
    .controller('inboxCtrl', ['$scope', '$rootScope', 'localStorageService', 'emails', 'inboxFactory', '$state', '$stateParams',
        function ($scope, $rootScope, localStorageService, emails, inboxFactory, $state, $stateParams) {
            var emailsList = []; // list of emails from request

            $rootScope.$state = $state;
            $scope.params = $stateParams;
            $scope.go = function (id) {
                $state.go('view', {emailId: id, fromState: 'inbox'});
            };

            $scope.setInterval = localStorageService.get('emailInterval');
            if ($scope.setInterval === null) {
                $scope.setInterval = 8000;
            }

            $scope.emails = localStorageService.get('localEmails'); // check if local storage has emails
            if ($scope.emails === null) { // local storage has no emails
                console.log('http required');
                emails.getEmails().then(function(response){ // get emails
                    $scope.emails = inboxFactory.reverse(response); // save emails to scope
                    localStorageService.add('localEmails',$scope.emails); // save emails to localstorage
                    $rootScope.$broadcast('addEmailsFromServer', $scope.emails);
                });
            } else { //local storage has emails
                console.log('On local storage. Nothing do be done.');
                $rootScope.$broadcast('addEmailsFromServer', $scope.emails);
            }

            var emailsToDelete = [];
            $scope.removeEmail = function(id) {
                emailsToDelete.push(id);
            };

            var removeEmailsFromServer = function(data) {
                for(var i=0; i<data.length; i++) {
                    emails.deleteEmails(data[i]);
                }
                $scope.emails = inboxFactory.removeEmail($scope.emails,data);
                emailsToDelete = [];
            };

            var load = function() {
                console.log(emailsToDelete.length);
                if (emailsToDelete.length !== 0) {
                    removeEmailsFromServer(emailsToDelete);
                } else {
                    emails.getEmails().then(function(response) {
                        //emailsList = response;
                        emailsList = inboxFactory.reverse(response);
                        var newLength = emailsList.length;
                        var oldLength = $scope.emails.length;
                        if (newLength > oldLength) { // check new emails
                            var diff = newLength - oldLength; // amount of new emails
                            console.log(diff);
                            for(var i=diff-1; i>=0; i--) { // for more new emails
                               addEmail(emailsList[i]);
                            }
                        }
                    });
                }
            };

            var addEmail = function(elem) {
                $scope.emails.unshift(elem); // add to the beginning of an array
                localStorageService.add('localEmails', $scope.emails);
                $rootScope.$broadcast('addEmailInbox',elem);
            };


            $scope.updateStorage = function(id) {
                inboxFactory.updateStorage($scope.emails,id);
            };

            $scope.showEmail = function(id) {
                $scope.emailToShow = id;
                $scope.go(id);
                $rootScope.$broadcast('emailId',id);
            };

            $rootScope.$on('removeEmail', function(e,i){
                emailsToDelete.push(i);
                console.log('usuwamy ' + i);
                removeEmailsFromServer(emailsToDelete);
            });

            $rootScope.$on('updateStorage', function(e,i){
                $scope.updateStorage(i);
            });

            $rootScope.$on('setInterval', function(e,number){
                $scope.setInterval = number;
            });

            $rootScope.refresh = setInterval(load,$scope.setInterval); // every 7 sec default

    }]);