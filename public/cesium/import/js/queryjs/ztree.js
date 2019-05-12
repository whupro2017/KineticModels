

	var setting = {
			view: {
				selectedMulti: false
			},
			check: {
				enable: true
			},
			data: {
				simpleData: {
					enable: true
				}
			},
			view: {
				showIcon: false
			},
			callback: {
				beforeCheck: beforeCheck,
				onCheck: onCheck
			}
		};

		var zNodes =[
			{ id:1, pId:0, name:"物体", open:false},
			{ id:11, pId:1, name:"狗",checked:false},
			{ id:12, pId:1, name:"盒子"},
			{ id:13, pId:1, name:"房子"},
			{ id:14, pId:1, name:"场景", checked:false},			
		];
		
		var code, log, className = "dark";
		
		function beforeCheck(treeId, treeNode) {
			className = (className === "dark" ? "":"dark");			
//			var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
//			checkCount = zTree.getCheckedNodes(true).length;			
//			showLog("[ "+getTime()+" beforeCheck ]&nbsp;&nbsp;&nbsp;&nbsp;" + treeNode.name + ";" +treeNode.checked  );								
			return (treeNode.doCheck !== false);
		}
		
		function onCheck(e, treeId, treeNode) {
			showLog("[ "+getTime()+" onCheck ]&nbsp;&nbsp;&nbsp;&nbsp;" + treeNode.name + ";" + treeNode.checked );
			
			if(treeNode.id==1){
				if(treeNode.checked){
					show_dog();
					show_box1();
					show_house();
					show_c2();
				}else{
					delete_dog();
					delete_box1();d
					delete_c2();
					delete_house();
				}
			}
			
			if(treeNode.id == 11){
				if(treeNode.checked){
					show_dog();
				}else{
					delete_dog();
				}
			}
			
			if(treeNode.id == 12){
				if(treeNode.checked){
					show_box1();
				}else{
					delete_box1();
				}
			}
			
			if(treeNode.id == 13){
				if(treeNode.checked){
					show_house();
				}else{
					delete_house();
				}
			}
			
			if(treeNode.id == 14){
				if(treeNode.checked){
					show_c2();
				}else{
					delete_c2();
				}
			}
			
		}	
		
		function showLog(str) {
			if (!log) log = jQuery("#log");
			log.append("<li class='"+className+"'>"+str+"</li>");
			if(log.children("li").length > 6) {
				log.get(0).removeChild(log.children("li")[0]);
			}
		}
		function getTime() {
			var now= new Date(),
			h=now.getHours(),
			m=now.getMinutes(),
			s=now.getSeconds(),
			ms=now.getMilliseconds();
			return (h+":"+m+":"+s+ " " +ms);
		}

		function checkNode(e) {
			var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
			type = e.data.type,
			nodes = zTree.getSelectedNodes();
			if (type.indexOf("All")<0 && nodes.length == 0) {
				alert("请先选择一个节点");
			}

			if (type == "checkAllTrue") {
				zTree.checkAllNodes(true);
			} else if (type == "checkAllFalse") {
				zTree.checkAllNodes(false);
			} else {
				var callbackFlag = $("#callbackTrigger").attr("checked");
				for (var i=0, l=nodes.length; i<l; i++) {
					if (type == "checkTrue") {
						zTree.checkNode(nodes[i], true, false, callbackFlag);
					} else if (type == "checkFalse") {
						zTree.checkNode(nodes[i], false, false, callbackFlag);
					} else if (type == "toggle") {
						zTree.checkNode(nodes[i], null, false, callbackFlag);
					}else if (type == "checkTruePS") {
						zTree.checkNode(nodes[i], true, true, callbackFlag);
					} else if (type == "checkFalsePS") {
						zTree.checkNode(nodes[i], false, true, callbackFlag);
					} else if (type == "togglePS") {
						zTree.checkNode(nodes[i], null, true, callbackFlag);
					}
				}
			}
		}

		function setAutoTrigger(e) {
			var zTree = $.fn.zTree.getZTreeObj("treeDemo");
			zTree.setting.check.autoCheckTrigger = $("#autoCallbackTrigger").attr("checked");			
		}
		
		
//		$(document).ready(function(){
		jQuery(document).ready(function($){
			$.fn.zTree.init($("#treeDemo"), setting, zNodes);
			$("#checkTrue").bind("click", {type:"checkTrue"}, checkNode);
			$("#checkFalse").bind("click", {type:"checkFalse"}, checkNode);
			$("#toggle").bind("click", {type:"toggle"}, checkNode);
			$("#checkTruePS").bind("click", {type:"checkTruePS"}, checkNode);
			$("#checkFalsePS").bind("click", {type:"checkFalsePS"}, checkNode);
			$("#togglePS").bind("click", {type:"togglePS"}, checkNode);
			$("#checkAllTrue").bind("click", {type:"checkAllTrue"}, checkNode);
			$("#checkAllFalse").bind("click", {type:"checkAllFalse"}, checkNode);
			$("#autoCallbackTrigger").bind("change", {}, setAutoTrigger);
		});


