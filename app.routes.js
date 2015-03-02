angular.module('app')

    .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/inbox');

    $stateProvider
        .state('inbox', {
            url: '/inbox',
            templateUrl: 'modules/inbox/inbox.html'
        })

        .state('sent', {
            url: '/sent',
            templateUrl: 'modules/sent/sent.html'
        })

        .state('view', {
            url: '/view/{emailId}',
            params: {
                emailId: null,
                fromState: null
            },
            templateUrl: 'modules/emailView/emailView.html'
        })

        .state('create', {
            url: '/create',
            templateUrl: 'modules/create/email.html'
        })

        .state('config', {
            url: '/config',
            templateUrl: 'modules/config/config.html'
        });

    })
    .run(function($rootScope, localStorageService, router){

        var localStorageStates = localStorageService.get('localFolders');
        if (localStorageStates !== null) {
            router.setRoutes(localStorageStates);
        }

    });