//封装防抖函数
export  function debounce(func,delay){
          let timer = null//记录定时器执行情况，局部变量，但因为下面对其有引用，所以不会被销毁
          return function (...args){
            if(timer) clearTimeout(timer)
            timer = setTimeout(()=>{
              func.apply(this,args)//func中的this指向这里的this，参数传给func，调用func
            },delay)

          }


        }
