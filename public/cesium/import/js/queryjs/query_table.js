function showimage(image) {
    /*var newwin=window.open();
			myimg=newwin.document.createElement("img");
			myimg.src=image;
			newwin.document.body.appendChild(myimg);*/
    document.getElementById("element_image").src = image;
    window
        .open(
            "showimage.jsp",
            "showimage",
            "height=700, width=1200, top=200, left=300,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
}

function connect_element() {
    window
        .open(
            "connect_element.jsp",
            "connect__element",
            "height=700, width=1000, top=200, left=300,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
}


function connect_case() {
    window
        .open(
            "connect_case.jsp",
            "connect_case",
            "height=700, width=1000, top=200, left=300,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
}

function delete_element(element_id) {
    if (window.confirm('删除是不可恢复的，你确认要删除吗？')) {
        console.log("删除要素  ");
        var button_name = document.getElementById("button_name").value;    //删除成功后查询button自动点击刷新结果
        var type_id = document.getElementById('type_id').value;
        var main_type = type_id.substr(0, 1) + "000000";
        var controller_name = element_type_picker[main_type][type_id].controller_name;
        console.log("controller_name" + controller_name);
        console.log("element_id: " + element_id + "type_id: " + type_id);
        jq.ajax({
            url: '/pro/' + controller_name + '/DeleteElement?&element_id=' + element_id + '&type_id=' + type_id,
            type: 'POST',
            success: function () {
                document.getElementById(button_name).click();
                alert("删除要素成功");
                window.close();
            },
            error: function () {
                console.log("删除要素失败");
            }
        });
        return true;
    } else {
        return false;
    }
}

function select_case(case_id) {
    if (window.confirm('是否选定案件' + case_id + "?")) {
        document.getElementById("case_id").innerHTML = case_id;
        var d = new Date();
        d.setHours(d.getHours() + 1);                 //cookie保存一小时
        document.cookie = "case_id" + case_id + "; expires=" + d.toGMTString();
        document.getElementById("sub_list").style.display = 'block';
        return true;
    } else {
        return false;
    }
}

function delete_case(case_id) {
    if (window.confirm('删除是不可恢复的，你确认要删除吗？')) {
        console.log("删除要素  ");
        var button_name = document.getElementById("button_name").value;
        jq.ajax({
            url: '/pro/CaseQueryController/DeleteCase?&case_id=' + case_id,
            type: 'POST',
            success: function () {
                document.getElementById(button_name).click();
                alert("删除案件成功");
                window.close();
            },
            error: function () {
                console.log("删除案件失败");
            }
        });
        return true;
    } else {
        return false;
    }
}

function update_matinq(data) {
    var rowdata = JSON.stringify(data);
    document.getElementById('rowdata').value = rowdata;
    window
        .open(
            "update_MatInq.jsp",
            "update_MatInq",
            "height=700, width=1000, top=200, left=300,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
}

function update_matabs(data) {
    var rowdata = JSON.stringify(data);
    document.getElementById('rowdata').value = rowdata;
    window
        .open(
            "update_MatAbs.jsp",
            "update_MatAbs",
            "height=700, width=1000, top=200, left=300,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
}

function update_matevi(data) {
    var rowdata = JSON.stringify(data);
    document.getElementById('rowdata').value = rowdata;
    window
        .open(
            "update_MatEvi.jsp",
            "update_MatEvi",
            "height=700, width=1000, top=200, left=300,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
}

function update_matfing(data) {
    var rowdata = JSON.stringify(data);
    document.getElementById('rowdata').value = rowdata;
    window
        .open(
            "update_MatFing.jsp",
            "update_MatFing",
            "height=700, width=1000, top=200, left=300,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
}

function update_matfoot(data) {
    var rowdata = JSON.stringify(data);
    document.getElementById('rowdata').value = rowdata;
    window
        .open(
            "update_MatFoot.jsp",
            "update_MatFoot",
            "height=700, width=1000, top=200, left=300,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
}

function update_matdna(data) {
    var rowdata = JSON.stringify(data);
    document.getElementById('rowdata').value = rowdata;
    window
        .open(
            "update_MatDna.jsp",
            "update_MatDna",
            "height=700, width=1000, top=200, left=300,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
}

function update_burn_sour(data) {
    var rowdata = JSON.stringify(data);
    document.getElementById('rowdata').value = rowdata;
    window
        .open(
            "update_BurnSour.jsp",
            "update_BurnSour",
            "height=700, width=1000, top=200, left=300,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
}

function update_burn_sub(data) {
    var rowdata = JSON.stringify(data);
    document.getElementById('rowdata').value = rowdata;
    window
        .open(
            "update_BurnSub.jsp",
            "update_BurnSub",
            "height=700, width=1000, top=200, left=300,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
}

function update_burn_diff(data) {
    var rowdata = JSON.stringify(data);
    document.getElementById('rowdata').value = rowdata;
    window
        .open(
            "update_BurnDiff.jsp",
            "update_BurnDiff",
            "height=700, width=1000, top=200, left=300,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
}

function update_burn_fuel(data) {
    var rowdata = JSON.stringify(data);
    document.getElementById('rowdata').value = rowdata;
    window
        .open(
            "update_BurnFuel.jsp",
            "update_BurnFuel",
            "height=700, width=1000, top=200, left=300,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
}

function update_burn_res(data) {
    var rowdata = JSON.stringify(data);
    document.getElementById('rowdata').value = rowdata;
    window
        .open(
            "update_BurnRes.jsp",
            "update_BurnRes",
            "height=700, width=1000, top=200, left=300,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
}

function update_coll_env(data) {
    var rowdata = JSON.stringify(data);
    document.getElementById('rowdata').value = rowdata;
    window
        .open(
            "update_CollEnv.jsp",
            "update_CollEnv",
            "height=700, width=1000, top=200, left=300,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
}

function update_coll_frag(data) {
    var rowdata = JSON.stringify(data);
    document.getElementById('rowdata').value = rowdata;
    window
        .open(
            "update_CollFrag.jsp",
            "update_CollFrag",
            "height=700, width=1000, top=200, left=300,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
}

function update_coll_obj(data) {
    var rowdata = JSON.stringify(data);
    document.getElementById('rowdata').value = rowdata;
    window
        .open(
            "update_CollObj.jsp",
            "update_CollObj",
            "height=700, width=1000, top=200, left=300,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
}

function update_coll_sub(data) {
    var rowdata = JSON.stringify(data);
    document.getElementById('rowdata').value = rowdata;
    window
        .open(
            "update_CollSub.jsp",
            "update_CollSub",
            "height=700, width=1000, top=200, left=300,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
}

function update_exp_dyn(data) {
    var rowdata = JSON.stringify(data);
    document.getElementById('rowdata').value = rowdata;
    window
        .open(
            "update_ExpDyn.jsp",
            "update_ExpDyn",
            "height=700, width=1000, top=200, left=300,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
}

function update_exp_frag(data) {
    var rowdata = JSON.stringify(data);
    document.getElementById('rowdata').value = rowdata;
    window
        .open(
            "update_ExpFrag.jsp",
            "update_ExpFrag",
            "height=700, width=1000, top=200, left=300,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
}

function update_exp_sour(data) {
    var rowdata = JSON.stringify(data);
    document.getElementById('rowdata').value = rowdata;
    window
        .open(
            "update_ExpSour.jsp",
            "update_ExpSour",
            "height=700, width=1000, top=200, left=300,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
}

function update_exp_sub(data) {
    var rowdata = JSON.stringify(data);
    document.getElementById('rowdata').value = rowdata;
    window
        .open(
            "update_ExpSub.jsp",
            "update_ExpSub",
            "height=700, width=1000, top=200, left=300,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
}

function update_kill_cri(data) {
    var rowdata = JSON.stringify(data);
    document.getElementById('rowdata').value = rowdata;
    window
        .open(
            "update_KillCri.jsp",
            "update_KillCri",
            "height=700, width=1000, top=200, left=300,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
}

function update_kill_env(data) {
    var rowdata = JSON.stringify(data);
    document.getElementById('rowdata').value = rowdata;
    window
        .open(
            "update_KillEnv.jsp",
            "update_KillEnv",
            "height=700, width=1000, top=200, left=300,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
}

function update_kill_vic(data) {
    var rowdata = JSON.stringify(data);
    document.getElementById('rowdata').value = rowdata;
    window
        .open(
            "update_KillVic.jsp",
            "update_KillVic",
            "height=700, width=1000, top=200, left=300,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
}

function update_kill_wea(data) {
    var rowdata = JSON.stringify(data);
    document.getElementById('rowdata').value = rowdata;
    window
        .open(
            "update_KillWea.jsp",
            "update_KillWea",
            "height=700, width=1000, top=200, left=300,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
}

jQuery(function ($) {
    var grid_selector = "#case_table";
    var jq = jQuery.noConflict();
    var case_from;
    var case_to;
    var case_keyword;

    function beforeSelectRow() {
        $(grid_selector).jqGrid('resetSelection');
        return (true);
    }

    $('#CaseQueryByKeywordBotton')
        .on(
            'click',
            function () { // 页面上的button按钮的click事件，重新获取参数后发送参数，然后重新加载数据。
                case_keyword = $('#case_keyword').val();
                case_from = $('#case_from').val();
                case_to = $('#case_to').val();
                $(grid_selector)
                    .jqGrid(
                        'setGridParam',
                        {
                            url: '/pro/CaseQueryController/getAllCaseByKeyword?beginTime='
                                + case_from
                                + '&endTime='
                                + case_to
                                + '&keyword='
                                + case_keyword,
                            datatype: "json",
                            mtype: 'POST',
                        }).trigger("reloadGrid"); // 重新载入
            });

    function beforeSelectRow() {
        $(grid_selector).jqGrid('resetSelection');
        return (true);
    }

    jQuery(grid_selector).jqGrid({
        // direction: "rtl",
        datatype: "json",
        mtype: 'POST',

        height: 200,
        colNames: ['案件编号', '案件时间', '案件地点', '案件描述'],
        colModel: [{
            name: 'case_id',
            index: 'case_id',
            width: 35,
            sorttype: "int",
            editable: false
        }, {
            name: 'case_time',
            index: 'case_time',
            width: 40,
            editable: false
        }, {
            name: 'case_location',
            index: 'case_location',
            width: 80,
            sortable: false,
            editable: false
        }, {
            name: 'case_desc',
            index: 'case_desc',
            width: 50,
            sortable: false,
            editable: false
        }],
        viewrecords: true,
        multiselect: true,
        multiboxonly: true,
        beforeSelectRow: function () {
            jQuery(grid_selector).jqGrid('resetSelection');
            return (true);
        },

        loadComplete: function () {
            var table = this;
            setTimeout(function () {
            }, 0);
        },

        onSelectRow: function (id) {
            var selecs = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
            var rowid = $(grid_selector).getGridParam("selrow");
            var rowData = $(grid_selector).getRowData(rowid);
            var cid = rowData.case_id;
            if (document.getElementById('c_id') != null) {
                document.getElementById('c_id').value = cid;
            }
        },

        autowidth: true
    });
});


    var end_date;
    var key_word;

    function beforeSelectRow() {
        $(grid_selector).jqGrid('resetSelection');
        return (true);
    }

    $('#MatFootBotton')
        .on(
            'click',
            function () { // 页面上的button按钮的click事件，重新获取参数后发送参数，然后重新加载数据。
                var button_name = this.id;
                document.getElementById('button_name').value = button_name;
                begin_date = $("#begin_date").val();
                end_date = $("#end_date").val();
                key_word = $("#key_word").val();
                document.getElementById('type_id').value = '3005000';
                $(grid_selector)
                    .jqGrid(
                        'setGridParam',
                        {
                            url: '/pro/MatFootQueryController/selectAllElement?begin_date='
                                + begin_date
                                + '&end_date='
                                + end_date
                                + '&key_word='
                                + key_word,
                            datatype: "json",
                            mtype: 'POST',
                        }).trigger("reloadGrid"); // 重新载入
            });
    jQuery(grid_selector).jqGrid({
        // direction: "rtl",
        datatype: "json",
        mtype: 'POST',

        height: 320,
        colNames: ['要素编号', '案件负责人', '创建时间', '案件备注', '图片流', '本地地址', '图片', '更新', '关联', '删除'],
        colModel: [{
            name: 'element_id',
            index: 'element_id',
            width: 120,
            sortable: false,
            editable: false,
        }, {
            name: 'element_manager',
            index: 'element_manager',
            width: 130,
            sortable: false,
            editable: false
        }, {
            name: 'create_date',
            index: 'create_date',
            width: 130,
            sortable: false,
            editable: false
        }, {
            name: 'element_remark',
            index: 'element_remark',
            width: 220,
            sortable: false,
            editable: false
        }, {
            name: 'element_image',
            index: 'element_image',
            width: 1,
            sortable: false,
            editable: false,
            hidden: true
        }, {
            name: 'localname',
            index: 'localname',
            width: 1,
            sortable: false,
            editable: false,
            hidden: true
        }, {
            lable: 'operation',
            name: 'show_image',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                //var detail="<img  onclick='btn_detail(\""+ rowObject.clid + "\")'' title='详细信息' src='../../Content/Images/Icon16/application_view_detail.png' style='padding:0px 10px'>";
                return '<img id="show_image" src="http://localhost:8080/pro/images/image_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="showimage(\'' + rows.element_image + '\')"></img>';
            },
        }, {
            lable: 'operation',
            name: 'update',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                var rowdata = JSON.stringify(rows);
                return "<img id='update' src='http://localhost:8080/pro/images/update_button.png'  style= 'cursor:pointer;height:30px;width:30px' onClick='update_matfoot(" + rowdata + ")'></img>";
            },
        }, {
            lable: 'operation',
            name: 'binding',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                return '<img id="binding" src="http://localhost:8080/pro/images/connect_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="connect_case()"></img>';
            },
        }, {
            lable: 'operation',
            name: 'datele',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                return '<img id="delete" src="http://localhost:8080/pro/images/delete_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="delete_element(\'' + rows.element_id + '\')"></img>';
            },
        }],
        viewrecords: true,
        // toppager: true,
        multiselect: true,
        // multikey: "ctrlKey",
        multiboxonly: true,
        beforeSelectRow: beforeSelectRow,
        loadComplete: function () {
            var table = this;
            setTimeout(function () {
            }, 0);
        },

        onSelectRow: function (id) {
            var selecs = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
            var rowid = $(grid_selector).getGridParam("selrow");
            var rowData = $(grid_selector).getRowData(rowid);
            var cid = rowData.element_id;
            document.getElementById('check_id').value = cid;
            document.getElementById('element_tree').style.display = 'block';
            document.getElementById('type_id').value = '3005000';
            var treeObj = $.fn.zTree.getZTreeObj("element_tree");
            var nodes = treeObj.getNodesByParam("node_type", "upon_leaf", null);
            var length = nodes.length;
            for (var i = 0; i < length; i++) {
                treeObj.removeChildNodes(nodes[i]);
            }
            document.getElementById('e-correlation').value = "";
        },

        autowidth: true
    });
});

jQuery(function ($) {
    var grid_selector = "#table_dna";
    var jq = jQuery.noConflict();
    var begin_date;
    var end_date;
    var key_word;

    function beforeSelectRow() {
        $(grid_selector).jqGrid('resetSelection');
        return (true);
    }

    $('#MatDnaBotton')
        .on(
            'click',
            function () { // 页面上的button按钮的click事件，重新获取参数后发送参数，然后重新加载数据。
                var button_name = this.id;
                document.getElementById('button_name').value = button_name;
                begin_date = $("#begin_date").val();
                end_date = $("#end_date").val();
                key_word = $("#key_word").val();
                document.getElementById('type_id').value = '3006000';
                $(grid_selector)
                    .jqGrid(
                        'setGridParam',
                        {
                            url: '/pro/MatDnaQueryController/selectAllElement?begin_date='
                                + begin_date
                                + '&end_date='
                                + end_date
                                + '&key_word='
                                + key_word,
                            datatype: "json",
                            mtype: 'POST',
                        }).trigger("reloadGrid"); // 重新载入
            });
    jQuery(grid_selector).jqGrid({
        // direction: "rtl",
        datatype: "json",
        mtype: 'POST',

        height: 320,
        colNames: ['要素编号', '案件负责人', '创建时间', '案件备注', '图片流', '本地地址', '图片', '更新', '关联', '删除'],
        colModel: [{
            name: 'element_id',
            index: 'element_id',
            width: 120,
            sortable: false,
            editable: false,
        }, {
            name: 'element_manager',
            index: 'element_manager',
            width: 130,
            sortable: false,
            editable: false
        }, {
            name: 'create_date',
            index: 'create_date',
            width: 130,
            sortable: false,
            editable: false
        }, {
            name: 'element_remark',
            index: 'element_remark',
            width: 220,
            sortable: false,
            editable: false
        }, {
            name: 'element_image',
            index: 'element_image',
            width: 1,
            sortable: false,
            editable: false,
            hidden: true
        }, {
            name: 'localname',
            index: 'localname',
            width: 1,
            sortable: false,
            editable: false,
            hidden: true
        }, {
            lable: 'operation',
            name: 'show_image',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                //var detail="<img  onclick='btn_detail(\""+ rowObject.clid + "\")'' title='详细信息' src='../../Content/Images/Icon16/application_view_detail.png' style='padding:0px 10px'>";
                return '<img id="show_image" src="http://localhost:8080/pro/images/image_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="showimage(\'' + rows.element_image + '\')"></img>';
            },
        }, {
            lable: 'operation',
            name: 'update',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                var rowdata = JSON.stringify(rows);
                return "<img id='update' src='http://localhost:8080/pro/images/update_button.png'  style= 'cursor:pointer;height:30px;width:30px' onClick='update_matdna(" + rowdata + ")'></img>";
            },
        }, {
            lable: 'operation',
            name: 'binding',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                return '<img id="binding" src="http://localhost:8080/pro/images/connect_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="connect_case()"></img>';
            },
        }, {
            lable: 'operation',
            name: 'datele',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                return '<img id="delete" src="http://localhost:8080/pro/images/delete_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="delete_element(\'' + rows.element_id + '\')"></img>';
            },
        }],
        viewrecords: true,
        // toppager: true,
        multiselect: true,
        // multikey: "ctrlKey",
        multiboxonly: true,
        beforeSelectRow: beforeSelectRow,
        loadComplete: function () {
            var table = this;
            setTimeout(function () {
            }, 0);
        },

        onSelectRow: function (id) {
            var selecs = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
            var rowid = $(grid_selector).getGridParam("selrow");
            var rowData = $(grid_selector).getRowData(rowid);
            var cid = rowData.element_id;
            document.getElementById('check_id').value = cid;
            document.getElementById('element_tree').style.display = 'block';
            document.getElementById('type_id').value = '3006000';
            var treeObj = $.fn.zTree.getZTreeObj("element_tree");
            var nodes = treeObj.getNodesByParam("node_type", "upon_leaf", null);
            var length = nodes.length;
            for (var i = 0; i < length; i++) {
                treeObj.removeChildNodes(nodes[i]);
            }
            document.getElementById('e-correlation').value = "";
        },

        autowidth: true
    });
});

jQuery(function ($) {
    var grid_selector = "#table_burn_source";
    var jq = jQuery.noConflict();
    var begin_date;
    var end_date;
    var key_word;

    function beforeSelectRow() {
        $(grid_selector).jqGrid('resetSelection');
        return (true);
    }

    $('#BurnSourBotton')
        .on(
            'click',
            function () { // 页面上的button按钮的click事件，重新获取参数后发送参数，然后重新加载数据。
                var button_name = this.id;
                document.getElementById('button_name').value = button_name;
                begin_date = $("#begin_date").val();
                end_date = $("#end_date").val();
                key_word = $("#key_word").val();
                document.getElementById('type_id').value = '4001000';
                $(grid_selector)
                    .jqGrid(
                        'setGridParam',
                        {
                            url: '/pro/BurnSourQueryController/selectAllElement?begin_date='
                                + begin_date
                                + '&end_date='
                                + end_date
                                + '&key_word='
                                + key_word,
                            datatype: "json",
                            mtype: 'POST',
                        }).trigger("reloadGrid"); // 重新载入
            });
    jQuery(grid_selector).jqGrid({
        // direction: "rtl",
        datatype: "json",
        mtype: 'POST',

        height: 320,
        colNames: ['要素编号', '案件负责人', '创建时间', '案件备注', '图片流', '本地地址', '图片', '更新', '关联', '删除'],
        colModel: [{
            name: 'element_id',
            index: 'element_id',
            width: 120,
            sortable: false,
            editable: false,
        }, {
            name: 'element_manager',
            index: 'element_manager',
            width: 130,
            sortable: false,
            editable: false
        }, {
            name: 'create_date',
            index: 'create_date',
            width: 130,
            sortable: false,
            editable: false
        }, {
            name: 'element_remark',
            index: 'element_remark',
            width: 220,
            sortable: false,
            editable: false
        }, {
            name: 'element_image',
            index: 'element_image',
            width: 1,
            sortable: false,
            editable: false,
            hidden: true
        }, {
            name: 'localname',
            index: 'localname',
            width: 1,
            sortable: false,
            editable: false,
            hidden: true
        }, {
            lable: 'operation',
            name: 'show_image',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                //var detail="<img  onclick='btn_detail(\""+ rowObject.clid + "\")'' title='详细信息' src='../../Content/Images/Icon16/application_view_detail.png' style='padding:0px 10px'>";
                return '<img id="show_image" src="http://localhost:8080/pro/images/image_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="showimage(\'' + rows.element_image + '\')"></img>';
            },
        }, {
            lable: 'operation',
            name: 'update',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                var rowdata = JSON.stringify(rows);
                return "<img id='update' src='http://localhost:8080/pro/images/update_button.png'  style= 'cursor:pointer;height:30px;width:30px' onClick='update_burn_sour(" + rowdata + ")'></img>";
            },
        }, {
            lable: 'operation',
            name: 'binding',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                return '<img id="binding" src="http://localhost:8080/pro/images/connect_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="connect_case()"></img>';
            },
        }, {
            lable: 'operation',
            name: 'datele',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                return '<img id="delete" src="http://localhost:8080/pro/images/delete_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="delete_element(\'' + rows.element_id + '\')"></img>';
            },
        }],
        viewrecords: true,
        // toppager: true,
        multiselect: true,
        // multikey: "ctrlKey",
        multiboxonly: true,
        beforeSelectRow: beforeSelectRow,
        loadComplete: function () {
            var table = this;
            setTimeout(function () {
            }, 0);
        },

        onSelectRow: function (id) {
            var selecs = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
            var rowid = $(grid_selector).getGridParam("selrow");
            var rowData = $(grid_selector).getRowData(rowid);
            var cid = rowData.element_id;
            document.getElementById('check_id').value = cid;
            document.getElementById('type_id').value = '4001000';
        },
        autowidth: true
    });
});

jQuery(function ($) {
    var grid_selector = "#table_burn_diffusion";
    var jq = jQuery.noConflict();
    var begin_date;
    var end_date;
    var key_word;

    function beforeSelectRow() {
        $(grid_selector).jqGrid('resetSelection');
        return (true);
    }

    $('#BurnDiffBotton')
        .on(
            'click',
            function () { // 页面上的button按钮的click事件，重新获取参数后发送参数，然后重新加载数据。
                var button_name = this.id;
                document.getElementById('button_name').value = button_name;
                begin_date = $("#begin_date").val();
                end_date = $("#end_date").val();
                key_word = $("#key_word").val();
                document.getElementById('type_id').value = '4004000';
                $(grid_selector)
                    .jqGrid(
                        'setGridParam',
                        {
                            url: '/pro/BurnDiffQueryController/selectAllElement?begin_date='
                                + begin_date
                                + '&end_date='
                                + end_date
                                + '&key_word='
                                + key_word,
                            datatype: "json",
                            mtype: 'POST',
                        }).trigger("reloadGrid"); // 重新载入
            });
    jQuery(grid_selector).jqGrid({
        // direction: "rtl",
        datatype: "json",
        mtype: 'POST',

        height: 320,
        colNames: ['要素编号', '案件负责人', '创建时间', '案件备注', '图片流', '本地地址', '图片', '更新', '关联', '删除'],
        colModel: [{
            name: 'element_id',
            index: 'element_id',
            width: 120,
            sortable: false,
            editable: false,
        }, {
            name: 'element_manager',
            index: 'element_manager',
            width: 130,
            sortable: false,
            editable: false
        }, {
            name: 'create_date',
            index: 'create_date',
            width: 130,
            sortable: false,
            editable: false
        }, {
            name: 'element_remark',
            index: 'element_remark',
            width: 220,
            sortable: false,
            editable: false
        }, {
            name: 'element_image',
            index: 'element_image',
            width: 1,
            sortable: false,
            editable: false,
            hidden: true
        }, {
            name: 'localname',
            index: 'localname',
            width: 1,
            sortable: false,
            editable: false,
            hidden: true
        }, {
            lable: 'operation',
            name: 'show_image',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                //var detail="<img  onclick='btn_detail(\""+ rowObject.clid + "\")'' title='详细信息' src='../../Content/Images/Icon16/application_view_detail.png' style='padding:0px 10px'>";
                return '<img id="show_image" src="http://localhost:8080/pro/images/image_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="showimage(\'' + rows.element_image + '\')"></img>';
            },
        }, {
            lable: 'operation',
            name: 'update',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                var rowdata = JSON.stringify(rows);
                return "<img id='update' src='http://localhost:8080/pro/images/update_button.png'  style= 'cursor:pointer;height:30px;width:30px' onClick='update_burn_diff(" + rowdata + ")'></img>";
            },
        }, {
            lable: 'operation',
            name: 'binding',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                return '<img id="binding" src="http://localhost:8080/pro/images/connect_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="connect_case()"></img>';
            },
        }, {
            lable: 'operation',
            name: 'datele',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                return '<img id="delete" src="http://localhost:8080/pro/images/delete_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="delete_element(\'' + rows.element_id + '\')"></img>';
            },
        }],
        viewrecords: true,
        // toppager: true,
        multiselect: true,
        // multikey: "ctrlKey",
        multiboxonly: true,
        beforeSelectRow: beforeSelectRow,
        loadComplete: function () {
            var table = this;
            setTimeout(function () {
            }, 0);
        },

        onSelectRow: function (id) {
            var selecs = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
            var rowid = $(grid_selector).getGridParam("selrow");
            var rowData = $(grid_selector).getRowData(rowid);
            var cid = rowData.element_id;
            document.getElementById('check_id').value = cid;
            document.getElementById('type_id').value = '4004000';
        },
        autowidth: true
    });
});

jQuery(function ($) {
    var grid_selector = "#table_burn_fuel";
    var jq = jQuery.noConflict();
    var begin_date;
    var end_date;
    var key_word;

    function beforeSelectRow() {
        $(grid_selector).jqGrid('resetSelection');
        return (true);
    }

    $('#BurnFuelBotton')
        .on(
            'click',
            function () { // 页面上的button按钮的click事件，重新获取参数后发送参数，然后重新加载数据。
                var button_name = this.id;
                document.getElementById('button_name').value = button_name;
                begin_date = $("#begin_date").val();
                end_date = $("#end_date").val();
                key_word = $("#key_word").val();
                document.getElementById('type_id').value = '4002000';
                $(grid_selector)
                    .jqGrid(
                        'setGridParam',
                        {
                            url: '/pro/BurnFuelQueryController/selectAllElement?begin_date='
                                + begin_date
                                + '&end_date='
                                + end_date
                                + '&key_word='
                                + key_word,
                            datatype: "json",
                            mtype: 'POST',
                        }).trigger("reloadGrid"); // 重新载入
            });
    jQuery(grid_selector).jqGrid({
        // direction: "rtl",
        datatype: "json",
        mtype: 'POST',

        height: 320,
        colNames: ['要素编号', '案件负责人', '创建时间', '案件备注', '图片流', '本地地址', '图片', '更新', '关联', '删除'],
        colModel: [{
            name: 'element_id',
            index: 'element_id',
            width: 120,
            sortable: false,
            editable: false,
        }, {
            name: 'element_manager',
            index: 'element_manager',
            width: 130,
            sortable: false,
            editable: false
        }, {
            name: 'create_date',
            index: 'create_date',
            width: 130,
            sortable: false,
            editable: false
        }, {
            name: 'element_remark',
            index: 'element_remark',
            width: 220,
            sortable: false,
            editable: false
        }, {
            name: 'element_image',
            index: 'element_image',
            width: 1,
            sortable: false,
            editable: false,
            hidden: true
        }, {
            name: 'localname',
            index: 'localname',
            width: 1,
            sortable: false,
            editable: false,
            hidden: true
        }, {
            lable: 'operation',
            name: 'show_image',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                //var detail="<img  onclick='btn_detail(\""+ rowObject.clid + "\")'' title='详细信息' src='../../Content/Images/Icon16/application_view_detail.png' style='padding:0px 10px'>";
                return '<img id="show_image" src="http://localhost:8080/pro/images/image_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="showimage(\'' + rows.element_image + '\')"></img>';
            },
        }, {
            lable: 'operation',
            name: 'update',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                var rowdata = JSON.stringify(rows);
                return "<img id='update' src='http://localhost:8080/pro/images/update_button.png'  style= 'cursor:pointer;height:30px;width:30px' onClick='update_burn_fuel(" + rowdata + ")'></img>";
            },
        }, {
            lable: 'operation',
            name: 'binding',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                return '<img id="binding" src="http://localhost:8080/pro/images/connect_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="connect_case()"></img>';
            },
        }, {
            lable: 'operation',
            name: 'datele',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                return '<img id="delete" src="http://localhost:8080/pro/images/delete_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="delete_element(\'' + rows.element_id + '\')"></img>';
            },
        }],
        viewrecords: true,
        // toppager: true,
        multiselect: true,
        // multikey: "ctrlKey",
        multiboxonly: true,
        beforeSelectRow: beforeSelectRow,
        loadComplete: function () {
            var table = this;
            setTimeout(function () {
            }, 0);
        },

        onSelectRow: function (id) {
            var selecs = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
            var rowid = $(grid_selector).getGridParam("selrow");
            var rowData = $(grid_selector).getRowData(rowid);
            var cid = rowData.element_id;
            document.getElementById('check_id').value = cid;
            document.getElementById('type_id').value = '4002000';
        },
        autowidth: true
    });
});

jQuery(function ($) {
    var grid_selector = "#table_burn_result";
    var jq = jQuery.noConflict();
    var begin_date;
    var end_date;
    var key_word;

    function beforeSelectRow() {
        $(grid_selector).jqGrid('resetSelection');
        return (true);
    }

    $('#BurnResBotton')
        .on(
            'click',
            function () { // 页面上的button按钮的click事件，重新获取参数后发送参数，然后重新加载数据。
                var button_name = this.id;
                document.getElementById('button_name').value = button_name;
                begin_date = $("#begin_date").val();
                end_date = $("#end_date").val();
                key_word = $("#key_word").val();
                document.getElementById('type_id').value = '4005000';
                $(grid_selector)
                    .jqGrid(
                        'setGridParam',
                        {
                            url: '/pro/BurnResQueryController/selectAllElement?begin_date='
                                + begin_date
                                + '&end_date='
                                + end_date
                                + '&key_word='
                                + key_word,
                            datatype: "json",
                            mtype: 'POST',
                        }).trigger("reloadGrid"); // 重新载入
            });
    jQuery(grid_selector).jqGrid({
        // direction: "rtl",
        datatype: "json",
        mtype: 'POST',

        height: 320,
        colNames: ['要素编号', '案件负责人', '创建时间', '案件备注', '图片流', '本地地址', '图片', '更新', '关联', '删除'],
        colModel: [{
            name: 'element_id',
            index: 'element_id',
            width: 120,
            sortable: false,
            editable: false,
        }, {
            name: 'element_manager',
            index: 'element_manager',
            width: 130,
            sortable: false,
            editable: false
        }, {
            name: 'create_date',
            index: 'create_date',
            width: 130,
            sortable: false,
            editable: false
        }, {
            name: 'element_remark',
            index: 'element_remark',
            width: 220,
            sortable: false,
            editable: false
        }, {
            name: 'element_image',
            index: 'element_image',
            width: 1,
            sortable: false,
            editable: false,
            hidden: true
        }, {
            name: 'localname',
            index: 'localname',
            width: 1,
            sortable: false,
            editable: false,
            hidden: true
        }, {
            lable: 'operation',
            name: 'show_image',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                //var detail="<img  onclick='btn_detail(\""+ rowObject.clid + "\")'' title='详细信息' src='../../Content/Images/Icon16/application_view_detail.png' style='padding:0px 10px'>";
                return '<img id="show_image" src="http://localhost:8080/pro/images/image_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="showimage(\'' + rows.element_image + '\')"></img>';
            },
        }, {
            lable: 'operation',
            name: 'update',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                var rowdata = JSON.stringify(rows);
                return "<img id='update' src='http://localhost:8080/pro/images/update_button.png'  style= 'cursor:pointer;height:30px;width:30px' onClick='update_burn_res(" + rowdata + ")'></img>";
            },
        }, {
            lable: 'operation',
            name: 'binding',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                return '<img id="binding" src="http://localhost:8080/pro/images/connect_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="connect_case()"></img>';
            },
        }, {
            lable: 'operation',
            name: 'datele',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                return '<img id="delete" src="http://localhost:8080/pro/images/delete_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="delete_element(\'' + rows.element_id + '\')"></img>';
            },
        }],
        viewrecords: true,
        // toppager: true,
        multiselect: true,
        // multikey: "ctrlKey",
        multiboxonly: true,
        beforeSelectRow: beforeSelectRow,
        loadComplete: function () {
            var table = this;
            setTimeout(function () {
            }, 0);
        },

        onSelectRow: function (id) {
            var selecs = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
            var rowid = $(grid_selector).getGridParam("selrow");
            var rowData = $(grid_selector).getRowData(rowid);
            var cid = rowData.element_id;
            document.getElementById('check_id').value = cid;
            document.getElementById('type_id').value = '4005000';
        },
        autowidth: true
    });
});

jQuery(function ($) {
    var grid_selector = "#table_burn_subject";
    var jq = jQuery.noConflict();
    var begin_date;
    var end_date;
    var key_word;

    function beforeSelectRow() {
        $(grid_selector).jqGrid('resetSelection');
        return (true);
    }

    $('#BurnSubBotton')
        .on(
            'click',
            function () { // 页面上的button按钮的click事件，重新获取参数后发送参数，然后重新加载数据。
                var button_name = this.id;
                document.getElementById('button_name').value = button_name;
                begin_date = $("#begin_date").val();
                end_date = $("#end_date").val();
                key_word = $("#key_word").val();
                document.getElementById('type_id').value = '4003000';
                $(grid_selector)
                    .jqGrid(
                        'setGridParam',
                        {
                            url: '/pro/BurnSubQueryController/selectAllElement?begin_date='
                                + begin_date
                                + '&end_date='
                                + end_date
                                + '&key_word='
                                + key_word,
                            datatype: "json",
                            mtype: 'POST',
                        }).trigger("reloadGrid"); // 重新载入
            });
    jQuery(grid_selector).jqGrid({
        // direction: "rtl",
        datatype: "json",
        mtype: 'POST',

        height: 320,
        colNames: ['要素编号', '案件负责人', '创建时间', '案件备注', '图片流', '本地地址', '图片', '更新', '关联', '删除'],
        colModel: [{
            name: 'element_id',
            index: 'element_id',
            width: 120,
            sortable: false,
            editable: false,
        }, {
            name: 'element_manager',
            index: 'element_manager',
            width: 130,
            sortable: false,
            editable: false
        }, {
            name: 'create_date',
            index: 'create_date',
            width: 130,
            sortable: false,
            editable: false
        }, {
            name: 'element_remark',
            index: 'element_remark',
            width: 220,
            sortable: false,
            editable: false
        }, {
            name: 'element_image',
            index: 'element_image',
            width: 1,
            sortable: false,
            editable: false,
            hidden: true
        }, {
            name: 'localname',
            index: 'localname',
            width: 1,
            sortable: false,
            editable: false,
            hidden: true
        }, {
            lable: 'operation',
            name: 'show_image',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                //var detail="<img  onclick='btn_detail(\""+ rowObject.clid + "\")'' title='详细信息' src='../../Content/Images/Icon16/application_view_detail.png' style='padding:0px 10px'>";
                return '<img id="show_image" src="http://localhost:8080/pro/images/image_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="showimage(\'' + rows.element_image + '\')"></img>';
            },
        }, {
            lable: 'operation',
            name: 'update',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                var rowdata = JSON.stringify(rows);
                return "<img id='update' src='http://localhost:8080/pro/images/update_button.png'  style= 'cursor:pointer;height:30px;width:30px' onClick='update_burn_sub(" + rowdata + ")'></img>";
            },
        }, {
            lable: 'operation',
            name: 'binding',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                return '<img id="binding" src="http://localhost:8080/pro/images/connect_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="connect_case()"></img>';
            },
        }, {
            lable: 'operation',
            name: 'datele',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                return '<img id="delete" src="http://localhost:8080/pro/images/delete_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="delete_element(\'' + rows.element_id + '\')"></img>';
            },
        }],
        viewrecords: true,
        // toppager: true,
        multiselect: true,
        // multikey: "ctrlKey",
        multiboxonly: true,
        beforeSelectRow: beforeSelectRow,
        loadComplete: function () {
            var table = this;
            setTimeout(function () {
            }, 0);
        },

        onSelectRow: function (id) {
            var selecs = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
            var rowid = $(grid_selector).getGridParam("selrow");
            var rowData = $(grid_selector).getRowData(rowid);
            var cid = rowData.element_id;
            document.getElementById('check_id').value = cid;
            document.getElementById('type_id').value = '4003000';
        },
        autowidth: true
    });
});

jQuery(function ($) {
    var grid_selector = "#table_collision_environment";
    var jq = jQuery.noConflict();
    var begin_date;
    var end_date;
    var key_word;

    function beforeSelectRow() {
        $(grid_selector).jqGrid('resetSelection');
        return (true);
    }

    $('#CollEnvBotton')
        .on(
            'click',
            function () { // 页面上的button按钮的click事件，重新获取参数后发送参数，然后重新加载数据。
                var button_name = this.id;
                document.getElementById('button_name').value = button_name;
                begin_date = $("#begin_date").val();
                end_date = $("#end_date").val();
                key_word = $("#key_word").val();
                document.getElementById('type_id').value = '7004000';
                $(grid_selector)
                    .jqGrid(
                        'setGridParam',
                        {
                            url: '/pro/CollEnvQueryController/selectAllElement?begin_date='
                                + begin_date
                                + '&end_date='
                                + end_date
                                + '&key_word='
                                + key_word,
                            datatype: "json",
                            mtype: 'POST',
                        }).trigger("reloadGrid"); // 重新载入
            });
    jQuery(grid_selector).jqGrid({
        // direction: "rtl",
        datatype: "json",
        mtype: 'POST',

        height: 320,
        colNames: ['要素编号', '案件负责人', '创建时间', '案件备注', '图片流', '本地地址', '图片', '更新', '关联', '删除'],
        colModel: [{
            name: 'element_id',
            index: 'element_id',
            width: 120,
            sortable: false,
            editable: false,
        }, {
            name: 'element_manager',
            index: 'element_manager',
            width: 130,
            sortable: false,
            editable: false
        }, {
            name: 'create_date',
            index: 'create_date',
            width: 130,
            sortable: false,
            editable: false
        }, {
            name: 'element_remark',
            index: 'element_remark',
            width: 220,
            sortable: false,
            editable: false
        }, {
            name: 'element_image',
            index: 'element_image',
            width: 1,
            sortable: false,
            editable: false,
            hidden: true
        }, {
            name: 'localname',
            index: 'localname',
            width: 1,
            sortable: false,
            editable: false,
            hidden: true
        }, {
            lable: 'operation',
            name: 'show_image',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                //var detail="<img  onclick='btn_detail(\""+ rowObject.clid + "\")'' title='详细信息' src='../../Content/Images/Icon16/application_view_detail.png' style='padding:0px 10px'>";
                return '<img id="show_image" src="http://localhost:8080/pro/images/image_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="showimage(\'' + rows.element_image + '\')"></img>';
            },
        }, {
            lable: 'operation',
            name: 'update',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                var rowdata = JSON.stringify(rows);
                return "<img id='update' src='http://localhost:8080/pro/images/update_button.png'  style= 'cursor:pointer;height:30px;width:30px' onClick='update_coll_env(" + rowdata + ")'></img>";
            },
        }, {
            lable: 'operation',
            name: 'binding',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                return '<img id="binding" src="http://localhost:8080/pro/images/connect_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="connect_case()"></img>';
            },
        }, {
            lable: 'operation',
            name: 'datele',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                return '<img id="delete" src="http://localhost:8080/pro/images/delete_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="delete_element(\'' + rows.element_id + '\')"></img>';
            },
        }],
        viewrecords: true,
        // toppager: true,
        multiselect: true,
        // multikey: "ctrlKey",
        multiboxonly: true,
        beforeSelectRow: beforeSelectRow,
        loadComplete: function () {
            var table = this;
            setTimeout(function () {
            }, 0);
        },

        onSelectRow: function (id) {
            var selecs = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
            var rowid = $(grid_selector).getGridParam("selrow");
            var rowData = $(grid_selector).getRowData(rowid);
            var cid = rowData.element_id;
            document.getElementById('check_id').value = cid;
            document.getElementById('type_id').value = '7004000';
        },
        autowidth: true
    });
});

jQuery(function ($) {
    var grid_selector = "#table_collision_fragment";
    var jq = jQuery.noConflict();
    var begin_date;
    var end_date;
    var key_word;

    function beforeSelectRow() {
        $(grid_selector).jqGrid('resetSelection');
        return (true);
    }

    $('#CollFragBotton')
        .on(
            'click',
            function () { // 页面上的button按钮的click事件，重新获取参数后发送参数，然后重新加载数据。
                var button_name = this.id;
                document.getElementById('button_name').value = button_name;
                begin_date = $("#begin_date").val();
                end_date = $("#end_date").val();
                key_word = $("#key_word").val();
                document.getElementById('type_id').value = '7003000';
                $(grid_selector)
                    .jqGrid(
                        'setGridParam',
                        {
                            url: '/pro/CollFragQueryController/selectAllElement?begin_date='
                                + begin_date
                                + '&end_date='
                                + end_date
                                + '&key_word='
                                + key_word,
                            datatype: "json",
                            mtype: 'POST',
                        }).trigger("reloadGrid"); // 重新载入
            });
    jQuery(grid_selector).jqGrid({
        // direction: "rtl",
        datatype: "json",
        mtype: 'POST',

        height: 320,
        colNames: ['要素编号', '案件负责人', '创建时间', '案件备注', '图片流', '本地地址', '图片', '更新', '关联', '删除'],
        colModel: [{
            name: 'element_id',
            index: 'element_id',
            width: 120,
            sortable: false,
            editable: false,
        }, {
            name: 'element_manager',
            index: 'element_manager',
            width: 130,
            sortable: false,
            editable: false
        }, {
            name: 'create_date',
            index: 'create_date',
            width: 130,
            sortable: false,
            editable: false
        }, {
            name: 'element_remark',
            index: 'element_remark',
            width: 220,
            sortable: false,
            editable: false
        }, {
            name: 'element_image',
            index: 'element_image',
            width: 1,
            sortable: false,
            editable: false,
            hidden: true
        }, {
            name: 'localname',
            index: 'localname',
            width: 1,
            sortable: false,
            editable: false,
            hidden: true
        }, {
            lable: 'operation',
            name: 'show_image',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                //var detail="<img  onclick='btn_detail(\""+ rowObject.clid + "\")'' title='详细信息' src='../../Content/Images/Icon16/application_view_detail.png' style='padding:0px 10px'>";
                return '<img id="show_image" src="http://localhost:8080/pro/images/image_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="showimage(\'' + rows.element_image + '\')"></img>';
            },
        }, {
            lable: 'operation',
            name: 'update',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                var rowdata = JSON.stringify(rows);
                return "<img id='update' src='http://localhost:8080/pro/images/update_button.png'  style= 'cursor:pointer;height:30px;width:30px' onClick='update_coll_frag(" + rowdata + ")'></img>";
            },
        }, {
            lable: 'operation',
            name: 'binding',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                return '<img id="binding" src="http://localhost:8080/pro/images/connect_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="connect_case()"></img>';
            },
        }, {
            lable: 'operation',
            name: 'datele',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                return '<img id="delete" src="http://localhost:8080/pro/images/delete_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="delete_element(\'' + rows.element_id + '\')"></img>';
            },
        }],
        viewrecords: true,
        // toppager: true,
        multiselect: true,
        // multikey: "ctrlKey",
        multiboxonly: true,
        beforeSelectRow: beforeSelectRow,
        loadComplete: function () {
            var table = this;
            setTimeout(function () {
            }, 0);
        },

        onSelectRow: function (id) {
            var selecs = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
            var rowid = $(grid_selector).getGridParam("selrow");
            var rowData = $(grid_selector).getRowData(rowid);
            var cid = rowData.element_id;
            document.getElementById('check_id').value = cid;
            document.getElementById('type_id').value = '7003000';
        },
        autowidth: true
    });
});

jQuery(function ($) {
    var grid_selector = "#table_collision_object";
    var jq = jQuery.noConflict();
    var begin_date;
    var end_date;
    var key_word;

    function beforeSelectRow() {
        $(grid_selector).jqGrid('resetSelection');
        return (true);
    }

    $('#CollObjBotton')
        .on(
            'click',
            function () { // 页面上的button按钮的click事件，重新获取参数后发送参数，然后重新加载数据。
                var button_name = this.id;
                document.getElementById('button_name').value = button_name;
                begin_date = $("#begin_date").val();
                end_date = $("#end_date").val();
                key_word = $("#key_word").val();
                document.getElementById('type_id').value = '7002000';
                $(grid_selector)
                    .jqGrid(
                        'setGridParam',
                        {
                            url: '/pro/CollObjQueryController/selectAllElement?begin_date='
                                + begin_date
                                + '&end_date='
                                + end_date
                                + '&key_word='
                                + key_word,
                            datatype: "json",
                            mtype: 'POST',
                        }).trigger("reloadGrid"); // 重新载入
            });
    jQuery(grid_selector).jqGrid({
        // direction: "rtl",
        datatype: "json",
        mtype: 'POST',

        height: 320,
        colNames: ['要素编号', '案件负责人', '创建时间', '案件备注', '图片流', '本地地址', '图片', '更新', '关联', '删除'],
        colModel: [{
            name: 'element_id',
            index: 'element_id',
            width: 120,
            sortable: false,
            editable: false,
        }, {
            name: 'element_manager',
            index: 'element_manager',
            width: 130,
            sortable: false,
            editable: false
        }, {
            name: 'create_date',
            index: 'create_date',
            width: 130,
            sortable: false,
            editable: false
        }, {
            name: 'element_remark',
            index: 'element_remark',
            width: 220,
            sortable: false,
            editable: false
        }, {
            name: 'element_image',
            index: 'element_image',
            width: 1,
            sortable: false,
            editable: false,
            hidden: true
        }, {
            name: 'localname',
            index: 'localname',
            width: 1,
            sortable: false,
            editable: false,
            hidden: true
        }, {
            lable: 'operation',
            name: 'show_image',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                //var detail="<img  onclick='btn_detail(\""+ rowObject.clid + "\")'' title='详细信息' src='../../Content/Images/Icon16/application_view_detail.png' style='padding:0px 10px'>";
                return '<img id="show_image" src="http://localhost:8080/pro/images/image_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="showimage(\'' + rows.element_image + '\')"></img>';
            },
        }, {
            lable: 'operation',
            name: 'update',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                var rowdata = JSON.stringify(rows);
                return "<img id='update' src='http://localhost:8080/pro/images/update_button.png'  style= 'cursor:pointer;height:30px;width:30px' onClick='update_coll_obj(" + rowdata + ")'></img>";
            },
        }, {
            lable: 'operation',
            name: 'binding',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                return '<img id="binding" src="http://localhost:8080/pro/images/connect_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="connect_case()"></img>';
            },
        }, {
            lable: 'operation',
            name: 'datele',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                return '<img id="delete" src="http://localhost:8080/pro/images/delete_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="delete_element(\'' + rows.element_id + '\')"></img>';
            },
        }],
        viewrecords: true,
        // toppager: true,
        multiselect: true,
        // multikey: "ctrlKey",
        multiboxonly: true,
        beforeSelectRow: beforeSelectRow,
        loadComplete: function () {
            var table = this;
            setTimeout(function () {
            }, 0);
        },

        onSelectRow: function (id) {
            var selecs = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
            var rowid = $(grid_selector).getGridParam("selrow");
            var rowData = $(grid_selector).getRowData(rowid);
            var cid = rowData.element_id;
            document.getElementById('check_id').value = cid;
            document.getElementById('type_id').value = '7002000';
        },
        autowidth: true
    });
});

jQuery(function ($) {
    var grid_selector = "#table_collision_subject";
    var jq = jQuery.noConflict();
    var begin_date;
    var end_date;
    var key_word;

    function beforeSelectRow() {
        $(grid_selector).jqGrid('resetSelection');
        return (true);
    }

    $('#CollSubBotton')
        .on(
            'click',
            function () { // 页面上的button按钮的click事件，重新获取参数后发送参数，然后重新加载数据。
                var button_name = this.id;
                document.getElementById('button_name').value = button_name;
                begin_date = $("#begin_date").val();
                end_date = $("#end_date").val();
                key_word = $("#key_word").val();
                document.getElementById('type_id').value = '7001000';
                $(grid_selector)
                    .jqGrid(
                        'setGridParam',
                        {
                            url: '/pro/CollSubQueryController/selectAllElement?begin_date='
                                + begin_date
                                + '&end_date='
                                + end_date
                                + '&key_word='
                                + key_word,
                            datatype: "json",
                            mtype: 'POST',
                        }).trigger("reloadGrid"); // 重新载入
            });
    jQuery(grid_selector).jqGrid({
        // direction: "rtl",
        datatype: "json",
        mtype: 'POST',

        height: 320,
        colNames: ['要素编号', '案件负责人', '创建时间', '案件备注', '图片流', '本地地址', '图片', '更新', '关联', '删除'],
        colModel: [{
            name: 'element_id',
            index: 'element_id',
            width: 120,
            sortable: false,
            editable: false,
        }, {
            name: 'element_manager',
            index: 'element_manager',
            width: 130,
            sortable: false,
            editable: false
        }, {
            name: 'create_date',
            index: 'create_date',
            width: 130,
            sortable: false,
            editable: false
        }, {
            name: 'element_remark',
            index: 'element_remark',
            width: 220,
            sortable: false,
            editable: false
        }, {
            name: 'element_image',
            index: 'element_image',
            width: 1,
            sortable: false,
            editable: false,
            hidden: true
        }, {
            name: 'localname',
            index: 'localname',
            width: 1,
            sortable: false,
            editable: false,
            hidden: true
        }, {
            lable: 'operation',
            name: 'show_image',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                //var detail="<img  onclick='btn_detail(\""+ rowObject.clid + "\")'' title='详细信息' src='../../Content/Images/Icon16/application_view_detail.png' style='padding:0px 10px'>";
                return '<img id="show_image" src="http://localhost:8080/pro/images/image_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="showimage(\'' + rows.element_image + '\')"></img>';
            },
        }, {
            lable: 'operation',
            name: 'update',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                var rowdata = JSON.stringify(rows);
                return "<img id='update' src='http://localhost:8080/pro/images/update_button.png'  style= 'cursor:pointer;height:30px;width:30px' onClick='update_coll_sub(" + rowdata + ")'></img>";
            },
        }, {
            lable: 'operation',
            name: 'binding',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                return '<img id="binding" src="http://localhost:8080/pro/images/connect_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="connect_case()"></img>';
            },
        }, {
            lable: 'operation',
            name: 'datele',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                return '<img id="delete" src="http://localhost:8080/pro/images/delete_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="delete_element(\'' + rows.element_id + '\')"></img>';
            },
        }],
        viewrecords: true,
        // toppager: true,
        multiselect: true,
        // multikey: "ctrlKey",
        multiboxonly: true,
        beforeSelectRow: beforeSelectRow,
        loadComplete: function () {
            var table = this;
            setTimeout(function () {
            }, 0);
        },

        onSelectRow: function (id) {
            var selecs = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
            var rowid = $(grid_selector).getGridParam("selrow");
            var rowData = $(grid_selector).getRowData(rowid);
            var cid = rowData.element_id;
            document.getElementById('check_id').value = cid;
            document.getElementById('type_id').value = '7001000';
        },
        autowidth: true
    });
});

jQuery(function ($) {
    var grid_selector = "#table_explosion_dynamite";
    var jq = jQuery.noConflict();
    var begin_date;
    var end_date;
    var key_word;

    function beforeSelectRow() {
        $(grid_selector).jqGrid('resetSelection');
        return (true);
    }

    $('#ExpDynBotton')
        .on(
            'click',
            function () { // 页面上的button按钮的click事件，重新获取参数后发送参数，然后重新加载数据。
                var button_name = this.id;
                document.getElementById('button_name').value = button_name;
                begin_date = $("#begin_date").val();
                end_date = $("#end_date").val();
                key_word = $("#key_word").val();
                document.getElementById('type_id').value = '5001000';
                $(grid_selector)
                    .jqGrid(
                        'setGridParam',
                        {
                            url: '/pro/ExpDynQueryController/selectAllElement?begin_date='
                                + begin_date
                                + '&end_date='
                                + end_date
                                + '&key_word='
                                + key_word,
                            datatype: "json",
                            mtype: 'POST',
                        }).trigger("reloadGrid"); // 重新载入
            });
    jQuery(grid_selector).jqGrid({
        // direction: "rtl",
        datatype: "json",
        mtype: 'POST',

        height: 320,
        colNames: ['要素编号', '案件负责人', '创建时间', '案件备注', '图片流', '本地地址', '图片', '更新', '关联', '删除'],
        colModel: [{
            name: 'element_id',
            index: 'element_id',
            width: 120,
            sortable: false,
            editable: false,
        }, {
            name: 'element_manager',
            index: 'element_manager',
            width: 130,
            sortable: false,
            editable: false
        }, {
            name: 'create_date',
            index: 'create_date',
            width: 130,
            sortable: false,
            editable: false
        }, {
            name: 'element_remark',
            index: 'element_remark',
            width: 220,
            sortable: false,
            editable: false
        }, {
            name: 'element_image',
            index: 'element_image',
            width: 1,
            sortable: false,
            editable: false,
            hidden: true
        }, {
            name: 'localname',
            index: 'localname',
            width: 1,
            sortable: false,
            editable: false,
            hidden: true
        }, {
            lable: 'operation',
            name: 'show_image',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                //var detail="<img  onclick='btn_detail(\""+ rowObject.clid + "\")'' title='详细信息' src='../../Content/Images/Icon16/application_view_detail.png' style='padding:0px 10px'>";
                return '<img id="show_image" src="http://localhost:8080/pro/images/image_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="showimage(\'' + rows.element_image + '\')"></img>';
            },
        }, {
            lable: 'operation',
            name: 'update',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                var rowdata = JSON.stringify(rows);
                return "<img id='update' src='http://localhost:8080/pro/images/update_button.png'  style= 'cursor:pointer;height:30px;width:30px' onClick='update_exp_dyn(" + rowdata + ")'></img>";
            },
        }, {
            lable: 'operation',
            name: 'binding',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                return '<img id="binding" src="http://localhost:8080/pro/images/connect_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="connect_case()"></img>';
            },
        }, {
            lable: 'operation',
            name: 'datele',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                return '<img id="delete" src="http://localhost:8080/pro/images/delete_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="delete_element(\'' + rows.element_id + '\')"></img>';
            },
        }],
        viewrecords: true,
        // toppager: true,
        multiselect: true,
        // multikey: "ctrlKey",
        multiboxonly: true,
        beforeSelectRow: beforeSelectRow,
        loadComplete: function () {
            var table = this;
            setTimeout(function () {
            }, 0);
        },

        onSelectRow: function (id) {
            var selecs = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
            var rowid = $(grid_selector).getGridParam("selrow");
            var rowData = $(grid_selector).getRowData(rowid);
            var cid = rowData.element_id;
            document.getElementById('check_id').value = cid;
            document.getElementById('type_id').value = '5001000';
        },
        autowidth: true
    });
});

jQuery(function ($) {
    var grid_selector = "#table_explosion_fragment";
    var jq = jQuery.noConflict();
    var begin_date;
    var end_date;
    var key_word;

    function beforeSelectRow() {
        $(grid_selector).jqGrid('resetSelection');
        return (true);
    }

    $('#ExpFragBotton')
        .on(
            'click',
            function () { // 页面上的button按钮的click事件，重新获取参数后发送参数，然后重新加载数据。
                var button_name = this.id;
                document.getElementById('button_name').value = button_name;
                begin_date = $("#begin_date").val();
                end_date = $("#end_date").val();
                key_word = $("#key_word").val();
                document.getElementById('type_id').value = '5004000';
                $(grid_selector)
                    .jqGrid(
                        'setGridParam',
                        {
                            url: '/pro/ExpFragQueryController/selectAllElement?begin_date='
                                + begin_date
                                + '&end_date='
                                + end_date
                                + '&key_word='
                                + key_word,
                            datatype: "json",
                            mtype: 'POST',
                        }).trigger("reloadGrid"); // 重新载入
            });
    jQuery(grid_selector).jqGrid({
        // direction: "rtl",
        datatype: "json",
        mtype: 'POST',

        height: 320,
        colNames: ['要素编号', '案件负责人', '创建时间', '案件备注', '图片流', '本地地址', '图片', '更新', '关联', '删除'],
        colModel: [{
            name: 'element_id',
            index: 'element_id',
            width: 120,
            sortable: false,
            editable: false,
        }, {
            name: 'element_manager',
            index: 'element_manager',
            width: 130,
            sortable: false,
            editable: false
        }, {
            name: 'create_date',
            index: 'create_date',
            width: 130,
            sortable: false,
            editable: false
        }, {
            name: 'element_remark',
            index: 'element_remark',
            width: 220,
            sortable: false,
            editable: false
        }, {
            name: 'element_image',
            index: 'element_image',
            width: 1,
            sortable: false,
            editable: false,
            hidden: true
        }, {
            name: 'localname',
            index: 'localname',
            width: 1,
            sortable: false,
            editable: false,
            hidden: true
        }, {
            lable: 'operation',
            name: 'show_image',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                //var detail="<img  onclick='btn_detail(\""+ rowObject.clid + "\")'' title='详细信息' src='../../Content/Images/Icon16/application_view_detail.png' style='padding:0px 10px'>";
                return '<img id="show_image" src="http://localhost:8080/pro/images/image_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="showimage(\'' + rows.element_image + '\')"></img>';
            },
        }, {
            lable: 'operation',
            name: 'update',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                var rowdata = JSON.stringify(rows);
                return "<img id='update' src='http://localhost:8080/pro/images/update_button.png'  style= 'cursor:pointer;height:30px;width:30px' onClick='update_exp_frag(" + rowdata + ")'></img>";
            },
        }, {
            lable: 'operation',
            name: 'binding',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                return '<img id="binding" src="http://localhost:8080/pro/images/connect_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="connect_case()"></img>';
            },
        }, {
            lable: 'operation',
            name: 'datele',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                return '<img id="delete" src="http://localhost:8080/pro/images/delete_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="delete_element(\'' + rows.element_id + '\')"></img>';
            },
        }],
        viewrecords: true,
        // toppager: true,
        multiselect: true,
        // multikey: "ctrlKey",
        multiboxonly: true,
        beforeSelectRow: beforeSelectRow,
        loadComplete: function () {
            var table = this;
            setTimeout(function () {
            }, 0);
        },

        onSelectRow: function (id) {
            var selecs = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
            var rowid = $(grid_selector).getGridParam("selrow");
            var rowData = $(grid_selector).getRowData(rowid);
            var cid = rowData.element_id;
            document.getElementById('check_id').value = cid;
            document.getElementById('type_id').value = '5004000';
        },
        autowidth: true
    });
});

jQuery(function ($) {
    var grid_selector = "#table_explosion_source";
    var jq = jQuery.noConflict();
    var begin_date;
    var end_date;
    var key_word;

    function beforeSelectRow() {
        $(grid_selector).jqGrid('resetSelection');
        return (true);
    }

    $('#ExpSourBotton')
        .on(
            'click',
            function () { // 页面上的button按钮的click事件，重新获取参数后发送参数，然后重新加载数据。
                var button_name = this.id;
                document.getElementById('button_name').value = button_name;
                begin_date = $("#begin_date").val();
                end_date = $("#end_date").val();
                key_word = $("#key_word").val();
                document.getElementById('type_id').value = '5002000';
                $(grid_selector)
                    .jqGrid(
                        'setGridParam',
                        {
                            url: '/pro/ExpSourQueryController/selectAllElement?begin_date='
                                + begin_date
                                + '&end_date='
                                + end_date
                                + '&key_word='
                                + key_word,
                            datatype: "json",
                            mtype: 'POST',
                        }).trigger("reloadGrid"); // 重新载入
            });
    jQuery(grid_selector).jqGrid({
        // direction: "rtl",
        datatype: "json",
        mtype: 'POST',

        height: 320,
        colNames: ['要素编号', '案件负责人', '创建时间', '案件备注', '图片流', '本地地址', '图片', '更新', '关联', '删除'],
        colModel: [{
            name: 'element_id',
            index: 'element_id',
            width: 120,
            sortable: false,
            editable: false,
        }, {
            name: 'element_manager',
            index: 'element_manager',
            width: 130,
            sortable: false,
            editable: false
        }, {
            name: 'create_date',
            index: 'create_date',
            width: 130,
            sortable: false,
            editable: false
        }, {
            name: 'element_remark',
            index: 'element_remark',
            width: 220,
            sortable: false,
            editable: false
        }, {
            name: 'element_image',
            index: 'element_image',
            width: 1,
            sortable: false,
            editable: false,
            hidden: true
        }, {
            name: 'localname',
            index: 'localname',
            width: 1,
            sortable: false,
            editable: false,
            hidden: true
        }, {
            lable: 'operation',
            name: 'show_image',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                //var detail="<img  onclick='btn_detail(\""+ rowObject.clid + "\")'' title='详细信息' src='../../Content/Images/Icon16/application_view_detail.png' style='padding:0px 10px'>";
                return '<img id="show_image" src="http://localhost:8080/pro/images/image_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="showimage(\'' + rows.element_image + '\')"></img>';
            },
        }, {
            lable: 'operation',
            name: 'update',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                var rowdata = JSON.stringify(rows);
                return "<img id='update' src='http://localhost:8080/pro/images/update_button.png'  style= 'cursor:pointer;height:30px;width:30px' onClick='update_exp_sour(" + rowdata + ")'></img>";
            },
        }, {
            lable: 'operation',
            name: 'binding',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                return '<img id="binding" src="http://localhost:8080/pro/images/connect_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="connect_case()"></img>';
            },
        }, {
            lable: 'operation',
            name: 'datele',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                return '<img id="delete" src="http://localhost:8080/pro/images/delete_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="delete_element(\'' + rows.element_id + '\')"></img>';
            },
        }],
        viewrecords: true,
        // toppager: true,
        multiselect: true,
        // multikey: "ctrlKey",
        multiboxonly: true,
        beforeSelectRow: beforeSelectRow,
        loadComplete: function () {
            var table = this;
            setTimeout(function () {
            }, 0);
        },

        onSelectRow: function (id) {
            var selecs = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
            var rowid = $(grid_selector).getGridParam("selrow");
            var rowData = $(grid_selector).getRowData(rowid);
            var cid = rowData.element_id;
            document.getElementById('check_id').value = cid;
            document.getElementById('type_id').value = '5002000';
        },
        autowidth: true
    });
});

jQuery(function ($) {
    var grid_selector = "#table_explosion_subject";
    var jq = jQuery.noConflict();
    var begin_date;
    var end_date;
    var key_word;

    function beforeSelectRow() {
        $(grid_selector).jqGrid('resetSelection');
        return (true);
    }

    $('#ExpSubBotton')
        .on(
            'click',
            function () { // 页面上的button按钮的click事件，重新获取参数后发送参数，然后重新加载数据。
                var button_name = this.id;

                document.getElementById('button_name').value = button_name;
                begin_date = $("#begin_date").val();
                end_date = $("#end_date").val();
                key_word = $("#key_word").val();
                document.getElementById('type_id').value = '5003000';
                $(grid_selector)
                    .jqGrid(
                        'setGridParam',
                        {
                            url: '/pro/ExpSubQueryController/selectAllElement?begin_date='
                                + begin_date
                                + '&end_date='
                                + end_date
                                + '&key_word='
                                + key_word,
                            datatype: "json",
                            mtype: 'POST',
                        }).trigger("reloadGrid"); // 重新载入
            });
    jQuery(grid_selector).jqGrid({
        // direction: "rtl",
        datatype: "json",
        mtype: 'POST',

        height: 320,
        colNames: ['要素编号', '案件负责人', '创建时间', '案件备注', '图片流', '本地地址', '图片', '更新', '关联', '删除'],
        colModel: [{
            name: 'element_id',
            index: 'element_id',
            width: 120,
            sortable: false,
            editable: false,
        }, {
            name: 'element_manager',
            index: 'element_manager',
            width: 130,
            sortable: false,
            editable: false
        }, {
            name: 'create_date',
            index: 'create_date',
            width: 130,
            sortable: false,
            editable: false
        }, {
            name: 'element_remark',
            index: 'element_remark',
            width: 220,
            sortable: false,
            editable: false
        }, {
            name: 'element_image',
            index: 'element_image',
            width: 1,
            sortable: false,
            editable: false,
            hidden: true
        }, {
            name: 'localname',
            index: 'localname',
            width: 1,
            sortable: false,
            editable: false,
            hidden: true
        }, {
            lable: 'operation',
            name: 'show_image',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                //var detail="<img  onclick='btn_detail(\""+ rowObject.clid + "\")'' title='详细信息' src='../../Content/Images/Icon16/application_view_detail.png' style='padding:0px 10px'>";
                return '<img id="show_image" src="http://localhost:8080/pro/images/image_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="showimage(\'' + rows.element_image + '\')"></img>';
            },
        }, {
            lable: 'operation',
            name: 'update',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                var rowdata = JSON.stringify(rows);
                return "<img id='update' src='http://localhost:8080/pro/images/update_button.png'  style= 'cursor:pointer;height:30px;width:30px' onClick='update_exp_sub(" + rowdata + ")'></img>";
            },
        }, {
            lable: 'operation',
            name: 'binding',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                return '<img id="binding" src="http://localhost:8080/pro/images/connect_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="connect_case()"></img>';
            },
        }, {
            lable: 'operation',
            name: 'datele',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                return '<img id="delete" src="http://localhost:8080/pro/images/delete_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="delete_element(\'' + rows.element_id + '\')"></img>';
            },
        }],
        viewrecords: true,
        // toppager: true,
        multiselect: true,
        // multikey: "ctrlKey",
        multiboxonly: true,
        beforeSelectRow: beforeSelectRow,
        loadComplete: function () {
            var table = this;
            setTimeout(function () {
            }, 0);
        },

        onSelectRow: function (id) {
            var selecs = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
            var rowid = $(grid_selector).getGridParam("selrow");
            var rowData = $(grid_selector).getRowData(rowid);
            var cid = rowData.element_id;
            document.getElementById('check_id').value = cid;
            document.getElementById('type_id').value = '5003000';
        },
        autowidth: true
    });
});

jQuery(function ($) {
    var grid_selector = "#table_kill_criminal";
    var jq = jQuery.noConflict();
    var begin_date;
    var end_date;
    var key_word;

    function beforeSelectRow() {
        $(grid_selector).jqGrid('resetSelection');
        return (true);
    }

    $('#KillCriBotton')
        .on(
            'click',
            function () { // 页面上的button按钮的click事件，重新获取参数后发送参数，然后重新加载数据。
                var button_name = this.id;
                document.getElementById('button_name').value = button_name;
                begin_date = $("#begin_date").val();
                end_date = $("#end_date").val();
                key_word = $("#key_word").val();
                document.getElementById('type_id').value = '6002000';
                $(grid_selector)
                    .jqGrid(
                        'setGridParam',
                        {
                            url: '/pro/KillCriQueryController/selectAllElement?begin_date='
                                + begin_date
                                + '&end_date='
                                + end_date
                                + '&key_word='
                                + key_word,
                            datatype: "json",
                            mtype: 'POST',
                        }).trigger("reloadGrid"); // 重新载入
            });
    jQuery(grid_selector).jqGrid({
        // direction: "rtl",
        datatype: "json",
        mtype: 'POST',

        height: 320,
        colNames: ['要素编号', '案件负责人', '创建时间', '案件备注', '图片流', '本地地址', '图片', '更新', '关联', '删除'],
        colModel: [{
            name: 'element_id',
            index: 'element_id',
            width: 120,
            sortable: false,
            editable: false,
        }, {
            name: 'element_manager',
            index: 'element_manager',
            width: 130,
            sortable: false,
            editable: false
        }, {
            name: 'create_date',
            index: 'create_date',
            width: 130,
            sortable: false,
            editable: false
        }, {
            name: 'element_remark',
            index: 'element_remark',
            width: 220,
            sortable: false,
            editable: false
        }, {
            name: 'element_image',
            index: 'element_image',
            width: 1,
            sortable: false,
            editable: false,
            hidden: true
        }, {
            name: 'localname',
            index: 'localname',
            width: 1,
            sortable: false,
            editable: false,
            hidden: true
        }, {
            lable: 'operation',
            name: 'show_image',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                //var detail="<img  onclick='btn_detail(\""+ rowObject.clid + "\")'' title='详细信息' src='../../Content/Images/Icon16/application_view_detail.png' style='padding:0px 10px'>";
                return '<img id="show_image" src="http://localhost:8080/pro/images/image_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="showimage(\'' + rows.element_image + '\')"></img>';
            },
        }, {
            lable: 'operation',
            name: 'update',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                var rowdata = JSON.stringify(rows);
                return "<img id='update' src='http://localhost:8080/pro/images/update_button.png'  style= 'cursor:pointer;height:30px;width:30px' onClick='update_kill_cri(" + rowdata + ")'></img>";
            },
        }, {
            lable: 'operation',
            name: 'binding',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                return '<img id="binding" src="http://localhost:8080/pro/images/connect_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="connect_case()"></img>';
            },
        }, {
            lable: 'operation',
            name: 'datele',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                return '<img id="delete" src="http://localhost:8080/pro/images/delete_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="delete_element(\'' + rows.element_id + '\')"></img>';
            },
        }],
        viewrecords: true,
        // toppager: true,
        multiselect: true,
        // multikey: "ctrlKey",
        multiboxonly: true,
        beforeSelectRow: beforeSelectRow,
        loadComplete: function () {
            var table = this;
            setTimeout(function () {
            }, 0);
        },

        onSelectRow: function (id) {
            var selecs = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
            var rowid = $(grid_selector).getGridParam("selrow");
            var rowData = $(grid_selector).getRowData(rowid);
            var cid = rowData.element_id;
            document.getElementById('check_id').value = cid;
            document.getElementById('type_id').value = '6002000';
        },
        autowidth: true
    });
});

jQuery(function ($) {
    var grid_selector = "#table_kill_environment";
    var jq = jQuery.noConflict();
    var begin_date;
    var end_date;
    var key_word;

    function beforeSelectRow() {
        $(grid_selector).jqGrid('resetSelection');
        return (true);
    }

    $('#KillEnvBotton')
        .on(
            'click',
            function () { // 页面上的button按钮的click事件，重新获取参数后发送参数，然后重新加载数据。
                var button_name = this.id;
                document.getElementById('button_name').value = button_name;
                begin_date = $("#begin_date").val();
                end_date = $("#end_date").val();
                key_word = $("#key_word").val();
                document.getElementById('type_id').value = '6004000';
                $(grid_selector)
                    .jqGrid(
                        'setGridParam',
                        {
                            url: '/pro/KillEnvQueryController/selectAllElement?begin_date='
                                + begin_date
                                + '&end_date='
                                + end_date
                                + '&key_word='
                                + key_word,
                            datatype: "json",
                            mtype: 'POST',
                        }).trigger("reloadGrid"); // 重新载入
            });
    jQuery(grid_selector).jqGrid({
        // direction: "rtl",
        datatype: "json",
        mtype: 'POST',

        height: 320,
        colNames: ['要素编号', '案件负责人', '创建时间', '案件备注', '图片流', '本地地址', '图片', '更新', '关联', '删除'],
        colModel: [{
            name: 'element_id',
            index: 'element_id',
            width: 120,
            sortable: false,
            editable: false,
        }, {
            name: 'element_manager',
            index: 'element_manager',
            width: 130,
            sortable: false,
            editable: false
        }, {
            name: 'create_date',
            index: 'create_date',
            width: 130,
            sortable: false,
            editable: false
        }, {
            name: 'element_remark',
            index: 'element_remark',
            width: 220,
            sortable: false,
            editable: false
        }, {
            name: 'element_image',
            index: 'element_image',
            width: 1,
            sortable: false,
            editable: false,
            hidden: true
        }, {
            name: 'localname',
            index: 'localname',
            width: 1,
            sortable: false,
            editable: false,
            hidden: true
        }, {
            lable: 'operation',
            name: 'show_image',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                //var detail="<img  onclick='btn_detail(\""+ rowObject.clid + "\")'' title='详细信息' src='../../Content/Images/Icon16/application_view_detail.png' style='padding:0px 10px'>";
                return '<img id="show_image" src="http://localhost:8080/pro/images/image_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="showimage(\'' + rows.element_image + '\')"></img>';
            },
        }, {
            lable: 'operation',
            name: 'update',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                var rowdata = JSON.stringify(rows);
                return "<img id='update' src='http://localhost:8080/pro/images/update_button.png'  style= 'cursor:pointer;height:30px;width:30px' onClick='update_kill_env(" + rowdata + ")'></img>";
            },
        }, {
            lable: 'operation',
            name: 'binding',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                return '<img id="binding" src="http://localhost:8080/pro/images/connect_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="connect_case()"></img>';
            },
        }, {
            lable: 'operation',
            name: 'datele',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                return '<img id="delete" src="http://localhost:8080/pro/images/delete_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="delete_element(\'' + rows.element_id + '\')"></img>';
            },
        }],
        viewrecords: true,
        // toppager: true,
        multiselect: true,
        // multikey: "ctrlKey",
        multiboxonly: true,
        beforeSelectRow: beforeSelectRow,
        loadComplete: function () {
            var table = this;
            setTimeout(function () {
            }, 0);
        },

        onSelectRow: function (id) {
            var selecs = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
            var rowid = $(grid_selector).getGridParam("selrow");
            var rowData = $(grid_selector).getRowData(rowid);
            var cid = rowData.element_id;
            document.getElementById('check_id').value = cid;
            document.getElementById('type_id').value = '6004000';
        },
        autowidth: true
    });
});

jQuery(function ($) {
    var grid_selector = "#table_kill_victem";
    var jq = jQuery.noConflict();
    var begin_date;
    var end_date;
    var key_word;

    function beforeSelectRow() {
        $(grid_selector).jqGrid('resetSelection');
        return (true);
    }

    $('#KillVicBotton')
        .on(
            'click',
            function () { // 页面上的button按钮的click事件，重新获取参数后发送参数，然后重新加载数据。
                var button_name = this.id;
                document.getElementById('button_name').value = button_name;
                begin_date = $("#begin_date").val();
                end_date = $("#end_date").val();
                key_word = $("#key_word").val();
                document.getElementById('type_id').value = '6001000';
                $(grid_selector)
                    .jqGrid(
                        'setGridParam',
                        {
                            url: '/pro/KillVicQueryController/selectAllElement?begin_date='
                                + begin_date
                                + '&end_date='
                                + end_date
                                + '&key_word='
                                + key_word,
                            datatype: "json",
                            mtype: 'POST',
                        }).trigger("reloadGrid"); // 重新载入
            });
    jQuery(grid_selector).jqGrid({
        // direction: "rtl",
        datatype: "json",
        mtype: 'POST',

        height: 320,
        colNames: ['要素编号', '案件负责人', '创建时间', '案件备注', '图片流', '本地地址', '图片', '更新', '关联', '删除'],
        colModel: [{
            name: 'element_id',
            index: 'element_id',
            width: 120,
            sortable: false,
            editable: false,
        }, {
            name: 'element_manager',
            index: 'element_manager',
            width: 130,
            sortable: false,
            editable: false
        }, {
            name: 'create_date',
            index: 'create_date',
            width: 130,
            sortable: false,
            editable: false
        }, {
            name: 'element_remark',
            index: 'element_remark',
            width: 220,
            sortable: false,
            editable: false
        }, {
            name: 'element_image',
            index: 'element_image',
            width: 1,
            sortable: false,
            editable: false,
            hidden: true
        }, {
            name: 'localname',
            index: 'localname',
            width: 1,
            sortable: false,
            editable: false,
            hidden: true
        }, {
            lable: 'operation',
            name: 'show_image',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                //var detail="<img  onclick='btn_detail(\""+ rowObject.clid + "\")'' title='详细信息' src='../../Content/Images/Icon16/application_view_detail.png' style='padding:0px 10px'>";
                return '<img id="show_image" src="http://localhost:8080/pro/images/image_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="showimage(\'' + rows.element_image + '\')"></img>';
            },
        }, {
            lable: 'operation',
            name: 'update',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                var rowdata = JSON.stringify(rows);
                return "<img id='update' src='http://localhost:8080/pro/images/update_button.png'  style= 'cursor:pointer;height:30px;width:30px' onClick='update_kill_vic(" + rowdata + ")'></img>";
            },
        }, {
            lable: 'operation',
            name: 'binding',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                return '<img id="binding" src="http://localhost:8080/pro/images/connect_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="connect_case()"></img>';
            },
        }, {
            lable: 'operation',
            name: 'datele',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                return '<img id="delete" src="http://localhost:8080/pro/images/delete_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="delete_element(\'' + rows.element_id + '\')"></img>';
            },
        }],
        viewrecords: true,
        // toppager: true,
        multiselect: true,
        // multikey: "ctrlKey",
        multiboxonly: true,
        beforeSelectRow: beforeSelectRow,
        loadComplete: function () {
            var table = this;
            setTimeout(function () {
            }, 0);
        },

        onSelectRow: function (id) {
            var selecs = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
            var rowid = $(grid_selector).getGridParam("selrow");
            var rowData = $(grid_selector).getRowData(rowid);
            var cid = rowData.element_id;
            document.getElementById('check_id').value = cid;
            document.getElementById('type_id').value = '6001000';
        },
        autowidth: true
    });
});

jQuery(function ($) {
    var grid_selector = "#table_kill_weapon";
    var jq = jQuery.noConflict();
    var begin_date;
    var end_date;
    var key_word;

    function beforeSelectRow() {
        $(grid_selector).jqGrid('resetSelection');
        return (true);
    }

    $('#KillWeaBotton')
        .on(
            'click',
            function () { // 页面上的button按钮的click事件，重新获取参数后发送参数，然后重新加载数据。
                var button_name = this.id;
                document.getElementById('button_name').value = button_name;
                begin_date = $("#begin_date").val();
                end_date = $("#end_date").val();
                key_word = $("#key_word").val();
                document.getElementById('type_id').value = '6003000';
                $(grid_selector)
                    .jqGrid(
                        'setGridParam',
                        {
                            url: '/pro/KillWeaQueryController/selectAllElement?begin_date='
                                + begin_date
                                + '&end_date='
                                + end_date
                                + '&key_word='
                                + key_word,
                            datatype: "json",
                            mtype: 'POST',
                        }).trigger("reloadGrid"); // 重新载入
            });
    jQuery(grid_selector).jqGrid({
        // direction: "rtl",
        datatype: "json",
        mtype: 'POST',

        height: 320,
        colNames: ['要素编号', '案件负责人', '创建时间', '案件备注', '图片流', '本地地址', '图片', '更新', '关联', '删除'],
        colModel: [{
            name: 'element_id',
            index: 'element_id',
            width: 120,
            sortable: false,
            editable: false,
        }, {
            name: 'element_manager',
            index: 'element_manager',
            width: 130,
            sortable: false,
            editable: false
        }, {
            name: 'create_date',
            index: 'create_date',
            width: 130,
            sortable: false,
            editable: false
        }, {
            name: 'element_remark',
            index: 'element_remark',
            width: 220,
            sortable: false,
            editable: false
        }, {
            name: 'element_image',
            index: 'element_image',
            width: 1,
            sortable: false,
            editable: false,
            hidden: true
        }, {
            name: 'localname',
            index: 'localname',
            width: 1,
            sortable: false,
            editable: false,
            hidden: true
        }, {
            lable: 'operation',
            name: 'show_image',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                //var detail="<img  onclick='btn_detail(\""+ rowObject.clid + "\")'' title='详细信息' src='../../Content/Images/Icon16/application_view_detail.png' style='padding:0px 10px'>";
                return '<img id="show_image" src="http://localhost:8080/pro/images/image_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="showimage(\'' + rows.element_image + '\')"></img>';
            },
        }, {
            lable: 'operation',
            name: 'update',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                var rowdata = JSON.stringify(rows);
                return "<img id='update' src='http://localhost:8080/pro/images/update_button.png'  style= 'cursor:pointer;height:30px;width:30px' onClick='update_kill_wea(" + rowdata + ")'></img>";
            },
        }, {
            lable: 'operation',
            name: 'binding',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                return '<img id="binding" src="http://localhost:8080/pro/images/connect_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="connect_case()"></img>';
            },
        }, {
            lable: 'operation',
            name: 'datele',
            width: 50,
            align: 'center',
            formatter: function (value, grid, rows, state) {
                return '<img id="delete" src="http://localhost:8080/pro/images/delete_button.png"  style= "cursor:pointer;height:30px;width:30px" onClick="delete_element(\'' + rows.element_id + '\')"></img>';
            },
        }],
        viewrecords: true,
        // toppager: true,
        multiselect: true,
        // multikey: "ctrlKey",
        multiboxonly: true,
        beforeSelectRow: beforeSelectRow,
        loadComplete: function () {
            var table = this;
            setTimeout(function () {
            }, 0);
        },

        onSelectRow: function (id) {
            var selecs = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
            var rowid = $(grid_selector).getGridParam("selrow");
            var rowData = $(grid_selector).getRowData(rowid);
            var cid = rowData.element_id;
            document.getElementById('check_id').value = cid;
            document.getElementById('type_id').value = '6003000';
        },
        autowidth: true
    });
});

jQuery(function ($) {
    var grid_selector = "#table_burn";
    var jq = jQuery.noConflict();
    var from1;
    var to1;
    var pro1;
    var city1;
    var dis1;

    function beforeSelectRow() {
        $(grid_selector).jqGrid('resetSelection');
        return (true);
    }

    $('#CaseBurn')
        .on(
            'click',
            function () {
                from1 = $(".from").val();
                to1 = $(".to").val();
                pro1 = $('#prov').val();
                city1 = $('#city').val();
                dis1 = $('#dis').val();
                console.log(from1 + "," + to1 + "," + pro1 + ","
                    + city1 + "," + dis1);
                $(grid_selector)
                    .jqGrid(
                        'setGridParam',
                        {
                            url: '/pro/CaseQueryController/getBurnCase?beginTime='
                                + from1
                                + '&endTime='
                                + to1
                                + '&pro='
                                + pro1
                                + '&city='
                                + city1 + '&dis=' + dis1,
                            datatype: "json",
                            mtype: 'POST',
                        }).trigger("reloadGrid"); // 重新载入
            });

    jQuery(grid_selector).jqGrid({
        // direction: "rtl",
        datatype: "json",
        mtype: 'POST',

        height: 320,
        colNames: ['案件编号', '案件时间', '案件地点', '案件描述'],
        colModel: [{
            name: 'case_id',
            index: 'case_id',
            width: 35,
            sorttype: "int",
            editable: false
        }, {
            name: 'case_time',
            index: 'case_time',
            width: 40,
            editable: false
        }, {
            name: 'case_location',
            index: 'case_location',
            width: 80,
            sortable: false,
            editable: false
        }, {
            name: 'case_desc',
            index: 'case_desc',
            width: 50,
            sortable: false,
            editable: false
        }],
        viewrecords: true,
        // toppager: true,
        multiselect: true,
        // multikey: "ctrlKey",
        multiboxonly: true,
        beforeSelectRow: beforeSelectRow,
        loadComplete: function () {
            var table = this;
            setTimeout(function () {
            }, 0);
        },
        autowidth: true
    });
});

jQuery(function ($) {
    var grid_selector = "#table_pointinfo";
    var jq = jQuery.noConflict();
    var from2;
    var to2;
    var centerx;
    var centery;

    function beforeSelectRow() {
        $(grid_selector).jqGrid('resetSelection');
        return (true);
    }

    $('#searchPC')
        .on(
            'click',
            function () { // 页面上的button按钮的click事件，重新获取参数后发送参数，然后重新加载数据。
                console.log("#table_pointinfo");
                from2 = $("#pointfrom").val();
                to2 = $("#pointto").val();
                centerx = $('#pointlat').val();
                centery = $('#pointlon').val();
                if (from2.length == 0) {
                    from2 = '2000-01-01';
                }
                if (to2.length == 0) {
                    to2 = '2030-01-01';
                }
                console.log(from2 + "," + to2 + "," + centerx + ","
                    + centerx.length + "," + centery);
                if (centerx.length == 0 || centery.length == 0) {
                    console.log("branch1");
                    $(grid_selector)
                        .jqGrid(
                            'setGridParam',
                            {
                                url: '/pro/PointInfoQueryController/getPointTimeRangeInfo?begin='
                                    + from2 + '&end=' + to2,
                                datatype: "json",
                                mtype: 'POST',
                            }).trigger("reloadGrid"); // 重新载入
                } else {
                    console.log("branch2");
                    $(grid_selector)
                        .jqGrid(
                            'setGridParam',
                            {
                                url: '/pro/PointInfoQueryController/getPointInfo?begin='
                                    + from2
                                    + '&end='
                                    + to2
                                    + '&px='
                                    + centerx
                                    + '&py=' + centery,
                                datatype: "json",
                                mtype: 'POST',
                            }).trigger("reloadGrid"); // 重新载入
                }
            });

    jQuery(grid_selector).jqGrid({
        // direction: "rtl",
        datatype: "json",
        mtype: 'POST',

        height: 200,
        colNames: ['标识', '入库时间', '状态', '描述'],
        colModel: [{
            name: 'id',
            index: 'id',
            width: 30,
            sortable: false,
            editable: false
        }, {
            name: 'createTime',
            index: 'createTime',
            width: 80,
            sorttype: "string",
            editable: false
        }, {
            name: 'productstatus',
            index: 'productstatus',
            width: 30,
            editable: false,
            sorttype: "string"
        }, {
            name: 'comments',
            index: 'comments',
            width: 60,
            sortable: false,
            editable: false
        }],
        viewrecords: true,
        // toppager: true,
        multiselect: true,
        // multikey: "ctrlKey",
        multiboxonly: true,
        beforeSelectRow: beforeSelectRow,
        loadComplete: function () {
            var table = this;
            setTimeout(function () {
            }, 0);
        },
        onSelectRow: function (id) {
            var selecs = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
            var rowid = $(grid_selector).getGridParam("selrow");
            var rowData = $(grid_selector).getRowData(rowid);
            var cid = rowData.id;
            console.log("sceneid " + cid);
            document.getElementById('sceneid').value = cid;
        },
        autowidth: true
    });
});

jQuery(function ($) {
    var grid_selector = "#table_modelinfo";
    var jq = jQuery.noConflict();
    var from2;
    var to2;
    var centerx;
    var centery;

    function beforeSelectRow() {
        $(grid_selector).jqGrid('resetSelection');
        return (true);
    }

    $('#searchModel')
        .on(
            'click',
            function () { // 页面上的button按钮的click事件，重新获取参数后发送参数，然后重新加载数据。
                console.log("#table_modelinfo");
                from2 = $("#modelfrom").val();
                to2 = $("#modelto").val();
                centerx = $('#modellat').val();
                centery = $('#modellon').val();
                if (from2.length == 0) {
                    from2 = '2000-01-01';
                }
                if (to2.length == 0) {
                    to2 = '2030-01-01';
                }
                console.log(from2 + "," + to2 + "," + centerx + ","
                    + centerx.length + "," + centery);
                if (centerx.length == 0 || centery.length == 0) {
                    $(grid_selector)
                        .jqGrid(
                            'setGridParam',
                            {
                                url: '/pro/ModelInfoQueryController/getModelTimeRangeInfo?begin='
                                    + from2 + '&end=' + to2,
                                datatype: "json",
                                mtype: 'POST',
                            }).trigger("reloadGrid"); // 重新载入
                } else {
                    $(grid_selector)
                        .jqGrid(
                            'setGridParam',
                            {
                                url: '/pro/ModelInfoQueryController/getModelInfo?begin='
                                    + from2
                                    + '&end='
                                    + to2
                                    + '&px='
                                    + centerx
                                    + '&py=' + centery,
                                datatype: "json",
                                mtype: 'POST',
                            }).trigger("reloadGrid"); // 重新载入
                }
            });

    jQuery(grid_selector).jqGrid({
        // direction: "rtl",
        datatype: "json",
        mtype: 'POST',

        height: 200,
        colNames: ['入库时间', '状态', '描述'],
        colModel: [{
            name: 'createTime',
            index: 'createTime',
            width: 80,
            sorttype: "string",
            editable: false
        }, {
            name: 'productstatus',
            index: 'productstatus',
            width: 40,
            editable: false,
            sorttype: "string"
        }, {
            name: 'comments',
            index: 'comments',
            width: 40,
            sortable: false,
            editable: false
        }],
        viewrecords: true,
        // toppager: true,
        multiselect: true,
        // multikey: "ctrlKey",
        multiboxonly: true,
        beforeSelectRow: beforeSelectRow,
        loadComplete: function () {
            var table = this;
            setTimeout(function () {
            }, 0);
        },
        autowidth: true
    });
});

jQuery(function ($) {
    var grid_selector = "#table_burn";
    var jq = jQuery.noConflict();
    var from1;
    var to1;
    var pro1;
    var city1;
    var dis1;

    function beforeSelectRow() {
        $(grid_selector).jqGrid('resetSelection');
        return (true);
    }

    $('#CaseBurn')
        .on(
            'click',
            function () { // 页面上的button按钮的click事件，重新获取参数后发送参数，然后重新加载数据。
                from1 = $(".fromburn").val();
                to1 = $(".toburn").val();
                pro1 = $('#provburn').val();
                city1 = $('#cityburn').val();
                dis1 = $('#disburn').val();
                console.log(from1 + "," + to1 + "," + pro1 + ","
                    + city1 + "," + dis1);
                $(grid_selector)
                    .jqGrid(
                        'setGridParam',
                        {
                            url: '/pro/CaseQueryController/getBurnCase?beginTime='
                                + from1
                                + '&endTime='
                                + to1
                                + '&pro='
                                + pro1
                                + '&city='
                                + city1 + '&dis=' + dis1,
                            datatype: "json",
                            mtype: 'POST',
                        }).trigger("reloadGrid"); // 重新载入
            });

    jQuery(grid_selector).jqGrid({
        // direction: "rtl",
        datatype: "json",
        mtype: 'POST',

        height: 320,
        colNames: ['案件编号', '案件时间', '案件地点', '案件描述'],
        colModel: [{
            name: 'case_id',
            index: 'case_id',
            width: 35,
            sorttype: "int",
            editable: false
        }, {
            name: 'case_time',
            index: 'case_time',
            width: 40,
            editable: false,
            sorttype: "date"
        }, {
            name: 'case_location',
            index: 'case_location',
            width: 80,
            sortable: false,
            editable: false
        }, {
            name: 'case_desc',
            index: 'case_desc',
            width: 50,
            sortable: false,
            editable: false
        }],
        viewrecords: true,
        // toppager: true,
        multiselect: true,
        // multikey: "ctrlKey",
        multiboxonly: true,
        beforeSelectRow: beforeSelectRow,
        loadComplete: function () {
            var table = this;
            setTimeout(function () {
            }, 0);
        },
        autowidth: true
    });
});

jQuery(function ($) {
    var grid_selector = "#table_bom";
    var jq = jQuery.noConflict();
    var from;
    var to;
    var pro;
    var city;
    var dis;

    function beforeSelectRow() {
        $(grid_selector).jqGrid('resetSelection');
        return (true);
    }

    $('#CaseBom')
        .on(
            'click',
            function () { // 页面上的button按钮的click事件，重新获取参数后发送参数，然后重新加载数据。
                from = $(".from").val();
                to = $(".to").val();
                pro = $('#prov').val();
                city = $('#city').val();
                dis = $('#dis').val();

                $(grid_selector)
                    .jqGrid(
                        'setGridParam',
                        {
                            url: '/pro/CaseQueryController/getBomCase?beginTime='
                                + from
                                + '&endTime='
                                + to
                                + '&pro='
                                + pro
                                + '&city='
                                + city + '&dis=' + dis,
                            datatype: "json",
                            mtype: 'POST',
                        }).trigger("reloadGrid"); // 重新载入
            });

    jQuery(grid_selector).jqGrid({
        // direction: "rtl",
        datatype: "json",
        mtype: 'POST',

        height: 320,
        colNames: ['案件编号', '案件时间', '案件地点', '案件描述'],
        colModel: [{
            name: 'case_id',
            index: 'case_id',
            width: 35,
            sorttype: "int",
            editable: false
        }, {
            name: 'case_time',
            index: 'case_time',
            width: 40,
            editable: false,
            sorttype: "date"
        }, {
            name: 'case_location',
            index: 'case_location',
            width: 80,
            sortable: false,
            editable: false
        }, {
            name: 'case_desc',
            index: 'case_desc',
            width: 50,
            sortable: false,
            editable: false
        }],
        viewrecords: true,
        // toppager: true,
        multiselect: true,
        // multikey: "ctrlKey",
        multiboxonly: true,
        beforeSelectRow: beforeSelectRow,
        loadComplete: function () {
            var table = this;
            setTimeout(function () {
            }, 0);
        },
        autowidth: true
    });
});

jQuery(function ($) {
    var grid_selector = "#table_grab";
    var jq = jQuery.noConflict();
    var from;
    var to;
    var pro;
    var city;
    var dis;

    function beforeSelectRow() {
        $(grid_selector).jqGrid('resetSelection');
        return (true);
    }

    $('#CaseGrab')
        .on(
            'click',
            function () { // 页面上的button按钮的click事件，重新获取参数后发送参数，然后重新加载数据。
                from = $(".from").val();
                to = $(".to").val();
                pro = $('#prov').val();
                city = $('#city').val();
                dis = $('#dis').val();

                $(grid_selector)
                    .jqGrid(
                        'setGridParam',
                        {
                            url: '/pro/CaseQueryController/getGrabCase?beginTime='
                                + from
                                + '&endTime='
                                + to
                                + '&pro='
                                + pro
                                + '&city='
                                + city + '&dis=' + dis,
                            datatype: "json",
                            mtype: 'POST',
                        }).trigger("reloadGrid"); // 重新载入
            });

    jQuery(grid_selector).jqGrid({
        // direction: "rtl",
        datatype: "json",
        mtype: 'POST',

        height: 320,
        colNames: ['案件编号', '案件时间', '案件地点', '案件描述'],
        colModel: [{
            name: 'case_id',
            index: 'case_id',
            width: 35,
            sorttype: "int",
            editable: false
        }, {
            name: 'case_time',
            index: 'case_time',
            width: 40,
            editable: false,
            sorttype: "date"
        }, {
            name: 'case_location',
            index: 'case_location',
            width: 80,
            sortable: false,
            editable: false
        }, {
            name: 'case_desc',
            index: 'case_desc',
            width: 50,
            sortable: false,
            editable: false
        }],
        viewrecords: true,
        // toppager: true,
        multiselect: true,
        // multikey: "ctrlKey",
        multiboxonly: true,
        beforeSelectRow: beforeSelectRow,
        loadComplete: function () {
            var table = this;
            setTimeout(function () {
            }, 0);
        },
        autowidth: true
    });
});

jQuery(function ($) {
    var grid_selector = "#table_kill";
    var jq = jQuery.noConflict();
    var from;
    var to;
    var pro;
    var city;
    var dis;

    function beforeSelectRow() {
        $(grid_selector).jqGrid('resetSelection');
        return (true);
    }

    $('#CaseKill')
        .on(
            'click',
            function () { // 页面上的button按钮的click事件，重新获取参数后发送参数，然后重新加载数据。
                from = $(".from").val();
                to = $(".to").val();
                pro = $('#prov').val();
                city = $('#city').val();
                dis = $('#dis').val();

                $(grid_selector)
                    .jqGrid(
                        'setGridParam',
                        {
                            url: '/pro/CaseQueryController/getKillCase?beginTime='
                                + from
                                + '&endTime='
                                + to
                                + '&pro='
                                + pro
                                + '&city='
                                + city + '&dis=' + dis,
                            datatype: "json",
                            mtype: 'POST',
                        }).trigger("reloadGrid"); // 重新载入
            });

    jQuery(grid_selector).jqGrid({
        // direction: "rtl",
        datatype: "json",
        mtype: 'POST',

        height: 320,
        colNames: ['案件编号', '案件时间', '案件地点', '案件描述'],
        colModel: [{
            name: 'case_id',
            index: 'case_id',
            width: 35,
            sorttype: "int",
            editable: false
        }, {
            name: 'case_time',
            index: 'case_time',
            width: 40,
            editable: false,
            sorttype: "date"
        }, {
            name: 'case_location',
            index: 'case_location',
            width: 80,
            editable: false
        }, {
            name: 'case_desc',
            index: 'case_desc',
            width: 50,
            sortable: false,
            editable: false
        }],
        viewrecords: true,
        // toppager: true,
        multiselect: true,
        // multikey: "ctrlKey",
        multiboxonly: true,
        beforeSelectRow: beforeSelectRow,
        loadComplete: function () {
            var table = this;
            setTimeout(function () {
            }, 0);
        },
        autowidth: true
    });
});

/*
 * jQuery(function($) {
	var grid_selector = "#grid-table";
	var jq = jQuery.noConflict();
	var from;
	var to;
	var pro;
	var city;
	var dis;
	function beforeSelectRow() {
		$(grid_selector).jqGrid('resetSelection');
		return (true);
	}

	$('#CaseInqueryBotton')
			.on(
					'click',
					function() { // 页面上的button按钮的click事件，重新获取参数后发送参数，然后重新加载数据。
						from = $(".from").val();
						to = $(".to").val();
						pro = $('#prov').val();
						city = $('#city').val();
						dis = $('#dis').val();

						$(grid_selector)
								.jqGrid(
										'setGridParam',
										{
											url : '/pro/CaseQueryController/getAllCase?beginTime='
													+ from
													+ '&endTime='
													+ to
													+ '&pro='
													+ pro
													+ '&city='
													+ city + '&dis=' + dis,
											datatype : "json",
											mtype : 'POST',
										}).trigger("reloadGrid"); // 重新载入
					});

	jQuery(grid_selector).jqGrid({
		// direction: "rtl",
		datatype : "json",
		mtype : 'POST',

		height : 320,
		colNames : [ '案件编号', '案件时间', '案件地点', '案件描述' ],
		colModel : [ {
			name : 'case_id',
			index : 'case_id',
			width : 35,
			sorttype : "int",
			editable : false
		}, {
			name : 'case_time',
			index : 'case_time',
			width : 40,
			editable : false
		}, {
			name : 'case_location',
			index : 'case_location',
			width : 80,
			sortable : false,
			editable : false
		}, {
			name : 'case_desc',
			index : 'case_desc',
			width : 50,
			sortable : false,
			editable : false
		} ],
		viewrecords : true,
		// toppager: true,
		multiselect : true,
		// multikey: "ctrlKey",
		multiboxonly : true,
		beforeSelectRow : beforeSelectRow,
		loadComplete : function() {
			var table = this;
			setTimeout(function() {
			}, 0);
		},

		onSelectRow : function(id) {
			var selecs = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
			var rowid = $(grid_selector).getGridParam("selrow");
			var rowData = $(grid_selector).getRowData(rowid);
			var cid = rowData.case_id;
			document.getElementById('check_id').value = cid;
		},

		autowidth : true
	});
});
*/

jQuery(function ($) {
    var grid_selector = "#table_burn";
    var jq = jQuery.noConflict();
    var from1;
    var to1;
    var pro1;
    var city1;
    var dis1;

    function beforeSelectRow() {
        $(grid_selector).jqGrid('resetSelection');
        return (true);
    }

    $('#CaseBurn')
        .on(
            'click',
            function () { // 页面上的button按钮的click事件，重新获取参数后发送参数，然后重新加载数据。
                from1 = $(".fromburn").val();
                to1 = $(".toburn").val();
                pro1 = $('#provburn').val();
                city1 = $('#cityburn').val();
                dis1 = $('#disburn').val();
                console.log(from1 + "," + to1 + "," + pro1 + ","
                    + city1 + "," + dis1);
                $(grid_selector)
                    .jqGrid(
                        'setGridParam',
                        {
                            url: '/pro/CaseQueryController/getBurnCase?beginTime='
                                + from1
                                + '&endTime='
                                + to1
                                + '&pro='
                                + pro1
                                + '&city='
                                + city1 + '&dis=' + dis1,
                            datatype: "json",
                            mtype: 'POST',
                        }).trigger("reloadGrid"); // 重新载入
            });

    jQuery(grid_selector).jqGrid({
        // direction: "rtl",
        datatype: "json",
        mtype: 'POST',

        height: 320,
        colNames: ['案件编号', '案件时间', '案件地点', '案件描述'],
        colModel: [{
            name: 'case_id',
            index: 'case_id',
            width: 35,
            sorttype: "int",
            editable: false
        }, {
            name: 'case_time',
            index: 'case_time',
            width: 40,
            editable: false
        }, {
            name: 'case_location',
            index: 'case_location',
            width: 80,
            sortable: false,
            editable: false
        }, {
            name: 'case_desc',
            index: 'case_desc',
            width: 50,
            sortable: false,
            editable: false
        }],
        viewrecords: true,
        // toppager: true,
        multiselect: true,
        // multikey: "ctrlKey",
        multiboxonly: true,
        beforeSelectRow: beforeSelectRow,
        loadComplete: function () {
            var table = this;
            setTimeout(function () {
            }, 0);
        },
        autowidth: true
    });
});

jQuery(function ($) {
    var grid_selector = "#table_burn";
    var jq = jQuery.noConflict();
    var from1;
    var to1;
    var pro1;
    var city1;
    var dis1;

    function beforeSelectRow() {
        $(grid_selector).jqGrid('resetSelection');
        return (true);
    }

    $('#CaseBurn')
        .on(
            'click',
            function () { // 页面上的button按钮的click事件，重新获取参数后发送参数，然后重新加载数据。
                from1 = $(".fromburn").val();
                to1 = $(".toburn").val();
                pro1 = $('#provburn').val();
                city1 = $('#cityburn').val();
                dis1 = $('#disburn').val();
                console.log(from1 + "," + to1 + "," + pro1 + ","
                    + city1 + "," + dis1);
                $(grid_selector)
                    .jqGrid(
                        'setGridParam',
                        {
                            url: '/pro/CaseQueryController/getBurnCase?beginTime='
                                + from1
                                + '&endTime='
                                + to1
                                + '&pro='
                                + pro1
                                + '&city='
                                + city1 + '&dis=' + dis1,
                            datatype: "json",
                            mtype: 'POST',
                        }).trigger("reloadGrid"); // 重新载入
            });

    jQuery(grid_selector).jqGrid({
        // direction: "rtl",
        datatype: "json",
        mtype: 'POST',

        height: 320,
        colNames: ['案件编号', '案件时间', '案件地点', '案件描述'],
        colModel: [{
            name: 'case_id',
            index: 'case_id',
            width: 35,
            sorttype: "int",
            editable: false
        }, {
            name: 'case_time',
            index: 'case_time',
            width: 40,
            editable: false,
            sorttype: "date"
        }, {
            name: 'case_location',
            index: 'case_location',
            width: 80,
            sortable: false,
            editable: false
        }, {
            name: 'case_desc',
            index: 'case_desc',
            width: 50,
            sortable: false,
            editable: false
        }],
        viewrecords: true,
        // toppager: true,
        multiselect: true,
        // multikey: "ctrlKey",
        multiboxonly: true,
        beforeSelectRow: beforeSelectRow,
        loadComplete: function () {
            var table = this;
            setTimeout(function () {
            }, 0);
        },
        autowidth: true
    });
});

jQuery(function ($) {
    var grid_selector = "#table_bom";
    var jq = jQuery.noConflict();
    var from;
    var to;
    var pro;
    var city;
    var dis;

    function beforeSelectRow() {
        $(grid_selector).jqGrid('resetSelection');
        return (true);
    }

    $('#CaseBom')
        .on(
            'click',
            function () { // 页面上的button按钮的click事件，重新获取参数后发送参数，然后重新加载数据。
                from = $(".from").val();
                to = $(".to").val();
                pro = $('#prov').val();
                city = $('#city').val();
                dis = $('#dis').val();

                $(grid_selector)
                    .jqGrid(
                        'setGridParam',
                        {
                            url: '/pro/CaseQueryController/getBomCase?beginTime='
                                + from
                                + '&endTime='
                                + to
                                + '&pro='
                                + pro
                                + '&city='
                                + city + '&dis=' + dis,
                            datatype: "json",
                            mtype: 'POST',
                        }).trigger("reloadGrid"); // 重新载入
            });

    jQuery(grid_selector).jqGrid({
        // direction: "rtl",
        datatype: "json",
        mtype: 'POST',

        height: 320,
        colNames: ['案件编号', '案件时间', '案件地点', '案件描述'],
        colModel: [{
            name: 'case_id',
            index: 'case_id',
            width: 35,
            sorttype: "int",
            editable: false
        }, {
            name: 'case_time',
            index: 'case_time',
            width: 40,
            editable: false,
            sorttype: "date"
        }, {
            name: 'case_location',
            index: 'case_location',
            width: 80,
            sortable: false,
            editable: false
        }, {
            name: 'case_desc',
            index: 'case_desc',
            width: 50,
            sortable: false,
            editable: false
        }],
        viewrecords: true,
        // toppager: true,
        multiselect: true,
        // multikey: "ctrlKey",
        multiboxonly: true,
        beforeSelectRow: beforeSelectRow,
        loadComplete: function () {
            var table = this;
            setTimeout(function () {
            }, 0);
        },
        autowidth: true
    });
});

jQuery(function ($) {
    var grid_selector = "#table_grab";
    var jq = jQuery.noConflict();
    var from;
    var to;
    var pro;
    var city;
    var dis;

    function beforeSelectRow() {
        $(grid_selector).jqGrid('resetSelection');
        return (true);
    }

    $('#CaseGrab')
        .on(
            'click',
            function () { // 页面上的button按钮的click事件，重新获取参数后发送参数，然后重新加载数据。
                from = $(".from").val();
                to = $(".to").val();
                pro = $('#prov').val();
                city = $('#city').val();
                dis = $('#dis').val();

                $(grid_selector)
                    .jqGrid(
                        'setGridParam',
                        {
                            url: '/pro/CaseQueryController/getGrabCase?beginTime='
                                + from
                                + '&endTime='
                                + to
                                + '&pro='
                                + pro
                                + '&city='
                                + city + '&dis=' + dis,
                            datatype: "json",
                            mtype: 'POST',
                        }).trigger("reloadGrid"); // 重新载入
            });

    jQuery(grid_selector).jqGrid({
        // direction: "rtl",
        datatype: "json",
        mtype: 'POST',

        height: 320,
        colNames: ['案件编号', '案件时间', '案件地点', '案件描述'],
        colModel: [{
            name: 'case_id',
            index: 'case_id',
            width: 35,
            sorttype: "int",
            editable: false
        }, {
            name: 'case_time',
            index: 'case_time',
            width: 40,
            editable: false,
            sorttype: "date"
        }, {
            name: 'case_location',
            index: 'case_location',
            width: 80,
            sortable: false,
            editable: false
        }, {
            name: 'case_desc',
            index: 'case_desc',
            width: 50,
            sortable: false,
            editable: false
        }],
        viewrecords: true,
        // toppager: true,
        multiselect: true,
        // multikey: "ctrlKey",
        multiboxonly: true,
        beforeSelectRow: beforeSelectRow,
        loadComplete: function () {
            var table = this;
            setTimeout(function () {
            }, 0);
        },
        autowidth: true
    });
});
