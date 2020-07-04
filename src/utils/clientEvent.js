/**
 * 调取客户端的事件
 * @param {*} jump_to 客户端事件
 * @param {*} jump_data 传递参数
 *  */ 
export const sendClientEvent = ({jump_to='',jump_data={},callBack=()=>{}}) => {
    console.log(`sendClientEvent, jump_to:${jump_to}`)
    window.WebViewJavascriptBridge.callHandler(
        jump_to,
        jump_data,
        response => {
            callBack(response)
        }
    );
}