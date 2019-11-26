var i = 0;
var j = 0;
$(function () {
    $("#fileMutiply").change(function eventStart() {
        console.log("选择上传文件夹");
        var ss = this.files; //获取当前选择的文件对象
        var flag = true;
        var start;
        for (var m = 0; m < ss.length; m++) { //循环添加进度条
            efileName = ss[m].name;
            var pathnameArray = efileName.split('/');
            if (pathnameArray[pathnameArray.length - 1].split(".")[1] == "json") {
                start = m;
                sendAjax(m);
                var flag = false;
                break;
            }
        }
        if (flag == true) {
            alert("没有找到json文件");
        }

        function sendAjax(j) {
            // if (j==start)  //采用递归的方式循环发送ajax请求
            // {
            //     if(flag==true){
            //         flag=false;
            //     }else{
            //         $("#fileMutiply").val("");
            //         j = 0;
            //         return;
            //     }
            // }
            var formData = new FormData();
            formData.append('files', ss[j]); //将该file对象添加到formData对象中
            $.ajax({
                url: 'update_transform',
                type: 'POST',
                cache: false,
                data: {},//需要什么参数，自己配置
                data: formData,//文件以formData形式传入
                processData: false,
                //必须false才会自动加上正确的Content-Type
                contentType: false,
                /*  beforeSend:beforeSend,//发送请求
                  complete:complete,//请求完成
          */      xhr: function () {   //监听用于上传显示进度
                    var xhr = $.ajaxSettings.xhr();
                    if (onprogress && xhr.upload) {
                        xhr.upload.addEventListener("progress", onprogress, false);
                        return xhr;
                    }
                },
                success: function (data) {
                    if (data.target == 1) {
                        if (data.msg == "json") {
                            console.log("get json");
                            for (var m = 0; m < ss.length; m++) { //循环添加进度条
                                if (m != start) {
                                    sendAjax(m);
                                }
                            }
                        } //else {
                        //     console.log(data.msg);
                        // }
                    }
                    // $(".filelist").find("#" + j + "file").remove();//移除进度条样式
                    // j=(j+1)%ss.length; //递归条件
                    // sendAjax(start);
                    //   }
                },
                error: function (xhr) {
                    alert("上传出错");
                }
            });
        }
    })

    function onprogress(evt) {
        var loaded = evt.loaded;   //已经上传大小情况
        var tot = evt.total;   //附件总大小
        var per = Math.floor(100 * loaded / tot); //已经上传的百分比
        $(".filelist").find("#" + j + "pps").text(per + "%");
        $(".filelist").find("#" + j + "barj").width(per + "%");
    };
})

function importFile(obj) {//导入
    console.log("已选择文件");
    if (!obj.files) {
        alert("文件有误");
        return;
    }
    // alert(obj.files[0].name);文件名
    var f = obj.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
        var data = e.target.result;
        var wb = XLSX.read(data, {
            type: 'binary' //以二进制的方式读取
        });
        var sheet0 = wb.Sheets[wb.SheetNames[0]];//sheet0代表excel表格中的第一页
        var str = XLSX.utils.sheet_to_json(sheet0);//利用接口实现转换。
        var templates = new Array();
        var str1 = obj.files[0].name;
        templates = str1.split(".");//将导入文件名去掉后缀
        var form = JSON.stringify(str);
        console.log("这" + form);
        $.get("/store_elements", {"form": form, "scene_id": $("#scene_id").val()}, function (data) {
            alert(data.msg);
        })
    }
    reader.readAsBinaryString(f);
}

function importThingFile(obj) {//新增内容
    console.log("已选择文件");
    if (!obj.files) {
        alert("文件有误");
        return;
    }
    // alert(obj.files[0].name);文件名
    var f = obj.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
        var data = e.target.result;
        var wb = XLSX.read(data, {
            type: 'binary' //以二进制的方式读取
        });
        var sheet0 = wb.Sheets[wb.SheetNames[0]];//sheet0代表excel表格中的第一页
        var str = XLSX.utils.sheet_to_json(sheet0);//利用接口实现转换。
        var templates = new Array();
        var str1 = obj.files[0].name;
        templates = str1.split(".");//将导入文件名去掉后缀
        var form = JSON.stringify(str);
        console.log("Form:" + form);
        $.get("/store_things", {"form": form, "scene_id": $("#scene_id").val()}, function (data) {
            alert(data.msg);
        })
    }
    reader.readAsBinaryString(f);
    console.log("物品文件读取成功！")
}

$(document).ready(function () {
    var options = {
        target: '#output2',   // target element(s) to be updated with server response
        beforeSubmit:
            function (data) {
            var file=data[0].value;
                console.log(file);
                console.log("提交前函数");
            },
        success:
            function showResponse(responseText, statusText, xhr, $form) {
                console.log(responseText);
                alert(responseText.msg);
                var gltfs = responseText.model_info;
                for (var i = 0; i < gltfs.length; i += 2) {
                    $("#models").append('<option value=' + gltfs[i + 1] + ' >' + gltfs[i] + '</option>');
                }
                var kin = responseText.kinetic_id;

                $("#kinetic_model").append('<option value=' + kin + ' >' + kin + '</option>');
                $("#kinetic_model").val(kin);
                // if(responseText.status == "0"){
                //     console.log("上传成功");
                //     /**
                //      * 请求成功后的操作
                //      */
                //     alert(responseText);
                // } else {
                //     alert('上传失败');
                // }
            },
        // other available options:
        //url:       url         // override for form's 'action' attribute
        //type:      type        // 'get' or 'post', override for form's 'method' attribute
        dataType: 'json'        // 'xml', 'script', or 'json' (expected server response type)
        //clearForm: true        // clear all form fields after successful submit
        //resetForm: true        // reset the form after successful submit

        // $.ajax options can be used here too, for example:
        //timeout:   3000
    };

    $('#kinetic_files').submit(function () {
        $(this).ajaxSubmit(options);
        return false;
    });
});

function formSubmit() {
    document.getElementById("upload_confirm").click();
}

// $(function () {
//     $("#files").on("change", function (e) {
//         $.each(this.files, function (k, v) {
//             console.log(v.type + "=" + v.webkitRelativePath);
//         });
//     });
// })

function select_case() {
    $("#case_file").trigger("click");
}