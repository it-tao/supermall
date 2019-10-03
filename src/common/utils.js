//封装防抖函数
export  function debounce(func,delay){
          let timer = null//记录定时器执行情况，局部变量，但因为下面对其有引用，所以不会被销毁
          return function (...args){
            if(timer) clearTimeout(timer)
            timer = setTimeout(()=>{
              func.apply(this,args)//func中的this指向这里的this，参数传给func，调用func
            },delay)

          }


        };

//封装将date进行格式化的函数，没准以后会过来复制粘贴哈哈
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
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

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};
