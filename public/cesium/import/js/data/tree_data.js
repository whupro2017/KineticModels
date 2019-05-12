var DataSourceTree = function(options) {
	this._data 	= options.data;
	this._delay = options.delay;
}

DataSourceTree.prototype.data = function(options, callback) {
	var self = this;
	var $data = null;

	if(!("name" in options) && !("type" in options)){
		$data = this._data;//the root tree
		callback({ data: $data });
		return;
	}
	else if("type" in options && options.type == "folder") {
		if("additionalParameters" in options && "children" in options.additionalParameters)
			$data = options.additionalParameters.children;
		else $data = {}//no data
	}
	
	if($data != null)//this setTimeout is only for mimicking some random delay
		setTimeout(function(){callback({ data: $data });} , parseInt(Math.random() * 500) + 200);

	//we have used static data here
	//but you can retrieve your data dynamically from a server using ajax call
	//checkout examples/treeview.html and examples/treeview.js for more info
};

var tree_data = {
	'dynamic' : {name: '动态物体', type: 'folder'}	,
	'static' : {name: '静态物体', type: 'folder'}	,	
}
tree_data['dynamic']['additionalParameters'] = {
	'children' : {
		'dog' : {name: '狗', type: 'item'},
		'box' : {name: '盒子', type: 'item'},		
	}
}
tree_data['static']['additionalParameters'] = {
	'children' : {
		'house' : {name: '房子', type: 'item'},
	}
}

var treeDataSource = new DataSourceTree({data: tree_data});

