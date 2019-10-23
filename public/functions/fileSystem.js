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

$(function () {
    $("#files").on("change", function (e) {
        $.each(this.files, function (k, v) {
            console.log(v.type + "=" + v.webkitRelativePath);
        });
    });
})

function select_case() {
    $("#case_file").trigger("click");
}