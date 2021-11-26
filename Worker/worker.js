/*
 * @Date: 2021-11-25 11:35:42
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-11-25 11:42:26
 * @FilePath: /apis/Worker/worker.js
 */
console.log(this)
this.onmessage = (event)=>{
  console.log("worker接收到数据:", event.data);
}