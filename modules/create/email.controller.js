angular.module('app')
    .controller('emailCtrl', ['$scope', '$rootScope','localStorageService', 'sent', '$state',
        function ($scope, $rootScope, localStorageService, sent, $state) {

            clearInterval($rootScope.refresh);
            $scope.sent = localStorageService.get('sentEmails');
            if ($scope.sent === null) { $scope.sent = []; }

            $scope.receivers = [];

            $scope.addReceiver = function(email) {
                var exist = false;
                for(var i=0; i<$scope.receivers.length; i++) {
                    if ($scope.receivers[i] === email) {
                        exist = true;
                    }
                }
                if (exist === false) {
                    $scope.receivers.push(email);
                    $scope.email = null;
                }
            };

            $scope.remove = function(index){
                $scope.receivers.splice(index, 1);
            };

            // function to submit the form after all validation has occurred
            $scope.submitForm = function(isValid) {
                // check to make sure the form is completely valid
                if (isValid) {
                    var dataObject = {
                        title : $scope.title,
                        receivers  : $scope.receivers,
                        content  : $scope.msg
                    };

                    console.log($scope.receivers.length);

                    sent.postOneEmail(dataObject).then(function(response){
                        addEmail(response.data);
                    });
                }
            };

            var addEmail = function(elem) {
                $scope.sent.unshift(elem);
                localStorageService.add('sentEmails', $scope.sent);
                $scope.back();
            };

            $scope.back = function() {
                $state.go('sent');
            };

}]);