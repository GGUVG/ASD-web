import Vue from 'vue'
/**
 *  权限指令
    一个指令定义对象可以提供如下几个钩子函数 (均为可选)：
    bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。

    inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。

    update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
   由于这里用到 父节点 所以使用 inserted
 * **/
const has = Vue.directive('has', {
  inserted: function (el, binding, vnode) {
    if (!hasPermise(binding.value.url)) {
      // el.hidden = true
      el.parentNode.removeChild(el)
    }
  }
})
// 权限检查方法
const hasPermise = function (value) {
  let isExist = false
  const btnPermissionsStr = ['url1', 'url2']
  if (btnPermissionsStr == undefined || btnPermissionsStr == null) {
    return false
  }
  if (btnPermissionsStr.indexOf(value) > -1) {
    isExist = true
  }
  return isExist
}
export { has }
