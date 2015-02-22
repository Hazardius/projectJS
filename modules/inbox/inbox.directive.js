angular.module('app')
    .directive('list', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){

                var len = 0;

                // short content to show on the main page
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

                // load email from localstorage
                var loadEmails = function(data) {
                    for(var nr=0; nr<data.length; nr++) {
                        var cont = shortContent(data,nr);
                        if (data[nr].read === false) {
                            element.append('<tr draggable="true" class="new" id="' + data[nr].id + '"><td><span class="sender">' + data[nr].sender + '</span></td> + ' +
                            '<td><span class="title">' +  data[nr].title + '</span></td><td><span class="content">' + cont  + '</span></td> + ' +
                            '<td><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></td></tr>');
                        } else {
                            element.append('<tr draggable="true" id="' + data[nr].id + '"><td><span class="sender">' + data[nr].sender + '</span></td> + ' +
                            '<td><span class="title">' +  data[nr].title + '</span></td><td><span class="content">' + cont  + '</span></td> + ' +
                            '<td><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></td></tr>');
                        }
                    }
                };

                // add new email
                var addEmail = function(size) {
                    for (var i=0; i<size; i++) {
                        var cont = shortContent(scope.emails,i);
                        // add new(the first) email at the top of the list
                        element.prepend('<tr draggable="true" class="new" id="' + scope.emails[i].id + '"><td><span class="sender">' + scope.emails[i].sender + '</span></td> + ' +
                        '<td><span class="title">' +  scope.emails[i].title + '</span></td><td><span class="content">' + cont  + '</span></td> + ' +
                        '<td><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></td></tr>');
                        console.log('directive: new email added');
                    }
                };

                var removeEmail = function(mail) {
                    mail.remove();
                    len = len - 1;
                };

                // watch changes
                scope.$watch('emails', function(value) {
                    console.log('zmienilo sie cos yeah! ');
                    if(scope.emails !== null) {
                        if (scope.emails.length > len) {
                            if (len === 0) {
                                // the first time from localstorage
                                loadEmails(scope.emails);
                                console.log('from localstorage');
                                len = scope.emails.length;
                            } else {
                                // add to the list
                                var diff = scope.emails.length - len;
                                addEmail(diff);
                                len = scope.emails.length;
                            }
                        }
                    }
                }, true);

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
                        var tr = $(event.target).closest('tr');
                        var idToSend = tr.attr('id');

                        if(tr.hasClass('new')){
                            tr.removeClass('new');
                        }

                        scope.updateStorage(idToSend);
                        scope.showEmail(idToSend);
                    }
                });

                // drag and drop
                element.bind("dragstart", function(event) {
                    var tr = $(event.target).closest('tr');
                    var id = tr.attr('id');

                    event.dataTransfer.effectAllowed = 'move';
                    event.dataTransfer.setData('text', id);

                });

                element.bind("dragend", function(e) {
                });

            }
        };
    });