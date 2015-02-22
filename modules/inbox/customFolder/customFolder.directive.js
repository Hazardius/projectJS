angular.module('app')
    .directive('customlist', function($rootScope) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {

                // short content to show on the main page
                var shortContent = function(data) {
                    var shortContent = [];
                    var charCounter = 25;
                    if (charCounter > data.content.length) {
                        charCounter = data.content.length;
                    }
                    for(var i = 0; i<charCounter; i++) {
                        shortContent += data.content[i];
                    }
                    return shortContent;
                };

                // load email from localstorage
                var addEmail = function(data) {
                        var cont = shortContent(data);
                        if (data.read === false) {
                            element.append('<tr class="new" id="' + data.id + '"><td><span class="sender">' + data.sender + '</span></td> + ' +
                            '<td><span class="title">' +  data.title + '</span></td><td><span class="content">' + cont  + '</span></td> + ' +
                            '<td><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></td></tr>');
                        } else {
                            element.append('<tr id="' + data.id + '"><td><span class="sender">' + data.sender + '</span></td> + ' +
                            '<td><span class="title">' +  data.title + '</span></td><td><span class="content">' + cont  + '</span></td> + ' +
                            '<td><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></td></tr>');
                        }
                };

                scope.$on('addEmailsSub',function(event,arrgs){
                    addEmail(arrgs);
                });


                var removeEmail = function(mail) {
                    mail.remove();
                };

                // if element is clicked
                element.bind('click',function(event){
                    // if removed is clicked
                    if (event.target.classList.contains("glyphicon-remove")) {
                        var emailToRemove = event.target.parentNode.parentNode;
                        var idToRemove = emailToRemove.getAttribute('id');
                        scope.removeEmail(idToRemove);
                        removeEmail(emailToRemove);
                    } else {
                        // emails is clicked
                        var tr = closest(event.target, 'tr');
                        var idToSend = tr.getAttribute('id');
                        console.log(tr);

                        if(tr.classList.contains('new')){
                            tr.classList.remove('new');
                        }

                        scope.updateStorage(idToSend);
                        scope.showEmail(idToSend,scope.currentState);
                    }
                });

                var closest = function(elem, selector) {
                    var matchesSelector = elem.matches || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.msMatchesSelector;
                    while (elem) {
                        if (matchesSelector.bind(elem)(selector)) {
                            return elem;
                        } else {
                            elem = elem.parentElement;
                        }
                    }
                    return false;
                };

            }
        }
    });