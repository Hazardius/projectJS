angular.module('app')
    .controller('config', ['$scope', '$rootScope', 'localStorageService', function ($scope, $rootScope, localStorageService) {

    $scope.bootstraps = [
        { name: 'bootstrap', url: 'bootstrap' },
        { name: 'dark', url: 'dark' },
        { name: 'light', url: 'light' }
    ];

    $scope.$watch('data.theme', function () {
        if ($rootScope.data.theme !== null ) {
            localStorageService.add('theme', $rootScope.data.theme);
        }
    });
    $scope.alerts = [];

    $scope.changeInterval = function(int) {

            var number = 0;

            if (typeof int !== 'number') {
                $scope.alerts.push({ type: 'danger', msg: 'You need to write a number! Try again.'});
            } else {
                if (int > 0) {
                    number = int * 60000;
                    $scope.alerts.push({ type: 'success', msg: 'Well done! You successfully changed interval of refreshing emails to ' + int + ' minutes.'});
                } else {
                    $scope.alerts.push({ type: '', msg: 'You do not receive any email now. Do you really want this?'});
                }

                console.log('number: ' + number);
                localStorageService.add('emailInterval', number);
                $rootScope.$broadcast('setInterval',number);
            }
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
}]);



