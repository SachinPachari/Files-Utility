var ajaxModule = (function () {
    'use strict';
    var ajaxModule = {},
        ip = location.host;
    
    ajaxModule.getFileForDownload = function (fileName, filePath) {
        $.ajax({
            url: 'http://' + ip + '/api-download'+filePath,
            dataType: 'json',
            type: 'GET',
            headers:{
                "Content-Disposition": "attachment; filename="+fileName
            },
            success: function() {
                 //window.location = fileName;
            }
        });
    };
    
    ajaxModule.getFileList = function () {
        var deferred = $.Deferred();
        
        $.ajax({
            type : 'GET',
            url : 'http://' + location.host + '/list',
            dataType : 'json',
            // headers: {"Content-Type":"application/json"},
            async : false,
        }).done(function(data) {
            deferred.resolve(data);
        }).error(function(err){
            console.error(err);
        });
        
        return deferred;
    };

    ajaxModule.getAppDesc = function () {
        var deferred = $.Deferred();

        $.ajax({
            type : 'GET',
            url : 'http://' + ip + '/app-desc',
            // async : true,
        }).done(function(data) {
            deferred.resolve(data);
        }).error(function (err) {
            deferred.error(err);
        });
        return deferred;
    };

    return ajaxModule;
}());