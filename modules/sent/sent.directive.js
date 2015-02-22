angular.module('app')
    .directive('sentList', function($rootScope){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){

                var len = 0;

                var shortContent = function(data,nr) {
                    var shortContent = [];
                    var charCounter = 25;
                    if (charCounter > data[nr].content.length) {
                        charCounter = data[nr].content.length;
                    }
                    for(var i = 0; i<charCounter; i++) {
                        shortContent += data[nr].content[i];
                    }
                    return shortContent;
                };

                var shortReceivers = function(receivers) {
                    if (receivers.length === 0) {
                        return "Noone";
                    }
                    if (receivers.length === 1) {
                        return receivers[0];
                    } else {
                        return receivers[0] + "and others";
                    }
                };

                var loadEmails = function(data) {
                    for(var nr=0; nr<data.length; nr++) {
                        var cont = shortContent(data,nr);
                        var rec = shortReceivers(data[nr].receivers);
                        element.append('<tr draggable="true" id="' + data[nr].id + '"><td><span class="sender">' + rec + '</span></td> + ' +
                        '<td><span class="title">' +  data[nr].title + '</span></td><td><span class="content">' + cont  + '</span></td> + ' +
                        '<td></td></tr>');
                    }
                };

                var addEmail = function(size) {
                    for (var i=0; i<size; i++) {
                        var cont = shortContent(scope.sent,i);
                        var rec = shortReceivers(scope.sent[i].receivers);
                        element.prepend('<tr draggable="true" id="' + scope.sent[i].id + '"><td><span class="sender">' + rec + '</span></td> + ' +
                        '<td><span class="title">' +  scope.sent[i].title + '</span></td><td><span class="content">' + cont  + '</span></td> + ' +
                        '<td></td></tr>');
                    }
                };

                scope.$watch('sent', function(value) {
                    if(scope.sent !== null) {
                        if (scope.sent.length > len) {
                            if (len === 0) {
                                loadEmails(scope.sent);
                                len = scope.sent.length;
                            } else {
                                var diff = scope.sent.length - len;
                                addEmail(diff);
                                len = scope.sent.length;
                            }
                        }
                    }
                }, true);

                element.bind('click',function(event){
                    var tr = closest(event.target, 'tr');
                    var idToSend = tr.getAttribute('id');

                    scope.showSentEmail(idToSend);
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
        };
    });