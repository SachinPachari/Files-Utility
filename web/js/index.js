/**
 * 
 */

var setting = {
	view: {
		showLine: false
	},
	data : {
		simpleData : {
			enable : true
		}
	},
	callback : {
		onMouseDown : onMouseDown,
	}
};

var selectedFilePath = "";

var folderData = [];

var ip = location.host;

var pageData;

function onMouseDown(event, treeId, treeNode) {
	// console.log('child--->'+treeNode.name+'-->'+treeNode.actualPath);
	if (treeNode != null) {
		if (treeNode.isParent == false && treeNode.actualPath != null) {
			selectedFilePath = treeNode.actualPath;
			$('#loadFile').prop('disabled', false);
		} else {
			$('#loadFile').prop('disabled', true);
			selectedFilePath = "";
		}

	}
}

function loadFile() {
	console.log("loading file using ajax" + selectedFilePath);

	
	
	console.log("selected value->"+selectedFilePath);
	$.cookie('g_pageData', selectedFilePath, { expires: 7 });

	
		window.open('data.html');

}

function loadName() {
	var name = "";
	$.ajax({
		type : "GET",
		url : "http://" + ip + "/SharedDriveApp/rest/file/getAppDesc",
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
	console.log("Loading...");

	$('#loadFile').click(function() {
		loadFile();
	});
	
	loadName();

	$.ajax({
		type : "GET",
		url : "http://" + ip + "/list",
		dataType : "json",
		// headers: {"Content-Type":"application/json"},
		async : false,
	}).done(function(data) {
		folderData = data;
		console.log(data);
	});

	$.fn.zTree.init($("#treeDemo"), setting, folderData);
});