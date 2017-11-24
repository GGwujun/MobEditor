
import config from '../config'
/**
 * 生成script标签
 * @param {*function} sFun 
 */

export function _scriptPath() {
    var _js = document.scripts;
    _js = _js[_js.length - 1].src.substring(0, _js[_js.length - 1].src.lastIndexOf("/") + 1);
    var _buildLib = '<link rel="stylesheet" href="' + _js + 'layout/base.css' + (config._debug ? '?v=' + (+new Date()) : '') + '">';
    $('head').append(_buildLib);
    return _js;
}


/**
 * 判断是否在数组
 * @param {*string} s 
 * @param {*array} a 
 */
export function _inArray(s, a) {
    for (var i in a) {
        if (a[i] == s) {
            return true;
        }
    }
    return false;
};

/**
 * 格式化text
 * @param {*string} t 
 */

export function _formatInnerText(t) {
    var s = t.replace(/\ +/g, "");
    s = t.replace(/[ ]/g, "");
    s = t.replace(/[\r\n]/g, "");
    return s.replace(/(^\s*)|(\s*$)/g, "");
};



/**
 * 获取最大index值
 */
export function _getLayerMaxZIndex() {
    var _max = Math.max.apply(null,
        $.map($('body *'), function (e) {
            var _$e = $(e);
            if (_$e.css('position') != 'static')
                return parseInt(_$e.css('z-index')) || 1;
        }));
    return (_max + '').indexOf('Infinity') >= 0 ? 1 : _max + 1;
};


/**
 * 生成唯一uid
 */
export function _genEditorUid() {
    return '' + +new Date;
};