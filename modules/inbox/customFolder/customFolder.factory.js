angular.module('app')
    .factory('customFolders', function (localStorageService, emails, $rootScope) {
        var idEmails = [];
        var email = [];
        var obj = {};

        obj.addFolders = function (id, folder) {
            var get = localStorageService.get('folders');
            if ( get !== null) {
                idEmails = get;
            }

            var exist = obj.ifExist(id,folder,idEmails);
            if(exist === null) { // only one copy of email in one subfolder
                idEmails.push({
                    name: folder,
                    id: id
                });
                localStorageService.add('folders',idEmails);
            }
        };

        obj.ifExist = function(id,folder,emails) {
            for (var i = 0; i < emails.length; i++) {
                if (emails[i].id === id) {
                    if (emails[i].name === folder) {
                        return 1;
                    }
                }
            }
            return null;
        };

        obj.deleteFolder = function(id, folder) {
            idEmails = localStorageService.get('folders');
            for(var i=0; i<idEmails.length; i++) {
                if (idEmails[i].name === folder && idEmails[i].id === id){
                    idEmails.splice(i,1);
                    localStorageService.add('folders',idEmails);
                }
            }
        };

        obj.deleteFolderFromAll=  function(id) {
            idEmails = localStorageService.get('folders');
            for(var i=0; i<idEmails.length; i++) {
                if (idEmails[i].id === id){
                    idEmails.splice(i,1);
                    localStorageService.add('folders',idEmails);
                }
            }
        };

        obj.getEmails = function (allEmails,currentState) {
            // get id emails which belong to this subfolder
            var idEmails = [];
            for(var i = 0; i<allEmails.length; i++) {
                if (currentState === allEmails[i].name) {
                    idEmails.unshift(allEmails[i].id);
                }
            }
            return idEmails;
        };

        obj.getEmailsFromServer = function (idEmails) {
            // get emails by id from server
            for(var j=0; j<idEmails.length; j++) {
                emails.getOneEmail(idEmails[j]).then(function(response){
                    if(response !== undefined) {
                        email = response;
                        $rootScope.$broadcast('addEmailsSub',email);
                    }
                });
            }
        };

        return obj;

    });