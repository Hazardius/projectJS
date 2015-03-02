angular.module('app')
    .directive('list', ['$rootScope', 'localStorageService', function($rootScope, localStorageService){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){

                var lenMails = 0;

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

                var shortReceivers = function(receivers) {
                    if (receivers.length === 0) {
                        return "Noone";
                    }
                    if (receivers.length === 1) {
                        return receivers[0];
                    } else {
                        return receivers[0] + " and others";
                    }
                };

                // load email from localstorage
                var loadEmails = function(data) {
                    var st = $rootScope.$state.current.name;
                    for(var nr = data.length-1; nr >= 0; nr--) {
                        addElement(data[nr], st);
                    }
                };

                var removeEmail = function(mail) {
                    mail.remove();
                    if ($rootScope.$state.current.name === 'inbox') {
                        lenMails--;
                    }
                };

                var addElement = function(mail,state) {
                    var nam = '';
                    var cont = shortContent(mail);
                    var newMail = mail.read;

                    if (newMail === false) {
                        newMail = 'new';
                    }
                    else {
                        newMail = '';
                    }

                    if (state === 'sent') {
                        nam = shortReceivers(mail.receivers);
                        element.prepend('<tr draggable="true" class="' + newMail + '" id="' + mail.id + '"><td><span class="sender">' + nam + '</span></td> + ' +
                        '<td><span class="title">' +  mail.title + '</span></td><td><span class="content">' + cont  + '</span></td> + ' +
                        '</tr>');
                    }
                    else {
                        nam = mail.sender;
                        element.prepend('<tr draggable="true" class="' + newMail + '" id="' + mail.id + '"><td><span class="sender">' + nam + '</span></td> + ' +
                        '<td><span class="title">' +  mail.title + '</span></td><td><span class="content">' + cont  + '</span></td> + ' +
                        '<td><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></td></tr>');
                    }
                };


                if ($rootScope.$state.current.name === 'sent') {
                    var sentLoad = localStorageService.get('sentEmails');
                    if (sentLoad  !== null) {
                        loadEmails(sentLoad);
                    }
                    scope.$on('addEmailSent',function(event,arrgs){
                        addElement(arrgs,'sent');
                    });
                }

                if ($rootScope.$state.current.name === 'inbox') {
                    var inboxLoad = localStorageService.get('localEmails');
                    if (inboxLoad !== null) {
                        loadEmails(inboxLoad);
                        lenMails = inboxLoad.length;
                    }
                    scope.$on('addEmailInbox',function(event,arrgs){
                        console.log(scope.emails.length + ' ' + lenMails);
                        if (scope.emails.length !== lenMails) {
                            addElement(arrgs,'inbox');
                            lenMails++;
                            console.log('raz inbox ' + arrgs.id);
                        }
                    });
                }

                scope.$on('addEmailsFromServer', function(event,arrgs){
                    loadEmails(arrgs);
                });

                scope.$on('addEmailsSub',function(event,arrgs){
                    addElement(arrgs,'custom');
                });

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

                        if ($rootScope.$state.current.name === 'sent') {
                            console.log('sent');
                            scope.showEmail(idToSend);
                        }
                        else if ($rootScope.$state.current.name === 'inbox'){
                            console.log('inbox');
                            scope.showEmail(idToSend);
                        }
                        else {
                            console.log('cosInnego');
                            scope.showEmail(idToSend,scope.currentState);
                        }
                    }
                });


                // drag and drop
                element.bind("dragstart", function(event) {
                    var tr = $(event.target).closest('tr');
                    var id = tr.attr('id');

                    event.dataTransfer.effectAllowed = 'move';
                    event.dataTransfer.setData('text', id);

                    return false;
                });

                element.bind("dragend", function(e) {
                });

            }
        };
    }]);