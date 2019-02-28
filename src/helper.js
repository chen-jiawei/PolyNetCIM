import Vue from 'vue'
import inflector from 'i'

const storage = window.localStorage
let helper = {}

/**
 * string processor
 */
helper.i = inflector()

/**
 * localStorage
 */
helper.ls = {
  set (key, value) {
    value = JSON.stringify(value)
    storage.setItem(key, value)
  },
  get (key, defaultValue) {
    let value = storage.getItem(key, value)
    if (value === null || value === 'undefined' || value === '') {
      value = defaultValue
    } else {
      value = JSON.parse(value)
    }
    return value
  }
}
const gettype = Object.prototype.toString
helper.type = {
  isObj: function (o) {
    return gettype.call(o) === '[object Object]'
  },
  isNULL: function (o) {
    return gettype.call(o) === '[object Null]'
  },
  isNumber: function (o) {
    return gettype.call(0) === '[object Number]'
  }
}
/**
 * a wrapper for helper.ls
 */
helper.store = (key, value) => {
  if (arguments.length < 2) {
    return helper.ls.get(key)
  } else {
    return helper.ls.set(key, value)
  }
}
Vue.directive('back', (el, binding) => {
  el.onclick = () => window.history.go(-1)
})

export default helper
