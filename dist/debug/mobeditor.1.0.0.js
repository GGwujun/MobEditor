/*!
 *  * mobeditor v1.0.0
 *  * (c) 2017-09-10--2017-11-22 dsx
 *  * Released under the ISC License.
 *  * https://github.com/GGwujun/MobEditor#readme
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
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
    _namespace: 'Eleditor',
    _notctname: ['INPUT', 'IMG', 'TEXTAREA'],
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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                              * Version: 1.6
                                                                                                                                                                                                                                                                              * Title: Eleditor 移动端富文本编辑器
                                                                                                                                                                                                                                                                              * Site: https://eleditor.fixel.cn
                                                                                                                                                                                                                                                                              * Author: Try
                                                                                                                                                                                                                                                                              */

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _lang = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _editorTpl = '';
(0, _lang._scriptPath)();

_config2.default._namespace = function () {};

// if (typeof jQuery === 'undefined' && typeof Zepto === 'undefined') {
//     console.warn('|--Eleditor 请引入jQuery或者Zepto！模块化环境请把依赖全局安装');
//     return
// } else if (typeof $ === 'undefined') {
//     var $ = typeof jQuery != 'undefined' ? jQuery : Zepto;
// }


var _correctHtmlStructure = function _correctHtmlStructure() {
    var _$wrap = arguments[0],
        _empty = arguments[1];

    if ((0, _lang._formatInnerText)(_$wrap.text()) == '' && _$wrap.find('img').length === 0) {
        _$wrap.append(_empty);
    }

    if (_$wrap.find('*').length === 0) {
        _$wrap.html('<p class="Eleditor-placeholder">' + _$wrap.html() + '</p>');
    }
};

var _buildEditorModule = function _buildEditorModule(_toolbars, _uid) {

    var _html = '<div class="Eleditor-wrap" style="z-index:' + (0, _lang._getLayerMaxZIndex)() + '" id="' + _uid + '">\n\t\t\t\t\t\t<div class="Eleditor-controller">\n\t\t\t\t\t\t<ul>';

    for (var i = 0; i < _toolbars.length; i++) {
        var _it = _toolbars[i],
            _id = (typeof _it === 'undefined' ? 'undefined' : _typeof(_it)) === 'object' ? _it.id : _it,
            _tag = (typeof _it === 'undefined' ? 'undefined' : _typeof(_it)) === 'object' && _it.tag ? _it.tag.toLocaleLowerCase() : null,
            _name = (typeof _it === 'undefined' ? 'undefined' : _typeof(_it)) === 'object' ? _it.name : _config2.default._toolnames[_it];
        _html += '<li event="' + _id + '" ' + (_tag ? 'bind-tags="' + _tag + '"' : '') + 'class="Eleditor-' + _id + '">' + _name + '</li>';
    }
    _html += '\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="Eleditor-loading"><p></p></div>\n\t\t\t\t\t<div class="Eleditor-textEditor">\n\t\t\t\t\t\t<div class="Eleditor-textStyle">\n\t\t\t\t\t\t\t<div class="Eleditor-textStyle-item"><div class="Eleditor-textStyle-bold"></div></div>\n\t\t\t\t\t\t\t<div class="Eleditor-textStyle-item"><div class="Eleditor-textStyle-color"><span></span></div></div>\n\t\t\t\t\t\t\t<div class="Eleditor-textStyle-item"><div class="Eleditor-textStyle-linedecoration"></div></div>\n\t\t\t\t\t\t\t<div class="Eleditor-textStyle-item"><div class="Eleditor-textStyle-bgColor"></div></div>\n\t\t\t\t\t\t\t<div class="Eleditor-textStyle-item"><div class="Eleditor-textStyle-fontSize"></div></div>\n\t\t\t\t\t\t\t<div class="Eleditor-textStyle-item"><div class="Eleditor-textStyle-lineHeight"></div></div>\n\t\t\t\t\t\t\t<div class="Eleditor-textStyle-item">\n\t\t\t\t\t\t\t\t<div class="Eleditor-textStyle-align Eleditor-textStyle-alignLeft" align="left"></div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="Eleditor-textStyle-item">\n\t\t\t\t\t\t\t\t<div class="Eleditor-textStyle-align Eleditor-textStyle-alignCenter" align="center">\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="Eleditor-textStyle-item">\n\t\t\t\t\t\t\t\t<div class="Eleditor-textStyle-align Eleditor-textStyle-alignRight" align="right">\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="Eleditor-textStyle-item Eleditor-textStyle-item-upImg">\n\t\t\t\t\t\t\t\t<div class="Eleditor-textStyle-upImg"></div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="Eleditor-textEditor-colors">\n\t\t\t\t\t\t\t<div class="Eleditor-textEditor-modulePane"><span></span></div>\n\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t\t<li><span style="background-color:#232323;"></span></li>\n\t\t\t\t\t\t\t\t<li><span style="background-color:#2196F3;"></span></li>\n\t\t\t\t\t\t\t\t<li><span style="background-color:#795548;"></span></li>\n\t\t\t\t\t\t\t\t<li><span style="background-color:#00BCD4;"></span></li>\n\t\t\t\t\t\t\t\t<li><span style="background-color:#4CAF50;"></span></li>\n\t\t\t\t\t\t\t\t<li><span style="background-color:#E666E5;"></span></li>\n\t\t\t\t\t\t\t\t<li><span style="background-color:#FF9800;"></span></li>\n\t\t\t\t\t\t\t\t<li><span style="background-color:#FF5722;"></span></li>\n\t\t\t\t\t\t\t\t<li><span style="background-color:#ff2a1a;"></span></li>\n\t\t\t\t\t\t\t\t<li><span style="background-color:#FFEB3B;"></span></li>\n\t\t\t\t\t\t\t\t<li><span style="background-color:#ffffff;border: 1px solid #ccc;"></span></li>\n\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t<span class="Eleditor-inheritValue" style="background-color:transparent; border: 1px solid #dedede;">\n\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="Eleditor-textEditor-fontsizes">\n\t\t\t\t\t\t\t<div class="Eleditor-textEditor-modulePane"><span>\u5B57\u4F53\u5927\u5C0F</span></div>\n\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t\t<li class="Eleditor-inheritValue">\u9ED8\u8BA4</li>\n\t\t\t\t\t\t\t\t<li>14px</li>\n\t\t\t\t\t\t\t\t<li>16px</li>\n\t\t\t\t\t\t\t\t<li>20px</li>\n\t\t\t\t\t\t\t\t<li>28px</li>\n\t\t\t\t\t\t\t\t<li>35px</li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="Eleditor-textEditor-lineheight">\n\t\t\t\t\t\t\t<div class="Eleditor-textEditor-modulePane"><span>\u884C\u9AD8</span></div>\n\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t\t<li class="Eleditor-inheritValue">\u9ED8\u8BA4</li>\n\t\t\t\t\t\t\t\t<li>20px</li>\n\t\t\t\t\t\t\t\t<li>25px</li>\n\t\t\t\t\t\t\t\t<li>30px</li>\n\t\t\t\t\t\t\t\t<li>35px</li>\n\t\t\t\t\t\t\t\t<li>40px</li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="Eleditor-textEditor-linedecorations">\n\t\t\t\t\t\t\t<div class="Eleditor-textEditor-modulePane"><span>\u6587\u672C\u4FEE\u9970</span></div>\n\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t\t<li class="Eleditor-inheritValue">\u65E0</li>\n\t\t\t\t\t\t\t\t<li style="text-decoration: overline">\u4E0A\u5212\u7EBF\u4FEE\u9970</li>\n\t\t\t\t\t\t\t\t<li style="text-decoration: line-through">\u5220\u9664\u7EBF\u4FEE\u9970</li>\n\t\t\t\t\t\t\t\t<li style="text-decoration: underline">\u4E0B\u5212\u7EBF\u4FEE\u9970</li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="Eleditor-textEditor-formats">\n\t\t\t\t\t\t\t<div class="Eleditor-textEditor-format"></div>\n\t\t\t\t\t\t\t<div class="Eleditor-textEditor-clean"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="Eleditor-inputarea">\n\t\t\t\t\t\t\t<input placeholder="\u8BF7\u8F93\u5165\u8D85\u94FE\u63A5" type="text" />\n\t\t\t\t\t\t\t<div class="textarea" contenteditable="true"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="Eleditor-method">\n\t\t\t\t\t\t\t<button class="Eleditor-commit">\u63D0\u4EA4</button>\n\t\t\t\t\t\t\t<button class="Eleditor-cancel">\u53D6\u6D88</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>';
    return _html;
};

var MEditor = function MEditor() {

    console.log('|--Eleditor Initing');

    var _arg = arguments[0];
    _arg.upload = _arg.upload || {};
    _arg.toolbars = _arg.toolbars || [];
    var _editorUid = (0, _lang._genEditorUid)(),
        _historys = [],
        _placeHolder = _arg.placeHolder || '<p class="Eleditor-placeholder">点击此处编辑内容</p>';

    if (_arg.toolbars.length === 0) {
        _arg.toolbars = ['insertText', 'editText', 'insertImage', 'insertLink', 'deleteBefore', 'deleteAfter', 'insertHr', 'deleteThis', 'undo', 'cancel'];
    }

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

    _$wrap.attr({ 'Eleditor-Inited': 'true', 'Eleditor-Uid': _editorUid });

    _correctHtmlStructure(_$wrap, _placeHolder);

    /*insert editor*/
    var _lastScrollH = null;
    var _$window = $(window);
    var _$scrollWrap = $('html,body');
    var _$editorWrap = $(_buildEditorModule(_arg.toolbars, _editorUid));
    var _$editorController = _$editorWrap.find('.Eleditor-wrap');
    var _$editorLoadingMask = _$editorWrap.find('.Eleditor-loading');
    var _$editorTextModule = _$editorWrap.find('.Eleditor-textEditor');
    var _$editorTextArea = _$editorTextModule.find(".Eleditor-inputarea .textarea");
    var _$editorUploadImageBtn = _$editorController.find(".Eleditor-insertImage");
    var _$editorBarUploadImageBtn = _$editorTextModule.find('.Eleditor-textStyle-item-upImg');
    var _$editorTextLinkArea = _$editorTextModule.find(".Eleditor-inputarea input");
    var _$editorColorModule = _$editorTextModule.find(".Eleditor-textEditor-colors");
    var _$editorFontsizeModule = _$editorTextModule.find(".Eleditor-textEditor-fontsizes");
    var _$editorUndoBtn = _$editorWrap.find(".Eleditor-undo");
    var _$editorLineheightModule = _$editorTextModule.find(".Eleditor-textEditor-lineheight");
    var _$editorLinedecorationsModule = _$editorTextModule.find(".Eleditor-textEditor-linedecorations");

    _$wrap.addClass('Eleditor-area');
    _$wrap.after(_$editorWrap);

    console.log('|--Eleditor Mounted To', _$wrap);

    /*bindEvent*/
    var _$selected = null,
        _controllerUploader = null,
        _stylebarUploader = null;
    var _showEditorControllerLayer = function _showEditorControllerLayer(_$e) {
        _$selected = _$e;
        _$e.addClass('Eleditor-active');

        var _calTop = _$e.offset().top + _$e.outerHeight();

        $.each(_$editorController.find('li'), function (i, e) {
            var _$e = $(e),
                _tgs = _$e.attr('bind-tags');
            if (_tgs) {
                _tgs = _tgs.toLocaleLowerCase().split(',');
                if ((0, _lang._inArray)(_$selected[0].tagName.toLocaleLowerCase(), _tgs)) {
                    _$e.show();
                } else {
                    _$e.hide();
                }
            }
        });

        _$editorController.addClass('in');
        _flushEditorControllerLayerPosi();

        if (typeof _$scrollWrap.animate === 'function') {
            _$scrollWrap.stop().animate({ scrollTop: _calTop - 150 + 'px' }, 500);
        } else {
            _$scrollWrap.scrollTop(_calTop - 150 + 'px');
        }

        _controllerUploader && _controllerUploader.refresh();
    };
    var _flushEditorControllerLayerPosi = function _flushEditorControllerLayerPosi() {
        if (_$selected) {
            _$editorController.css({
                //top: _$selected.offset().top + _$selected.outerHeight(),
                //width: _$wrap.width() - 5
            });
        }
    };
    var _hideEditorControllerLayer = function _hideEditorControllerLayer() {
        _$wrap.find('.Eleditor-active').removeClass('Eleditor-active');
        _$editorController.removeClass('in');
    };
    var _showEditorWrapMask = function _showEditorWrapMask() {
        if ((0, _lang._inArray)('insertImage', _arg.toolbars)) {
            _$editorBarUploadImageBtn.show();
        }
        _$editorController.removeClass('in');
        _$editorWrap.addClass('Eleditor-mask');
        _lastScrollH = _$window.scrollTop();
        _$scrollWrap.addClass('Eleditor-scrollLocked');
    };
    var _hideEditorWrapMask = function _hideEditorWrapMask() {
        _$editorWrap.removeClass('Eleditor-mask');
        _$scrollWrap.removeClass('Eleditor-scrollLocked');
        _$window.scrollTop(_lastScrollH);
    };
    var _showLoadingMask = function _showLoadingMask() {
        _showEditorWrapMask();
        _$editorLoadingMask.show();
        _$editorLoadingMask.html('<p>' + arguments[0] + '</p>');
    };
    var _appendHistory = function _appendHistory() {
        _historys.push(arguments[0]);
        _flushHistoryBtn();
    };
    var _handleHistory = function _handleHistory() {

        if (_historys.length === 0) {
            return;
        }

        var _handle = _historys.pop();

        if (_handle.m == 'insertNode') {
            _handle.node.remove();
        }
        if (_handle.m == 'editNode') {
            _handle.node.attr('style', _handle.unode.attr('style') || '').html(_handle.unode);
        }
        if (_handle.m == 'deleteNode') {
            if (_handle.pnode.length > 0) {
                _handle.pnode.after(_handle.node);
            } else {
                _$wrap.prepend(_handle.node);
            }
            _$wrap.find('.Eleditor-placeholder').remove();
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
    };
    var _flushHistoryBtn = function _flushHistoryBtn() {

        if (_historys.length == 0) {
            _$editorUndoBtn.hide();
        } else {
            _$editorUndoBtn.show();
        }
    };
    var _hideLoadingMask = function _hideLoadingMask() {
        _hideEditorWrapMask();
        _$editorLoadingMask.hide();
    };
    var _syncRenderTextEditorView = function _syncRenderTextEditorView() {
        _$editorTextModule.attr('role', 'edit').show();
        _$editorTextArea.html(_$selected.hasClass('Eleditor-placeholder') ? '' : _$selected.html());
        _$editorTextArea.attr('style', _$selected.attr('style'));
        if (_$selected.css('font-weight') == 'bold') {
            _$editorTextModule.find('.Eleditor-textStyle-bold').addClass('Eleditor-active');
        }

        if ((0, _lang._inArray)(_$selected.css('text-decoration'), ['overline', 'line-through', 'underline'])) {
            _$editorTextModule.find('.Eleditor-textStyle-linedecoration').addClass('Eleditor-active');
        }
        if (_$selected[0].tagName == 'A') {
            _$editorTextModule.attr('type', 'link');
            _$editorTextLinkArea.val(_$selected.attr('href'));
        } else {
            _$editorTextModule.attr('type', 'word');
        }

        var _selectAlign = _$selected.css('text-align');
        if ((0, _lang._inArray)(_selectAlign, ['left', 'center', 'right'])) {
            _$editorTextModule.find('.Eleditor-textStyle-align[align=' + _selectAlign + ']').addClass('Eleditor-active');
        } else {
            _$editorTextModule.find('.Eleditor-textStyle-align').removeClass('Eleditor-active');
        }
        _$editorTextModule.find('.Eleditor-textStyle-color span').css('background-color', _$selected.css('color'));
    };

    if ((0, _lang._inArray)('insertImage', _arg.toolbars) && typeof WebUploader != 'undefined') {

        //controller
        _controllerUploader = WebUploader.create({
            auto: true, server: _arg.upload.server || '/upload',
            pick: _$editorUploadImageBtn, duplicate: true, resize: false,
            fileSingleSizeLimit: _arg.upload.fileSizeLimit ? _arg.upload.fileSizeLimit * 1024 * 1024 : undefined,
            accept: {
                title: 'Images', extensions: 'gif,jpg,jpeg,bmp,png,webp',
                mimeTypes: 'image/gif,image/jpg,image/jpeg,image/bmp,image/png,image/webp'
            }
        });
        _controllerUploader.on('uploadStart', function (_file, _percentage) {
            _hideEditorControllerLayer();
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
            _hideLoadingMask();
        });
        _controllerUploader.on('uploadSuccess', function (_file, _call) {
            if (_call.status == 1) {
                var _$upImg = $('<img src="' + _call.url + '">');
                _$selected.after(_$upImg);
                _appendHistory({ m: 'insertNode', node: _$upImg });
            } else {
                alert(_call.msg);
            }
        });

        //bar
        _stylebarUploader = WebUploader.create({
            auto: true, server: _arg.upload.server || '/upload',
            pick: _$editorBarUploadImageBtn, duplicate: true, resize: false, compress: false,
            fileSingleSizeLimit: _arg.upload.fileSizeLimit ? _arg.upload.fileSizeLimit * 1024 * 1024 : undefined,
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
            _hideLoadingMask();
        });
        _stylebarUploader.on('uploadSuccess', function (_file, _call) {
            if (_call.status == 1) {
                _$editorTextArea.append('<img src="' + _call.url + '">');
            } else {
                alert(_call.msg);
            }
        });
    }

    var _editorModuleEvents = {
        insertText: function insertText() {
            _showEditorWrapMask();
            _$editorTextModule.attr({ 'role': 'insert', 'type': 'word' }).show();
        },
        insertLink: function insertLink() {
            _showEditorWrapMask();
            _$editorTextModule.attr({ 'role': 'insert', 'type': 'link' }).show();
        },
        insertImage: function insertImage() {
            if (typeof WebUploader === 'undefined') {
                alert('图片上传请手动引入插件根目录webuploader.min.js');
            }
        },
        insertHr: function insertHr() {
            var _$hr = $('<div class="horizontal-line" style="padding: 10px 0;border-bottom: 1px solid #aaa;margin-bottom: 20px;"></div>');
            _$selected.after(_$hr);
            _appendHistory({ m: 'insertNode', node: _$hr });
            _hideEditorControllerLayer();
        },
        editText: function editText() {
            if ((0, _lang._inArray)(_$selected[0].tagName, _config2.default._notctname)) {
                return this.insertText();
            }
            _showEditorWrapMask();
            _syncRenderTextEditorView();
        },
        deleteThis: function deleteThis() {
            _appendHistory({ m: 'deleteNode', node: _$selected, pnode: _$selected.prev() });
            _$selected.remove();
            _hideEditorControllerLayer();
            _correctHtmlStructure(_$wrap, _placeHolder);
        },
        deleteBefore: function deleteBefore() {
            var _$prev = _$selected.prev();
            _appendHistory({ m: 'deleteBeforeNode', node: _$selected, bnode: _$selected.prevAll() });
            var _$prev_prev;
            while (_$prev.length > 0) {
                _$prev_prev = _$prev.prev();
                _$prev.remove();
                _$prev = _$prev_prev;
            }
            var _$parent = _$selected.parent();
            while (_$parent.length > 0 && !_$parent.hasClass("Eleditor-area")) {
                _$prev = _$parent.prev();
                while (_$prev.length > 0) {
                    _$prev_prev = _$prev.prev();
                    _$prev.remove();
                    _$prev = _$prev_prev;
                }
                _$parent = _$parent.parent();
            }
            _hideEditorControllerLayer();
            _correctHtmlStructure(_$wrap, _placeHolder);
        },
        deleteAfter: function deleteAfter() {
            var _$next = _$selected.next();
            _appendHistory({ m: 'deleteAfterNode', node: _$selected, anode: _$selected.nextAll() });
            var _$next_next;
            while (_$next.length > 0) {
                _$next_next = _$next.next();
                _$next.remove();
                _$next = _$next_next;
            }
            var _$parent = _$selected.parent();
            while (_$parent.length > 0 && !_$parent.hasClass("Eleditor-area")) {
                _$next = _$parent.next();
                while (_$next.length > 0) {
                    _$next_next = _$next.next();
                    _$next.remove();
                    _$next = _$next_next;
                }
                _$parent = _$parent.parent();
            }
            _hideEditorControllerLayer();
            _correctHtmlStructure(_$wrap, _placeHolder);
        },
        undo: function undo() {
            _handleHistory();
            _hideEditorControllerLayer();
        },
        cancel: function cancel() {
            _hideEditorControllerLayer();
        }
    };

    for (var i = 0; i < _arg.toolbars.length; i++) {
        if (_typeof(_arg.toolbars[i]) === 'object') {
            _editorModuleEvents[_arg.toolbars[i].id] = _arg.toolbars[i].handle;
        }
    };

    /*text area click*/
    _$window.on('resize', function () {
        _flushEditorControllerLayerPosi();
    });

    _$editorController.on('click', 'ul li', function () {
        var _$this = $(this),
            _event = _$this.attr('event');
        if (typeof _editorModuleEvents[_event] === 'function') {
            if (typeof _config2.default._toolnames[_event] != 'undefined') {
                _editorModuleEvents[_event]();
            } else {
                _editorModuleEvents[_event](_$selected, _$this) !== false && _editorModuleEvents.cancel();
            }
        }
    });

    /*textEditor*/
    _$editorTextModule.on('click', '.Eleditor-textStyle-bold', function () {
        _$editorTextArea.css("font-weight", $(this).hasClass("Eleditor-active") ? "normal" : "bold");
        $(this).toggleClass("Eleditor-active");
    });
    _$editorTextModule.on('click', '.Eleditor-textStyle-linedecoration', function () {
        _$editorLinedecorationsModule.show();
        $(this).addClass('Eleditor-active');
    });
    _$editorTextModule.on('click', '.Eleditor-textStyle-color,.Eleditor-textStyle-bgColor', function () {
        var _$this = $(this);
        var _role = _$this.hasClass('Eleditor-textStyle-bgColor') ? 'bgcolor' : 'color';
        _$editorColorModule.find('.Eleditor-textEditor-modulePane span').html(_role == 'bgcolor' ? '文字背景颜色' : '文字颜色');
        _$editorColorModule.attr('role', _role).show();
        $(this).addClass('Eleditor-active');
    });
    _$editorTextModule.on('click', '.Eleditor-textStyle-fontSize', function () {
        _$editorFontsizeModule.show();
        $(this).addClass('Eleditor-active');
    });
    _$editorTextModule.on('click', '.Eleditor-textStyle-lineHeight', function () {
        _$editorLineheightModule.show();
        $(this).addClass('Eleditor-active');
    });
    _$editorLinedecorationsModule.on('click', 'ul li', function () {
        if (!$(this).hasClass('Eleditor-inheritValue')) {
            _$editorTextArea.css("text-decoration", $(this).css('text-decoration'));
        } else {
            _$editorTextArea.css("text-decoration", 'inherit');
            _$editorTextModule.find('.Eleditor-textStyle-linedecoration').removeClass('Eleditor-active');
        }
        _$editorLinedecorationsModule.hide();
    });
    _$editorLineheightModule.on('click', 'ul li', function () {
        if (!$(this).hasClass('Eleditor-inheritValue')) {
            _$editorTextArea.css("line-height", $(this).html());
        } else {
            _$editorTextArea.css("line-height", 'inherit');
            _$editorTextModule.find('.Eleditor-textStyle-lineHeight').removeClass('Eleditor-active');
        }
        _$editorLineheightModule.hide();
    });
    _$editorFontsizeModule.on('click', 'ul li', function () {
        if (!$(this).hasClass('Eleditor-inheritValue')) {
            _$editorTextArea.css("font-size", $(this).html());
        } else {
            _$editorTextArea.css("font-size", 'inherit');
            _$editorTextModule.find('.Eleditor-textStyle-fontSize').removeClass('Eleditor-active');
        }
        _$editorFontsizeModule.hide();
    });

    _$editorTextModule.on('click', ".Eleditor-textStyle-align", function () {
        var _align = $(this).attr('align');
        _$editorTextArea.css({ "text-align": _align, "display": 'block' });
        _$editorTextModule.find(".Eleditor-textStyle-align.Eleditor-active").removeClass('Eleditor-active');
        $(this).addClass('Eleditor-active');
    });

    _$editorTextModule.on('click', ".Eleditor-textEditor-format", function () {
        var _$cloneTextArea = _$editorTextArea,
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

        _$editorTextArea.html(_$cloneTextArea.html());
        _$editorTextModule.find('.Eleditor-active').removeClass('Eleditor-active');
    });

    _$editorTextModule.on('click', ".Eleditor-textEditor-clean", function () {
        confirm('确定清空内容（不可恢复）？') && _$editorTextArea.html("");
    });

    _$editorTextModule.on('click', ".Eleditor-cancel,.Eleditor-commit", function () {

        arguments[0].preventDefault();

        if ($(this).hasClass('Eleditor-commit')) {
            var _style = _$editorTextArea.attr('style') || '';
            var _content = _$editorTextArea.html();
            var _unode = _$selected.clone();
            if (!_content) {
                return alert('请输入内容文字');
            }

            if (_$editorTextModule.attr('role') == 'edit' || _$selected.hasClass('Eleditor-placeholder')) {
                if (_$editorTextModule.attr('type') == 'link') {
                    var _link = _$editorTextLinkArea.val();
                    _$selected.attr('href', _link);
                }
                _$selected.attr('style', _style).removeClass('Eleditor-placeholder').html(_content);

                _appendHistory({ m: 'editNode', node: _$selected, unode: _unode });
                _flushEditorControllerLayerPosi();
            } else {
                var _buildWordHtml = '';
                if (_$editorTextModule.attr('type') == 'link') {
                    var _link = _$editorTextLinkArea.val();
                    _buildWordHtml = '<a target="_BLANK" style="' + _style + '" href="' + _link + '">' + _content + '</a>';
                } else {
                    _buildWordHtml = '<p style="' + _style + '">' + _content + "</p>";
                }
                var _buildWordHtml = $(_buildWordHtml);
                _$selected.after(_buildWordHtml);
                _flushEditorControllerLayerPosi();
                _appendHistory({ m: 'insertNode', node: _buildWordHtml });
            }
        }

        _$editorTextModule.find('.Eleditor-active').removeClass('Eleditor-active');
        _$editorTextModule.find('.Eleditor-textStyle-color span').removeAttr('style');
        _$editorTextArea.removeAttr('style').html('');
        _$editorTextLinkArea.val('');
        _hideEditorWrapMask();
        _$editorTextModule.hide();
        _hideEditorControllerLayer();
    });

    _$editorColorModule.on('click', 'ul li span', function () {
        var _color = $(this).css('background-color');
        if (_$editorColorModule.attr('role') == 'color') {
            if (!$(this).hasClass('Eleditor-inheritValue')) {
                _$editorTextArea.css("color", _color);
                _$editorTextModule.find('.Eleditor-textStyle-color span').css("background-color", _color);
            } else {
                _$editorTextArea.css("color", 'inherit');
                _$editorTextModule.find('.Eleditor-textStyle-color').removeClass('Eleditor-active').find('span').removeAttr('style');
            }
        } else {
            if (!$(this).hasClass('Eleditor-inheritValue')) {
                _$editorTextArea.css("background-color", _color);
            } else {
                _$editorTextArea.css("background-color", 'inherit');
                _$editorTextModule.find('.Eleditor-textStyle-bgColor').removeClass('Eleditor-active');
            }
        }
        _$editorColorModule.hide();
    });

    /*controller*/
    _$wrap.on('click', '*', function (_e) {

        var _$this = $(this);

        if (!_$this.hasClass('Eleditor-active')) {
            _hideEditorControllerLayer();
            _showEditorControllerLayer(_$this);
        }

        return _e.preventDefault() == 0;
    });

    return {

        append: function append() {
            _$wrap.find('.Eleditor-placeholder').remove();
            return _$wrap.append(arguments[0]);
        },
        getEditNode: function getEditNode() {
            if (_$selected === null) {
                console.warn('未选中状态getEditNode返回null');
            }
            return _$selected;
        },
        getContent: function getContent() {
            return _$wrap.html();
        },
        getContentText: function getContentText() {
            return (0, _lang._formatInnerText)(_$wrap.text());
        },
        destory: function destory() {
            _$wrap.removeAttr('Eleditor-Inited Eleditor-Uid');
            _$wrap.removeClass('Eleditor-area');
            _$wrap.find('.Eleditor-placeholder').remove();
            _$wrap.off().find('.Eleditor-active').removeClass('Eleditor-active');
            _$editorWrap.find('*').off();
            _$editorWrap.remove();
            console.log('|--Eleditor ' + _editorUid + ' destoryed');
        }

    };
};

exports.default = MEditor;

/***/ }),
/* 2 */
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

/***/ })
/******/ ]);
});