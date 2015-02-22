angular.module('app')
    .controller('emailView', ['$scope', '$rootScope', 'emails', 'sent', 'customFolders', '$state',
        function ($scope, $rootScope, emails, sent, customFolders, $state) {
            if ($scope.state === 'sent') {
                sent.getOneSentEmail($scope.id).then(function(response) {
                    var emailToShow = response;
                    $scope.title = emailToShow.title;
                    $scope.rec = prettyReceivers(emailToShow.receivers);
                    $scope.sender = 'sosnowski@outlock.com';
                    $scope.content = emailToShow.content;
                });
            } else {
                emails.getOneEmail($scope.id).then(function(response) {
                    var emailToShow = response;
                    $scope.title = emailToShow.title;
                    $scope.rec = 'sosnowski@outlock.com';
                    $scope.sender = emailToShow.sender;
                    $scope.content = emailToShow.content;
                });
            }

        // nice looking string about receivers
        var prettyReceivers = function(receivers) {
            if (receivers.length === 0) {
                return "None";
            }
            if (receivers.length === 1) {
                return receivers[0];
            }
            var returnString = "";
            for(var i = 0; i<receivers.length-1; i++) {
                returnString += receivers[i] + "; ";
            }
            returnString += receivers[receivers.length - 2];
            return returnString;
        };

        $scope.removeEmail = function() {
            if ($scope.state !== 'sent') {
                emails.deleteEmails($scope.id).then(function(response) { });
            }
            $rootScope.$broadcast('removeEmail', $scope.id);
            $state.go($scope.state);
        };

        $scope.back = function() {
            $state.go($scope.state);
        };
}]);