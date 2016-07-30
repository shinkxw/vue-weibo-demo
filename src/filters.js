"use strict"

import utils from  './libs/utils'


/**格式化时间
 *  @param {string} time 需要格式化的时间
 *  @param {bool} friendly 是否是fromNow
 */
exports.getLastTimeStr = (time, friendly) => {
  if (friendly) {
    return utils.MillisecondToDate(new Date() - new Date(time));
  } else {
    return utils.fmtDate(new Date(time),'yyyy-MM-dd hh:mm');
  }
}

exports.md5 = (str) => {
  return utils.md5(str);
}
