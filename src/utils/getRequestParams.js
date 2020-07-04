export const getRequestParams = function (strname) {
    if(location.href.split("?")[1]){
        var url = '?'+location.href.split("?")[1]
    }else{
        var url =''
    }
    // var url = location;
    // console.log()
    var theRequest = {};
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i += 1) {
            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1])
        }
    }
    if (strname) {
        return theRequest[strname]
    } else {
        return theRequest
    }
}