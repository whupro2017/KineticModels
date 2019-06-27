define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "simple/api/main.js",
    "group": "D__Learn_htdocs_zerg_application_simple_api_main_js",
    "groupTitle": "D__Learn_htdocs_zerg_application_simple_api_main_js",
    "name": ""
  },
  {
    "type": "get",
    "url": "bio/getinfo",
    "title": "bio/getinfo",
    "version": "1.0.0",
    "name": "bio_getinfo",
    "group": "bio",
    "description": "<p>生物物证获取详细信息接口</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p>返回提示码 200</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "msg",
            "description": "<p>返回提示信息 请求成功</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "示例如下:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\":\"200\",\n  \"message\":\"请求成功\",\n  \"data\":[{\n      \"COLLECTED_BY_NAME\": \"周XX、严\",\n      \"COLLECTED_DATE\": \"2013-09-23 00:00:00\"\n    },...]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "simple/controller/Session.php",
    "groupTitle": "bio"
  },
  {
    "type": "post",
    "url": "bio/update",
    "title": "bio/update",
    "version": "1.0.0",
    "name": "bio_update",
    "group": "bio",
    "description": "<p>生物物证更新信息接口</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "EVIDENCE_TYPE",
            "description": "<p>EVIDENCE_TYPE</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "DESCRIPTION",
            "description": "<p>DESCRIPTION</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "COLLECTED_BY_NAME",
            "description": "<p>COLLECTED_BY_NAME</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "LEFT_POSITION",
            "description": "<p>LEFT_POSITION</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "COLLECTION_MODE",
            "description": "<p>COLLECTION_MODE</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "COLLECTED_DATE",
            "description": "<p>COLLECTED_DATE</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "UTILIZATION",
            "description": "<p>UTILIZATION</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "CRIMINAL_FLAG",
            "description": "<p>CRIMINAL_FLAG</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "ID",
            "description": "<p>ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p>返回提示码 200</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "msg",
            "description": "<p>返回提示信息 请求成功</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "示例如下:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\":\"200\",\n  \"message\":\"请求成功\",\n  \"data\":'更新成功'\n}",
          "type": "json"
        }
      ]
    },
    "filename": "simple/controller/Session.php",
    "groupTitle": "bio"
  },
  {
    "type": "get",
    "url": "dictionary/getinfo",
    "title": "dictionary/getinfo",
    "version": "1.0.0",
    "name": "dictionary_getinfo",
    "group": "dictionary",
    "description": "<p>字典接口</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "parent_type",
            "description": "<p>该字典项的parent_key: 以下是各模块对应的parent_key<br/> bio   类型 = 'SWWZLBDM' 利用情况 = 'LYQKDM'<br/> elec  类型 = 'SB-DZWZLBDM' 利用情况 = 'LYQKDM'<br/> file  类型 = 'WJWZLBDM'<br/> foot  类型 = 'ZXYLXDM' 提取方法='ZJTQFFDM' 利用情况 = 'LYQKDM'<br/> bio  类型 = 'SWWZLBDM' 利用情况 = 'LYQKDM'<br/> hand  类型 = 'SYHJLXDM' 提取方法 = 'ZWTQFFDM' 利用情况 = 'LYQKDM'<br/> tool  工具种类 = 'GJHJZLDM' 工具推断 = 'GJTDZLDM' 提取方法 = 'GJHJTQFFDM'<br/></p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p>返回提示码 200</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "msg",
            "description": "<p>返回提示信息 请求成功</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "示例如下:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\":\"200\",\n  \"message\":\"请求成功\",\n  \"data\":[{\n      \"COLLECTED_BY_NAME\": \"周XX、严\",\n      \"COLLECTED_DATE\": \"2013-09-23 00:00:00\"\n    },...]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "simple/controller/Session.php",
    "groupTitle": "dictionary"
  },
  {
    "type": "get",
    "url": "elec/getinfo",
    "title": "elec/getinfo",
    "version": "1.0.0",
    "name": "elec_getinfo",
    "group": "elec",
    "description": "<p>电子物证获取详细信息接口</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p>返回提示码 200</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "msg",
            "description": "<p>返回提示信息 请求成功</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "示例如下:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\":\"200\",\n  \"message\":\"请求成功\",\n  \"data\":[{\n      \"COLLECTED_BY_NAME\": \"周XX、严\",\n      \"COLLECTED_DATE\": \"2013-09-23 00:00:00\"\n    },...]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "simple/controller/Session.php",
    "groupTitle": "elec"
  },
  {
    "type": "post",
    "url": "elec/update",
    "title": "elec/update",
    "version": "1.0.0",
    "name": "elec_update",
    "group": "elec",
    "description": "<p>电子物证更新信息接口</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "EVIDENCE_TYPE",
            "description": "<p>EVIDENCE_TYPE</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "DESCRIPTION",
            "description": "<p>DESCRIPTION</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "COLLECTED_BY_NAME",
            "description": "<p>COLLECTED_BY_NAME</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "LEFT_POSITION",
            "description": "<p>LEFT_POSITION</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "COLLECTION_MODE",
            "description": "<p>COLLECTION_MODE</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "COLLECTED_DATE",
            "description": "<p>COLLECTED_DATE</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "UTILIZATION",
            "description": "<p>UTILIZATION</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "CRIMINAL_FLAG",
            "description": "<p>CRIMINAL_FLAG</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "ID",
            "description": "<p>ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p>返回提示码 200</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "msg",
            "description": "<p>返回提示信息 请求成功</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "示例如下:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\":\"200\",\n  \"message\":\"请求成功\",\n  \"data\":'更新成功'\n}",
          "type": "json"
        }
      ]
    },
    "filename": "simple/controller/Session.php",
    "groupTitle": "elec"
  },
  {
    "type": "get",
    "url": "file/getinfo",
    "title": "file/getinfo",
    "version": "1.0.0",
    "name": "file_getinfo",
    "group": "file",
    "description": "<p>文件检索获取详细信息接口</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p>返回提示码 200</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "msg",
            "description": "<p>返回提示信息 请求成功</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "示例如下:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\":\"200\",\n  \"message\":\"请求成功\",\n  \"data\":[{\n      \"COLLECTED_BY_NAME\": \"周XX、严\",\n      \"COLLECTED_DATE\": \"2013-09-23 00:00:00\"\n    },...]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "simple/controller/Session.php",
    "groupTitle": "file"
  },
  {
    "type": "post",
    "url": "file/update",
    "title": "file/update",
    "version": "1.0.0",
    "name": "file_update",
    "group": "file",
    "description": "<p>文件检索更新信息接口</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "EVIDENCE_TYPE",
            "description": "<p>EVIDENCE_TYPE</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "DESCRIPTION",
            "description": "<p>DESCRIPTION</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "LEFT_POSITION",
            "description": "<p>LEFT_POSITION</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "COLLECTION_MODE",
            "description": "<p>COLLECTION_MODE</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "COLLECTED_BY_NAME",
            "description": "<p>COLLECTED_BY_NAME</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "COLLECTED_DATE",
            "description": "<p>COLLECTED_DATE</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "UTILIZATION",
            "description": "<p>UTILIZATION</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "CRIMINAL_FLAG",
            "description": "<p>CRIMINAL_FLAG</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "ID",
            "description": "<p>ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p>返回提示码 200</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "msg",
            "description": "<p>返回提示信息 请求成功</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "示例如下:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\":\"200\",\n  \"message\":\"请求成功\",\n  \"data\":'更新成功'\n}",
          "type": "json"
        }
      ]
    },
    "filename": "simple/controller/Session.php",
    "groupTitle": "file"
  },
  {
    "type": "get",
    "url": "hand/getinfo",
    "title": "hand/getinfo",
    "version": "1.0.0",
    "name": "hand_getinfo",
    "group": "hand",
    "description": "<p>手印获取详细信息接口</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p>返回提示码 200</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "msg",
            "description": "<p>返回提示信息 请求成功</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "示例如下:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\":\"200\",\n  \"message\":\"请求成功\",\n  \"data\":[{\n      \"COLLECTED_BY_NAME\": \"周XX、严\",\n      \"COLLECTED_DATE\": \"2013-09-23 00:00:00\"\n    },...]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "simple/controller/Session.php",
    "groupTitle": "hand"
  },
  {
    "type": "post",
    "url": "hand/update",
    "title": "hand/update",
    "version": "1.0.0",
    "name": "hand_update",
    "group": "hand",
    "description": "<p>足迹更新信息接口</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "PRINT_TYPE",
            "description": "<p>PRINT_TYPE</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "PRINT_CODE",
            "description": "<p>PRINT_CODE</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "LEFT_POSITION",
            "description": "<p>LEFT_POSITION</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "localname",
            "description": "<p>localname</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "CREATE_USER_ID",
            "description": "<p>CREATE_USER_ID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "COLLECTION_MODE",
            "description": "<p>COLLECTION_MODE</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "COLLECTED_BY_NAME",
            "description": "<p>COLLECTED_BY_NAME</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "COLLECTED_DATE",
            "description": "<p>COLLECTED_DATE</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "CRIMINAL_FLAG",
            "description": "<p>CRIMINAL_FLAG</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "UTILIZATION",
            "description": "<p>UTILIZATION</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "ID",
            "description": "<p>ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p>返回提示码 200</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "msg",
            "description": "<p>返回提示信息 请求成功</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "示例如下:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\":\"200\",\n  \"message\":\"请求成功\",\n  \"data\":'更新成功'\n}",
          "type": "json"
        }
      ]
    },
    "filename": "simple/controller/Session.php",
    "groupTitle": "hand"
  },
  {
    "type": "get",
    "url": "tool/getinfo",
    "title": "tool/getinfo",
    "version": "1.0.0",
    "name": "tool_getinfo",
    "group": "tool",
    "description": "<p>工具详细信息接口</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p>返回提示码 200</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "msg",
            "description": "<p>返回提示信息 请求成功</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "示例如下:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\":\"200\",\n  \"message\":\"请求成功\",\n  \"data\":[{\n      \"COLLECTED_BY_NAME\": \"周XX、严\",\n      \"COLLECTED_DATE\": \"2013-09-23 00:00:00\"\n    },...]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "simple/controller/Session.php",
    "groupTitle": "tool"
  },
  {
    "type": "post",
    "url": "tool/update",
    "title": "tool/update",
    "version": "1.0.0",
    "name": "tool_update",
    "group": "tool",
    "description": "<p>工具更新信息接口</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "PRINT_TYPE",
            "description": "<p>PRINT_TYPE</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "COLLECTED_BY_NAME",
            "description": "<p>COLLECTED_BY_NAME</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "TOOL_JUDGEMENT",
            "description": "<p>TOOL_JUDGEMENT</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "DESCRIPTION",
            "description": "<p>DESCRIPTION</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "LEFT_POSITION",
            "description": "<p>LEFT_POSITION</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "COLLECTION_MODE",
            "description": "<p>COLLECTION_MODE</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "COLLECTED_DATE",
            "description": "<p>COLLECTED_DATE</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "UTILIZATION",
            "description": "<p>UTILIZATION</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "CRIMINAL_FLAG",
            "description": "<p>CRIMINAL_FLAG</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "ID",
            "description": "<p>ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p>返回提示码 200</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "msg",
            "description": "<p>返回提示信息 请求成功</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "示例如下:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\":\"200\",\n  \"message\":\"请求成功\",\n  \"data\":'更新成功'\n}",
          "type": "json"
        }
      ]
    },
    "filename": "simple/controller/Session.php",
    "groupTitle": "tool"
  }
] });
