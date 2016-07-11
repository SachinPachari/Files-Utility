/* global console */
var module = (function(){
    'use strict';
    var module = {};

    module.initialize = function () {
        this.loadName();
        // $('#downloadFile').click(download);
        ajaxModule.getFileList().done(function(data){
            zTreeModule.initialize('treeDemo', data);
        });
    };
    
    // validate if the selected element is a parent
    module.isValidFile = function (treeNode) {
        if (treeNode !== null && 
            treeNode.isParent === false && 
            treeNode.fullPath !== null) {
            return treeNode.fullPath;
        }
        return;
    };

    module.loadName = function() {
        ajaxModule.getAppDesc().done(function(data){
            $('#app-name').text(data);
        });
    };
    
    // enable the buttons if the give path is valid
    module.enableButtons = function (filePath) {
        if(filePath === undefined){
            $('button').prop('disabled', true);
            $('#downloadFile').addClass('disabled');
            return;
        }
        $('button').prop('disabled', false);
        $('#downloadFile').removeClass('disabled');
    };

    module.updateDownLoadButton = function (treeNode) {
        var url = '/api-download?file='+treeNode.fullPath;
        $('#downloadFile').attr('href', url);
    };
    
    return module;
}());

(function () {
    'use strict';
    module.initialize();    
}());