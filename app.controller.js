angular.module('app')
    .controller('mainCtrl', function ($scope, $modal, $log, $rootScope, router, localStorageService, customFolders) {

        var folders = localStorageService.get('localFolders');
        var newStates = {};
        var emailsInFolders = [];
        $scope.allFolders = [];
        $rootScope.data = {
            theme: ''
        };

        if (localStorageService.isSupported) {
            $rootScope.data.theme = localStorageService.get('theme');
            if ($rootScope.data.theme === null) {
                $rootScope.data.theme = 'bootstrap';
            }
        }
        else {
            $scope.theme = 'bootstrap';
        }

        if (folders !== null) {
            newStates = folders;
            console.log(newStates);
            for (var name in folders) {
                $scope.allFolders.push(name);
                console.log('add new state! ' + name);
            }
        }

        $scope.reload = function (collection) {
            router.setRoutes(collection);
        };

        $scope.addNewFolder = function () {
            var modalInstance = $modal.open({
                templateUrl: 'modalContent.html',
                controller: 'ModalInstanceCtrl'
            });

            modalInstance.result.then(function (folder) {

                $scope.folder = folder;
                $scope.allFolders.push($scope.folder);
                newStates[$scope.folder] = {
                    "url": "/inbox/" + $scope.folder,
                    "templateUrl": "modules/inbox/customFolder.html"
                };
                $scope.reload(newStates);
                localStorageService.add('localFolders', newStates);

            }, function () {
                $log.info('Modal dismissed');
            });
        };

        $scope.$on('factoryCustomFolder',function(event,args){
            var id = args.id;
            var folderName = args.folder;
            customFolders.addFolders(id, folderName);
        });

    })
    .controller('ModalInstanceCtrl', function($scope, $modalInstance) {

        $scope.ok = function (name) {
            $modalInstance.close(name);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });