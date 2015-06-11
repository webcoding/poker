/**
 * TODO:改天使用 TypeScript 试试，
 * 最简单的一点，JS 没有enum、interface等结构，我都不能确定给一个对象究竟有那些字段，
 * 使用的时候都 **心惊胆战** 的，说不定哪里手贱多加了一个属性，少些了一个属性的，
 * 然后用的时候发现这里有这个值，又误用了这些不可靠的值
 */
var err = require('modules/errorMonitor/err')
var spm = require('modules/icount/ipm')
var igold = require('modules/icount/igold')
var downTip = require('widgets/down-tip/down-tip')
require('modules/spa/spa')

var appDownloadUrl = require('./_appdownloadurl')
$.extend(exports, appDownloadUrl)