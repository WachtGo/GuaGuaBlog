//随机颜色
export function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}

//时间转换  将毫秒转换
export function formatDate(date) {
    date = new Date(date);
    var y = date.getFullYear();//年
    var m = date.getMonth() + 1;//月
    var d = date.getDate();//日
    var h = date.getHours();//时
    var m1 = date.getMinutes();//分
    var s = date.getSeconds();//秒
    m = m < 10 ? ("0" + m) : m;
    d = d < 10 ? ("0" + d) : d;
    // return y + "." + m + "." + d + " " + h + ":" + m1 + ":" + s;
    return y + "." + m + "." + d + "  " + h + ":" + m1
}

export function strTolow(arg) {
    var str = arg.split('');
    for (var i = 0; i < str.length; i++) {
        if (!(str[i].charAt() >= "a" && str[i].charAt() <= "z")) {
            str[i] = str[i].toLowerCase();
        }
    }
    return str.join('');
}