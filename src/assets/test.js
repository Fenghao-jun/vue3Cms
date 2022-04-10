/*
 * @Author: FatJun
 * @Date: 2022-01-12 12:24:54
 * @LastEditors: FatJun
 * @LastEditTime: 2022-02-16 00:41:39
 * @FilePath: /vue3-ts-cms/src/assets/test.js
 *
 * Copyright (c) 2022 by FatJun/Best, All Rights Reserved.
 */
function colorRgba(sHex, alpha = 1) {
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  /* 16进制颜色转为RGB格式 */
  let sColor = sHex.toLowerCase()
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = '#'
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
      }
      sColor = sColorNew
    }
    //  处理六位的颜色值
    const sColorChange = []
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
    }
    // return sColorChange.join(',')
    // 或
    return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')'
  } else {
    return sColor
  }
}

const a = [50.25, 40.66, 564.73, 134.45]
const res = a.reduce((p, c) => {
  return (p += c)
}, 0)
console.log(res)
