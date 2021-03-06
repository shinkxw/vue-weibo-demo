'use strict'

let _ = require('lodash');
let crypto = require("crypto");
let Buffer = require("buffer").Buffer;


let getCheck = {
  checkEmail: function(val) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(val)) {
      return true;
    } else {
      return false;
    }
  },
  checkPhone: function(val) {
    var filter = /^1\d{10}$/;

    if (filter.test(val)) {
      return true;
    } else {
      return false;
    }
  }
}


/**
 *   对Date的扩展，将 Date 转化为指定格式的String
 *   月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 *   年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *   例子：
 *   (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 *   (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 */
const fmtDate = function(date, fmt) { //author: meizz
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}


/**
 * 由于moment库加进来太大了，自定义了formnow函数，待完善阶段
 */
const MillisecondToDate = function(msd) {
  var time = parseFloat(msd) / 1000;
  var str ="";
  if (null != time && "" != time) {
    if (time > 60 && time < 3600) {
      str = parseInt(time / 60.0) + " 分钟前";
    }
    else if (time >= 3600 && time < 86400) {
      str = parseInt(time / 3600.0) + " 小时前" ;
    }
    else if (time >= 86400 && time < 86400*30) {
      str = parseInt(time / 86400.0) + " 天前" ;
    }
    else if (time >= 86400*30 && time < 86400*365) {
      str = parseInt(time / (86400.0*30)) + " 个月前" ;
    }
    else if(time >= 86400*365){
      str = parseInt(time / (86400.0*365)) + " 年前" ;
    }
    else {
      str = parseInt(time) + " 秒前";
    }
  }
  return str;
}

const md5 = function(data) {
  var buf = new Buffer(data, 'utf8');
  var str = buf.toString("binary");
  return crypto.createHash("md5").update(str, 'utf8').digest("hex");
}


const JwtDecode = function (token) {
  var segments = token.split('.');

  if (segments.length !== 3) {
    throw new Error('Not enough or too many segments');
  }

  // All segment should be base64
  var headerSeg = segments[0];
  var payloadSeg = segments[1];
  var signatureSeg = segments[2];

  // base64 decode and parse JSON
  var header = JSON.parse(base64urlDecode(headerSeg));
  var payload = JSON.parse(base64urlDecode(payloadSeg));

  return {
    header: header,
    payload: payload,
    signature: signatureSeg
  }
}

function base64urlDecode(str) {
  return new Buffer(base64urlUnescape(str), 'base64').toString();
};

function base64urlUnescape(str) {
  str += Array(5 - str.length % 4).join('=');
  return str.replace(/\-/g, '+').replace(/_/g, '/');
}

exports.getCheck = getCheck;
exports.fmtDate = fmtDate;
exports.MillisecondToDate = MillisecondToDate;
exports.md5 = md5;
exports.JwtDecode = JwtDecode;
