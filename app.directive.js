angular.module('app')
    .directive('droppable', function($rootScope){
        return {
            scope: {
                drop: '&',
                bin: '='
            },
            link: function(scope, element, attrs) {
                // again we need the native object

                element.bind('dragover',function(event) {
                    event.dataTransfer.dropEffect = 'move';
                    // allows us to drop
                    event.preventDefault();
                    this.classList.add('over');
                });

                element.bind('dragenter',function() {
                    this.classList.add('over');
                });

                element.bind('dragleave',function() {
                    this.classList.remove('over'); });

                element.bind('drop', function(event) {
                    // Stops some browsers from redirecting.
                    event.preventDefault();
                    this.classList.remove('over');

                    var item = event.dataTransfer.getData('text');
                    var folderId = this.id;

                    $rootScope.$broadcast('factoryCustomFolder', {id: item, folder: folderId});

                });
            }
        }
    });