angular.module('app')
    .controller('emailView', ['$scope', '$rootScope', 'emails', 'customFolders', '$state',
        function ($scope, $rootScope, emails, customFolders, $state) {

        emails.getOneEmail($scope.id).then(function(response) {
            var emailToShow = response;
            $scope.title = emailToShow.title;
            $scope.rec = prettyReceivers(emailToShow.receivers);
            $scope.sender = emailToShow.sender;
            $scope.content = emailToShow.content;
        });

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
            emails.deleteEmails($scope.id).then(function(response) { });
            $rootScope.$broadcast('removeEmail', $scope.id);
            $state.go($scope.state);
        };

        $scope.back = function() {
            $state.go($scope.state);
        };
}]);