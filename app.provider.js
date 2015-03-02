angular.module('app')
    .provider('router', function($stateProvider) {
        this.$get = function($state) {
            return {
                setRoutes: function(collection) {
                    console.log(collection);
                    for (var routeName in collection) {
                        if (!$state.get(routeName)) {
                            $stateProvider.state(routeName, collection[routeName]);
                            console.log('add new state! ' + routeName);
                        }
                    }
                }
            }
        }
});