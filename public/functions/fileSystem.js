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



function importInquestBaseInfo(obj) {//勘验基础信息
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
        var sheet = wb.Sheets[wb.SheetNames[0]];//sheet0代表excel表格中的第一页
        var str = XLSX.utils.sheet_to_json(sheet);//利用接口实现转换。
        var templates = new Array();
        var str1 = obj.files[0].name;
        templates = str1.split(".");//将导入文件名去掉后缀
        var form = JSON.stringify(str);
        console.log("这" + form);
        $.get("/store_inquest_base_info", {"form": form}, function (data) {
            // console.log(JSON.parse(form.slice(1,form.length-1)))
            // console.log(str[0].现场变动情况ID)
            // console.log(Object.keys(str[0])[0])
            // console.log(Object.keys(str[0])[1])
            alert(data.msg);
        })
    }
    reader.readAsBinaryString(f);
}

function importFieldCommander(obj) {//现场指挥人员
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
        var sheet = wb.Sheets[wb.SheetNames[1]];//sheet0代表excel表格中的第一页
        var str = XLSX.utils.sheet_to_json(sheet);//利用接口实现转换。
        var templates = new Array();
        var str1 = obj.files[0].name;
        templates = str1.split(".");//将导入文件名去掉后缀
        var form = JSON.stringify(str);
        console.log("这" + form);
        $.get("/store_field_commander", {"form": form}, function (data) {
            alert(data.msg);
        })
    }
    reader.readAsBinaryString(f);
}
function importProtectMeasure(obj) {//保护措施
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
        var sheet = wb.Sheets[wb.SheetNames[2]];//sheet0代表excel表格中的第一页
        var str = XLSX.utils.sheet_to_json(sheet);//利用接口实现转换。
        var templates = new Array();
        var str1 = obj.files[0].name;
        templates = str1.split(".");//将导入文件名去掉后缀
        var form = JSON.stringify(str);
        console.log("这" + form);
        $.get("/store_protect_measure", {"form": form}, function (data) {
            alert(data.msg);
        })
    }
    reader.readAsBinaryString(f);
}
function importSiteChanges(obj) {//现场变动情况
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
        var sheet = wb.Sheets[wb.SheetNames[3]];//sheet0代表excel表格中的第一页
        var str = XLSX.utils.sheet_to_json(sheet);//利用接口实现转换。
        var templates = new Array();
        var str1 = obj.files[0].name;
        templates = str1.split(".");//将导入文件名去掉后缀
        var form = JSON.stringify(str);
        console.log("这" + form);
        $.get("/store_site_changes", {"form": form}, function (data) {
            alert(data.msg);
        })
    }
    reader.readAsBinaryString(f);
}
function importMarkGoodsUnit(obj) {//单位
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
        var sheet = wb.Sheets[wb.SheetNames[4]];//sheet0代表excel表格中的第一页
        var str = XLSX.utils.sheet_to_json(sheet);//利用接口实现转换。
        var templates = new Array();
        var str1 = obj.files[0].name;
        templates = str1.split(".");//将导入文件名去掉后缀
        var form = JSON.stringify(str);
        console.log("这" + form);
        $.get("/store_mark_goods_unit", {"form": form}, function (data) {
            alert(data.msg);
        })
    }
    reader.readAsBinaryString(f);
}
function importWeather(obj) {//天气情况
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
        var sheet = wb.Sheets[wb.SheetNames[5]];//sheet0代表excel表格中的第一页
        var str = XLSX.utils.sheet_to_json(sheet);//利用接口实现转换。
        var templates = new Array();
        var str1 = obj.files[0].name;
        templates = str1.split(".");//将导入文件名去掉后缀
        var form = JSON.stringify(str);
        console.log("这" + form);
        $.get("/store_weathher", {"form": form}, function (data) {
            alert(data.msg);
        })
    }
    reader.readAsBinaryString(f);
}
function importFullPhoto(obj) {//全貌照片
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
        var sheet = wb.Sheets[wb.SheetNames[6]];//sheet0代表excel表格中的第一页
        var str = XLSX.utils.sheet_to_json(sheet);//利用接口实现转换。
        var templates = new Array();
        var str1 = obj.files[0].name;
        templates = str1.split(".");//将导入文件名去掉后缀
        var form = JSON.stringify(str);
        console.log("这" + form);
        $.get("/store_full_photo", {"form": form}, function (data) {
            alert(data.msg);
        })
    }
    reader.readAsBinaryString(f);
}
function importMarkGoods(obj) {//痕迹物品
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
        var sheet = wb.Sheets[wb.SheetNames[7]];//sheet0代表excel表格中的第一页
        var str = XLSX.utils.sheet_to_json(sheet);//利用接口实现转换。
        var templates = new Array();
        var str1 = obj.files[0].name;
        templates = str1.split(".");//将导入文件名去掉后缀
        var form = JSON.stringify(str);
        console.log("这" + form);
        $.get("/store_mark_goods", {"form": form}, function (data) {
            alert(data.msg);
        })
    }
    reader.readAsBinaryString(f);
}
function importGoodsType(obj) {//物品类型
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
        var sheet = wb.Sheets[wb.SheetNames[8]];//sheet0代表excel表格中的第一页
        var str = XLSX.utils.sheet_to_json(sheet);//利用接口实现转换。
        var templates = new Array();
        var str1 = obj.files[0].name;
        templates = str1.split(".");//将导入文件名去掉后缀
        var form = JSON.stringify(str);
        console.log("这" + form);
        $.get("/store_goods_type", {"form": form}, function (data) {
            alert(data.msg);
        })
    }
    reader.readAsBinaryString(f);
}
function importExtractMethod(obj) {//提取方法
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
        var sheet = wb.Sheets[wb.SheetNames[9]];//sheet0代表excel表格中的第一页
        var str = XLSX.utils.sheet_to_json(sheet);//利用接口实现转换。
        var templates = new Array();
        var str1 = obj.files[0].name;
        templates = str1.split(".");//将导入文件名去掉后缀
        var form = JSON.stringify(str);
        console.log("这" + form);
        $.get("/store_extract_method", {"form": form}, function (data) {
            alert(data.msg);
        })
    }
    reader.readAsBinaryString(f);
}
function importCorpseInfo(obj) {//尸体信息
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
        var sheet = wb.Sheets[wb.SheetNames[10]];//sheet0代表excel表格中的第一页
        var str = XLSX.utils.sheet_to_json(sheet);//利用接口实现转换。
        var templates = new Array();
        var str1 = obj.files[0].name;
        templates = str1.split(".");//将导入文件名去掉后缀
        var form = JSON.stringify(str);
        console.log("这" + form);
        $.get("/store_corpse_info", {"form": form}, function (data) {
            alert(data.msg);
        })
    }
    reader.readAsBinaryString(f);
}
function importCorpsePhoto(obj) {//尸体照片
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
        var sheet = wb.Sheets[wb.SheetNames[11]];//sheet0代表excel表格中的第一页
        var str = XLSX.utils.sheet_to_json(sheet);//利用接口实现转换。
        var templates = new Array();
        var str1 = obj.files[0].name;
        templates = str1.split(".");//将导入文件名去掉后缀
        var form = JSON.stringify(str);
        console.log("这" + form);
        $.get("/store_corpse_photo", {"form": form}, function (data) {
            alert(data.msg);
        })
    }
    reader.readAsBinaryString(f);
}
function importPositionPhoto(obj) {//方位照片
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
        var sheet = wb.Sheets[wb.SheetNames[12]];//sheet0代表excel表格中的第一页
        var str = XLSX.utils.sheet_to_json(sheet);//利用接口实现转换。
        var templates = new Array();
        var str1 = obj.files[0].name;
        templates = str1.split(".");//将导入文件名去掉后缀
        var form = JSON.stringify(str);
        console.log("这" + form);
        $.get("/store_position_photo", {"form": form}, function (data) {
            alert(data.msg);
        })
    }
    reader.readAsBinaryString(f);
}
function importCaseConclusionInfo(obj) {//案事件全貌
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
        var sheet = wb.Sheets[wb.SheetNames[13]];//sheet0代表excel表格中的第一页
        var str = XLSX.utils.sheet_to_json(sheet);//利用接口实现转换。
        var templates = new Array();
        var str1 = obj.files[0].name;
        templates = str1.split(".");//将导入文件名去掉后缀
        var form = JSON.stringify(str);
        console.log("这" + form);
        $.get("/store_case_conclusion_info", {"form": form}, function (data) {
            alert(data.msg);
        })
    }
    reader.readAsBinaryString(f);
}
function importEleInfo(obj) {//电子信息
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
        var sheet = wb.Sheets[wb.SheetNames[14]];//sheet0代表excel表格中的第一页
        var str = XLSX.utils.sheet_to_json(sheet);//利用接口实现转换。
        var templates = new Array();
        var str1 = obj.files[0].name;
        templates = str1.split(".");//将导入文件名去掉后缀
        var form = JSON.stringify(str);
        console.log("这" + form);
        $.get("/store_ele_info", {"form": form}, function (data) {
            alert(data.msg);
        })
    }
    reader.readAsBinaryString(f);
}
function importInvoledGoodsInfo(obj) {//涉案物品信息
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
        var sheet = wb.Sheets[wb.SheetNames[15]];//sheet0代表excel表格中的第一页
        var str = XLSX.utils.sheet_to_json(sheet);//利用接口实现转换。
        var templates = new Array();
        var str1 = obj.files[0].name;
        templates = str1.split(".");//将导入文件名去掉后缀
        var form = JSON.stringify(str);
        console.log("这" + form);
        $.get("/store_involved_goods_info", {"form": form}, function (data) {
            alert(data.msg);
        })
    }
    reader.readAsBinaryString(f);
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

// function select_case() {
//     $("#case_file").trigger("click");
// }

// function site_changes_show() {
//     alert(1)
//     $.get("/get_site_changes", function (data) {
//     console.log(data)
//     document.getElementById("1").value = data[0].现场变动情况ID
//     document.getElementById("2").value = data[1].现场变动情况名称
// })
// }

function importNewExcel(obj){
    importInquestBaseInfo(obj);
    importFieldCommander(obj);
    importSiteChanges(obj);
    importMarkGoodsUnit(obj);
    importGoodsType(obj);
    importExtractMethod(obj);
    // importCaseConclusionInfo(obj);
}

