/**
 * 要素类型JSON文件，生成下拉框
 */
var element_type_picker={
			   0000000:{
				   1000000:'场景管理',
				   2000000:"模型管理",
				   3000000:"要素管理",
				   4000000:"放火案件",
				   5000000:"爆炸案件",
				   6000000:"抢盗案件",
				   7000000:"碰撞案件",
			   },
		       1000000:{
				   1001000:{name:"点云数据",controller_name:""},
				   1002000:{name:"模型数据",controller_name:""},
				   1003000:{name:"影像数据",controller_name:""},
				   1004000:{name:"模型素材",controller_name:""},
				   1005000:{name:"参考信息",controller_name:""},
				   1006000:{name:"轨迹信息",controller_name:""},
			   },
			   2000000:{
				   2001000:{name:"案例素材",controller_name:""},
				   2002000:{name:"移动轨迹",controller_name:""},
				   2003000:{name:"案件关联",controller_name:""},
				   2004000:{name:"要素关联",controller_name:""},
				   2005000:{name:"时间关联",controller_name:""},
				   2006000:{name:"场景关联",controller_name:""},
				   2007000:{name:"位置关联",controller_name:""},
				  
			   },
			   3000000:{
				   3001000:{name:"查询信息",controller_name:"MatInqQueryController"},
				   3002000:{name:"提取信息",controller_name:"MatAbsQueryController"},
				   3003000:{name:"物证信息",controller_name:"MatEviQueryController"},
				   3004000:{name:"指纹信息",controller_name:"MatFingQueryController"},
				   3005000:{name:"足迹信息",controller_name:"MatFootQueryController"},
				   3006000:{name:"DNA信息",controller_name:"MatDnaQueryController"},
			   },
			   4000000:{
				   4001000:{name:"燃烧源信息",controller_name:"BurnSourQueryController"},
				   4002000:{name:"燃质信息",controller_name:"BurnFuelQueryController"},
				   4003000:{name:"主体信息",controller_name:"BurnSubQueryController"},
				   4004000:{name:"扩散信息",controller_name:"BurnDiffQueryController"},
				   4005000:{name:"燃烧结果",controller_name:"BurnResQueryController"},
				  
			   },
			   5000000:{
				   5001000:{name:"炸药信息",controller_name:"ExpDynQueryController"},
				   5002000:{name:"爆炸源信息",controller_name:"ExpSourQueryController"},
				   5003000:{name:"主体信息",controller_name:"ExpSubQueryController"},
				   5004000:{name:"碎片信息",controller_name:"ExpFragQueryController"},
			   },
			   6000000:{
				   6001000:{name:"被害人信息",controller_name:"KillVicQueryController"},
				   6002000:{name:"施罪主体",controller_name:"KillCriQueryController"},
				   6003000:{name:"凶器信息",controller_name:"KillWeaQueryController"},
				   6004000:{name:"环境要素",controller_name:"KillEnvQueryController"},
			   },
			   7000000:{
				   7001000:{name:"碰撞主体",controller_name:"CollSubQueryController"},
				   7002000:{name:"碰撞客体",controller_name:"CollObjQueryController"},
				   7003000:{name:"碎片信息",controller_name:"CollFragQueryController"},
				   7004000:{name:"环境要素",controller_name:"CollEnvQueryController"},
			   },
};
   jQuery(document).ready(function($){
	   var main_type=element_type_picker[0000000];
	   $("#main_type").append("<option selected='selected' disabled='disabled'  style='display: none' value=''>请选择要素大类</option> ");
	   for(var json in main_type){
           $("#main_type").append('<option value='+json+' >'+main_type[json]+'</option>');
       	}
   });
  function main_type_onchange(){
	     $("#sub_type").empty();
	     var main_type_val=document.getElementById("main_type").value; 
	     var sub_type=element_type_picker[main_type_val];
	     $("#sub_type").append("<option selected='selected' disabled='disabled'  style='display: none' value=''>请选择要素子类</option> ");
	     for(var json in sub_type){
	           $("#sub_type").append('<option value='+json+' >'+sub_type[json].name+'</option>');
	     }
   }
  function sub_type_onchange(){
	     var main_type_val=document.getElementById("main_type").value; 
	     var sub_type_val=document.getElementById("sub_type").value; 
	     document.getElementById("t_id").value=sub_type_val;
	     var controller_name=element_type_picker[main_type_val][sub_type_val].controller_name;
	     document.getElementById("controller_name").value=controller_name;
}