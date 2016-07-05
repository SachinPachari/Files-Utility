/* global console */

var selectedFilePath = '',
    selectedNode = null,
    ip = location.host;

var module = (function(){
    'use strict';
    var module = {};
    
    // validate if the selected element is a parent
    module.isValidFile = function (treeNode) {
        if (treeNode !== null && treeNode.isParent === false && treeNode.fullPath !== null) {
            return treeNode.fullPath;
        }
        return;
    };
    
    // enable the buttons if the give path is valid
    module.enableButtons = function (filePath) {
        if(filePath === undefined){
            $('button').prop('disabled', true);
            return;
        }
        $('button').prop('disabled', false);
    };
    
    return module;
}());

var ajaxModule = (function () {
    'use strict';
    var ajaxModule = {};
    
    ajaxModule.getFileForDownload = function (fileName, filePath) {
        $.ajax({
            url: 'http://' + ip + '/api-download'+filePath,
            dataType: 'json',
            type: 'GET',
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
    
    return ajaxModule;
}());


var zTreeModule = (function () {
    'use strict';
    var zTreeModule = {};
    zTreeModule.zTree = {};
    zTreeModule.setting = {
        view: {
            showLine: false
        },
        data : {
            simpleData : {
                enable : true
            }
        },
        callback : {
        }
    };
    
    zTreeModule.initialize = function (id, data) {
        var $el = $('#'+id);
        // adding the mouse click listener.
        this.setting.callback.onMouseDown = this.onMouseDown;
        this.zTree = $.fn.zTree.init($el, this.setting, data);
    };
    
    zTreeModule.onMouseDown = function (event, treeId, treeNode) {
        selectedNode = treeNode;
        selectedFilePath = module.isValidFile(treeNode);
        module.enableButtons(selectedFilePath);
    };
    
    zTreeModule.getSelectedNode = function (){
        var selectedArray = this.zTree.getSelectedNodes();
        if(selectedArray.length > 0){
            return selectedArray[0];
        }
        return;
    };
    
    return zTreeModule;
}());



function loadFile() {
	console.log('loading file using ajax' + selectedFilePath);
	console.log('selected value->'+selectedFilePath);
	$.cookie('g_pageData', selectedFilePath, { expires: 7 });
	window.open('data.html');
}

function download() {
    console.info('download');
    var node = zTreeModule.getSelectedNode(),
        fileName = node.name,
        filePath = node.fullPath;
    
    ajaxModule.getFileForDownload(fileName, filePath);
//    if(){
//        
//    }
//    filePath = 
    
//    $.ajax({
//        url: "http://" + ip + "/api-download",
//        type: 'POST',
//        success: function() {
////            window.location = 'download.php';
//        }
//    });
}

function loadName() {
	var name = '';
	$.ajax({
		type : 'GET',
		url : 'http://' + ip + '/SharedDriveApp/rest/file/getAppDesc',
//		dataType : "json",
		// headers: {"Content-Type":"application/json"},
		async : false,
	}).done(function(data) {
		name = data;
		console.log(name);
	});
	
	$('#app-name').text(name);
}

$(document).ready(function() {
	console.log('Loading...');
	$('#loadFile').click(loadFile);
    $('#downloadFile').click(download);
	loadName();
    ajaxModule.getFileList().done(function(data){
        zTreeModule.initialize('treeDemo', data);
    });
});