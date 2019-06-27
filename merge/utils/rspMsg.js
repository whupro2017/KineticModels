/**
 **@desc 返回数据的基类封装
 **@params
 **@create 2019/6/19 11:19.
 **@author:ddlove
 **@email: 1334289674@qq.com
 **@return
 */
const RspMsg = function (res, obj) {
    return res.send({
        data: obj.data || [],
        code: obj.code || ResCode.succode,
        msg: obj.msg || 'success'
    });
};
/**
 **@desc  返回状态码 200 成功 500失败
 **@params ResCode
 **@create 2019/6/19 11:19.
 **@author:ddlove
 **@email: 1334289674@qq.com
 **@return
 */
const ResCode = {
    succode : 200,
    errorcode : 500
};
module.exports = {
    ResCode,RspMsg
};