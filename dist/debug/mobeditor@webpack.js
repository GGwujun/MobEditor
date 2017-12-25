/*!
 *  * mobeditor v1.0.0
 *  * (c) 2017-09-10--2017-11-24 dsx
 *  * Released under the ISC License.
 *  * https://github.com/GGwujun/MobEditor#readme
 *  * 富文本编辑器，移动端富文本编辑器，编辑器，手机富文本编辑器
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * config  配置信息
 */

var config = {
    // 是否开启 debug 模式（debug 模式下错误会 throw error 形式抛出）
    _debug: false,
    _version: '1.6',
    _notctname: ['INPUT', 'IMG', 'TEXTAREA'],
    placeHolder: '<p class="Eleditor-placeholder">点击此处编辑内容</p>',
    toolbars: ['insertText', 'editText', 'insertImage', 'insertLink', 'deleteBefore', 'deleteAfter', 'insertHr', 'deleteThis', 'undo', 'cancel'],
    _toolnames: {
        insertText: '插文字',
        insertImage: '插图片',
        insertLink: '插链接',
        insertHr: '水平线',
        deleteBefore: '删除前',
        deleteAfter: '删除后',
        editText: '改文字',
        deleteThis: '删除',
        undo: '撤销',
        cancel: '取消'
    }

};

exports.default = config;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initele = initele;
var selectors = exports.selectors = Object.create(null);
function initele(editor, _$wrap) {
    //主编辑器菜单
    selectors._lastScrollH = null;
    selectors._$window = $(window);
    selectors._$editorWrap = editor;
    selectors._$editorController = selectors._$editorWrap;
    selectors._$editorLoadingMask = selectors._$editorWrap.find('.Eleditor-loading');
    selectors._$wrap = _$wrap;
    selectors._$scrollWrap = $('html,body');
    selectors._$editorUndoBtn = selectors._$editorWrap.find(".Eleditor-undo");
    selectors._$editorBarUploadImageBtn = selectors._$editorWrap.find('.Eleditor-textStyle-item-upImg');
    selectors._$editorUploadImageBtn = selectors._$editorWrap.find(".Eleditor-insertImage");

    //text编辑器
    selectors._$editorTextModule = selectors._$editorWrap.find('.Eleditor-textEditor');
    selectors._$editorTextArea = selectors._$editorTextModule.find(".Eleditor-inputarea .textarea");
    selectors._$editorTextLinkArea = selectors._$editorTextModule.find(".Eleditor-inputarea input");
    selectors._$editorColorModule = selectors._$editorTextModule.find(".Eleditor-textEditor-colors");
    selectors._$editorFontsizeModule = selectors._$editorTextModule.find(".Eleditor-textEditor-fontsizes");
    selectors._$editorLineheightModule = selectors._$editorTextModule.find(".Eleditor-textEditor-lineheight");
    selectors._$editorLinedecorationsModule = selectors._$editorTextModule.find(".Eleditor-textEditor-linedecorations");
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports._correctHtmlStructure = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports._buildEditorModule = _buildEditorModule;
exports._showEditorControllerLayer = _showEditorControllerLayer;
exports._hideEditorControllerLayer = _hideEditorControllerLayer;
exports._showEditorWrapMask = _showEditorWrapMask;
exports._hideEditorWrapMask = _hideEditorWrapMask;
exports._showLoadingMask = _showLoadingMask;
exports._hideLoadingMask = _hideLoadingMask;
exports._appendHistory = _appendHistory;
exports._handleHistory = _handleHistory;
exports._flushHistoryBtn = _flushHistoryBtn;
exports._flushEditorControllerLayerPosi = _flushEditorControllerLayerPosi;

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _lang = __webpack_require__(3);

var _Upload = __webpack_require__(7);

var _Event = __webpack_require__(5);

var _Toolbars = __webpack_require__(8);

var _Selector = __webpack_require__(1);

var _Text = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 编辑器构造函数
 */
var mobeditor = function () {
    function mobeditor(params) {
        _classCallCheck(this, mobeditor);

        this.init(params);
    }

    _createClass(mobeditor, [{
        key: 'init',
        value: function init(params) {
            console.log('|--Eleditor Initing');
            //插入base.css
            (0, _lang._scriptPath)();

            //合并配置参数
            var _arg = Object.assign({}, _config2.default, params);

            Object.assign(_config2.default, params);

            var _editorUid = (0, _lang._genEditorUid)();

            this._historys = [];

            if (_arg.el instanceof jQuery) {
                var _$wrap = _arg.el;
            } else {
                var _$wrap = $(_arg.el);
                if (_$wrap.length === 0) {
                    return console.warn('|--Eleditor ' + _arg.el + '元素不存在，请在DOMContentLoaded后初始化Eleditor');
                } else if (_$wrap.length != 1) {
                    var _$wrap = $(_$wrap[0]);
                }
            }

            if (_$wrap.attr('Eleditor-Inited') === 'true') {
                return console.warn('|--Eleditor ' + _arg.el + '已经绑定了Eleditor');
            }

            /**
             * 标记为已初始化，并且给一个唯一的uid标识
             */
            _$wrap.attr({ 'Eleditor-Inited': 'true', 'Eleditor-Uid': _editorUid });

            //构建编辑器
            _correctHtmlStructure(_$wrap, _arg.placeHolder);

            //获取编辑器dom
            var _$editorWrap = $(_buildEditorModule(_arg.toolbars, _editorUid));
            _$wrap.addClass('Eleditor-area');
            _$wrap.after(_$editorWrap);

            (0, _Selector.initele)(_$editorWrap, _$wrap);
            console.log('|--Eleditor Mounted To', _$wrap);

            (0, _Event.initEvent)(_arg);

            var self = this;

            /*controller*/
            _$wrap.on('click', '*', function (_e) {
                var _$this = $(this);
                if (!_$this.hasClass('Eleditor-active')) {
                    _hideEditorControllerLayer();
                    _showEditorControllerLayer(_$this);
                }
                return _e.preventDefault() == 0;
            });

            (0, _Toolbars.initTool)(this);

            //初始化图片上传
            (0, _Upload.initUpload)(this);

            this.Text = new _Text.Text(this);
        }
    }, {
        key: 'append',
        value: function append() {
            _Selector.selectors._$wrap.find('.Eleditor-placeholder').remove();
            return _Selector.selectors._$wrap.append(arguments[0]);
        }
    }, {
        key: 'getEditNode',
        value: function getEditNode() {
            if (_$selected === null) {
                console.warn('未选中状态getEditNode返回null');
            }
            return _$selected;
        }
    }, {
        key: 'getContent',
        value: function getContent() {
            return _Selector.selectors._$wrap.html();
        }
    }, {
        key: 'getContentText',
        value: function getContentText() {
            return (0, _lang._formatInnerText)(_Selector.selectors._$wrap.text());
        }
    }, {
        key: 'destory',
        value: function destory() {
            _Selector.selectors._$wrap.removeAttr('Eleditor-Inited Eleditor-Uid');
            _Selector.selectors._$wrap.removeClass('Eleditor-area');
            _Selector.selectors._$wrap.find('.Eleditor-placeholder').remove();
            _Selector.selectors._$wrap.off().find('.Eleditor-active').removeClass('Eleditor-active');
            _Selector.selectors._$editorWrap.find('*').off();
            _Selector.selectors._$editorWrap.remove();
            console.log('|--Eleditor ' + this._editorUid + ' destoryed');
        }
    }]);

    return mobeditor;
}();

/**
 * 设置placehoder
 * @param {*selector} _wrap 
 * @param {*string} _empty 
 */


exports.default = mobeditor;
var _correctHtmlStructure = exports._correctHtmlStructure = function _correctHtmlStructure(_wrap, _empty) {
    if ((0, _lang._formatInnerText)(_wrap.text()) == '' && _wrap.find('img').length === 0) _wrap.append(_empty);
    if (_wrap.find('*').length === 0) _wrap.html('<p class="Eleditor-placeholder">' + _wrap.html() + '</p>');
};

/**
 * 生成编辑框
 * @param {*array} _toolbars  配置菜单
 * @param {*string} _uid  编辑器的标记
 */
function _buildEditorModule(_toolbars, _uid) {
    var _html = '\n                <div class="Eleditor-wrap" style="z-index:' + (0, _lang._getLayerMaxZIndex)() + '" id="' + _uid + '">\n                    <div class="Eleditor-controller">\n                <ul>\n                ';

    for (var i = 0; i < _toolbars.length; i++) {
        var _it = _toolbars[i],
            _id = (typeof _it === 'undefined' ? 'undefined' : _typeof(_it)) === 'object' ? _it.id : _it,
            _tag = (typeof _it === 'undefined' ? 'undefined' : _typeof(_it)) === 'object' && _it.tag ? _it.tag.toLocaleLowerCase() : null,
            _name = (typeof _it === 'undefined' ? 'undefined' : _typeof(_it)) === 'object' ? _it.name : _config2.default._toolnames[_it];
        _html += '<li event="' + _id + '" ' + (_tag ? 'bind-tags="' + _tag + '"' : '') + 'class="Eleditor-' + _id + '">' + _name + '</li>';
    }
    _html += '\t\t\n            </ul></div>\n                <div class="Eleditor-loading"><p></p></div>\n                <div class="Eleditor-textEditor">\n                    <div class="Eleditor-textStyle">\n                        <div class="Eleditor-textStyle-item"><div class="Eleditor-textStyle-bold"></div></div>\n                        <div class="Eleditor-textStyle-item"><div class="Eleditor-textStyle-color"><span></span></div></div>\n                        <div class="Eleditor-textStyle-item"><div class="Eleditor-textStyle-linedecoration"></div></div>\n                        <div class="Eleditor-textStyle-item"><div class="Eleditor-textStyle-bgColor"></div></div>\n                        <div class="Eleditor-textStyle-item"><div class="Eleditor-textStyle-fontSize"></div></div>\n                        <div class="Eleditor-textStyle-item"><div class="Eleditor-textStyle-lineHeight"></div></div>\n                        <div class="Eleditor-textStyle-item">\n                            <div class="Eleditor-textStyle-align Eleditor-textStyle-alignLeft" align="left"></div>\n                        </div>\n                        <div class="Eleditor-textStyle-item">\n                            <div class="Eleditor-textStyle-align Eleditor-textStyle-alignCenter" align="center">\n                            </div>\n                        </div>\n                        <div class="Eleditor-textStyle-item">\n                            <div class="Eleditor-textStyle-align Eleditor-textStyle-alignRight" align="right">\n                            </div>\n                        </div>\n                        <div class="Eleditor-textStyle-item Eleditor-textStyle-item-upImg">\n                            <div class="Eleditor-textStyle-upImg"></div>\n                        </div>\n                    </div>\n                    <div class="Eleditor-textEditor-colors">\n                        <div class="Eleditor-textEditor-modulePane"><span></span></div>\n                        <ul>\n                            <li><span style="background-color:#232323;"></span></li>\n                            <li><span style="background-color:#2196F3;"></span></li>\n                            <li><span style="background-color:#795548;"></span></li>\n                            <li><span style="background-color:#00BCD4;"></span></li>\n                            <li><span style="background-color:#4CAF50;"></span></li>\n                            <li><span style="background-color:#E666E5;"></span></li>\n                            <li><span style="background-color:#FF9800;"></span></li>\n                            <li><span style="background-color:#FF5722;"></span></li>\n                            <li><span style="background-color:#ff2a1a;"></span></li>\n                            <li><span style="background-color:#FFEB3B;"></span></li>\n                            <li><span style="background-color:#ffffff;border: 1px solid #ccc;"></span></li>\n                            <li>\n                                <span class="Eleditor-inheritValue" style="background-color:transparent; border: 1px solid #dedede;">\n                                </span>\n                            </li>\n                        </ul>\n                    </div>\n                    <div class="Eleditor-textEditor-fontsizes">\n                        <div class="Eleditor-textEditor-modulePane"><span>\u5B57\u4F53\u5927\u5C0F</span></div>\n                        <ul>\n                            <li class="Eleditor-inheritValue">\u9ED8\u8BA4</li>\n                            <li>14px</li>\n                            <li>16px</li>\n                            <li>20px</li>\n                            <li>28px</li>\n                            <li>35px</li>\n                        </ul>\n                    </div>\n                    <div class="Eleditor-textEditor-lineheight">\n                        <div class="Eleditor-textEditor-modulePane"><span>\u884C\u9AD8</span></div>\n                        <ul>\n                            <li class="Eleditor-inheritValue">\u9ED8\u8BA4</li>\n                            <li>20px</li>\n                            <li>25px</li>\n                            <li>30px</li>\n                            <li>35px</li>\n                            <li>40px</li>\n                        </ul>\n                    </div>\n                    <div class="Eleditor-textEditor-linedecorations">\n                        <div class="Eleditor-textEditor-modulePane"><span>\u6587\u672C\u4FEE\u9970</span></div>\n                        <ul>\n                            <li class="Eleditor-inheritValue">\u65E0</li>\n                            <li style="text-decoration: overline">\u4E0A\u5212\u7EBF\u4FEE\u9970</li>\n                            <li style="text-decoration: line-through">\u5220\u9664\u7EBF\u4FEE\u9970</li>\n                            <li style="text-decoration: underline">\u4E0B\u5212\u7EBF\u4FEE\u9970</li>\n                        </ul>\n                    </div>\n                    <div class="Eleditor-textEditor-formats">\n                        <div class="Eleditor-textEditor-format"></div>\n                        <div class="Eleditor-textEditor-clean"></div>\n                    </div>\n                    <div class="Eleditor-inputarea">\n                        <input placeholder="\u8BF7\u8F93\u5165\u8D85\u94FE\u63A5" type="text" />\n                        <div class="textarea" contenteditable="true"></div>\n                    </div>\n                    <div class="Eleditor-method">\n                        <button class="Eleditor-commit">\u63D0\u4EA4</button>\n                        <button class="Eleditor-cancel">\u53D6\u6D88</button>\n                    </div>\n                </div>\n            </div>\n            ';
    return _html;
}

/**
     * 激活当前编辑的段落
     * @param {*selector} _$e 
     */
function _showEditorControllerLayer(_$e) {
    _Selector.selectors._$selected = _$e;
    var self = this;
    _$e.addClass('Eleditor-active');
    var _calTop = _$e.offset().top + _$e.outerHeight();
    $.each(_Selector.selectors._$editorController.find('li'), function (i, e) {
        var _$e = $(e),
            _tgs = _$e.attr('bind-tags');
        if (_tgs) {
            _tgs = _tgs.toLocaleLowerCase().split(',');
            if ((0, _lang._inArray)(_Selector.selectors._$selected[0].tagName.toLocaleLowerCase(), _tgs)) {
                _$e.show();
            } else {
                _$e.hide();
            }
        }
    });

    _Selector.selectors._$editorController.removeClass('out').addClass('in');

    if (typeof _Selector.selectors._$scrollWrap.animate === 'function') {
        _Selector.selectors._$scrollWrap.stop().animate({ scrollTop: _calTop - 150 + 'px' }, 500);
    } else {
        _Selector.selectors._$scrollWrap.scrollTop(_calTop - 150 + 'px');
    }

    _Upload._controllerUploader && _Upload._controllerUploader.refresh();
}

/**
     * 隐藏编辑器
     */
function _hideEditorControllerLayer() {
    _Selector.selectors._$wrap.find('.Eleditor-active').removeClass('Eleditor-active');
    _Selector.selectors._$editorController.removeClass('in').addClass('out');
}

/**
 * 显示修改文字编辑框
 */
function _showEditorWrapMask() {
    if ((0, _lang._inArray)('insertImage', _config2.default.toolbars)) {
        _Selector.selectors._$editorBarUploadImageBtn.show();
    }
    _Selector.selectors._$editorController.removeClass('in').addClass('out');
    _Selector.selectors._$editorWrap.addClass('Eleditor-mask');
    _Selector.selectors._lastScrollH = _Selector.selectors._$window.scrollTop();
    _Selector.selectors._$scrollWrap.addClass('Eleditor-scrollLocked');
};

/**
 * 隐藏修改文字编辑框
 */
function _hideEditorWrapMask() {
    _Selector.selectors._$editorWrap.removeClass('Eleditor-mask out');
    _Selector.selectors._$scrollWrap.removeClass('Eleditor-scrollLocked');
    _Selector.selectors._$window.scrollTop(_Selector.selectors._lastScrollH);
}

function _showLoadingMask() {
    _Selector.selectors._showEditorWrapMask();
    _Selector.selectors._$editorLoadingMask.show();
    _Selector.selectors._$editorLoadingMask.html('<p>' + arguments[0] + '</p>');
}

function _hideLoadingMask() {
    _hideEditorWrapMask();
    _Selector.selectors._$editorLoadingMask.hide();
}

function _appendHistory(editor, editObj) {
    editor._historys.push(editObj);
    _flushHistoryBtn(editor);
}
function _handleHistory(editor) {
    if (editor._historys.length === 0) return;
    var _handle = editor._historys.pop();

    if (_handle.m == 'insertNode') _handle.node.remove();

    if (_handle.m == 'editNode') _handle.node.attr('style', _handle.unode.attr('style') || '').html(_handle.unode);

    if (_handle.m == 'deleteNode') {
        if (_handle.pnode.length > 0) {
            _handle.pnode.after(_handle.node);
        } else {
            _Selector.selectors._$wrap.prepend(_handle.node);
        }
        _Selector.selectors._$wrap.find('.Eleditor-placeholder').remove();
    }
    if (_handle.m == 'deleteBeforeNode') {
        for (var i = _handle.bnode.length - 1; i >= 0; i--) {
            _handle.node.before(_handle.bnode[i]);
        }
    }
    if (_handle.m == 'deleteAfterNode') {
        _handle.node.after(_handle.anode);
    }
    _flushHistoryBtn();
}

function _flushHistoryBtn(editor) {
    if (editor._historys.length == 0) _Selector.selectors._$editorUndoBtn.hide();else _Selector.selectors._$editorUndoBtn.show();
}

/**
 * 设置编辑器的位置
 */
function _flushEditorControllerLayerPosi() {
    if (_Selector.selectors._$selected) {
        _Selector.selectors._$editorController.css({
            top: _$selected.offset().top + _$selected.outerHeight(),
            width: _$wrap.width() - 5
        });
    }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports._scriptPath = _scriptPath;
exports._inArray = _inArray;
exports._formatInnerText = _formatInnerText;
exports._getLayerMaxZIndex = _getLayerMaxZIndex;
exports._genEditorUid = _genEditorUid;

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 生成script标签
 * @param {*function} sFun 
 */

function _scriptPath() {
    var _js = document.scripts;
    _js = _js[_js.length - 1].src.substring(0, _js[_js.length - 1].src.lastIndexOf("/") + 1);
    var _buildLib = '<link rel="stylesheet" href="' + _js + 'layout/base.css' + (_config2.default._debug ? '?v=' + +new Date() : '') + '">';
    $('head').append(_buildLib);
    return _js;
}

/**
 * 判断是否在数组
 * @param {*string} s 
 * @param {*array} a 
 */
function _inArray(s, a) {
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

function _formatInnerText(t) {
    var s = t.replace(/\ +/g, "");
    s = t.replace(/[ ]/g, "");
    s = t.replace(/[\r\n]/g, "");
    return s.replace(/(^\s*)|(\s*$)/g, "");
};

/**
 * 获取最大index值
 */
function _getLayerMaxZIndex() {
    var _max = Math.max.apply(null, $.map($('body *'), function (e) {
        var _$e = $(e);
        if (_$e.css('position') != 'static') return parseInt(_$e.css('z-index')) || 1;
    }));
    return (_max + '').indexOf('Infinity') >= 0 ? 1 : _max + 1;
};

/**
 * 生成唯一uid
 */
function _genEditorUid() {
    return '' + +new Date();
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Text = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lang = __webpack_require__(3);

var _Selector = __webpack_require__(1);

var _Editor = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Text = exports.Text = function () {
    function Text($this) {
        _classCallCheck(this, Text);

        this.bindevent($this);
    }

    _createClass(Text, [{
        key: '_syncRenderTextEditorView',
        value: function _syncRenderTextEditorView($this) {
            _Selector.selectors._$editorTextModule.attr('role', 'edit').show();
            _Selector.selectors._$editorTextArea.html(_Selector.selectors._$selected.hasClass('Eleditor-placeholder') ? '' : _Selector.selectors._$selected.html());
            _Selector.selectors._$editorTextArea.attr('style', _Selector.selectors._$selected.attr('style'));
            if (_Selector.selectors._$selected.css('font-weight') == 'bold') {
                _Selector.selectors._$editorTextModule.find('.Eleditor-textStyle-bold').addClass('Eleditor-active');
            }

            if ((0, _lang._inArray)(_Selector.selectors._$selected.css('text-decoration'), ['overline', 'line-through', 'underline'])) {
                _Selector.selectors._$editorTextModule.find('.Eleditor-textStyle-linedecoration').addClass('Eleditor-active');
            }
            if (_Selector.selectors._$selected[0].tagName == 'A') {
                _Selector.selectors._$editorTextModule.attr('type', 'link');
                _Selector.selectors._$editorTextLinkArea.val(_Selector.selectors._$selected.attr('href'));
            } else {
                _Selector.selectors._$editorTextModule.attr('type', 'word');
            }

            var _selectAlign = _Selector.selectors._$selected.css('text-align');
            if ((0, _lang._inArray)(_selectAlign, ['left', 'center', 'right'])) {
                _Selector.selectors._$editorTextModule.find('.Eleditor-textStyle-align[align=' + _selectAlign + ']').addClass('Eleditor-active');
            } else {
                _Selector.selectors._$editorTextModule.find('.Eleditor-textStyle-align').removeClass('Eleditor-active');
            }
            _Selector.selectors._$editorTextModule.find('.Eleditor-textStyle-color span').css('background-color', _Selector.selectors._$selected.css('color'));
        }
    }, {
        key: 'bindevent',
        value: function bindevent($this) {
            var self = this;
            _Selector.selectors._$editorTextModule.on('click', '.Eleditor-textStyle-bold', function () {
                _Selector.selectors._$editorTextArea.css("font-weight", $(this).hasClass("Eleditor-active") ? "normal" : "bold");
                $(this).toggleClass("Eleditor-active");
            });
            _Selector.selectors._$editorTextModule.on('click', '.Eleditor-textStyle-linedecoration', function () {
                _Selector.selectors._$editorLinedecorationsModule.show();
                $(this).addClass('Eleditor-active');
            });
            _Selector.selectors._$editorTextModule.on('click', '.Eleditor-textStyle-color,.Eleditor-textStyle-bgColor', function () {
                var _$this = $(this);
                var _role = _$this.hasClass('Eleditor-textStyle-bgColor') ? 'bgcolor' : 'color';
                _Selector.selectors._$editorColorModule.find('.Eleditor-textEditor-modulePane span').html(_role == 'bgcolor' ? '文字背景颜色' : '文字颜色');
                _Selector.selectors._$editorColorModule.attr('role', _role).show();
                $(this).addClass('Eleditor-active');
            });
            _Selector.selectors._$editorTextModule.on('click', '.Eleditor-textStyle-fontSize', function () {
                _Selector.selectors._$editorFontsizeModule.show();
                $(this).addClass('Eleditor-active');
            });
            _Selector.selectors._$editorTextModule.on('click', '.Eleditor-textStyle-lineHeight', function () {
                _Selector.selectors._$editorLineheightModule.show();
                $(this).addClass('Eleditor-active');
            });
            _Selector.selectors._$editorLinedecorationsModule.on('click', 'ul li', function () {
                if (!$(this).hasClass('Eleditor-inheritValue')) {
                    _Selector.selectors._$editorTextArea.css("text-decoration", $(this).css('text-decoration'));
                } else {
                    _Selector.selectors._$editorTextArea.css("text-decoration", 'inherit');
                    _Selector.selectors._$editorTextModule.find('.Eleditor-textStyle-linedecoration').removeClass('Eleditor-active');
                }
                _Selector.selectors._$editorLinedecorationsModule.hide();
            });
            _Selector.selectors._$editorLineheightModule.on('click', 'ul li', function () {
                if (!$(this).hasClass('Eleditor-inheritValue')) {
                    _Selector.selectors._$editorTextArea.css("line-height", $(this).html());
                } else {
                    _Selector.selectors._$editorTextArea.css("line-height", 'inherit');
                    _Selector.selectors._$editorTextModule.find('.Eleditor-textStyle-lineHeight').removeClass('Eleditor-active');
                }
                _Selector.selectors._$editorLineheightModule.hide();
            });
            _Selector.selectors._$editorFontsizeModule.on('click', 'ul li', function () {
                if (!$(this).hasClass('Eleditor-inheritValue')) {
                    _Selector.selectors._$editorTextArea.css("font-size", $(this).html());
                } else {
                    _Selector.selectors._$editorTextArea.css("font-size", 'inherit');
                    _Selector.selectors._$editorTextModule.find('.Eleditor-textStyle-fontSize').removeClass('Eleditor-active');
                }
                _Selector.selectors._$editorFontsizeModule.hide();
            });

            _Selector.selectors._$editorTextModule.on('click', ".Eleditor-textStyle-align", function () {
                var _align = $(this).attr('align');
                _Selector.selectors._$editorTextArea.css({ "text-align": _align, "display": 'block' });
                _Selector.selectors._$editorTextModule.find(".Eleditor-textStyle-align.Eleditor-active").removeClass('Eleditor-active');
                $(this).addClass('Eleditor-active');
            });

            _Selector.selectors._$editorTextModule.on('click', ".Eleditor-textEditor-format", function () {
                var _$cloneTextArea = _Selector.selectors._$editorTextArea,
                    _removeAttrs = 'style width height border bgcolor align color';

                _$cloneTextArea.removeAttr(_removeAttrs);
                $.each(_$cloneTextArea.find('*'), function (_i, _e) {
                    var _$eachElm = _$cloneTextArea.find(_e);
                    if ((0, _lang._inArray)(_e.tagName.toLocaleLowerCase(), ['script', 'style'])) {
                        _$eachElm.remove();
                    } else {
                        _$eachElm.removeAttr(_removeAttrs);
                    }
                });

                _Selector.selectors._$editorTextArea.html(_$cloneTextArea.html());
                _Selector.selectors._$editorTextModule.find('.Eleditor-active').removeClass('Eleditor-active');
            });

            _Selector.selectors._$editorTextModule.on('click', ".Eleditor-textEditor-clean", function () {
                confirm('确定清空内容（不可恢复）？') && _Selector.selectors._$editorTextArea.html("");
            });

            _Selector.selectors._$editorTextModule.on('click', ".Eleditor-cancel,.Eleditor-commit", function () {
                arguments[0].preventDefault();
                if ($(this).hasClass('Eleditor-commit')) {
                    var _style = _Selector.selectors._$editorTextArea.attr('style') || '';
                    var _content = _Selector.selectors._$editorTextArea.html();
                    var _unode = _Selector.selectors._$selected.clone();
                    if (!_content) {
                        return alert('请输入内容文字');
                    }

                    if (_Selector.selectors._$editorTextModule.attr('role') == 'edit' || _Selector.selectors._$selected.hasClass('Eleditor-placeholder')) {
                        if (_Selector.selectors._$editorTextModule.attr('type') == 'link') {
                            var _link = _Selector.selectors._$editorTextLinkArea.val();
                            _$selected.attr('href', _link);
                        }
                        _Selector.selectors._$selected.attr('style', _style).removeClass('Eleditor-placeholder').html(_content);

                        (0, _Editor._appendHistory)($this, { m: 'editNode', node: _Selector.selectors._$selected, unode: _unode });
                        //_flushEditorControllerLayerPosi();
                    } else {
                        var _buildWordHtml = '';
                        if (_Selector.selectors._$editorTextModule.attr('type') == 'link') {
                            var _link = _Selector.selectors._$editorTextLinkArea.val();
                            _buildWordHtml = '<a target="_BLANK" style="' + _style + '" href="' + _link + '">' + _content + '</a>';
                        } else {
                            _buildWordHtml = '<p style="' + _style + '">' + _content + "</p>";
                        }
                        var _buildWordHtml = $(_buildWordHtml);
                        _Selector.selectors._$selected.after(_buildWordHtml);
                        //_flushEditorControllerLayerPosi();
                        (0, _Editor._appendHistory)($this, { m: 'insertNode', node: _buildWordHtml });
                    }
                }

                _Selector.selectors._$editorTextModule.find('.Eleditor-active').removeClass('Eleditor-active');
                _Selector.selectors._$editorTextModule.find('.Eleditor-textStyle-color span').removeAttr('style');
                _Selector.selectors._$editorTextArea.removeAttr('style').html('');
                _Selector.selectors._$editorTextLinkArea.val('');
                (0, _Editor._hideEditorWrapMask)();
                _Selector.selectors._$editorTextModule.hide();
                (0, _Editor._hideEditorControllerLayer)();
            });

            _Selector.selectors._$editorColorModule.on('click', 'ul li span', function () {
                var _color = $(this).css('background-color');
                if (_Selector.selectors._$editorColorModule.attr('role') == 'color') {
                    if (!$(this).hasClass('Eleditor-inheritValue')) {
                        _Selector.selectors._$editorTextArea.css("color", _color);
                        _Selector.selectors._$editorTextModule.find('.Eleditor-textStyle-color span').css("background-color", _color);
                    } else {
                        _Selector.selectors._$editorTextArea.css("color", 'inherit');
                        _Selector.selectors._$editorTextModule.find('.Eleditor-textStyle-color').removeClass('Eleditor-active').find('span').removeAttr('style');
                    }
                } else {
                    if (!$(this).hasClass('Eleditor-inheritValue')) {
                        _Selector.selectors._$editorTextArea.css("background-color", _color);
                    } else {
                        _Selector.selectors._$editorTextArea.css("background-color", 'inherit');
                        _Selector.selectors._$editorTextModule.find('.Eleditor-textStyle-bgColor').removeClass('Eleditor-active');
                    }
                }
                _Selector.selectors._$editorColorModule.hide();
            });
        }
    }]);

    return Text;
}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports._editorModuleEvents = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.initEvent = initEvent;

var _lang = __webpack_require__(3);

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _Text = __webpack_require__(4);

var _Selector = __webpack_require__(1);

var _Editor = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//事件处理对象
var _editorModuleEvents = exports._editorModuleEvents = {
    insertText: function insertText($this) {
        (0, _Editor._showEditorWrapMask)();
        _Selector.selectors._$editorTextModule.attr({ 'role': 'insert', 'type': 'word' }).show();
    },
    insertLink: function insertLink($this) {
        (0, _Editor._showEditorWrapMask)();
        _Selector.selectors._$editorTextModule.attr({ 'role': 'insert', 'type': 'link' }).show();
    },
    insertImage: function insertImage($this) {
        if (typeof WebUploader === 'undefined') {
            alert('图片上传请手动引入插件根目录webuploader.min.js');
        }
    },
    insertHr: function insertHr($this) {
        var _$hr = $('<div class="horizontal-line" style="padding: 10px 0;border-bottom: 1px solid #aaa;margin-bottom: 20px;"></div>');
        _Selector.selectors._$selected.after(_$hr);
        (0, _Editor._appendHistory)($this, { m: 'insertNode', node: _$hr });
        (0, _Editor._hideEditorControllerLayer)();
    },
    editText: function editText($this) {
        if ((0, _lang._inArray)(_Selector.selectors._$selected[0].tagName, _config2.default._notctname)) {
            return this.insertText($this);
        }
        (0, _Editor._showEditorWrapMask)();
        $this.Text._syncRenderTextEditorView($this);
    },
    deleteThis: function deleteThis($this) {
        (0, _Editor._appendHistory)($this, { m: 'deleteNode', node: _Selector.selectors._$selected, pnode: _Selector.selectors._$selected.prev() });
        _Selector.selectors._$selected.remove();
        (0, _Editor._hideEditorControllerLayer)();
        (0, _Editor._correctHtmlStructure)(_Selector.selectors._$wrap, _config2.default.placeHolder);
    },
    deleteBefore: function deleteBefore($this) {
        var _$prev = _Selector.selectors._$selected.prev();
        (0, _Editor._appendHistory)($this, { m: 'deleteBeforeNode', node: _Selector.selectors._$selected, bnode: _Selector.selectors._$selected.prevAll() });
        var _$prev_prev;
        while (_$prev.length > 0) {
            _$prev_prev = _$prev.prev();
            _$prev.remove();
            _$prev = _$prev_prev;
        }
        var _$parent = _Selector.selectors._$selected.parent();
        while (_$parent.length > 0 && !_$parent.hasClass("Eleditor-area")) {
            _$prev = _$parent.prev();
            while (_$prev.length > 0) {
                _$prev_prev = _$prev.prev();
                _$prev.remove();
                _$prev = _$prev_prev;
            }
            _$parent = _$parent.parent();
        }
        (0, _Editor._hideEditorControllerLayer)();
        (0, _Editor._correctHtmlStructure)(_Selector.selectors._$wrap, _config2.default.placeHolder);
    },
    deleteAfter: function deleteAfter($this) {
        var _$next = _Selector.selectors._$selected.next();
        (0, _Editor._appendHistory)($this, { m: 'deleteAfterNode', node: _Selector.selectors._$selected, anode: _Selector.selectors._$selected.nextAll() });
        var _$next_next;
        while (_$next.length > 0) {
            _$next_next = _$next.next();
            _$next.remove();
            _$next = _$next_next;
        }
        var _$parent = _Selector.selectors._$selected.parent();
        while (_$parent.length > 0 && !_$parent.hasClass("Eleditor-area")) {
            _$next = _$parent.next();
            while (_$next.length > 0) {
                _$next_next = _$next.next();
                _$next.remove();
                _$next = _$next_next;
            }
            _$parent = _$parent.parent();
        }
        (0, _Editor._hideEditorControllerLayer)();
        (0, _Editor._correctHtmlStructure)(_Selector.selectors._$wrap, _config2.default.placeHolder);
    },
    undo: function undo($this) {
        _handleHistory();
        (0, _Editor._hideEditorControllerLayer)();
    },
    cancel: function cancel($this) {
        (0, _Editor._hideEditorControllerLayer)();
    }
};

function initEvent() {
    for (var i = 0; i < _config2.default.toolbars.length; i++) {
        if (_typeof(_config2.default.toolbars[i]) === 'object') {
            _editorModuleEvents[_config2.default.toolbars[i].id] = _config2.default.toolbars[i].handle;
        }
    };
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Editor = __webpack_require__(2);

var _Editor2 = _interopRequireDefault(_Editor);

__webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// export { mobeditor }
exports.default = _Editor2.default;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports._stylebarUploader = exports._controllerUploader = undefined;
exports.initUpload = initUpload;

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _lang = __webpack_require__(3);

var _Text = __webpack_require__(4);

var _Selector = __webpack_require__(1);

var _Editor = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//封装Uploader函数


var _controllerUploader = exports._controllerUploader = null;
var _stylebarUploader = exports._stylebarUploader = null;
function initUpload($this) {
    if ((0, _lang._inArray)('insertImage', _config2.default.toolbars) && typeof WebUploader != 'undefined') {
        exports._controllerUploader = _controllerUploader = WebUploader.create({
            auto: true,
            server: _config2.default.upload.server || '/upload',
            pick: _Selector.selectors._$editorUploadImageBtn, duplicate: true, resize: false,
            fileSingleSizeLimit: _config2.default.upload.fileSizeLimit ? _config2.default.upload.fileSizeLimit * 1024 * 1024 : undefined,
            accept: {
                title: 'Images', extensions: 'gif,jpg,jpeg,bmp,png,webp',
                mimeTypes: 'image/gif,image/jpg,image/jpeg,image/bmp,image/png,image/webp'
            }
        });
        _controllerUploader.on('uploadStart', function (_file, _percentage) {
            (0, _Editor._hideEditorControllerLayer)();
            _showLoadingMask('上传图片中<span id="uploadProgress">1</span>%');
        });
        _controllerUploader.on('uploadProgress', function (_file, _percentage) {
            $('#uploadProgress').html(parseFloat((_percentage * 100).toFixed(2)));
        });
        _controllerUploader.on('error', function () {
            if (arguments[0] == "Q_TYPE_DENIED") alert("请上传图片格式文件");
            if (arguments[0] == "F_EXCEED_SIZE") alert("文件大小不能超过" + arguments[1] / 1048576 + "M");
        });
        _controllerUploader.on('uploadComplete', function () {
            $this._hideLoadingMask();
        });
        _controllerUploader.on('uploadSuccess', function (_file, _call) {
            if (_call.status == 1) {
                var _$upImg = $('<img src="' + _call.url + '">');
                _Selector.selectors._$selected.after(_$upImg);
                (0, _Editor._appendHistory)($this, { m: 'insertNode', node: _$upImg });
            } else {
                alert(_call.msg);
            }
        });

        //bar
        exports._stylebarUploader = _stylebarUploader = WebUploader.create({
            auto: true,
            server: _config2.default.upload.server || '/upload',
            pick: _Selector.selectors._$editorBarUploadImageBtn, duplicate: true, resize: false, compress: false,
            fileSingleSizeLimit: _config2.default.upload.fileSizeLimit ? _config2.default.upload.fileSizeLimit * 1024 * 1024 : undefined,
            accept: {
                title: 'Images', extensions: 'gif,jpg,jpeg,bmp,png,webp',
                mimeTypes: 'image/gif,image/jpg,image/jpeg,image/bmp,image/png,image/webp'
            }
        });
        _stylebarUploader.on('uploadStart', function (_file, _percentage) {
            _showLoadingMask('上传图片中<span id="uploadProgress">1</span>%');
        });
        _stylebarUploader.on('uploadProgress', function (_file, _percentage) {
            $('#uploadProgress').html(parseFloat((_percentage * 100).toFixed(2)));
        });
        _stylebarUploader.on('error', function () {
            if (arguments[0] == "Q_TYPE_DENIED") alert("请上传图片格式文件");
            if (arguments[0] == "F_EXCEED_SIZE") alert("文件大小不能超过" + arguments[1] / 1048576 + "M");
        });
        _stylebarUploader.on('uploadComplete', function () {
            $this._hideLoadingMask();
        });
        _stylebarUploader.on('uploadSuccess', function (_file, _call) {
            if (_call.status == 1) {
                _Selector.selectors._$editorTextArea.append('<img src="' + _call.url + '">');
            } else {
                alert(_call.msg);
            }
        });
    }
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initTool = initTool;

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _Event = __webpack_require__(5);

var _Selector = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initTool($editor) {
    _Selector.selectors._$editorController.on('click', 'ul li', function () {
        var _$this = $(this),
            _event = _$this.attr('event');
        if (typeof _Event._editorModuleEvents[_event] === 'function') {
            if (typeof _config2.default._toolnames[_event] != 'undefined') {
                _Event._editorModuleEvents[_event]($editor);
            } else {
                _Event._editorModuleEvents[_event](_Selector.selectors._$selected, _$this) !== false && _Event._editorModuleEvents.cancel($editor);
            }
        }
    });
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(10);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(12)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./base.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./base.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)(undefined);
// imports


// module
exports.push([module.i, "/**\r\n* Version: 1.6\r\n* Title: Eleditor 移动端富文本编辑器\r\n* Site: https://eleditor.fixel.cn\r\n* Author: Try\r\n*/\r\n\r\n.Eleditor-scrollLocked {\r\n    height: 100%;\r\n    overflow: hidden\r\n}\r\n\r\n\r\n\r\n.Eleditor-loading {\r\n    display: none;\r\n    position: absolute;\r\n    padding: 15px;\r\n    background: rgba(255, 255, 255, .9);\r\n    z-index: 999;\r\n    width: 100%;\r\n    height: 100%\r\n}\r\n\r\n.Eleditor-loading p {\r\n    font-size: 12px;\r\n    color: #666;\r\n    text-align: center;\r\n    position: absolute;\r\n    top: 50%;\r\n    left: 50%;\r\n    transform: translate(-50%, -50%);\r\n    -webkit-transform: translate(-50%, -50%)\r\n}\r\n\r\n.Eleditor-loading p:before {\r\n    content: '';\r\n    width: 25px;\r\n    height: 25px;\r\n    margin: 0 auto;\r\n    background: url(data:image/gif;base64,R0lGODlhIAAgALMAAP///7Ozs/v7+9bW1uHh4fLy8rq6uoGBgTQ0NAEBARsbG8TExJeXl/39/VRUVAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFBQAAACwAAAAAIAAgAAAE5xDISSlLrOrNp0pKNRCdFhxVolJLEJQUoSgOpSYT4RowNSsvyW1icA16k8MMMRkCBjskBTFDAZyuAEkqCfxIQ2hgQRFvAQEEIjNxVDW6XNE4YagRjuBCwe60smQUDnd4Rz1ZAQZnFAGDd0hihh12CEE9kjAEVlycXIg7BAsMB6SlnJ87paqbSKiKoqusnbMdmDC2tXQlkUhziYtyWTxIfy6BE8WJt5YEvpJivxNaGmLHT0VnOgGYf0dZXS7APdpB309RnHOG5gDqXGLDaC457D1zZ/V/nmOM82XiHQjYKhKP1oZmADdEAAAh+QQFBQAAACwAAAAAGAAXAAAEchDISasKNeuJFKoHs4mUYlJIkmjIV54Soypsa0wmLSnqoTEtBw52mG0AjhYpBxioEqRNy8V0qFzNw+GGwlJki4lBqx1IBgjMkRIghwjrzcDti2/Gh7D9qN774wQGAYOEfwCChIV/gYmDho+QkZKTR3p7EQAh+QQFBQAAACwBAAAAHQAOAAAEchDISWdANesNHHJZwE2DUSEo5SjKKB2HOKGYFLD1CB/DnEoIlkti2PlyuKGEATMBaAACSyGbEDYD4zN1YIEmh0SCQQgYehNmTNNaKsQJXmBuuEYPi9ECAU/UFnNzeUp9VBQEBoFOLmFxWHNoQw6RWEocEQAh+QQFBQAAACwHAAAAGQARAAAEaRDICdZZNOvNDsvfBhBDdpwZgohBgE3nQaki0AYEjEqOGmqDlkEnAzBUjhrA0CoBYhLVSkm4SaAAWkahCFAWTU0A4RxzFWJnzXFWJJWb9pTihRu5dvghl+/7NQmBggo/fYKHCX8AiAmEEQAh+QQFBQAAACwOAAAAEgAYAAAEZXCwAaq9ODAMDOUAI17McYDhWA3mCYpb1RooXBktmsbt944BU6zCQCBQiwPB4jAihiCK86irTB20qvWp7Xq/FYV4TNWNz4oqWoEIgL0HX/eQSLi69boCikTkE2VVDAp5d1p0CW4RACH5BAUFAAAALA4AAAASAB4AAASAkBgCqr3YBIMXvkEIMsxXhcFFpiZqBaTXisBClibgAnd+ijYGq2I4HAamwXBgNHJ8BEbzgPNNjz7LwpnFDLvgLGJMdnw/5DRCrHaE3xbKm6FQwOt1xDnpwCvcJgcJMgEIeCYOCQlrF4YmBIoJVV2CCXZvCooHbwGRcAiKcmFUJhEAIfkEBQUAAAAsDwABABEAHwAABHsQyAkGoRivELInnOFlBjeM1BCiFBdcbMUtKQdTN0CUJru5NJQrYMh5VIFTTKJcOj2HqJQRhEqvqGuU+uw6AwgEwxkOO55lxIihoDjKY8pBoThPxmpAYi+hKzoeewkTdHkZghMIdCOIhIuHfBMOjxiNLR4KCW1ODAlxSxEAIfkEBQUAAAAsCAAOABgAEgAABGwQyEkrCDgbYvvMoOF5ILaNaIoGKroch9hacD3MFMHUBzMHiBtgwJMBFolDB4GoGGBCACKRcAAUWAmzOWJQExysQsJgWj0KqvKalTiYPhp1LBFTtp10Is6mT5gdVFx1bRN8FTsVCAqDOB9+KhEAIfkEBQUAAAAsAgASAB0ADgAABHgQyEmrBePS4bQdQZBdR5IcHmWEgUFQgWKaKbWwwSIhc4LonsXhBSCsQoOSScGQDJiWwOHQnAxWBIYJNXEoFCiEWDI9jCzESey7GwMM5doEwW4jJoypQQ743u1WcTV0CgFzbhJ5XClfHYd/EwZnHoYVDgiOfHKQNREAIfkEBQUAAAAsAAAPABkAEQAABGeQqUQruDjrW3vaYCZ5X2ie6EkcKaooTAsi7ytnTq046BBsNcTvItz4AotMwKZBIC6H6CVAJaCcT0CUBTgaTg5nTCu9GKiDEMPJg5YBBOpwlnVzLwtqyKnZagZWahoMB2M3GgsHSRsRACH5BAUFAAAALAEACAARABgAAARcMKR0gL34npkUyyCAcAmyhBijkGi2UW02VHFt33iu7yiDIDaD4/erEYGDlu/nuBAOJ9Dvc2EcDgFAYIuaXS3bbOh6MIC5IAP5Eh5fk2exC4tpgwZyiyFgvhEMBBEAIfkEBQUAAAAsAAACAA4AHQAABHMQyAnYoViSlFDGXBJ808Ep5KRwV8qEg+pRCOeoioKMwJK0Ekcu54h9AoghKgXIMZgAApQZcCCu2Ax2O6NUud2pmJcyHA4L0uDM/ljYDCnGfGakJQE5YH0wUBYBAUYfBIFkHwaBgxkDgX5lgXpHAXcpBIsRADs=) no-repeat center top;\r\n    background-size: 100%;\r\n    display: inline-block;\r\n    vertical-align: middle;\r\n    margin-right: 10px\r\n}\r\n\r\n.Eleditor-wrap ul {\r\n    list-style: none\r\n}\r\n\r\n.Eleditor-area,\r\n.Eleditor-area *,\r\n.Eleditor-wrap,\r\n.Eleditor-wrap * {\r\n    cursor: pointer;\r\n    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\r\n    tap-highlight-color: rgba(0, 0, 0, 0)\r\n}\r\n\r\n.Eleditor-area .Eleditor-active {\r\n    background: #cce0f2!important;\r\n    padding: 2%!important\r\n}\r\n\r\n.Eleditor-wrap {\r\n    position: fixed;\r\n    bottom: 0;\r\n    left: 0;\r\n    z-index: 11000;\r\n    width: 100%;\r\n    -webkit-transform: translate3d(0, 100%, 0);\r\n    transform: translate3d(0, 100%, 0);\r\n}\r\n\r\n.Eleditor-wrap.in {\r\n    -webkit-transition-duration: 300ms;\r\n    -o-transition-duration: 300ms;\r\n    transition-duration: 300ms;\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n}\r\n\r\n.Eleditor-wrap.out {\r\n    z-index: 10999;\r\n    -webkit-transition-duration: 300ms;\r\n    -o-transition-duration: 300ms;\r\n    transition-duration: 300ms;\r\n    -webkit-transform: translate3d(0, 100%, 0);\r\n    transform: translate3d(0, 100%, 0);\r\n}\r\n\r\n\r\n.Eleditor-wrap.Eleditor-mask {\r\n    position: absolute;\r\n    left: 0;\r\n    top: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    background: rgba(0, 0, 0, .5);\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n}\r\n\r\n.Eleditor-controller {\r\n    background: #fafafa;\r\n    box-sizing: border-box;\r\n    margin-top: 5px;\r\n    box-shadow: 0 0 20px rgba(0, 0, 0, .2);\r\n    -webkit-box-shadow: 0 0 20px rgba(0, 0, 0, .2);\r\n    border-bottom: 1px solid #e1e1e1;\r\n    border-radius: 3px;\r\n    -webkit-border-radius: 3px\r\n}\r\n\r\n.Eleditor-controller ul {\r\n    margin-bottom: 2.5%\r\n}\r\n\r\n.Eleditor-controller ul:after {\r\n    content: '';\r\n    display: block;\r\n    height: 0;\r\n    clear: both\r\n}\r\n\r\n.Eleditor-controller ul li {\r\n    float: left;\r\n    display: inline-block;\r\n    width: 30%;\r\n    margin: 2% 0 0 2.5%;\r\n    height: 42px;\r\n    border-radius: 3px;\r\n    -webkit-border-radius: 3px;\r\n    line-height: 42px;\r\n    padding-left: 10%;\r\n    box-sizing: border-box;\r\n    font-size: 14px;\r\n    border-right: 1px solid #ddd;\r\n    border-bottom: 1px solid #ddd;\r\n    border-top: 1px solid #eee;\r\n    border-left: 1px solid #eee;\r\n    white-space: nowrap;\r\n    position: relative\r\n}\r\n\r\n.Eleditor-controller ul li.Eleditor-undo {\r\n    display: none\r\n}\r\n\r\n.Eleditor-controller ul li:before {\r\n    background-size: 100%;\r\n    background-repeat: no-repeat\r\n}\r\n\r\n.Eleditor-controller ul li:before {\r\n    content: '';\r\n    position: absolute;\r\n    left: 8px;\r\n    top: 12px;\r\n    width: 15px;\r\n    height: 15px;\r\n    display: block;\r\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAANlBMVEUAAABIotJIodFIo9NIo9NHotJAn89IotFHotJHodFIn9dHotJIodJHotFHodFHodFHodFIotIElcMpAAAAEXRSTlMAwIBAf7AQ4HDvINCg8M+Qb3nwl3EAAAC/SURBVDjL7dPRasQgEEbhf3THqEm2Pe//sl3Ixc5GF3JRaAv97tQDwojiVfOsh+yNV2LQpc5AYCnYIEkJPAUGgqRowSRjVZQmoR2h/Yd/KNwUNVxymqIN5LDY0wJVqtDC5h1MmZO9SGXnJEs9WeC16KFUt+Cj65usS3ku+s0C/wxHGXJYnLQyDw3WYTyTcBj4jk/D2RP+aJgPFWo+lGl4Z7BMw/VqWCZX/7rxXAmX96Hdgg3Sm3DQL4W75/lX+ALtiBv2wt/cBwAAAABJRU5ErkJggg==)\r\n}\r\n\r\n.Eleditor-controller ul li.Eleditor-insertText:before {\r\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjBAMAAADs965qAAAAHlBMVEUAAAAmk/8mk/8mk/8mk/8mk/8mk/8mk/8mk/8mk//nRnVBAAAACXRSTlMAQBCAcMAgMKCd1QxoAAAAf0lEQVQoz2NwlJyJCiYwCHASIzRziiAyEAEJTWRABoxECiHMEmNgKBQUAgohbJzMwBAJ1AESaracOTM0EkUIpIKBE0UI7JYpyGaBbUHYSroQE8htKGYBMQhMJEUI0yxjMwwbgVwihRBmwYUQNpImxCQohDCL8nhEpAmciYmwEAAsoK4MjVmkgQAAAABJRU5ErkJggg==)\r\n}\r\n\r\n.Eleditor-controller ul li.Eleditor-insertImage:before {\r\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAMAAAApB0NrAAAAM1BMVEUAAAD/gAD/gAD/gAD/gAD/gAD/gAD/gAD/gAD/gAD/gAD/gAD/gAD/gAD/gAD/gAD/gABSMWeoAAAAEHRSTlMAwKDiQBBQ8CCwkIBg0HAwYTpfggAAAMVJREFUOMvN1EsOgzAMBFA7H/6lvv9pa1DK1IlwWHYWQRo9RmJBiIYoXuKgRHoZSFdGvs+xREoy3ScrUsPkhX9N3pmX7Jr8Es349kwon+qZUWTf9KiHIow+5XwpWRLE7syLFlNDYFY5wy2BoVk0r1yTCKNJ67o1K4FhEEuoGI8YM6WUW2LMIkc3VQSmVFAgMGfFfCkQmFKlotJFYFAVBfI1ERW2yBhURQWeN6oMCGINiGci9Q3/mZHu/x716NwbT+6fJ/fYB/HBGdUQKWkCAAAAAElFTkSuQmCC)\r\n}\r\n\r\n.Eleditor-controller ul li.Eleditor-undo:before {\r\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAMAAAApB0NrAAAATlBMVEUAAABubm5wcHBpaWpwcHBwcHBsbG5nZ2lwcHBwcHBwcHBwcHBwcHBubnBpaWlwcHBwcHBwcHBwcHBwcHBwcHBpaWlwcHBwcHBoaGhwcHCaDFyHAAAAGXRSTlMAPsUR69IhMvZKpZJ9Vgfg2a5kmnQruYYXgiMi7QAAAM1JREFUOMvlklmSwyAMRI0QiwGvGSd597/oDJWqzGIH/0/6D9UDpFZ376Hr9RS5QGgTVgDTRPzMGWMUpM0MwBqa/XwAQ2eghPsLJIN+/dIDxDkNdkeMC8y+tj3xUExmP7PYB333Zr04gGX7gfQO0u9b200hrt8FwO39LBFy652qzcHtsB9rx2fZQX80V4w6yVIGXyFFxwN/npLi63E98jmXvDilKnlBXu7LmiJAdGho7T0kqnI7P2YC3EkO6/TxLM92QnfmivyJlfbdv9Unig4RkspeaqcAAAAASUVORK5CYII=)\r\n}\r\n\r\n.Eleditor-controller ul li.Eleditor-insertImage div[id^='rt_rt_'] {\r\n    left: 0!important;\r\n    width: 100%!important;\r\n    opacity: 0;\r\n    -webkit-tap-highlight-color: rgba(0, 0, 0, 0)\r\n}\r\n\r\n.Eleditor-controller ul li.Eleditor-insertLink:before {\r\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAMAAAApB0NrAAAAM1BMVEUAAAAmk/8mk/8mk/8mk/8mk/8mk/8mk/8mk/8mk/8mk/8mk/8mk/8mk/8mk/8mk/8mk/+67wOaAAAAEHRSTlMA8NAwEIBAwCCwoHBgUOCQaFFl2wAAAPlJREFUOMuFlN0ShSAIhP0DMU/l+z/tkZxsm2LaK2M+BDcG9ypefGvNL+wsxdxO5WRc4tslH9+QX1OVylQOSAwkyCgatNw7spxdJIX4FYH2xyeKBwIqvaPHo9bqUNST3IfYYux7eM+9eK5i9iN5WksXImrnfCT+gHDzZ70hgWjfjgMgAZEwDK16pon4iEiChM1EhEiLr0Ri3rLNoF2INFyHWYi4MJB5bttOFBoiv4cfzzHVgQT3aXqZr6hXs0FSs+/AjtPXM6r70DGw3wzhd6IVcp79oHWopceiiQwx+oMIKis0woIISg7XCnEt9hKI1p5AJdg3BvK5t/7GyxRFV0zN3AAAAABJRU5ErkJggg==)\r\n}\r\n\r\n.Eleditor-controller ul li.Eleditor-insertHr:before {\r\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjBAMAAADs965qAAAAG1BMVEUAAAAmk/8mk/8mk/8mk/8mk/8mk/8mk/8mk//SKiEGAAAACHRSTlMAgEAQ0CCgwHszpJ0AAABeSURBVCjPYwABiQ4k0IBTqE0QDiqgQk1gCsKmuZABppAzplCLAYZQhzOmEFBZkDJCKEiBoQOoDA10gJQxIgJCACTUkYAuhKkK0yysNjoT43pnokKCYTALYaQcwkkOAOuLWyAmEX4YAAAAAElFTkSuQmCC)\r\n}\r\n\r\n.Eleditor-controller ul li.Eleditor-deleteThis:before,\r\n.Eleditor-controller ul li.Eleditor-deleteBefore:before,\r\n.Eleditor-controller ul li.Eleditor-deleteAfter:before {\r\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjBAMAAADs965qAAAALVBMVEUAAAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAB21glVAAAADnRSTlMAwEDQMBDgUPCgYCCQgBYit2kAAACsSURBVCjP5czBCcIwFMbxr6UgejI3T0UygFQHCIILBDzosRMED87TGZxAOoJukLaCVeHNYBpCEnrz7P/wDj/4HmwzGnoj6miplxFVPWNsQXWQlFq7/gRKaA5T3sB2NxNBa2ZSNNwbaJyGGFOBlNOG+0TLYTK/fbmGozNwkMhOgaZ0gSpxfQVKaAnSWDV/T5NOoqqxfwaC7zcqAglHDy8ZOYpypGIqLe0i6bbAFx3L0mvjGhXnAAAAAElFTkSuQmCC)\r\n}\r\n\r\n.Eleditor-controller ul li.Eleditor-cancel:before {\r\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjBAMAAADs965qAAAAJ1BMVEUAAACIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIgln7UqAAAADHRSTlMAYLAgMfKf4EGAclBp3/IGAAAA9UlEQVQoz2MAA+ZFNWfOFC1mQAAOnTNgoAEXYdY5czxTQjL9zBllmNDWM8ccQLTbmaMbICKMZw4ZQFhGZw5CGDJHBWDqRc+AmdxnQuCmssScBlGmRx0QdrseBZmhA9EPM1cB6CYQ4QxxjANQwQkGBqYzBgwsEFNljjAw2BwC4mNAaaDlIE2HGRjYgCrWHAHJA5WBCaCGBQw6BWAFB8EYCGoUGGoSGCDKZCAG5hQwnJkAsfwY1DNzDjAA5SDKYAygUAOQBtl0DOLYHuyqMM3CtBGbuzBdj82PmCGBGV5YQxUz7DFjCDMeMWMbZ5rATDmY6QszFQIAly6EERaFwtIAAAAASUVORK5CYII=)\r\n}\r\n\r\n.Eleditor-controller ul li.Eleditor-editText:before {\r\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjBAMAAADs965qAAAAJ1BMVEUAAAAmk/8mk/8mk/8mk/8mk/8mk/8mk/8mk/8mk/8mk/8mk/8mk//34ERwAAAADHRSTlMAgEAQ0KBgMMDwcOAe1XweAAAA3UlEQVQoz4XRrcoCQRjF8fPiOwomRRARg3gFghttYjMs5g02i8FL8ALsGgxegs2q4ieci3J2d2aPA4In/vjDAzMIVlofAVR6fl0g4msJJPSLgQm5AQq5AVgwzaiotC+TPIDPerY2EN3S7ASei3MTxjZbQRSRNrv2LSmizUYQRe5sRorIfU6KeO07UjSCJ0UiRVNHiszFkaLEkaIqPXV89FeQcZGoiSSPROuZySPR7o4kjUQVcmbSSFQm72jgkwxthoD+yW0tpOF4DoQ08CDCT8p+W2tlFO4bPfxTaTHeolbpPP71OVwAAAAASUVORK5CYII=)\r\n}\r\n\r\n@media screen and (max-width:300px) {\r\n    .Eleditor-controller ul li {\r\n        width: 30%;\r\n        text-align: center;\r\n        padding-left: 0;\r\n        font-size: 12px\r\n    }\r\n    .Eleditor-controller ul li:before {\r\n        display: none\r\n    }\r\n}\r\n\r\n.Eleditor-textEditor {\r\n    display: none;\r\n    width: 100%;\r\n    height: 100%;\r\n    background: #fff;\r\n    position: fixed;\r\n    left: 0;\r\n    top: 0\r\n}\r\n\r\n.Eleditor-textEditor-colors,\r\n.Eleditor-textEditor-fontsizes,\r\n.Eleditor-textEditor-lineheight,\r\n.Eleditor-textEditor-linedecorations {\r\n    display: none;\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    background: #fff;\r\n    z-index: 1\r\n}\r\n\r\n.Eleditor-textEditor-modulePane {\r\n    margin: 10px 8px;\r\n    border-bottom: 1px solid #ccc;\r\n    padding-bottom: 10px\r\n}\r\n\r\n.Eleditor-textEditor-linedecorations .Eleditor-textEditor-modulePane {\r\n    margin-bottom: 0\r\n}\r\n\r\n.Eleditor-textEditor-linedecorations ul li {\r\n    text-align: center;\r\n    display: block;\r\n    color: #555;\r\n    font-size: 14px;\r\n    letter-spacing: 2px;\r\n    padding: 20px 0;\r\n    border-bottom: 1px solid #eee\r\n}\r\n\r\n.Eleditor-textEditor-colors ul:after {\r\n    content: '';\r\n    display: block;\r\n    clear: both;\r\n    height: 0\r\n}\r\n\r\n.Eleditor-textEditor-colors ul li {\r\n    float: left;\r\n    text-align: center;\r\n    width: 20%;\r\n    margin-bottom: 10px\r\n}\r\n\r\n.Eleditor-textEditor-colors ul li span {\r\n    width: 40px;\r\n    height: 40px;\r\n    display: inline-block;\r\n    border-radius: 3px;\r\n    cursor: pointer;\r\n    position: relative\r\n}\r\n\r\n.Eleditor-textEditor-colors ul li span.transparent:after,\r\n.Eleditor-textEditor-colors ul li span.transparent:before {\r\n    position: absolute;\r\n    background: #dedede;\r\n    content: '';\r\n    transform: rotate(45deg);\r\n    -webkit-transform: rotate(45deg)\r\n}\r\n\r\n.Eleditor-textEditor-colors ul li span.transparent:after {\r\n    width: 1px;\r\n    height: 100%;\r\n    left: 50%;\r\n    top: 0\r\n}\r\n\r\n.Eleditor-textEditor-colors ul li span.transparent:before {\r\n    width: 100%;\r\n    height: 1px;\r\n    left: 0;\r\n    top: 50%\r\n}\r\n\r\n.Eleditor-textEditor-fontsizes ul li,\r\n.Eleditor-textEditor-lineheight ul li {\r\n    text-align: center;\r\n    color: #333;\r\n    font-size: 14px;\r\n    line-height: 30px\r\n}\r\n\r\n.Eleditor-textStyle {\r\n    display: flex;\r\n    display: -webkit-flex;\r\n    position: relative;\r\n    border-bottom: 1px solid #eee;\r\n    overflow-x: auto;\r\n    overflow-y: hidden;\r\n    box-shadow: 0 0 10px rgba(0, 0, 0, .1);\r\n    -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, .1)\r\n}\r\n\r\n.Eleditor-textStyle .Eleditor-textStyle-item {\r\n    flex: 1;\r\n    -webkit-flex: 1;\r\n    padding: 10px 0\r\n}\r\n\r\n.Eleditor-textStyle .Eleditor-textStyle-item div {\r\n    width: 24px;\r\n    height: 24px;\r\n    position: relative;\r\n    margin: auto\r\n}\r\n\r\n.Eleditor-textStyle .Eleditor-textStyle-item div:before {\r\n    content: '';\r\n    position: absolute;\r\n    left: 0;\r\n    top: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    display: block;\r\n    background-size: 20px;\r\n    background-position: center;\r\n    background-repeat: no-repeat\r\n}\r\n\r\n.Eleditor-textStyle .Eleditor-textStyle-item .Eleditor-active {\r\n    background-color: #FFE69F!important;\r\n    padding: 0;\r\n    border: 1px solid #DCAC6C;\r\n    border-radius: 2px\r\n}\r\n\r\n.Eleditor-textStyle .Eleditor-textStyle-item .Eleditor-textStyle-bold:before {\r\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAACgUlEQVRYR82Y0XEaQQyGpWWO19BB7AqCKwipIHYFcQeBh9MOT8FPzC4PmApyVBB3ENOBU0FIBbGf4U4ZkSVzM8GsbjycV08wo+O+ldC//y5C4oGJ80EU0Dk3McawZiHM/AgAD5JLRCvNM7GcKKD3XgX3zIsEtsiybDkajQS+cagAmfkJEXeV0QQz9xHxTS33ERFv8zy/0Txfz1EBAsCKiAZNfnw+n/c2m80lAEwA4G149j7Lsqsm1TwZYH0xzrkhIs73kET0QbvYVgAFxnt/DQBf5TMzj6y1txrI1gAD5B0AfGTmtbX2PDnA6XR61ul0fgawCyKKDl6rFRQw59wDIr5j5htrrQzQ0Wgd0Ht/DwDvkwVMuoJBG3+HSb6y1srQpNPiuh6WZXk+Ho/XyQB67/sA8B0Aesy8tNaKLkajlSERR4SInwPcU1VVfU31hP5kgEHzRJRlmzsL/zsxHQON/u1LqwX85/OiPfmbcMhYrMqyvNZWrimgkutwGiJOttvtsimcusVN/aAI8SFUZr4zxizyPBexVoW2xY39oLxd/ofGGJle8YWXNRM7JKKFhvCkgHWAINKFuJkwMCrL1RrgHtY5VyDiJ/muEevWAQXMey87iBwDFkQ0PNbqVwEMwv1FjqhEdJEc4Gw2GzCzbHtyfj5apFepYPKAzjmRnG/JVrA2yVF9bb3FQQ/l4CS2K6qFrQN673dHzyR1sC7SSR2agjeUW4WdDWPmH9Za2aOjcdIWh2mVdopZ6O3hut3uQHuBpAKUqwpjjGz0zwYz102qwPxXIW1b6y9RAUb7cDzhFzMXVVUVpzKsanMZWrjPlyuOdZPzx6F1Riv4wuq9+PHkAf8AXHXCODnTUHYAAAAASUVORK5CYII=)\r\n}\r\n\r\n.Eleditor-textStyle .Eleditor-textStyle-item .Eleditor-textStyle-color:before {\r\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAC6klEQVRYR82YTW4TMRSA3xspWSGRLliTnIB2yYr0BMAJCNLYqsQCOAFwAsoGRX6JmJ6AcgLCCVpO0HACWokFmjDzkKNM5Px4xj+DindRPJ7Pb+zP7xmhxZam6QUi/iaih20Ni20NJKV8AgCf9XhJkgzG4/G8jbFbAxRCzBDx0QrqTCk1+m8AT05O+mVZXgHALwC4w8zXi8VikGXZdSxkKxGUUmYA8AwAzpi5v4rka6XU6a0DjkajXqfTuULEnl57RVEMEfETAMyVUoNbB5RSvgWAN8z8jYiGGkgIMUfE+8z8nIh0dINb9CeuYADgqVLqXJMY0DMiOg6mA4AoQCHESH9OZv5BRP0KRH/2brf7U/9m5iMiugyFjAWs1LKzIcyNE6OcYEAhxCEiXgDATZ7n/W2lGOqBPM8PQpUTDOgSIUPe75RSejN5tyBAc43VHWvG8ResnCBAY5d+ISJ9BltbrHKCAKuXlmV5PJlMZnWAUspXAPCemYOU4w1oU4sNcrUcdGZz12VC2+OEAC7V4nNKCCFOEfGlPqt9leMFmKbpMEmSrza12KJoKsc3V/QCrNTCzB+ISK8t5yaEOEfExwDgpRxnwJgo6FlU0de5IhEduM7MGdBHLbaXhyjHB1Bnx0E7sQI2DHBJREcuUXQCrAYGgO9KqUOXgff1CVGOE6CUUqdLD3zUYpuE71JpBDTVopTqhUaves53szUCGlmLlx4ajr9lkeWiq1pAc7axkbM8/yfP83t1uWItoHFE6fTd2V0+kymK4sV0Ov1oe8YKaJaTIYd8E6Rhhtpc0QrYlloa1mKjW+sAW6ttY5SzF7BttTTkisvy1Jbl7AUMzTya1t2+/5uKrx3AtspFV9iqfLXdiO0AxmS/rlDb/YzydOcCYAPQVEvslYUPbJ1yNgCNdGh9U+Xzopi++y6h9HjbgP9cLQ7K2ShP14BGSr5xUxUTFZ9nzVzRVM4acLX+MkTMqns+nxe00Xe1xIZmafoXDcwGR/w9qZwAAAAASUVORK5CYII=);\r\n    background-size: 16px\r\n}\r\n\r\n.Eleditor-textStyle .Eleditor-textStyle-item .Eleditor-textStyle-color:before {\r\n    background-position: center 3px;\r\n    background-size: 15px\r\n}\r\n\r\n.Eleditor-textStyle .Eleditor-textStyle-item .Eleditor-textStyle-color span {\r\n    display: block;\r\n    width: 18px;\r\n    height: 1px;\r\n    background: #333;\r\n    position: absolute;\r\n    bottom: 2px;\r\n    left: 4px\r\n}\r\n\r\n.Eleditor-textStyle .Eleditor-textStyle-item .Eleditor-textStyle-linedecoration:before {\r\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAACd0lEQVRYR+2YS3LaQBCGuwVoa98g9glCThByA3wCkxMEFswUqzgrqoeFyAlCTmBuEPsEISewfQO85aFOtWpGRWE9kShvNCsYaVqf/n7NCCFhENE9IvYQ8WY8Hj8k3VPX3Gw26zHzPTM/aK1vju1i0oOMMSzzzPxDa31XF0yKGHeI+F2uKaXe8DSAeeoTUaNgnkiZ1xsFK8kHAI2CjYJNJ8mJgSZJmiRpkuScSQIAP5VSw6pxlrXeGDMHgG+lNqxEtELEjwDwqJTqnRlQjhSfmfmf1rpbdMvvFj1rra/PCUhET4h4lSZG2pY/lh0APimlVueANMaIYn+t7cRwSgPMXVgHMBEtEPHW2koUIhFQFhhjngHgg/ze7/fXk8lE/tc2ptPpVavVerIGX5RS4uY3IwtwAAC/ZAUzL5POrFVo7dm7b218VUotSgFaFaNksZAjrbXEZuVBRENEDKyhzEqRqqAF7MqJHxEv8t60KLUx5tAzr/IFIysJMwHlofbTxB8HwMxzrfWoKNDhfUQUIGJc+BHxS96nlVxAq+RAwJySzCwJIy5fFgElIslUOaBHicDMotwwLe4ObRYCdO4GAAGKMts+SECXiCjzr85Vtr5dMLMkQd+B2WUvMle0thYGFONBEFxuNhtxkQS5i8siIkaqAcDc9/35aDRaF1oEAKUAnVELOkBEUSjK8ozxKGXK9/1FGTBn7yTAQxiB3e123TAMLwHANfuV53nrdru9OgXqpBgs6pK676usYN1Ax/YawKoKxwpKsG+321tElGB/t8HM606n89slVwx41MDfDdA2gHhjEgNKzw3DULpCqQJc95tIQfc8r+969H9Yv8s4C539kQAAAABJRU5ErkJggg==);\r\n    background-size: 18px;\r\n    background-position: center 3px\r\n}\r\n\r\n.Eleditor-textStyle .Eleditor-textStyle-item .Eleditor-textStyle-bgColor:before {\r\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAC5ElEQVRYR82YTXLTQBCFuy3JW5ITYJ8AcgKSExBOAJyAeOGe8oqwcs14YTgB4QTACRJOgDlBkhNg1i5Xp1olqcZj/cxIqkKzk0oafeqZ9/pJCAMf2IVPa305Go1eyBzM/EhEN13mK7u3NeB6vT7Z7Xb3AHCST5wkyelsNtv2Cdka0BjzDgC+2jDMPFNKfR4K4G8AeAkAjwDwPFvmB6XU9L8DGmMETABl731CRDl+nYGdEdGmL8hWS6y1vkHEtwKx3++nURSd58vNzN+UUrL8vYxgQEccv4hI4EBrvUXEZwCwTZJk2pdYggEdcbzPrcWuKgAU57uWsQ1gKg5m/qeUKizG3pcAsCGis65wcn8QoAPxhYiubAit9QYRU+MGgF7EEgToimOxWDw4gFeIuM7OHb1Am4p6A9riYOY/SimxloORXfM3O7klotM2UPY93oBV4nABjDE/LE/sLJYQwEIc4/F4UmUjEiAQ8XsGfkdEF12q6AXodI5GI7Y8MTVyd6+GAHsBOh7XqE5jjASGD32IpRHQRxwl+7Do1dJZuoilEVBrXVhHSJyyPZGZ3yilRDzBwwfwHhEnMnNIILVfDAB+EtFlMF1TJ1mtVufMfJv7mrSwgIdIGyy8sq1YaivoiCOA7fhSyY1KqevQSSoB7a4gwQARQ6pnc7ySA2ZulbYrAZ091LqvGmOkX+efBMFiqQMsxNF2/0jlHBdoNHl3C5QC2uKoCga+e2m5XE6iKJLP03SEOIFcXwrYdzq2A0SIl5YCuuKoCwa+VbQDRKhYjirYdc9UQdtiQcSL+Xx+5/OCZYCFOEImanqY1voaET9mluMtlgNAp3PIz6C0xfUxfMUi0c7+8D8AtMURupl9XqIpbWe589ZOP0cVzB8Ux/Gmr4/vfE6pYhzH6aows8SwojvlcPK3jIgKrsY041OZrtfYcDLXoABduEEBlsENBrAKbhCAdXCDAJRuZf/bdkVmB9tBqLjOBZ4AEfu5OCh98OAAAAAASUVORK5CYII=);\r\n    background-position: center 3px\r\n}\r\n\r\n.Eleditor-textStyle .Eleditor-textStyle-item .Eleditor-textStyle-fontSize:before {\r\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAAoCAYAAABerrI1AAAD/0lEQVRoQ8VZ0VEbMRDVwvh+QyoIVJCkgpgKQipIqCD4w9LwBXwxkj+cVBBTQUgFIRUEKsBUEPxrA8rszelmvae7k+5k0A8zWNLuO63evl2B6DEmk8nQWntSbHEjpTzqsV2ypdBnJ631DAA+uz0eHx/3jo+P5332TLG2M6jpdLqzWq3+USestWdKqdMUjvXZozMorfURAEwL43dCiDfW2rlSaq+PQynW9gF1CwC71tobAPgmhPiBDllrPymlLlM413WPTqAKgvhdgBhlWTZbLpdzAHglhPglpTzo6lCKdZ1AUYIYDAavR6PRPf3fSxNGNChKENbaC6XUF/y67PRelDCiQVGC4PfHGIN0vjHCmEwmJ09PT/lH3Nramo3H4zNfuHYBlROEEOJOSol/y9EEuO9dMcYgmJyMyJhJKQ/53lGgaIgJIb5zBXF+fr67vb19WxhJRhgckLV2UZASmjqUUs4osChQIWRgjEE6/4hGUhCG54QOrbX3APCTAFkDFgyKKYg/UsqhL6SoE30VhjHmnRDir895H1h3YsGgmIKoHDm7W/glX/VRGAUgzIU7Lh8qpTDJl4MBuxdC7Espr2NAOQWxyLJsF3NT3eU3xqDxr4Uz0QrDA6hMHdym1voUAFylkAMLAsVyUK0BZ5CFTTRhGGPwhPLwprmw7iPSu47REQSKlRjv8YjbKFprfQ0Ab7sQhjHmSgjxIUZyER/vWkExgqjkpoYQLPNKLGGgzeVyOYwVxhhRDw8P7SfFEuqIX9Y6UExOPWtJ0npSWmunIKLzDov1aMJoC/G63xtBMQURfeG11gckSUav3wioFF/aidwuhJEcFLsTC6VUngRjB80jsYQRa8vNrw0/piAq4jXUIBW5fRRGqD2c1wSqJIiYDdvmPkcPwwuKEUSbn7G/b5wwvKAYQVwIIVI0KLGlho2Z6NQQ+9UqoHiT0jVWYjf2CM+ym7tpwqiAYgqiVbyGgqUit40wiMpvLHGobVeGWGsvfaBKggCA/fF4jOIyyaA5q4kw6Dxfuc6dYYXpYg0UI4hg8RqKmKWJWsJoqmo9gCrV8RooRhDJe3f8vjb1MOqqWhZyCKhSHZegYgyGnoxvHm3MtBGGr6p1tVxTdVyCYqFR21jpAwjXUpHbRhjFfPoGlpfrg8FgvlqtsBXn+hdrhEZBUQURzDpdQGqt88YMrg1RGKzydlU3hh6Oyt3MQbEeRGfxGgqQNmZCS3Yats4OPiNlWTbkTaAcFFcQrukf6mTsPNbJDVIYRYl/5foedYDQF/A8cwY1VmKBeBRG2ZhpIwwP44mm5g8wBXGjlHKx2tfvxvUsYSbtYSAoZBf3eoGvCGvN9k0hKyKEPqMehbTeQvz5D/g1DKSBanO4AAAAAElFTkSuQmCC);\r\n    background-size: 22px\r\n}\r\n\r\n.Eleditor-textStyle .Eleditor-textStyle-item .Eleditor-textStyle-lineHeight:before {\r\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAABl0lEQVRYR+2Xy03EMBCG7Y1yhhLoANIBJSyVQC5j5cRyipxcoAM6ACpAVEBKWDpIA8kgr3Ylk9ckmdhaieTqeXz+57cVS3HmnzxzPrECcic0SkGt9bau6yJJkj234dR8EjBN06sgCL6FEHsAiKY24MaTgFrrQkp5fWz0AgAP3KZT8gcBsyx7FkLc2wUR8U4p9T6lCSe2F9D4Tkr51lG8rKoq8uXHTkDLd5c9uy98+bETsOG7vgm1/Ki13kkpH+eOFBGflFI7O78F2OW7voZNP3oBzPP8dqwCiFgCQDE2fk4cec3MKbpkzgrIVXNRBY1/EfGTAfUFAH/OwP8CZCjXm7qogiugCwW4NRcd8XqKueNwkb/oiFdAFwpwa7ZGPPJv+tAXEWOllHlYHT4vp9i8RzabjXlqXhC7/wCArR3jBdA0HHjRnXh+wjC8ieO45I6Qyu89xcTbJHL9q38CH7xmuvzY9B2lAHd9ELDDjy3fcQGofPKitvzozXc2NAlogo9+fPXlu8mA1Bhcro9S0CUAVXsFpBSi1n8Brg2tKfeVeOYAAAAASUVORK5CYII=)\r\n}\r\n\r\n.Eleditor-textStyle .Eleditor-textStyle-item .Eleditor-textStyle-alignLeft:before {\r\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAABJElEQVRYR+2WQQ6CMBBFO4Gu9QZ6BLiBV/AG3kDZ0LBzR1IWxBOoJ9EjeASOgFsCHUOCiQvbRIYmkkzX/X9+XmcmBfHnB/48n+CA1BdigkyQSoCqn28P5nm+DoLgTCUgpdwmSVKP9bESHAJexhoPulpKufMSkBhsMvl8e3AyBESjeRPUWu8AYEWEYJUbYyql1NXlbyVYFMUGEW++wn34xmmaPmx1nE+stY4AYOkrJCLWrnB93Xn3oC9yv/gywV9ofbtrJdgPiBCin2LKkNRd18VZllVjg1oDlmW5bJrmMNb4rVNKHSke3IMUerwHqfScBPshadt2P0URl0cYhifXj9u5ZhDxDgALXyER8WmMiVxriKeYSp8JMkEqAaqee5AJUglQ9S80f0opswUQfwAAAABJRU5ErkJggg==);\r\n    background-size: 25px\r\n}\r\n\r\n.Eleditor-textStyle .Eleditor-textStyle-item .Eleditor-textStyle-alignCenter:before {\r\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAABGUlEQVRYR+2Xuw2DMBCGbU+QTZINwgbJBskIaThEl9amQNnAbJARYJPsgWQi2ijgx48liqO+x8d3Piyk2Pkjd84nGBCdEBtkg6gBNJ/PYHaDxpi3EOKCNvLkv4jo8S/GO2Kt9VUIccoJqJTqy7LskwBzgoXU9hoMKZIzhgFRu9EG56VRSh3BxsPSUvzWTQG0UsobCLj4WYEBQbDo9GiD0R3ABAYEBfr/Sdq2PYzjiG7tKicRDUsB3hEbY+Y78oyaWMufpqmrquqedBc3TVM454qcgM45W9f1JwkwJ1hIbe+IQ4rkjGFA1G60Qa31U0qJbnVHRDYEPhUQ3WqbDTDkrbeMiTa4ZfOQWgwYYmkthg2yQdQAmr/7M/gFx6c4KVrJFfgAAAAASUVORK5CYII=);\r\n    background-size: 25px\r\n}\r\n\r\n.Eleditor-textStyle .Eleditor-textStyle-item .Eleditor-textStyle-alignRight:before {\r\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAQAAAAm93DmAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfhCQ8REBuZ/AJaAAAAoklEQVRIx2NgGAWjYBgCRvzS/QK/1xMy4m9i5QMEj4mglR8ZGAnAUUBlgBGknfFMCqQY8P9h2QI8BnYZMJwn2U2OpQfwuLDLgFGAJBd+KLtAcTiNAhRAICe2KzCfZxDAq+QDgyNytLDgN7DyQedEQm5iezDQoTLcAFos9wv8ySfVCJaJhR+QeKiSPwSYChn5STHu/8ffGxkuDHS4jIJRMNQAAJ5SImJVnuoKAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTA5LTE1VDE3OjE2OjI3KzA4OjAwUsazsgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wOS0xNVQxNzoxNjoyNyswODowMCObCw4AAAAASUVORK5CYII=);\r\n    background-size: 25px\r\n}\r\n\r\n.Eleditor-textStyle .Eleditor-textStyle-item .Eleditor-textStyle-upImg:before {\r\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAARVBMVEUAAACKioqJiYmLi4uKioqLi4uIiIiKioqKioqJiYmJiYmJiYmKioqKioqPj4+KioqKioqLi4uKioqJiYmKioqJiYmKiopHpOm/AAAAFnRSTlMAwIB/XkAf79Dyn1DgMBBvkHA/r8SPuxOfgwAAANRJREFUOMvl0MtygzAMheEjI98wGELa8/6PWsxAsik2M22yyb/VN2NL+NRsV8muU92hoZxGoxLlAXEaDSDvhbbTS1BJzlegcO1foY3kdAXCpfHv5xkHSr4A1ZMMbajcMi04c8/WYc8jn2tQ+ExQct/39Avce35z9CT7BqTdXJEayKH7OoM+ee7NN50Ghgc8KTqUAl0dlrnTFQxSh3cAthilq8Ib3DKFZQFoG1AlRJEmNMfTjmMV+gP2sbF1j61ERTVll4E8+R6N0sAgjAbtrDEp40X9AEsWInSQgk2QAAAAAElFTkSuQmCC);\r\n    background-size: 22px\r\n}\r\n\r\n.Eleditor-textStyle .Eleditor-textStyle-item-upImg {\r\n    display: none;\r\n    position: relative\r\n}\r\n\r\n.Eleditor-textStyle .Eleditor-textStyle-item-upImg>:not(.webuploader-pick) {\r\n    transform: translate(-50%, -50%);\r\n    -webkit-transform: translate(-50%, -50%);\r\n    top: 50%!important;\r\n    left: 50%!important;\r\n    opacity: 0\r\n}\r\n\r\n.Eleditor-textStyle .Eleditor-textStyle-item-upImg>:not(.webuploader-pick) label {\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%\r\n}\r\n\r\n.Eleditor-textEditor-formats {\r\n    position: absolute;\r\n    right: -60px;\r\n    bottom: 20%;\r\n    border-radius: 50%;\r\n    -webkit-border-radius: 50%;\r\n    width: 100px;\r\n    height: 100px;\r\n    box-shadow: 0 0 5px rgba(0, 0, 0, .1);\r\n    background: #fff;\r\n    z-index: 1\r\n}\r\n\r\n.Eleditor-textEditor-formats div {\r\n    background-repeat: no-repeat;\r\n    width: 100%;\r\n    height: 32px;\r\n    background-position-x: 12px;\r\n    background-position-y: center;\r\n    position: absolute\r\n}\r\n\r\n.Eleditor-textEditor-formats .Eleditor-textEditor-format {\r\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAPFBMVEUAAACPj4+Li4uKioqKioqKioqKioqKioqHh4eJiYmJiYmJiYmKioqKioqJiYmKioqJiYmJiYmJiYmKiooOOgKOAAAAE3RSTlMAEEBggO/AoCDQ8N8w4LCQUHCP4ZsY5wAAAUlJREFUOMvFk92WgyAMhAUJ4U9E5/3fdStCaYtlvdmzuVGPH5kkE6Z/iD3d4xTmW5wgey8hI4zk2JQ3CTXgEkBKZGG/jMuS+kRXyFFZx9+MSqwDToLP5wLADIQtdNGbF/j5O2eVgza/ouzCJFaAxQsq+nwH9wjDINVQMp2uC7Ul3URnbB/9+sLVrm3p6t0esUO3YopoPETlW0Zpe1uFctjFA2z+GA0drqZ1dLXhuSOM5dtkTQRcOaVhK8bUozN0feFWAF+BW3M35NLJpSuzniWKFbTJnRBFyWy6W9N8gOM6hETcKbdPByXq4O3rpLwrOk3fp+OEf1/r1PsgLSL7trb+THi15Qog+bTEZrxLWAfpMznTCQh6rfCzKal8dT7i+6VhoNWJOLqveQ2PCJ1w1xSlXCDSNI5gEY2wZaLjpA4EPd0Is+q8I38XPwbTDcl2Nko+AAAAAElFTkSuQmCC);\r\n    background-size: 20px;\r\n    border-bottom: 1px solid #F5F5F5;\r\n    top: 15px\r\n}\r\n\r\n.Eleditor-textEditor-formats .Eleditor-textEditor-clean {\r\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAABkUlEQVRYR+3XvU3DQBQA4PdsUUBSMAIjpKLOCIwQK9QEb8AGRrgE5EyAYIKkoWcERqAIpME+ZISlyPL53p+lCMX13b3P7/z87hD2/ME998EBqN0hbwa3RXZ2nKTv2gCU+X2xOoHb+3xaonuGuJyOk/SNEkQ6ZlNkE6iiFQCm4/nVsr2ON4Obx7sZOLgdEtng0MHL6HIx63rJ3iIZEknB1eBgFQ+BpOJIwHqQJZKDIwOtkFwcC6hFSnBsoBQpxYmAXKQGJwZSkVqcChhCWuDUQB/SCmcCbCN/21UVrfraF6dvBzsJdbH6Z+6cyxGcQ8AnX2+lrteMswMW2QTL6BUAjlxcnVudgkyAu9+cQ1xbnoLUwK6CsOzdKmBftVohxUDKr8QCKQJScE0VapFsIAdngWQBJTgtkgzU4DRIEtACJ0UGgZY4CbL/2vl3qbZq/Lt9mFrd/ov7gDhOJjuBQ2yr7xQTymQn0BXZ6VcVXY/mixvu8Ugy/vMhvziJv9eYpB/t+cEikQS0nHMAarN5yOC/z+APDA6MODgVGhsAAAAASUVORK5CYII=);\r\n    background-size: 20px;\r\n    bottom: 15px\r\n}\r\n\r\n.Eleditor-inputarea {\r\n    position: absolute;\r\n    top: 45px;\r\n    bottom: 40px;\r\n    width: 100%\r\n}\r\n\r\n.Eleditor-textEditor[type=link] .Eleditor-inputarea {\r\n    bottom: 95px\r\n}\r\n\r\n.Eleditor-inputarea .textarea {\r\n    -webkit-user-select: auto;\r\n    overflow-y: auto;\r\n    overflow-x: hidden;\r\n    height: 100%;\r\n    width: 100%;\r\n    padding: 10px;\r\n    box-sizing: border-box;\r\n    font-size: 14px;\r\n    color: #555;\r\n    border: none;\r\n    word-wrap: break-word;\r\n    word-break: normal\r\n}\r\n\r\n.Eleditor-inputarea input {\r\n    display: none\r\n}\r\n\r\n.Eleditor-inputarea .textarea img {\r\n    width: 100%;\r\n    height: auto;\r\n    box-sizing: border-box\r\n}\r\n\r\n.Eleditor-textEditor[type=link] .Eleditor-inputarea input {\r\n    height: 33px;\r\n    display: block;\r\n    border: none;\r\n    border-bottom: 1px solid #ddd;\r\n    width: 100%;\r\n    margin: 10px;\r\n    color: #333;\r\n    outline: none\r\n}\r\n\r\n.Eleditor-method {\r\n    border-top: 1px solid #eee;\r\n    position: absolute;\r\n    bottom: 0;\r\n    width: 100%;\r\n    box-shadow: 0 0 10px rgba(0, 0, 0, .1);\r\n    -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, .1)\r\n}\r\n\r\n.Eleditor-method:after {\r\n    content: '';\r\n    clear: both;\r\n    display: block;\r\n    height: 0\r\n}\r\n\r\n.Eleditor-method button {\r\n    width: 50%;\r\n    border: none;\r\n    padding: 0;\r\n    margin: 0;\r\n    box-sizing: border-box;\r\n    float: left;\r\n    background: #fff;\r\n    height: 40px;\r\n    color: #333\r\n}\r\n\r\n.Eleditor-method .Eleditor-commit {\r\n    border-right: 1px solid #ddd\r\n}\r\n\r\n.Eleditor-placeholder {\r\n    color: #999\r\n}", ""]);

// exports


/***/ }),
/* 11 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(13);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 13 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ])["default"];
});