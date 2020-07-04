import md5 from "js-md5";
const make_sign = function (obj) {
    var encrypt_key = 'OWpfzyPinLrfw7o3SgGlMmQinupK2YLnQ';
    var str = '';
    if (typeof obj == 'object') {
        //对象按照key值正序
        var newkey = Object.keys(obj).sort();
        // console.log(newkey)
        var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
        for (var i = 0; i < newkey.length; i++) { //遍历newkey数组
            newObj[newkey[i]] = obj[newkey[i]]; //向新创建的对象中按照排好的顺序依次增加键值对
        }
        for (var Key in newObj) {
            str += '' + Key + '=' + newObj[Key];
        }
        var newStr = str
        // console.log(newStr)
    } else if (typeof obj == 'string') {
        str = obj;
    } else {
        return str;
    }
    return md5(newStr + encrypt_key);
};
export default make_sign