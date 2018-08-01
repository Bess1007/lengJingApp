/**
 * Created by zhangrenrong on 2018/7/16.
 */
//所有请求的共用方法 (若无参数则传null)
//匹配默认application/x-www-form-urlencoded; charset=UTF-8
function myAjax(url,params,success,beforeSend,complete,error){
    mui.ajax(rootPath+url,{
        data:params,
        dataType:'json',//服务器返回json格式数据
        type:'post',//HTTP请求类型
        timeout:10000,//超时时间设置为10秒；
        beforeSend:beforeSend,
        success:success,
        complete:complete,
        error:function(xhr,type,errorThrown){
            //异常处理；
            wf();
            console.log("error"+xhr.status+JSON.stringify(errorThrown)+type);
        }
    });
}
// json字符串方式
function JsonAjax(url,params,success,beforeSend,complete,error){
    mui.ajax(rootPath+url,{
        data:params,
        dataType:'json',//服务器返回json格式数据
        type:'post',//HTTP请求类型
        timeout:10000,//超时时间设置为10秒；
        headers:{'Content-Type':'application/json;charset=UTF-8'},
        beforeSend:beforeSend,
        success:success,
        complete:complete,
        error:function(xhr,type,errorThrown){
            //异常处理；
            wf();
            console.log("error"+xhr.status+JSON.stringify(errorThrown)+type);
        }
    });
}
// H5 plus事件处理
function wf(){
    var types = {};
    mui.plusReady(function(){
        mui.ready(function(){
            types[plus.networkinfo.CONNECTION_UNKNOW] = "Unknown connection";
            types[plus.networkinfo.CONNECTION_NONE] = "None connection";
            types[plus.networkinfo.CONNECTION_ETHERNET] = "Ethernet connection";
            types[plus.networkinfo.CONNECTION_WIFI] = "WiFi connection";
            types[plus.networkinfo.CONNECTION_CELL2G] = "Cellular 2G connection";
            types[plus.networkinfo.CONNECTION_CELL3G] = "Cellular 3G connection";
            types[plus.networkinfo.CONNECTION_CELL4G] = "Cellular 4G connection";

            if(types[plus.networkinfo.getCurrentType()] == "None connection"
                || types[plus.networkinfo.getCurrentType()] == "Unknown connection"){
                mui.toast("当前无可用网络！请检查您的网络连接！");
                return;
            }
            if(types[plus.networkinfo.getCurrentType()] == "Cellular 2G connection"){
                mui.toast("您的网速较慢，建议您更换其他网络！");
                return;
            }
        })
    })

}