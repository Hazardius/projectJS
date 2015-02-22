angular.module('app')
    .controller('customList', function ($scope, $rootScope, $state, customFolders, emails, inboxFactory, localStorageService) {

        $scope.currentState = $state.current.name; // name of view

        var emailsList = [];

        $scope.submails = localStorageService.get('folders'); // get all emails from subfolders
        if($scope.submails !== null) {
            var idEmails = customFolders.getEmails($scope.submails,$scope.currentState);
            customFolders.getEmailsFromServer(idEmails);
        }

        $scope.go = function (id) {
            $state.go('view', {emailId: id, fromState: $scope.currentState});
        };

        $scope.showEmail = function(id) {
            $scope.go(id);
            $scope.emailToShow = id;
        };

        $scope.removeEmail = function(id) {
            customFolders.deleteFolder(id,$scope.currentState);
        };

        $rootScope.$on('removeEmail', function(e,i){
            customFolders.deleteFolderFromAll(i);
        });

        $scope.updateStorage = function(id) {
            $rootScope.$broadcast('updateStorage', id);
        };

    });
