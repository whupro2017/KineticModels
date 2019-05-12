/**
 * @author xcy
 * left contents
 */
var jq=jQuery.noConflict();
var inputCodeOfStadia;//测站编码
var beginTime;
var endTime;
var chart;
jQuery(document).ready(function(){
	//设置时区
	Highcharts.setOptions({       		
	     global: {                                                               
	            useUTC: false                                                       
	      },   
	
   });
	//初始化树，并监听节点
	treeInit();
});

//初始化树，并监听节点
function treeInit(){
	canalTreeData = [{"text":"基础","codeOfStadia":"10510001"},
	                 {"text":"燃烧","codeOfStadia":"10510002"},
	                 {"text":"爆炸","codeOfStadia":"10510003"},
	                 {"text":"抢盗","codeOfStadia":"10510004"},
	                 {"text":"砍杀","codeOfStadia":"10510005"}];
	jq('#StadiaName').treeview({
			data: canalTreeData,
			animated: '1',
			width: 400,
			//persist:'location',//页面刷新不保留折叠状态
			showTags: false,
			levels: 1,
			backColor: 'transparent',
			onNodeSelected: function(event, data) {
			if(data.codeOfStadia == '10510001'){
				jq("#leftDiv").load(
				"/pro/workview/all_show.jsp");
				jq("#left2Div").load(
				"/pro/3dshow/all_3d.html");
			}
			if(data.codeOfStadia == '10510002'){
				jq("#leftDiv").load(
				"/pro/workview/burn_show.jsp");
			}
			if(data.codeOfStadia == '10510003'){
				jq("#leftDiv").load(
				"/pro/workview/bom_show.jsp");
			}
			if(data.codeOfStadia == '10510004'){
				jq("#leftDiv").load(
				"/pro/workview/grab_show.jsp");
			}
			if(data.codeOfStadia == '10510005'){
				jq("#leftDiv").load(
				"/pro/workview/kill_show.jsp");
			}						
		}
		});
}