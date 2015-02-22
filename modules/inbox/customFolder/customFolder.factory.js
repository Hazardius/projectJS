angular.module('app')
    .factory('customFolders', function (localStorageService, emails, $rootScope) {
        var idEmails = [];
        var email = [];

        return {
            addFolders: function (id, folder) {
                idEmails.push({
                    name: folder,
                    id: id
                });
                localStorageService.add('folders',idEmails);
            },
            deleteFolder: function(id, folder) {
                idEmails = localStorageService.get('folders');
                for(var i=0; i<idEmails.length; i++) {
                    if (idEmails[i].name === folder && idEmails[i].id === id){
                        idEmails.splice(i,1);
                        localStorageService.add('folders',idEmails);
                    }
                }
            },
            deleteFolderFromAll: function(id) {
                idEmails = localStorageService.get('folders');
                for(var i=0; i<idEmails.length; i++) {
                    if (idEmails[i].id === id){
                        idEmails.splice(i,1);
                        localStorageService.add('folders',idEmails);
                    }
                }
            },
            getEmails: function (allEmails,currentState) {
                // get id emails which belong to this subfolder
                var idEmails = [];
                for(var i = 0; i<allEmails.length; i++) {
                    if (currentState === allEmails[i].name) {
                        idEmails.unshift(allEmails[i].id);
                    }
                }
                return idEmails;
            },
            getEmailsFromServer: function (idEmails) {
                // get emails by id from server
                for(var j=0; j<idEmails.length; j++) {
                    emails.getOneEmail(idEmails[j]).then(function(response){
                        if(response !== undefined) {
                            email = response;
                            $rootScope.$broadcast('addEmailsSub',email);
                        }
                    });
                }
            }
        }
    });