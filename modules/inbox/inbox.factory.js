angular.module('app')
    .factory('inboxFactory', function (localStorageService, emails) {
        var emailList = [];
        var obj = {};

        // reverse emails; the first email is the newest
        obj.reverse = function (items) {
            return items.slice().reverse();
        };

        obj.getScope = function (allMails, id) {
            for(var i=0; i<allMails.length; i++) {
                var s = allMails[i].id;
                if(s === id) {
                    return i;
                }
            }
        };

        // change the colour of the email element
        obj.updateStorage = function(list, id) {
            var nr = obj.getScope(list, id);
            if (list[nr].read === false){
                list[nr].read = true;
                localStorageService.add('localEmails', list);
            }
            var json = { read: true };
            emails.update(id,json).then(function(response) { });
        };

        obj.removeEmail = function(list,id) {
            var nr = obj.getScope(list,id);
            list.splice(nr,1);
            localStorageService.add('localEmails',list);
            return list;
        };

        return obj;

    });