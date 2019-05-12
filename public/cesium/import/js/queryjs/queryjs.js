
var jq = jQuery.noConflict();

function dataURLtoBlob(dataurl) { 
	var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1], 
	      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
	while(n--){ 
		u8arr[n] = bstr.charCodeAt(n);
		} 
	return new Blob([u8arr], {type:mime}); 
}

function compress() { 
	var canvas, ctx, img64,myimage;
     canvas=document.getElementById('myCanvas');
	 myimage = document.getElementById('image');
     var scale=myimage.height/myimage.width;
     console.log("图片高度："+myimage.height+"   图片宽度："+myimage.width)
	canvas.width =2000; 
	canvas.height =parseInt(canvas.width * scale);
	ctx = canvas.getContext("2d"); 
	ctx.drawImage(myimage, 0, 0, 70,70); 
	ctx.beginPath();
	ctx.arc(100,100,40,0,2*Math.PI);
	img64 = canvas.toDataURL("image/jpeg", 0.3); 
	return img64; // 压缩后的base64串 }
}

function new_connection() {
	console.log("添加新关联  ");
	var case_id= jq('#c_id').val();
	var type_id = jq('#t_id').val();
	var element_id= jq('#e_id').val();
	console.log("case_id: "+case_id+"element_id: "+element_id+"type_id: "+type_id);
	if ( case_id == "" || element_id == "" || type_id == "") {
		alert("请填写完整");
	} else {
		jq.ajax({
						url : '/pro/ConnectionQueryController/InsertConnection?&case_id='+case_id 
								+ '&element_id=' + element_id + '&type_id=' + type_id,
						type : 'POST',
						success : function() {
							alert("新建关联成功");
							window.close();
						},
						error : function() {
							console.log("新建关联失败");
						}
					});
		}
}

function material_inquisition_update() {
	var element_id=  jq('#e_id').val();
	var manager = jq('#e_manager').val();
	var remark = jq('#e_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	var final_image=element_image;
	var localname= jq('#localname').val();
	if ( manager == "" || remark == ""|| element_image == "") {
		alert("请填写完整");
	} else {
		//var blob = dataURLtoBlob(element_image); 
		var fileObj = document.getElementById("e_image").files[0];
		if(fileObj==null){
			console.log("图片文件未变");
			jq.ajax({
				url : '/pro/MatInqQueryController/UpdateElement?element_id=' +element_id
				+  '&manager=' + manager+ '&remark=' + remark +  '&element_image=' + final_image 
				+ '&create_date=' + create_date+  '&localname=' + localname,
				type : 'POST',
				success : function() {
					var button_name=window.opener.document.getElementById("button_name").value;
					window.opener.document.getElementById(button_name).click();  
					alert("更新成功");
					window.close();
				},
				error : function() {
					console.log("更新失败");
				}
	         });
		}else{
			     console.log("图片文件更改");
				var image_length=fileObj.size;
				var fd = new FormData(); 
				fd.append("file", fileObj);
				fd.append("image_length", image_length);
				fd.append("localname", localname);
				var xhr = new XMLHttpRequest(); 
				xhr.open('POST', '/pro/FtpServerController/UpdateRawImage',true); 
				xhr.send(fd);
				xhr.onload = function(e) {
				    if(xhr.readyState ==4 && xhr.status == 200){
				        var json=JSON.parse(xhr.responseText);
				        localname=json.localname;
				        var compressedBase64=json.compressedBase64;
				        if(json.compressedBase64.length!=0){
				        	final_image=compressedBase64;
				        }
				    	console.log("  压缩图片大小："+final_image.length);
				    	console.log(localname);
						jq.ajax({
										url : '/pro/MatInqQueryController/UpdateElement?element_id=' +element_id
										+  '&manager=' + manager
										+ '&remark=' + remark +  '&element_image=' + final_image 
										+ '&create_date=' + create_date+  '&localname=' + localname,
										type : 'POST',
										success : function() {
											var button_name=window.opener.document.getElementById("button_name").value;
											window.opener.document.getElementById(button_name).click();
											alert("更新成功");
											window.close();
										},
										error : function() {
											console.log("更新失败");
										}
					     });
				     }else{
				    	 alert("xhr状态错误：xhr.readyState = "+xhr.readyState+",xhr.status ="+xhr.status );
				     }
				}
				 xhr.onerror =function(){
					 alert("xhr传输失败");
				 }
		}
	}
}

function material_abstract_update() {
	var element_id=  jq('#e_id').val();
	var manager = jq('#e_manager').val();
	var remark = jq('#e_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	var final_image=element_image;
	var localname= jq('#localname').val();
	if ( manager == "" || remark == ""|| element_image == "") {
		alert("请填写完整");
	} else {
		//var blob = dataURLtoBlob(element_image); 
		var fileObj = document.getElementById("e_image").files[0];
		if(fileObj==null){
			console.log("图片文件未变");
			jq.ajax({
				url : '/pro/MatAbsQueryController/UpdateElement?element_id=' +element_id
				+  '&manager=' + manager+ '&remark=' + remark +  '&element_image=' + final_image 
				+ '&create_date=' + create_date+  '&localname=' + localname,
				type : 'POST',
				success : function() {
					var button_name=window.opener.document.getElementById("button_name").value;
					window.opener.document.getElementById(button_name).click();  
					alert("更新成功");
					window.close();
				},
				error : function() {
					console.log("更新失败");
				}
	         });
		}else{
			     console.log("图片文件更改");
				var image_length=fileObj.size;
				var fd = new FormData(); 
				fd.append("file", fileObj);
				fd.append("image_length", image_length);
				fd.append("localname", localname);
				var xhr = new XMLHttpRequest(); 
				xhr.open('POST', '/pro/FtpServerController/UpdateRawImage',true); 
				xhr.send(fd);
				xhr.onload = function(e) {
				    if(xhr.readyState ==4 && xhr.status == 200){
				        var json=JSON.parse(xhr.responseText);
				        localname=json.localname;
				        var compressedBase64=json.compressedBase64;
				        if(json.compressedBase64.length!=0){
				        	final_image=compressedBase64;
				        }
				    	console.log("  压缩图片大小："+final_image.length);
				    	console.log(localname);
						jq.ajax({
										url : '/pro/MatAbsQueryController/UpdateElement?element_id=' +element_id
										+  '&manager=' + manager
										+ '&remark=' + remark +  '&element_image=' + final_image 
										+ '&create_date=' + create_date+  '&localname=' + localname,
										type : 'POST',
										success : function() {
											var button_name=window.opener.document.getElementById("button_name").value;
											window.opener.document.getElementById(button_name).click();
											alert("更新成功");
											window.close();
										},
										error : function() {
											console.log("更新失败");
										}
					     });
				     }else{
				    	 alert("xhr状态错误：xhr.readyState = "+xhr.readyState+",xhr.status ="+xhr.status );
				     }
				}
				 xhr.onerror =function(){
					 alert("xhr传输失败");
				 }
		}
	}
}

function material_evidence_update() {
	var element_id=  jq('#e_id').val();
	var manager = jq('#e_manager').val();
	var remark = jq('#e_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	var final_image=element_image;
	var localname= jq('#localname').val();
	if ( manager == "" || remark == ""|| element_image == "") {
		alert("请填写完整");
	} else {
		//var blob = dataURLtoBlob(element_image); 
		var fileObj = document.getElementById("e_image").files[0];
		if(fileObj==null){
			console.log("图片文件未变");
			jq.ajax({
				url : '/pro/MatEviQueryController/UpdateElement?element_id=' +element_id
				+  '&manager=' + manager+ '&remark=' + remark +  '&element_image=' + final_image 
				+ '&create_date=' + create_date+  '&localname=' + localname,
				type : 'POST',
				success : function() {
					var button_name=window.opener.document.getElementById("button_name").value;
					window.opener.document.getElementById(button_name).click();  
					alert("更新成功");
					window.close();
				},
				error : function() {
					console.log("更新失败");
				}
	         });
		}else{
			     console.log("图片文件更改");
				var image_length=fileObj.size;
				var fd = new FormData(); 
				fd.append("file", fileObj);
				fd.append("image_length", image_length);
				fd.append("localname", localname);
				var xhr = new XMLHttpRequest(); 
				xhr.open('POST', '/pro/FtpServerController/UpdateRawImage',true); 
				xhr.send(fd);
				xhr.onload = function(e) {
				    if(xhr.readyState ==4 && xhr.status == 200){
				        var json=JSON.parse(xhr.responseText);
				        localname=json.localname;
				        var compressedBase64=json.compressedBase64;
				        if(json.compressedBase64.length!=0){
				        	final_image=compressedBase64;
				        }
				    	console.log("  压缩图片大小："+final_image.length);
				    	console.log(localname);
						jq.ajax({
										url : '/pro/MatEviQueryController/UpdateElement?element_id=' +element_id
										+  '&manager=' + manager
										+ '&remark=' + remark +  '&element_image=' + final_image 
										+ '&create_date=' + create_date+  '&localname=' + localname,
										type : 'POST',
										success : function() {
											var button_name=window.opener.document.getElementById("button_name").value;
											window.opener.document.getElementById(button_name).click();
											alert("更新成功");
											window.close();
										},
										error : function() {
											console.log("更新失败");
										}
					     });
				     }else{
				    	 alert("xhr状态错误：xhr.readyState = "+xhr.readyState+",xhr.status ="+xhr.status );
				     }
				}
				 xhr.onerror =function(){
					 alert("xhr传输失败");
				 }
		}
	}
}

function material_fingerprint_update() {
	var element_id=  jq('#e_id').val();
	var manager = jq('#e_manager').val();
	var remark = jq('#e_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	var final_image=element_image;
	var localname= jq('#localname').val();
	if ( manager == "" || remark == ""|| element_image == "") {
		alert("请填写完整");
	} else {
		//var blob = dataURLtoBlob(element_image); 
		var fileObj = document.getElementById("e_image").files[0];
		if(fileObj==null){
			console.log("图片文件未变");
			jq.ajax({
				url : '/pro/MatFingQueryController/UpdateElement?element_id=' +element_id
				+  '&manager=' + manager+ '&remark=' + remark +  '&element_image=' + final_image 
				+ '&create_date=' + create_date+  '&localname=' + localname,
				type : 'POST',
				success : function() {
					var button_name=window.opener.document.getElementById("button_name").value;
					window.opener.document.getElementById(button_name).click();  
					alert("更新成功");
					window.close();
				},
				error : function() {
					console.log("更新失败");
				}
	         });
		}else{
			     console.log("图片文件更改");
				var image_length=fileObj.size;
				var fd = new FormData(); 
				fd.append("file", fileObj);
				fd.append("image_length", image_length);
				fd.append("localname", localname);
				var xhr = new XMLHttpRequest(); 
				xhr.open('POST', '/pro/FtpServerController/UpdateRawImage',true); 
				xhr.send(fd);
				xhr.onload = function(e) {
				    if(xhr.readyState ==4 && xhr.status == 200){
				        var json=JSON.parse(xhr.responseText);
				        localname=json.localname;
				        var compressedBase64=json.compressedBase64;
				        if(json.compressedBase64.length!=0){
				        	final_image=compressedBase64;
				        }
				    	console.log("  压缩图片大小："+final_image.length);
				    	console.log(localname);
						jq.ajax({
										url : '/pro/MatFingQueryController/UpdateElement?element_id=' +element_id
										+  '&manager=' + manager
										+ '&remark=' + remark +  '&element_image=' + final_image 
										+ '&create_date=' + create_date+  '&localname=' + localname,
										type : 'POST',
										success : function() {
											var button_name=window.opener.document.getElementById("button_name").value;
											window.opener.document.getElementById(button_name).click();
											alert("更新成功");
											window.close();
										},
										error : function() {
											console.log("更新失败");
										}
					     });
				     }else{
				    	 alert("xhr状态错误：xhr.readyState = "+xhr.readyState+",xhr.status ="+xhr.status );
				     }
				}
				 xhr.onerror =function(){
					 alert("xhr传输失败");
				 }
		}
	}
}

function material_footmark_update() {
	var element_id=  jq('#e_id').val();
	var manager = jq('#e_manager').val();
	var remark = jq('#e_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	var final_image=element_image;
	var localname= jq('#localname').val();
	if ( manager == "" || remark == ""|| element_image == "") {
		alert("请填写完整");
	} else {
		//var blob = dataURLtoBlob(element_image); 
		var fileObj = document.getElementById("e_image").files[0];
		if(fileObj==null){
			console.log("图片文件未变");
			jq.ajax({
				url : '/pro/MatFootQueryController/UpdateElement?element_id=' +element_id
				+  '&manager=' + manager+ '&remark=' + remark +  '&element_image=' + final_image 
				+ '&create_date=' + create_date+  '&localname=' + localname,
				type : 'POST',
				success : function() {
					var button_name=window.opener.document.getElementById("button_name").value;
					window.opener.document.getElementById(button_name).click();  
					alert("更新成功");
					window.close();
				},
				error : function() {
					console.log("更新失败");
				}
	         });
		}else{
			     console.log("图片文件更改");
				var image_length=fileObj.size;
				var fd = new FormData(); 
				fd.append("file", fileObj);
				fd.append("image_length", image_length);
				fd.append("localname", localname);
				var xhr = new XMLHttpRequest(); 
				xhr.open('POST', '/pro/FtpServerController/UpdateRawImage',true); 
				xhr.send(fd);
				xhr.onload = function(e) {
				    if(xhr.readyState ==4 && xhr.status == 200){
				        var json=JSON.parse(xhr.responseText);
				        localname=json.localname;
				        var compressedBase64=json.compressedBase64;
				        if(json.compressedBase64.length!=0){
				        	final_image=compressedBase64;
				        }
				    	console.log("  压缩图片大小："+final_image.length);
				    	console.log(localname);
						jq.ajax({
										url : '/pro/MatFootQueryController/UpdateElement?element_id=' +element_id
										+  '&manager=' + manager
										+ '&remark=' + remark +  '&element_image=' + final_image 
										+ '&create_date=' + create_date+  '&localname=' + localname,
										type : 'POST',
										success : function() {
											var button_name=window.opener.document.getElementById("button_name").value;
											window.opener.document.getElementById(button_name).click();
											alert("更新成功");
											window.close();
										},
										error : function() {
											console.log("更新失败");
										}
					     });
				     }else{
				    	 alert("xhr状态错误：xhr.readyState = "+xhr.readyState+",xhr.status ="+xhr.status );
				     }
				}
				 xhr.onerror =function(){
					 alert("xhr传输失败");
				 }
		}
	}
}

function material_dna_update() {
	var element_id=  jq('#e_id').val();
	var manager = jq('#e_manager').val();
	var remark = jq('#e_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	var final_image=element_image;
	var localname= jq('#localname').val();
	if ( manager == "" || remark == ""|| element_image == "") {
		alert("请填写完整");
	} else {
		//var blob = dataURLtoBlob(element_image); 
		var fileObj = document.getElementById("e_image").files[0];
		if(fileObj==null){
			console.log("图片文件未变");
			jq.ajax({
				url : '/pro/MatDnaQueryController/UpdateElement?element_id=' +element_id
				+  '&manager=' + manager+ '&remark=' + remark +  '&element_image=' + final_image 
				+ '&create_date=' + create_date+  '&localname=' + localname,
				type : 'POST',
				success : function() {
					var button_name=window.opener.document.getElementById("button_name").value;
					window.opener.document.getElementById(button_name).click();  
					alert("更新成功");
					window.close();
				},
				error : function() {
					console.log("更新失败");
				}
	         });
		}else{
			     console.log("图片文件更改");
				var image_length=fileObj.size;
				var fd = new FormData(); 
				fd.append("file", fileObj);
				fd.append("image_length", image_length);
				fd.append("localname", localname);
				var xhr = new XMLHttpRequest(); 
				xhr.open('POST', '/pro/FtpServerController/UpdateRawImage',true); 
				xhr.send(fd);
				xhr.onload = function(e) {
				    if(xhr.readyState ==4 && xhr.status == 200){
				        var json=JSON.parse(xhr.responseText);
				        localname=json.localname;
				        var compressedBase64=json.compressedBase64;
				        if(json.compressedBase64.length!=0){
				        	final_image=compressedBase64;
				        }
				    	console.log("  压缩图片大小："+final_image.length);
				    	console.log(localname);
						jq.ajax({
										url : '/pro/MatDnaQueryController/UpdateElement?element_id=' +element_id
										+  '&manager=' + manager
										+ '&remark=' + remark +  '&element_image=' + final_image 
										+ '&create_date=' + create_date+  '&localname=' + localname,
										type : 'POST',
										success : function() {
											var button_name=window.opener.document.getElementById("button_name").value;
											window.opener.document.getElementById(button_name).click();
											alert("更新成功");
											window.close();
										},
										error : function() {
											console.log("更新失败");
										}
					     });
				     }else{
				    	 alert("xhr状态错误：xhr.readyState = "+xhr.readyState+",xhr.status ="+xhr.status );
				     }
				}
				 xhr.onerror =function(){
					 alert("xhr传输失败");
				 }
		}
	}
}

function burn_source_update() {
	var element_id = jq('#e_id').val();
	var manager = jq('#e_manager').val();
	var remark = jq('#e_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	var localname= jq('#localname').val();
	if (manager == "" || remark == "") {
		alert("请填写完整");
	} else {
			//var blob = dataURLtoBlob(element_image); 
			var fileObj = document.getElementById("e_model").files[0]; 
			var fd = new FormData(); 
			fd.append("file", fileObj);
			fd.append("element_id", element_id );
			fd.append("manager", manager );
			fd.append("remark", remark);
			fd.append("element_image", element_image);
			fd.append("create_date", create_date);
			fd.append("localname", localname);
			var xhr = new XMLHttpRequest(); 
			xhr.open('POST', '/pro/BurnSourQueryController/UpdateElement',true); 
			xhr.send(fd);
			xhr.onload = function(e) {
				    if(xhr.readyState ==4 && xhr.status == 200){
						alert("更新成功");
						window.close();
				    }
					else {
						console.log("更新失败");
					}
		     }
	}
}

function burn_diffusion_update() {
	var element_id = jq('#e_id').val();
	var manager = jq('#e_manager').val();
	var remark = jq('#e_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	var localname= jq('#localname').val();
	if (manager == "" || remark == "") {
		alert("请填写完整");
	} else {
			//var blob = dataURLtoBlob(element_image); 
			var fileObj = document.getElementById("e_model").files[0]; 
			var fd = new FormData(); 
			fd.append("file", fileObj);
			fd.append("element_id", element_id );
			fd.append("manager", manager );
			fd.append("remark", remark);
			fd.append("element_image", element_image);
			fd.append("create_date", create_date);
			fd.append("localname", localname);
			var xhr = new XMLHttpRequest(); 
			xhr.open('POST', '/pro/BurnDiffQueryController/UpdateElement',true); 
			xhr.send(fd);
			xhr.onload = function(e) {
				    if(xhr.readyState ==4 && xhr.status == 200){
						alert("更新成功");
						window.close();
				    }
					else {
						console.log("更新失败");
					}
		     }
	}
}

function burn_fuel_update() {
	var element_id = jq('#e_id').val();
	var manager = jq('#e_manager').val();
	var remark = jq('#e_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	var localname= jq('#localname').val();
	if (manager == "" || remark == "") {
		alert("请填写完整");
	} else {
			//var blob = dataURLtoBlob(element_image); 
			var fileObj = document.getElementById("e_model").files[0]; 
			var fd = new FormData(); 
			fd.append("file", fileObj);
			fd.append("element_id", element_id );
			fd.append("manager", manager );
			fd.append("remark", remark);
			fd.append("element_image", element_image);
			fd.append("create_date", create_date);
			fd.append("localname", localname);
			var xhr = new XMLHttpRequest(); 
			xhr.open('POST', '/pro/BurnFuelQueryController/UpdateElement',true); 
			xhr.send(fd);
			xhr.onload = function(e) {
				    if(xhr.readyState ==4 && xhr.status == 200){
						alert("更新成功");
						window.close();
				    }
					else {
						console.log("更新失败");
					}
		     }
	}
}

function burn_result_update() {
	var element_id = jq('#e_id').val();
	var manager = jq('#e_manager').val();
	var remark = jq('#e_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	var localname= jq('#localname').val();
	if (manager == "" || remark == "") {
		alert("请填写完整");
	} else {
			//var blob = dataURLtoBlob(element_image); 
			var fileObj = document.getElementById("e_model").files[0]; 
			var fd = new FormData(); 
			fd.append("file", fileObj);
			fd.append("element_id", element_id );
			fd.append("manager", manager );
			fd.append("remark", remark);
			fd.append("element_image", element_image);
			fd.append("create_date", create_date);
			fd.append("localname", localname);
			var xhr = new XMLHttpRequest(); 
			xhr.open('POST', '/pro/BurnResQueryController/UpdateElement',true); 
			xhr.send(fd);
			xhr.onload = function(e) {
				    if(xhr.readyState ==4 && xhr.status == 200){
						alert("更新成功");
						window.close();
				    }
					else {
						console.log("更新失败");
					}
		     }
	}
}

function burn_subject_update() {
	var element_id = jq('#e_id').val();
	var manager = jq('#e_manager').val();
	var remark = jq('#e_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	var localname= jq('#localname').val();
	if (manager == "" || remark == "") {
		alert("请填写完整");
	} else {
			//var blob = dataURLtoBlob(element_image); 
			var fileObj = document.getElementById("e_model").files[0]; 
			var fd = new FormData(); 
			fd.append("file", fileObj);
			fd.append("element_id", element_id );
			fd.append("manager", manager );
			fd.append("remark", remark);
			fd.append("element_image", element_image);
			fd.append("create_date", create_date);
			fd.append("localname", localname);
			var xhr = new XMLHttpRequest(); 
			xhr.open('POST', '/pro/BurnSubQueryController/UpdateElement',true); 
			xhr.send(fd);
			xhr.onload = function(e) {
				    if(xhr.readyState ==4 && xhr.status == 200){
						alert("更新成功");
						window.close();
				    }
					else {
						console.log("更新失败");
					}
		     }
	}
}

function collision_environment_update() {
	var element_id = jq('#e_id').val();
	var manager = jq('#e_manager').val();
	var remark = jq('#e_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	var localname= jq('#localname').val();
	if (manager == "" || remark == "") {
		alert("请填写完整");
	} else {
			//var blob = dataURLtoBlob(element_image); 
			var fileObj = document.getElementById("e_model").files[0]; 
			var fd = new FormData(); 
			fd.append("file", fileObj);
			fd.append("element_id", element_id );
			fd.append("manager", manager );
			fd.append("remark", remark);
			fd.append("element_image", element_image);
			fd.append("create_date", create_date);
			fd.append("localname", localname);
			var xhr = new XMLHttpRequest(); 
			xhr.open('POST', '/pro/CollEnvQueryController/UpdateElement',true); 
			xhr.send(fd);
			xhr.onload = function(e) {
				    if(xhr.readyState ==4 && xhr.status == 200){
						alert("更新成功");
						window.close();
				    }
					else {
						console.log("更新失败");
					}
		     }
	}
}

function collision_fragment_update() {
	var element_id = jq('#e_id').val();
	var manager = jq('#e_manager').val();
	var remark = jq('#e_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	var localname= jq('#localname').val();
	if (manager == "" || remark == "") {
		alert("请填写完整");
	} else {
			//var blob = dataURLtoBlob(element_image); 
			var fileObj = document.getElementById("e_model").files[0]; 
			var fd = new FormData(); 
			fd.append("file", fileObj);
			fd.append("element_id", element_id );
			fd.append("manager", manager );
			fd.append("remark", remark);
			fd.append("element_image", element_image);
			fd.append("create_date", create_date);
			fd.append("localname", localname);
			var xhr = new XMLHttpRequest(); 
			xhr.open('POST', '/pro/CollFragQueryController/UpdateElement',true); 
			xhr.send(fd);
			xhr.onload = function(e) {
				    if(xhr.readyState ==4 && xhr.status == 200){
						alert("更新成功");
						window.close();
				    }
					else {
						console.log("更新失败");
					}
		     }
	}
}

function collision_object_update() {
	var element_id = jq('#e_id').val();
	var manager = jq('#e_manager').val();
	var remark = jq('#e_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	var localname= jq('#localname').val();
	if (manager == "" || remark == "") {
		alert("请填写完整");
	} else {
			//var blob = dataURLtoBlob(element_image); 
			var fileObj = document.getElementById("e_model").files[0]; 
			var fd = new FormData(); 
			fd.append("file", fileObj);
			fd.append("element_id", element_id );
			fd.append("manager", manager );
			fd.append("remark", remark);
			fd.append("element_image", element_image);
			fd.append("create_date", create_date);
			fd.append("localname", localname);
			var xhr = new XMLHttpRequest(); 
			xhr.open('POST', '/pro/CollObjQueryController/UpdateElement',true); 
			xhr.send(fd);
			xhr.onload = function(e) {
				    if(xhr.readyState ==4 && xhr.status == 200){
						alert("更新成功");
						window.close();
				    }
					else {
						console.log("更新失败");
					}
		     }
	}
}

function collision_subject_update() {
	var element_id = jq('#e_id').val();
	var manager = jq('#e_manager').val();
	var remark = jq('#e_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	var localname= jq('#localname').val();
	if (manager == "" || remark == "") {
		alert("请填写完整");
	} else {
			//var blob = dataURLtoBlob(element_image); 
			var fileObj = document.getElementById("e_model").files[0]; 
			var fd = new FormData(); 
			fd.append("file", fileObj);
			fd.append("element_id", element_id );
			fd.append("manager", manager );
			fd.append("remark", remark);
			fd.append("element_image", element_image);
			fd.append("create_date", create_date);
			fd.append("localname", localname);
			var xhr = new XMLHttpRequest(); 
			xhr.open('POST', '/pro/CollSubQueryController/UpdateElement',true); 
			xhr.send(fd);
			xhr.onload = function(e) {
				    if(xhr.readyState ==4 && xhr.status == 200){
						alert("更新成功");
						window.close();
				    }
					else {
						console.log("更新失败");
					}
		     }
	}
}

function explosion_dynamite_update() {
	var element_id = jq('#e_id').val();
	var manager = jq('#e_manager').val();
	var remark = jq('#e_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	var localname= jq('#localname').val();
	if (manager == "" || remark == "") {
		alert("请填写完整");
	} else {
			//var blob = dataURLtoBlob(element_image); 
			var fileObj = document.getElementById("e_model").files[0]; 
			var fd = new FormData(); 
			fd.append("file", fileObj);
			fd.append("element_id", element_id );
			fd.append("manager", manager );
			fd.append("remark", remark);
			fd.append("element_image", element_image);
			fd.append("create_date", create_date);
			fd.append("localname", localname);
			var xhr = new XMLHttpRequest(); 
			xhr.open('POST', '/pro/ExpDynQueryController/UpdateElement',true); 
			xhr.send(fd);
			xhr.onload = function(e) {
				    if(xhr.readyState ==4 && xhr.status == 200){
						alert("更新成功");
						window.close();
				    }
					else {
						console.log("更新失败");
					}
		     }
	}
}

function explosion_fragment_update() {
	var element_id = jq('#e_id').val();
	var manager = jq('#e_manager').val();
	var remark = jq('#e_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	var localname= jq('#localname').val();
	if (manager == "" || remark == "") {
		alert("请填写完整");
	} else {
			//var blob = dataURLtoBlob(element_image); 
			var fileObj = document.getElementById("e_model").files[0]; 
			var fd = new FormData(); 
			fd.append("file", fileObj);
			fd.append("element_id", element_id );
			fd.append("manager", manager );
			fd.append("remark", remark);
			fd.append("element_image", element_image);
			fd.append("create_date", create_date);
			fd.append("localname", localname);
			var xhr = new XMLHttpRequest(); 
			xhr.open('POST', '/pro/ExpFragQueryController/UpdateElement',true); 
			xhr.send(fd);
			xhr.onload = function(e) {
				    if(xhr.readyState ==4 && xhr.status == 200){
						alert("更新成功");
						window.close();
				    }
					else {
						console.log("更新失败");
					}
		     }
	}
}

function explosion_source_update() {
	var element_id = jq('#e_id').val();
	var manager = jq('#e_manager').val();
	var remark = jq('#e_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	var localname= jq('#localname').val();
	if (manager == "" || remark == "") {
		alert("请填写完整");
	} else {
			//var blob = dataURLtoBlob(element_image); 
			var fileObj = document.getElementById("e_model").files[0]; 
			var fd = new FormData(); 
			fd.append("file", fileObj);
			fd.append("element_id", element_id );
			fd.append("manager", manager );
			fd.append("remark", remark);
			fd.append("element_image", element_image);
			fd.append("create_date", create_date);
			fd.append("localname", localname);
			var xhr = new XMLHttpRequest(); 
			xhr.open('POST', '/pro/ExpSourQueryController/UpdateElement',true); 
			xhr.send(fd);
			xhr.onload = function(e) {
				    if(xhr.readyState ==4 && xhr.status == 200){
						alert("更新成功");
						window.close();
				    }
					else {
						console.log("更新失败");
					}
		     }
	}
}

function explosion_subject_update() {
	var element_id = jq('#e_id').val();
	var manager = jq('#e_manager').val();
	var remark = jq('#e_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	var localname= jq('#localname').val();
	if (manager == "" || remark == "") {
		alert("请填写完整");
	} else {
			//var blob = dataURLtoBlob(element_image); 
			var fileObj = document.getElementById("e_model").files[0]; 
			var fd = new FormData(); 
			fd.append("file", fileObj);
			fd.append("element_id", element_id );
			fd.append("manager", manager );
			fd.append("remark", remark);
			fd.append("element_image", element_image);
			fd.append("create_date", create_date);
			fd.append("localname", localname);
			var xhr = new XMLHttpRequest(); 
			xhr.open('POST', '/pro/ExpSubQueryController/UpdateElement',true); 
			xhr.send(fd);
			xhr.onload = function(e) {
				    if(xhr.readyState ==4 && xhr.status == 200){
						alert("更新成功");
						window.close();
				    }
					else {
						console.log("更新失败");
					}
		     }
	}
}

function kill_criminal_update() {
	var element_id = jq('#e_id').val();
	var manager = jq('#e_manager').val();
	var remark = jq('#e_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	var localname= jq('#localname').val();
	if (manager == "" || remark == "") {
		alert("请填写完整");
	} else {
			//var blob = dataURLtoBlob(element_image); 
			var fileObj = document.getElementById("e_model").files[0]; 
			var fd = new FormData(); 
			fd.append("file", fileObj);
			fd.append("element_id", element_id );
			fd.append("manager", manager );
			fd.append("remark", remark);
			fd.append("element_image", element_image);
			fd.append("create_date", create_date);
			fd.append("localname", localname);
			var xhr = new XMLHttpRequest(); 
			xhr.open('POST', '/pro/KillCriQueryController/UpdateElement',true); 
			xhr.send(fd);
			xhr.onload = function(e) {
				    if(xhr.readyState ==4 && xhr.status == 200){
						alert("更新成功");
						window.close();
				    }
					else {
						console.log("更新失败");
					}
		     }
	}
}

function kill_environment_update() {
	var element_id = jq('#e_id').val();
	var manager = jq('#e_manager').val();
	var remark = jq('#e_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	var localname= jq('#localname').val();
	if (manager == "" || remark == "") {
		alert("请填写完整");
	} else {
			//var blob = dataURLtoBlob(element_image); 
			var fileObj = document.getElementById("e_model").files[0]; 
			var fd = new FormData(); 
			fd.append("file", fileObj);
			fd.append("element_id", element_id );
			fd.append("manager", manager );
			fd.append("remark", remark);
			fd.append("element_image", element_image);
			fd.append("create_date", create_date);
			fd.append("localname", localname);
			var xhr = new XMLHttpRequest(); 
			xhr.open('POST', '/pro/KillEnvQueryController/UpdateElement',true); 
			xhr.send(fd);
			xhr.onload = function(e) {
				    if(xhr.readyState ==4 && xhr.status == 200){
						alert("更新成功");
						window.close();
				    }
					else {
						console.log("更新失败");
					}
		     }
	}
}

function kill_victem_update() {
	var element_id = jq('#e_id').val();
	var manager = jq('#e_manager').val();
	var remark = jq('#e_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	var localname= jq('#localname').val();
	if (manager == "" || remark == "") {
		alert("请填写完整");
	} else {
			//var blob = dataURLtoBlob(element_image); 
			var fileObj = document.getElementById("e_model").files[0]; 
			var fd = new FormData(); 
			fd.append("file", fileObj);
			fd.append("element_id", element_id );
			fd.append("manager", manager );
			fd.append("remark", remark);
			fd.append("element_image", element_image);
			fd.append("create_date", create_date);
			fd.append("localname", localname);
			var xhr = new XMLHttpRequest(); 
			xhr.open('POST', '/pro/KillVicQueryController/UpdateElement',true); 
			xhr.send(fd);
			xhr.onload = function(e) {
				    if(xhr.readyState ==4 && xhr.status == 200){
						alert("更新成功");
						window.close();
				    }
					else {
						console.log("更新失败");
					}
		     }
	}
}

function kill_weapon_update() {
	var element_id = jq('#e_id').val();
	var manager = jq('#e_manager').val();
	var remark = jq('#e_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	var localname= jq('#localname').val();
	if (manager == "" || remark == "") {
		alert("请填写完整");
	} else {
			//var blob = dataURLtoBlob(element_image); 
			var fileObj = document.getElementById("e_model").files[0]; 
			var fd = new FormData(); 
			fd.append("file", fileObj);
			fd.append("element_id", element_id );
			fd.append("manager", manager );
			fd.append("remark", remark);
			fd.append("element_image", element_image);
			fd.append("create_date", create_date);
			fd.append("localname", localname);
			var xhr = new XMLHttpRequest(); 
			xhr.open('POST', '/pro/KillWeaQueryController/UpdateElement',true); 
			xhr.send(fd);
			xhr.onload = function(e) {
				    if(xhr.readyState ==4 && xhr.status == 200){
						alert("更新成功");
						window.close();
				    }
					else {
						console.log("更新失败");
					}
		     }
	}
}

function material_inquisition_luru() {
	var ca = document.cookie.split('case_id');
	var case_id=ca[1].substring(0,ca[1].indexOf(";"));
	var manager = jq('#c_manager').val();
	var remark = jq('#c_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	var final_image=element_image;
	console.log(" 原图大小："+element_image.length);
	if (manager == "" || remark == "") {
		alert("请填写完整");
	} else {
						//var blob = dataURLtoBlob(element_image); 
						var fileObj = document.getElementById("c_image").files[0]; 
						//var objcetURL = window.URL.createObjectURL(fileObj);
						var image_length=fileObj.size;
						var fd = new FormData(); 
						fd.append("file", fileObj);
						//fd.append("objcetURL", objcetURL);
						fd.append("image_length", image_length);
						
						var xhr = new XMLHttpRequest(); 
						xhr.open('POST', '/pro/FtpServerController/StoreRawImage',true); 
						xhr.send(fd);
						xhr.onload = function(e) {
						    if(xhr.readyState ==4 && xhr.status == 200){
						        var json=JSON.parse(xhr.responseText);
						        var localname=json.localname;
						        var compressedBase64=json.compressedBase64;
						        if(json.compressedBase64.length!=0){
						        	final_image=compressedBase64;
						        }
						    	console.log("  压缩图片大小："+final_image.length);
						    	console.log(localname);
								jq.ajax({
												url : '/pro/MatInqQueryController/InsertElement?case_id=' +case_id
												+ '&manager=' + manager
												+ '&remark=' + remark +  '&element_image=' + final_image 
												+ '&create_date=' + create_date+  '&localname=' + localname,
												type : 'POST',
												success : function() {
													alert("录入成功");
													window.close();
												},
												error : function() {
													console.log("录入失败");
												}
							     });
						     }else{
						    	 alert("xhr状态错误：xhr.readyState = "+xhr.readyState+",xhr.status ="+xhr.status );
						     }
						}
						 xhr.onerror =function(){
							 alert("xhr传输失败");
						 }
		}
}

function material_abstract_luru() {
	var ca = document.cookie.split('case_id');
	var case_id=ca[1].substring(0,ca[1].indexOf(";"));	
	var manager = jq('#c_manager').val();
	var remark = jq('#c_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	var final_image=element_image;
	console.log(" 原图大小："+element_image.length);
	if (manager == "" || remark == "") {
		alert("请填写完整");
	} else {
						//var blob = dataURLtoBlob(element_image); 
						var fileObj = document.getElementById("c_image").files[0]; 
						//var objcetURL = window.URL.createObjectURL(fileObj);
						var image_length=fileObj.size;
						var fd = new FormData(); 
						fd.append("file", fileObj);
						//fd.append("objcetURL", objcetURL);
						fd.append("image_length", image_length);
						
						var xhr = new XMLHttpRequest(); 
						xhr.open('POST', '/pro/FtpServerController/StoreRawImage',true); 
						xhr.send(fd);
						xhr.onload = function(e) { 
						    if(xhr.readyState ==4 && xhr.status == 200){
						        var json=JSON.parse(xhr.responseText);
						        var localname=json.localname;
						        var compressedBase64=json.compressedBase64;
						        if(json.compressedBase64.length!=0){
						        	final_image=compressedBase64;
						        }
						    	console.log("  压缩图片大小："+final_image.length);
						    	console.log(localname);
								jq.ajax({
												url : '/pro/MatAbsQueryController/InsertElement?case_id=' +case_id
												+ '&manager=' + manager
												+ '&remark=' + remark +  '&element_image=' + final_image 
												+ '&create_date=' + create_date+  '&localname=' + localname,
												type : 'POST',
												success : function() {
													alert("录入成功");
													window.close();
												},
												error : function() {
													console.log("录入失败");
												}
							     });
						     }else{
						    	 alert("xhr状态错误：xhr.readyState = "+xhr.readyState+",xhr.status ="+xhr.status );
						     }
						}
						 xhr.onerror =function(){
							 alert("xhr传输失败");
						 }
		}
}

function material_evidence_luru() {
	var ca = document.cookie.split('case_id');
	var case_id=ca[1].substring(0,ca[1].indexOf(";"));
	var manager = jq('#c_manager').val();
	var remark = jq('#c_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	var final_image=element_image;
	console.log(" 原图大小："+element_image.length);
	if (manager == "" || remark == "") {
		alert("请填写完整");
	} else {
						//var blob = dataURLtoBlob(element_image); 
						var fileObj = document.getElementById("c_image").files[0]; 
						//var objcetURL = window.URL.createObjectURL(fileObj);
						var image_length=fileObj.size;
						var fd = new FormData(); 
						fd.append("file", fileObj);
						//fd.append("objcetURL", objcetURL);
						fd.append("image_length", image_length);
						
						var xhr = new XMLHttpRequest(); 
						xhr.open('POST', '/pro/FtpServerController/StoreRawImage',true); 
						xhr.send(fd);
						xhr.onload = function(e) { 
						    if(xhr.readyState ==4 && xhr.status == 200){
						        var json=JSON.parse(xhr.responseText);
						        var localname=json.localname;
						        var compressedBase64=json.compressedBase64;
						        if(json.compressedBase64.length!=0){
						        	final_image=compressedBase64;
						        }
						    	console.log("  压缩图片大小："+final_image.length);
						    	console.log(localname);
								jq.ajax({
												url : '/pro/MatEviQueryController/InsertElement?case_id=' +case_id
												+ '&manager=' + manager
												+ '&remark=' + remark +  '&element_image=' + final_image 
												+ '&create_date=' + create_date+  '&localname=' + localname,
												type : 'POST',
												success : function() {
													alert("录入成功");
													window.close();
												},
												error : function() {
													console.log("录入失败");
												}
							     });
						     }else{
						    	 alert("xhr状态错误：xhr.readyState = "+xhr.readyState+",xhr.status ="+xhr.status );
						     }
						}
						 xhr.onerror =function(){
							 alert("xhr传输失败");
						 }
		}
}

function material_fingerprint_luru() {
	var ca = document.cookie.split('case_id');
	var case_id=ca[1].substring(0,ca[1].indexOf(";"));
	var manager = jq('#c_manager').val();
	var remark = jq('#c_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	var final_image=element_image;
	console.log(" 原图大小："+element_image.length);
	if (manager == "" || remark == "") {
		alert("请填写完整");
	} else {
						//var blob = dataURLtoBlob(element_image); 
						var fileObj = document.getElementById("c_image").files[0]; 
						//var objcetURL = window.URL.createObjectURL(fileObj);
						var image_length=fileObj.size;
						var fd = new FormData(); 
						fd.append("file", fileObj);
						//fd.append("objcetURL", objcetURL);
						fd.append("image_length", image_length);
						
						var xhr = new XMLHttpRequest(); 
						xhr.open('POST', '/pro/FtpServerController/StoreRawImage',true); 
						xhr.send(fd);
						xhr.onload = function(e) { 
						    if(xhr.readyState ==4 && xhr.status == 200){
						        var json=JSON.parse(xhr.responseText);
						        var localname=json.localname;
						        var compressedBase64=json.compressedBase64;
						        if(json.compressedBase64.length!=0){
						        	final_image=compressedBase64;
						        }
						    	console.log("  压缩图片大小："+final_image.length);
						    	console.log(localname);
								jq.ajax({
												url : '/pro/MatFingQueryController/InsertElement?case_id=' +case_id
												+  '&manager=' + manager
												+ '&remark=' + remark +  '&element_image=' + final_image 
												+ '&create_date=' + create_date+  '&localname=' + localname,
												type : 'POST',
												success : function() {
													alert("录入成功");
													window.close();
												},
												error : function() {
													console.log("录入失败");
												}
							     });
						     }else{
						    	 alert("xhr状态错误：xhr.readyState = "+xhr.readyState+",xhr.status ="+xhr.status );
						     }
						}
						 xhr.onerror =function(){
							 alert("xhr传输失败");
						 }
		}
}

function material_footmark_luru() {
	var ca = document.cookie.split('case_id');
	var case_id=ca[1].substring(0,ca[1].indexOf(";"));
	var manager = jq('#c_manager').val();
	var remark = jq('#c_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	var final_image=element_image;
	console.log(" 原图大小："+element_image.length);
	if (manager == "" || remark == "") {
		alert("请填写完整");
	} else {
						//var blob = dataURLtoBlob(element_image); 
						var fileObj = document.getElementById("c_image").files[0]; 
						//var objcetURL = window.URL.createObjectURL(fileObj);
						var image_length=fileObj.size;
						var fd = new FormData(); 
						fd.append("file", fileObj);
						//fd.append("objcetURL", objcetURL);
						fd.append("image_length", image_length);
						
						var xhr = new XMLHttpRequest(); 
						xhr.open('POST', '/pro/FtpServerController/StoreRawImage',true); 
						xhr.send(fd);
						xhr.onload = function(e) { 
						    if(xhr.readyState ==4 && xhr.status == 200){
						        var json=JSON.parse(xhr.responseText);
						        var localname=json.localname;
						        var compressedBase64=json.compressedBase64;
						        if(json.compressedBase64.length!=0){
						        	final_image=compressedBase64;
						        }
						    	console.log("  压缩图片大小："+final_image.length);
						    	console.log(localname);
								jq.ajax({
												url : '/pro/MatFootQueryController/InsertElement?case_id=' +case_id
												+'&manager=' + manager
												+ '&remark=' + remark +  '&element_image=' + final_image 
												+ '&create_date=' + create_date+  '&localname=' + localname,
												type : 'POST',
												success : function() {
													alert("录入成功");
													window.close();
												},
												error : function() {
													console.log("录入失败");
												}
							     });
						     }else{
						    	 alert("xhr状态错误：xhr.readyState = "+xhr.readyState+",xhr.status ="+xhr.status );
						     }
						}
						 xhr.onerror =function(){
							 alert("xhr传输失败");
						 }
		}
}


function material_dna_luru() {
	var ca = document.cookie.split('case_id');
	var case_id=ca[1].substring(0,ca[1].indexOf(";"));
	var manager = jq('#c_manager').val();
	var remark = jq('#c_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	var final_image=element_image;
	console.log(" 原图大小："+element_image.length);
	if (manager == "" || remark == "") {
		alert("请填写完整");
	} else {
						//var blob = dataURLtoBlob(element_image); 
						var fileObj = document.getElementById("c_image").files[0]; 
						//var objcetURL = window.URL.createObjectURL(fileObj);
						var image_length=fileObj.size;
						var fd = new FormData(); 
						fd.append("file", fileObj);
						//fd.append("objcetURL", objcetURL);
						fd.append("image_length", image_length);
						
						var xhr = new XMLHttpRequest(); 
						xhr.open('POST', '/pro/FtpServerController/StoreRawImage',true); 
						xhr.send(fd);
						xhr.onload = function(e) { 
						    if(xhr.readyState ==4 && xhr.status == 200){
						        var json=JSON.parse(xhr.responseText);
						        var localname=json.localname;
						        var compressedBase64=json.compressedBase64;
						        if(json.compressedBase64.length!=0){
						        	final_image=compressedBase64;
						        }
						    	console.log("  压缩图片大小："+final_image.length);
						    	console.log(localname);
								jq.ajax({
												url : '/pro/MatDnaQueryController/InsertElement?case_id=' +case_id
												+ '&manager=' + manager
												+ '&remark=' + remark +  '&element_image=' + final_image 
												+ '&create_date=' + create_date+  '&localname=' + localname,
												type : 'POST',
												success : function() {
													alert("录入成功");
													window.close();
												},
												error : function() {
													console.log("录入失败");
												}
							     });
						     }else{
						    	 alert("xhr状态错误：xhr.readyState = "+xhr.readyState+",xhr.status ="+xhr.status );
						     }
						}
						 xhr.onerror =function(){
							 alert("xhr传输失败");
						 }
		}
}

function burn_source_luru() {
	var ca = document.cookie.split('case_id');
	var case_id=ca[1].substring(0,ca[1].indexOf(";"));
	var manager = jq('#e_manager').val();
	var remark = jq('#e_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	console.log(" 原图大小："+element_image.length);
	if (manager == "" || remark == "") {
		alert("请填写完整");
	} else {
			//var blob = dataURLtoBlob(element_image); 
			var fileObj = document.getElementById("e_model").files[0]; 
			var fd = new FormData(); 
			fd.append("file", fileObj);
			fd.append("case_id", case_id );
			fd.append("manager", manager );
			fd.append("remark", remark);
			fd.append("element_image", element_image);
			fd.append("create_date", create_date);
			var xhr = new XMLHttpRequest(); 
			xhr.open('POST', '/pro/BurnSourQueryController/InsertElement',true); 
			xhr.send(fd);
			xhr.onload = function(e) {
				    if(xhr.readyState ==4 && xhr.status == 200){
						alert("录入成功");
						window.close();
				    }
					else {
						console.log("录入失败");
					}
		     }
	}
}

function burn_fuel_luru() {
	var ca = document.cookie.split('case_id');
	var case_id=ca[1].substring(0,ca[1].indexOf(";"));
	var manager = jq('#e_manager').val();
	var remark = jq('#e_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	console.log(" 原图大小："+element_image.length);
	if (manager == "" || remark == "") {
		alert("请填写完整");
	} else {
			//var blob = dataURLtoBlob(element_image); 
			var fileObj = document.getElementById("e_model").files[0]; 
			var fd = new FormData(); 
			fd.append("file", fileObj);
			fd.append("case_id", case_id );
			fd.append("manager", manager );
			fd.append("remark", remark);
			fd.append("element_image", element_image);
			fd.append("create_date", create_date);
			var xhr = new XMLHttpRequest(); 
			xhr.open('POST', '/pro/BurnFuelQueryController/InsertElement',true); 
			xhr.send(fd);
			xhr.onload = function(e) {
				    if(xhr.readyState ==4 && xhr.status == 200){
						alert("录入成功");
						window.close();
				    }
					else {
						console.log("录入失败");
					}
		     }
	}
}

function burn_subject_luru() {
	var ca = document.cookie.split('case_id');
	var case_id=ca[1].substring(0,ca[1].indexOf(";"));
	var manager = jq('#e_manager').val();
	var remark = jq('#e_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	console.log(" 原图大小："+element_image.length);
	if (manager == "" || remark == "") {
		alert("请填写完整");
	} else {
			//var blob = dataURLtoBlob(element_image); 
			var fileObj = document.getElementById("e_model").files[0]; 
			var fd = new FormData(); 
			fd.append("file", fileObj);
			fd.append("case_id", case_id );
			fd.append("manager", manager );
			fd.append("remark", remark);
			fd.append("element_image", element_image);
			fd.append("create_date", create_date);
			var xhr = new XMLHttpRequest(); 
			xhr.open('POST', '/pro/BurnSubQueryController/InsertElement',true); 
			xhr.send(fd);
			xhr.onload = function(e) {
				    if(xhr.readyState ==4 && xhr.status == 200){
						alert("录入成功");
						window.close();
				    }
					else {
						console.log("录入失败");
					}
		     }
	}
}

function burn_diffusion_luru() {
	var ca = document.cookie.split('case_id');
	var case_id=ca[1].substring(0,ca[1].indexOf(";"));
	var manager = jq('#e_manager').val();
	var remark = jq('#e_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	console.log(" 原图大小："+element_image.length);
	if (manager == "" || remark == "") {
		alert("请填写完整");
	} else {
			//var blob = dataURLtoBlob(element_image); 
			var fileObj = document.getElementById("e_model").files[0]; 
			var fd = new FormData(); 
			fd.append("file", fileObj);
			fd.append("case_id", case_id );
			fd.append("manager", manager );
			fd.append("remark", remark);
			fd.append("element_image", element_image);
			fd.append("create_date", create_date);
			var xhr = new XMLHttpRequest(); 
			xhr.open('POST', '/pro/BurnDiffQueryController/InsertElement',true); 
			xhr.send(fd);
			xhr.onload = function(e) {
				    if(xhr.readyState ==4 && xhr.status == 200){
						alert("录入成功");
						window.close();
				    }
					else {
						console.log("录入失败");
					}
		     }
	}
}

function burn_result_luru() {
	var ca = document.cookie.split('case_id');
	var case_id=ca[1].substring(0,ca[1].indexOf(";"));
	var manager = jq('#e_manager').val();
	var remark = jq('#e_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	console.log(" 原图大小："+element_image.length);
	if (manager == "" || remark == "") {
		alert("请填写完整");
	} else {
			//var blob = dataURLtoBlob(element_image); 
			var fileObj = document.getElementById("e_model").files[0]; 
			var fd = new FormData(); 
			fd.append("file", fileObj);
			fd.append("case_id", case_id );
			fd.append("manager", manager );
			fd.append("remark", remark);
			fd.append("element_image", element_image);
			fd.append("create_date", create_date);
			var xhr = new XMLHttpRequest(); 
			xhr.open('POST', '/pro/BurnResQueryController/InsertElement',true); 
			xhr.send(fd);
			xhr.onload = function(e) {
				    if(xhr.readyState ==4 && xhr.status == 200){
						alert("录入成功");
						window.close();
				    }
					else {
						console.log("录入失败");
					}
		     }
	}
}

function explosion_dynamite_luru() {
	var ca = document.cookie.split('case_id');
	var case_id=ca[1].substring(0,ca[1].indexOf(";"));
	var manager = jq('#e_manager').val();
	var remark = jq('#e_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	console.log(" 原图大小："+element_image.length);
	if (manager == "" || remark == "") {
		alert("请填写完整");
	} else {
			//var blob = dataURLtoBlob(element_image); 
			var fileObj = document.getElementById("e_model").files[0]; 
			var fd = new FormData(); 
			fd.append("file", fileObj);
			fd.append("case_id", case_id );
			fd.append("manager", manager );
			fd.append("remark", remark);
			fd.append("element_image", element_image);
			fd.append("create_date", create_date);
			var xhr = new XMLHttpRequest(); 
			xhr.open('POST', '/pro/ExpDynQueryController/InsertElement',true); 
			xhr.send(fd);
			xhr.onload = function(e) {
				    if(xhr.readyState ==4 && xhr.status == 200){
						alert("录入成功");
						window.close();
				    }
					else {
						console.log("录入失败");
					}
		     }
	}
}

function explosion_source_luru() {
	var ca = document.cookie.split('case_id');
	var case_id=ca[1].substring(0,ca[1].indexOf(";"));
	var manager = jq('#e_manager').val();
	var remark = jq('#e_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	console.log(" 原图大小："+element_image.length);
	if (manager == "" || remark == "") {
		alert("请填写完整");
	} else {
			//var blob = dataURLtoBlob(element_image); 
			var fileObj = document.getElementById("e_model").files[0]; 
			var fd = new FormData(); 
			fd.append("file", fileObj);
			fd.append("case_id", case_id );
			fd.append("manager", manager );
			fd.append("remark", remark);
			fd.append("element_image", element_image);
			fd.append("create_date", create_date);
			var xhr = new XMLHttpRequest(); 
			xhr.open('POST', '/pro/ExpSourQueryController/InsertElement',true); 
			xhr.send(fd);
			xhr.onload = function(e) {
				    if(xhr.readyState ==4 && xhr.status == 200){
						alert("录入成功");
						window.close();
				    }
					else {
						console.log("录入失败");
					}
		     }
	}
}

function explosion_subject_luru() {
	var ca = document.cookie.split('case_id');
	var case_id=ca[1].substring(0,ca[1].indexOf(";"));
	var manager = jq('#e_manager').val();
	var remark = jq('#e_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	console.log(" 原图大小："+element_image.length);
	if (manager == "" || remark == "") {
		alert("请填写完整");
	} else {
			//var blob = dataURLtoBlob(element_image); 
			var fileObj = document.getElementById("e_model").files[0]; 
			var fd = new FormData(); 
			fd.append("file", fileObj);
			fd.append("case_id", case_id );
			fd.append("manager", manager );
			fd.append("remark", remark);
			fd.append("element_image", element_image);
			fd.append("create_date", create_date);
			var xhr = new XMLHttpRequest(); 
			xhr.open('POST', '/pro/ExpSubQueryController/InsertElement',true); 
			xhr.send(fd);
			xhr.onload = function(e) {
				    if(xhr.readyState ==4 && xhr.status == 200){
						alert("录入成功");
						window.close();
				    }
					else {
						console.log("录入失败");
					}
		     }
	}
}

function explosion_fragment_luru() {
	var ca = document.cookie.split('case_id');
	var case_id=ca[1].substring(0,ca[1].indexOf(";"));
	var manager = jq('#e_manager').val();
	var remark = jq('#e_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	console.log(" 原图大小："+element_image.length);
	if (manager == "" || remark == "") {
		alert("请填写完整");
	} else {
			//var blob = dataURLtoBlob(element_image); 
			var fileObj = document.getElementById("e_model").files[0]; 
			var fd = new FormData(); 
			fd.append("file", fileObj);
			fd.append("case_id", case_id );
			fd.append("manager", manager );
			fd.append("remark", remark);
			fd.append("element_image", element_image);
			fd.append("create_date", create_date);
			var xhr = new XMLHttpRequest(); 
			xhr.open('POST', '/pro/ExpFragQueryController/InsertElement',true); 
			xhr.send(fd);
			xhr.onload = function(e) {
				    if(xhr.readyState ==4 && xhr.status == 200){
						alert("录入成功");
						window.close();
				    }
					else {
						console.log("录入失败");
					}
		     }
	}
}

function kill_victem_luru() {
	var ca = document.cookie.split('case_id');
	var case_id=ca[1].substring(0,ca[1].indexOf(";"));
	var manager = jq('#e_manager').val();
	var remark = jq('#e_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	console.log(" 原图大小："+element_image.length);
	if (manager == "" || remark == "") {
		alert("请填写完整");
	} else {
			//var blob = dataURLtoBlob(element_image); 
			var fileObj = document.getElementById("e_model").files[0]; 
			var fd = new FormData(); 
			fd.append("file", fileObj);
			fd.append("case_id", case_id );
			fd.append("manager", manager );
			fd.append("remark", remark);
			fd.append("element_image", element_image);
			fd.append("create_date", create_date);
			var xhr = new XMLHttpRequest(); 
			xhr.open('POST', '/pro/KillVicQueryController/InsertElement',true); 
			xhr.send(fd);
			xhr.onload = function(e) {
				    if(xhr.readyState ==4 && xhr.status == 200){
						alert("录入成功");
						window.close();
				    }
					else {
						console.log("录入失败");
					}
		     }
	}
}

function kill_criminal_luru() {
	var ca = document.cookie.split('case_id');
	var case_id=ca[1].substring(0,ca[1].indexOf(";"));
	var manager = jq('#e_manager').val();
	var remark = jq('#e_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	console.log(" 原图大小："+element_image.length);
	if (manager == "" || remark == "") {
		alert("请填写完整");
	} else {
			//var blob = dataURLtoBlob(element_image); 
			var fileObj = document.getElementById("e_model").files[0]; 
			var fd = new FormData(); 
			fd.append("file", fileObj);
			fd.append("case_id", case_id );
			fd.append("manager", manager );
			fd.append("remark", remark);
			fd.append("element_image", element_image);
			fd.append("create_date", create_date);
			var xhr = new XMLHttpRequest(); 
			xhr.open('POST', '/pro/KillCriQueryController/InsertElement',true); 
			xhr.send(fd);
			xhr.onload = function(e) {
				    if(xhr.readyState ==4 && xhr.status == 200){
						alert("录入成功");
						window.close();
				    }
					else {
						console.log("录入失败");
					}
		     }
	}
}

function kill_weapon_luru() {
	var ca = document.cookie.split('case_id');
	var manager = jq('#e_manager').val();
	var remark = jq('#e_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	console.log(" 原图大小："+element_image.length);
	if (manager == "" || remark == "") {
		alert("请填写完整");
	} else {
			//var blob = dataURLtoBlob(element_image); 
			var fileObj = document.getElementById("e_model").files[0]; 
			var fd = new FormData(); 
			fd.append("file", fileObj);
			fd.append("case_id", case_id );
			fd.append("manager", manager );
			fd.append("remark", remark);
			fd.append("element_image", element_image);
			fd.append("create_date", create_date);
			var xhr = new XMLHttpRequest(); 
			xhr.open('POST', '/pro/KillWeaQueryController/InsertElement',true); 
			xhr.send(fd);
			xhr.onload = function(e) {
				    if(xhr.readyState ==4 && xhr.status == 200){
						alert("录入成功");
						window.close();
				    }
					else {
						console.log("录入失败");
					}
		     }
	}
}

function kill_environment_luru() {
	var ca = document.cookie.split('case_id');
	var case_id=ca[1].substring(0,ca[1].indexOf(";"));
	var manager = jq('#e_manager').val();
	var remark = jq('#e_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	console.log(" 原图大小："+element_image.length);
	if (manager == "" || remark == "") {
		alert("请填写完整");
	} else {
			//var blob = dataURLtoBlob(element_image); 
			var fileObj = document.getElementById("e_model").files[0]; 
			var fd = new FormData(); 
			fd.append("file", fileObj);
			fd.append("case_id", case_id );
			fd.append("manager", manager );
			fd.append("remark", remark);
			fd.append("element_image", element_image);
			fd.append("create_date", create_date);
			var xhr = new XMLHttpRequest(); 
			xhr.open('POST', '/pro/KillEnvQueryController/InsertElement',true); 
			xhr.send(fd);
			xhr.onload = function(e) {
				    if(xhr.readyState ==4 && xhr.status == 200){
						alert("录入成功");
						window.close();
				    }
					else {
						console.log("录入失败");
					}
		     }
	}
}

function collision_subject_luru() {
	var ca = document.cookie.split('case_id');
	var case_id=ca[1].substring(0,ca[1].indexOf(";"));
	var manager = jq('#e_manager').val();
	var remark = jq('#e_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	console.log(" 原图大小："+element_image.length);
	if (manager == "" || remark == "") {
		alert("请填写完整");
	} else {
			//var blob = dataURLtoBlob(element_image); 
			var fileObj = document.getElementById("e_model").files[0]; 
			var fd = new FormData(); 
			fd.append("file", fileObj);
			fd.append("case_id", case_id );
			fd.append("manager", manager );
			fd.append("remark", remark);
			fd.append("element_image", element_image);
			fd.append("create_date", create_date);
			var xhr = new XMLHttpRequest(); 
			xhr.open('POST', '/pro/CollSubQueryController/InsertElement',true); 
			xhr.send(fd);
			xhr.onload = function(e) {
				    if(xhr.readyState ==4 && xhr.status == 200){
						alert("录入成功");
						window.close();
				    }
					else {
						console.log("录入失败");
					}
		     }
	}
}

function collision_object_luru() {
	var ca = document.cookie.split('case_id');
	var case_id=ca[1].substring(0,ca[1].indexOf(";"));
	var manager = jq('#e_manager').val();
	var remark = jq('#e_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	console.log(" 原图大小："+element_image.length);
	if (manager == "" || remark == "") {
		alert("请填写完整");
	} else {
			//var blob = dataURLtoBlob(element_image); 
			var fileObj = document.getElementById("e_model").files[0]; 
			var fd = new FormData(); 
			fd.append("file", fileObj);
			fd.append("case_id", case_id );
			fd.append("manager", manager );
			fd.append("remark", remark);
			fd.append("element_image", element_image);
			fd.append("create_date", create_date);
			var xhr = new XMLHttpRequest(); 
			xhr.open('POST', '/pro/CollObjQueryController/InsertElement',true); 
			xhr.send(fd);
			xhr.onload = function(e) {
				    if(xhr.readyState ==4 && xhr.status == 200){
						alert("录入成功");
						window.close();
				    }
					else {
						console.log("录入失败");
					}
		     }
	}
}

function collision_fragment_luru() {
	var ca = document.cookie.split('case_id');
	var case_id=ca[1].substring(0,ca[1].indexOf(";"));
	var manager = jq('#e_manager').val();
	var remark = jq('#e_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	console.log(" 原图大小："+element_image.length);
	if (manager == "" || remark == "") {
		alert("请填写完整");
	} else {
			//var blob = dataURLtoBlob(element_image); 
			var fileObj = document.getElementById("e_model").files[0]; 
			var fd = new FormData(); 
			fd.append("file", fileObj);
			fd.append("case_id", case_id );
			fd.append("manager", manager );
			fd.append("remark", remark);
			fd.append("element_image", element_image);
			fd.append("create_date", create_date);
			var xhr = new XMLHttpRequest(); 
			xhr.open('POST', '/pro/CollFragQueryController/InsertElement',true); 
			xhr.send(fd);
			xhr.onload = function(e) {
				    if(xhr.readyState ==4 && xhr.status == 200){
						alert("录入成功");
						window.close();
				    }
					else {
						console.log("录入失败");
					}
		     }
	}
}
function collision_environment_luru() {
	var ca = document.cookie.split('case_id');
	var case_id=ca[1].substring(0,ca[1].indexOf(";"));
	var manager = jq('#e_manager').val();
	var remark = jq('#e_remark').val();
	var element_image = jq('#element_image').val();
	var create_date = jq('#create_date').val();
	console.log(" 原图大小："+element_image.length);
	if (manager == "" || remark == "") {
		alert("请填写完整");
	} else {
			//var blob = dataURLtoBlob(element_image); 
			var fileObj = document.getElementById("e_model").files[0]; 
			var fd = new FormData(); 
			fd.append("file", fileObj);
			fd.append("case_id", case_id );
			fd.append("manager", manager );
			fd.append("remark", remark);
			fd.append("element_image", element_image);
			fd.append("create_date", create_date);
			var xhr = new XMLHttpRequest(); 
			xhr.open('POST', '/pro/CollEnvQueryController/InsertElement',true); 
			xhr.send(fd);
			xhr.onload = function(e) {
				    if(xhr.readyState ==4 && xhr.status == 200){
						alert("录入成功");
						window.close();
				    }
					else {
						console.log("录入失败");
					}
		     }
	}
}

 function luru() {
	var id = jq('#c_id').val();
	var time = jq(".date").val();
	var pro = jq('#prov').val();
	var city = jq('#city').val();
	var dis = jq('#dis').val();
	var type = jq('#s_type').val();
	var des = jq('#c_des').val();
	if (id == "" || time == "" || des == "") {
		alert("请填写完整");
	} else {
		jq.ajax({
			url : '/pro/CaseQueryController/GetElementInfo?id=' + id,
			type : 'POST',
			data : "{}",
			dataType : 'json',
			success : function(data) {
				console.log(data);
				var jsonLength = 0;
				for ( var item in data) {
					jsonLength++;
				}
				if (jsonLength > 0) {
					alert("案件编号:" + id + " 已经存在,请重新输入");
				} else {
					jq.ajax({
						url : '/pro/CaseQueryController/InsertCase?id=' + id
								+ '&beginTime=' + time + '&pro=' + pro
								+ '&city=' + city + '&dis=' + dis + '&des='
								+ des + '&type=' + type,
						type : 'POST',
						success : function() {
							alert("录入成功");
							window.close();
						},
						error : function() {
							console.log("录入失败");
						}
					});
				}
			},
			error : function() {
				console.log("获取失败");
			}
		});
	}
}


function load_m() {
	var id = jq('#check_id').val();
	if (id == "") {
		alert("请先勾选要查看的案件");
	} else {
		alert("load 案件 " + id + " 的素材");
	}
}

function load_t() {
	var id = jq('#check_id').val();
	if (id == "") {
		alert("请先勾选要查看的案件");
	} else {
		alert("load 案件 " + id + " 的移动轨迹");
	}
}

function loadmeta() {
	var id = jq('#sceneid').val();
	jq.ajax({
		async : false,
		cache : false,
		type : 'POST',
		datatype : 'json',
		url : '/pro/PointInfoQueryController/getPointInfoById?id=' + id,
		datatype : "json",
		mtype : 'POST',
		success : function(data) {
			console.log("data count:" + data.id + "," + data.minx + ","
					+ data.max + "," + data.mdnx + "," + data.minlevel + ","
					+ data.maxlevel);
			document.getElementById('minx').value = data.minx;
			document.getElementById('miny').value = data.miny;
			document.getElementById('minz').value = data.minz;
			document.getElementById('maxx').value = data.maxx;
			document.getElementById('maxy').value = data.maxy;
			document.getElementById('maxz').value = data.maxz;
			document.getElementById('cenx').value = data.mdnx;
			document.getElementById('ceny').value = data.mdny;
			document.getElementById('cenz').value = data.mdnz;
			document.getElementById('level').value = data.minlevel;
			document.getElementById('minlevel').value = data.minlevel;
			document.getElementById('maxlevel').value = data.maxlevel;
		}
	})
}

function show3d() {
	jq("#3dshow").load("/pro/3dshow/all_3d.jsp");
	jq("#showBotton1").attr("disabled", true);
}

function showall() {
	jq("#3dshow").load("/pro/3dshow/burndisplay.jsp");
	jq("#init").attr("disabled", true);
}

function showplant() {
	jq("#plantshow").load("/pro/3dshow/points.jsp");
	jq("#Showpant").attr("disabled", true);
}
