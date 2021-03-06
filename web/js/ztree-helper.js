var zTreeModule = (function () {
    'use strict';
    var zTreeModule = {};
    zTreeModule.zTree = {};
    zTreeModule.selectedNode = {};
    zTreeModule.selectedFilePath = '';
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
        if(treeNode === null){
            return;
        }
        this.selectedNode = treeNode;
        this.selectedFilePath = module.isValidFile(treeNode);
        module.enableButtons(this.selectedFilePath);
        module.updateDownLoadButton(treeNode);
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