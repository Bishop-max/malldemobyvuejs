/**
 * @param {Object} fn
 * @param {Object} delay
 * 防抖动函数
 * 应用于图片加载完成时回调
 * 防止refresh函数频繁调用
 */
export function  debounce(fn,delay){
        let timer = null;
        return function(){
          if(timer){
            clearTimeout(timer)
          }
          timer = setTimeout(fn,delay)
        }
      }
/**
 * @param {Object} date
 * @param {Object} fmt
 * 日期格式化函数
 */
export function formatDate(date, fmt) {
  //获取年份
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  //获取日期
  //M+ => 正则表达式规则  表示匹配一个或者多个
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};
//小时，分钟，秒数如果不是两位会补齐两位
function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};
