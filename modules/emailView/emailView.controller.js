angular.module('app')
    .controller('emailViewCtrl', ['$scope', '$rootScope', 'emails', 'sent', 'customFolders', '$state', '$stateParams',
        function ($scope, $rootScope, emails, sent, customFolders, $state, $stateParams) {

            clearInterval($rootScope.refresh);
            $rootScope.$state = $state;
            console.log($rootScope.$state.current.name);

            $scope.id = $stateParams.emailId;
            $scope.fromState = $stateParams.fromState;

            if ($scope.fromState === 'sent') {
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

                $rootScope.$broadcast('updateStorage', $scope.id);
            }

        // nice looking string about receivers
        var prettyReceivers = function(receivers) {
            var returnString = "";
            for(var i=0; i<receivers.length; i++) {
                returnString = returnString + receivers[i] + '; ';
            }
            return returnString;
        };

            $scope.removeEmail = function() {
                $rootScope.$broadcast('removeEmail', $scope.id);
                $state.go($scope.fromState);
            };

            $scope.back = function() {
                $state.go($scope.fromState);
            };
}]);