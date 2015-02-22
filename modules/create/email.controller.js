angular.module('app')
    .controller('emailCtrl', ['$scope', '$rootScope','localStorageService', 'sent', '$state',
        function ($scope, $rootScope, localStorageService, sent, $state) {
        $scope.myForm = {};
        $scope.myForm.title = "";
        $scope.myForm.receivers = [];
        $scope.myForm.newRec = "";
        $scope.myForm.content = "";

        $scope.sent = localStorageService.get('sentEmails');

        $scope.myForm.addNewReceiver = function(item, event) {
            if ($scope.myForm.newRec !== undefined && $scope.myForm.newRec !== '') {
                $scope.myForm.receivers[$scope.myForm.receivers.length] = $scope.myForm.newRec;
                $scope.myForm.newRec = "";
            }
        };

        $scope.myForm.submitTheForm = function(item, event) {
            if ( $scope.myForm.receivers.length !== 0 ) {
                var dataObject = {
                    title : $scope.myForm.title,
                    receivers  : $scope.myForm.receivers,
                    content  : $scope.myForm.content
                };

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

        $scope.checkEmail = function(modelValue) {
            var nr = getScope(modelValue);
            if (nr === -1) {
                return false;
            }
            return true;
        };

        $scope.removeEmail = function(mailToRemove) {
            var nr = getScope(mailToRemove);
            $scope.myForm.receivers.splice(nr,1);
        };

        var getScope = function(mailToRemove){
            for(var i=0; i<$scope.myForm.receivers.length; i++) {
                var s = $scope.myForm.receivers[i];
                if(s === mailToRemove) {
                    return i;
                }
            }
            return -1;
        };

        $scope.back = function() {
            $state.go('sent');
        };
}]);