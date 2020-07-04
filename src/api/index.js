// 浏览器和React Native
import {
    getRequestParams
} from '@/utils/getRequestParams'
import fly from 'flyio'
fly.config.baseURL = process.env.VUE_APP_BASEURL;
fly.config.timeout = "5000";
const HTTP_CODE = {
    BAD_REQUEST: 400, //1.语义有误, 2.请求参数有误
    UNAUTHORIZED: 401, //授权证书未被接受
    FORBIDDEN: 403, //没有权限访问，未授权
    NOT_FOUND: 404, //请求失败，请求所希望得到的资源未被在服务器上发现
    INTERNAL_SERVER_ERROR: 500 //服务器内部错误
};
//添加请求拦截器
fly.interceptors.request.use((request) => {
    //   console.log(request);
    request.headers["X-Requested-With"] = "XMLHttpRequest"
    if (request.method == 'POST') {
        request.headers["Content-Type"] = "application/x-www-form-urlencoded"
        request.url = request.url + window.location.search;

    } else {
        request.body = {
            ...getRequestParams(),
            ...request.body
        }
    }
    //打印出请求体
    // console.log(request.body)
    //终止请求
    //var err=new Error("xxx")
    //err.request=request
    //return Promise.reject(new Error(""))

    //可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
    return request;
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
    (response) => {
        //只将请求结果的data字段返回  按情况进行修改
        // if (response.data.error_code != '0') {
        //   Toast(response.data.message || '未知错误')
        // }
        return response
    },
    (err) => {
        //发生网络错误后会走到这里
        console.log(err)
        var message = "";
        if (err.status !== 0 && err.response) {

            if (err.response.data && err.response.data.message) {
                message = err.response.data.message;
            } else {
                // message = ERROR_MESSAGE[err.status]
                switch (err.status) {
                    case HTTP_CODE.BAD_REQUEST:
                        console.log("BAD_REQUEST");
                        message = "数据出错";
                        break;
                    case HTTP_CODE.UNAUTHORIZED:
                        console.log("UNAUTHORIZED");
                        message = "登录过期，请重新登录";
                        return;
                    case HTTP_CODE.FORBIDDEN:
                        console.log("FORBIDDEN");
                        message = "对不起，您没有权限访问";
                        break;
                    case HTTP_CODE.NOT_FOUND:
                        console.log("NOT_FOUND");
                        message = "访问不到请求的资源";
                        break;
                    case HTTP_CODE.INTERNAL_SERVER_ERROR:
                        console.log("INTERNAL_SERVER_ERROR");
                        message = "服务器离家出走了";
                        break;
                    default:
                        break;
                }
            }
            if (message == "") {
                message = "未知错误";
            }
            if (typeof message == "string") {
                console.log(message)
            } else {
                console.log("api err msg", message);

            }
        } else {
            if (err.status == '1') {
                console.log("网络超时")
                message = '网络超时'

            }

        }
        // Toast(message || '未知错误')

    }
)
export default fly