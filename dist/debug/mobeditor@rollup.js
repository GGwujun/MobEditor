/*!
 * mobeditor v1.0.6
 * (c) 2017-2017 dsx
 * Released under the ISC License.
 * https://github.com/GGwujun/MobEditor#readme
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.mobeditor = factory());
}(this, (function () { 'use strict';

function __$styleInject(css, returnValue) {
  if (typeof document === 'undefined') {
    return returnValue;
  }
  css = css || '';
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  head.appendChild(style);
  
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  return returnValue;
}

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

/**
 * 生成script标签
 * @param {*function} sFun 
 */



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
}

/**
 * 格式化text
 * @param {*string} t 
 */

function _formatInnerText(t) {
    var s = t.replace(/\ +/g, "");
    s = t.replace(/[ ]/g, "");
    s = t.replace(/[\r\n]/g, "");
    return s.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 获取最大index值
 */
function _getLayerMaxZIndex() {
    var _max = Math.max.apply(null, $.map($('body *'), function (e) {
        var _$e = $(e);
        if (_$e.css('position') != 'static') return parseInt(_$e.css('z-index')) || 1;
    }));
    return (_max + '').indexOf('Infinity') >= 0 ? 1 : _max + 1;
}

/**
 * 生成唯一uid
 */
function _genEditorUid() {
    return '' + +new Date();
}

var selectors = Object.create(null);
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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var Text = function () {
    function Text($this) {
        classCallCheck(this, Text);

        this.bindevent($this);
    }

    createClass(Text, [{
        key: '_syncRenderTextEditorView',
        value: function _syncRenderTextEditorView($this) {
            selectors._$editorTextModule.attr('role', 'edit').show();
            selectors._$editorTextArea.html(selectors._$selected.hasClass('Eleditor-placeholder') ? '' : selectors._$selected.html());
            selectors._$editorTextArea.attr('style', selectors._$selected.attr('style'));
            if (selectors._$selected.css('font-weight') == 'bold') {
                selectors._$editorTextModule.find('.Eleditor-textStyle-bold').addClass('Eleditor-active');
            }

            if (_inArray(selectors._$selected.css('text-decoration'), ['overline', 'line-through', 'underline'])) {
                selectors._$editorTextModule.find('.Eleditor-textStyle-linedecoration').addClass('Eleditor-active');
            }
            if (selectors._$selected[0].tagName == 'A') {
                selectors._$editorTextModule.attr('type', 'link');
                selectors._$editorTextLinkArea.val(selectors._$selected.attr('href'));
            } else {
                selectors._$editorTextModule.attr('type', 'word');
            }

            var _selectAlign = selectors._$selected.css('text-align');
            if (_inArray(_selectAlign, ['left', 'center', 'right'])) {
                selectors._$editorTextModule.find('.Eleditor-textStyle-align[align=' + _selectAlign + ']').addClass('Eleditor-active');
            } else {
                selectors._$editorTextModule.find('.Eleditor-textStyle-align').removeClass('Eleditor-active');
            }
            selectors._$editorTextModule.find('.Eleditor-textStyle-color span').css('background-color', selectors._$selected.css('color'));
        }
    }, {
        key: 'bindevent',
        value: function bindevent($this) {
            selectors._$editorTextModule.on('click', '.Eleditor-textStyle-bold', function () {
                selectors._$editorTextArea.css("font-weight", $(this).hasClass("Eleditor-active") ? "normal" : "bold");
                $(this).toggleClass("Eleditor-active");
            });
            selectors._$editorTextModule.on('click', '.Eleditor-textStyle-linedecoration', function () {
                selectors._$editorLinedecorationsModule.show();
                $(this).addClass('Eleditor-active');
            });
            selectors._$editorTextModule.on('click', '.Eleditor-textStyle-color,.Eleditor-textStyle-bgColor', function () {
                var _$this = $(this);
                var _role = _$this.hasClass('Eleditor-textStyle-bgColor') ? 'bgcolor' : 'color';
                selectors._$editorColorModule.find('.Eleditor-textEditor-modulePane span').html(_role == 'bgcolor' ? '文字背景颜色' : '文字颜色');
                selectors._$editorColorModule.attr('role', _role).show();
                $(this).addClass('Eleditor-active');
            });
            selectors._$editorTextModule.on('click', '.Eleditor-textStyle-fontSize', function () {
                selectors._$editorFontsizeModule.show();
                $(this).addClass('Eleditor-active');
            });
            selectors._$editorTextModule.on('click', '.Eleditor-textStyle-lineHeight', function () {
                selectors._$editorLineheightModule.show();
                $(this).addClass('Eleditor-active');
            });
            selectors._$editorLinedecorationsModule.on('click', 'ul li', function () {
                if (!$(this).hasClass('Eleditor-inheritValue')) {
                    selectors._$editorTextArea.css("text-decoration", $(this).css('text-decoration'));
                } else {
                    selectors._$editorTextArea.css("text-decoration", 'inherit');
                    selectors._$editorTextModule.find('.Eleditor-textStyle-linedecoration').removeClass('Eleditor-active');
                }
                selectors._$editorLinedecorationsModule.hide();
            });
            selectors._$editorLineheightModule.on('click', 'ul li', function () {
                if (!$(this).hasClass('Eleditor-inheritValue')) {
                    selectors._$editorTextArea.css("line-height", $(this).html());
                } else {
                    selectors._$editorTextArea.css("line-height", 'inherit');
                    selectors._$editorTextModule.find('.Eleditor-textStyle-lineHeight').removeClass('Eleditor-active');
                }
                selectors._$editorLineheightModule.hide();
            });
            selectors._$editorFontsizeModule.on('click', 'ul li', function () {
                if (!$(this).hasClass('Eleditor-inheritValue')) {
                    selectors._$editorTextArea.css("font-size", $(this).html());
                } else {
                    selectors._$editorTextArea.css("font-size", 'inherit');
                    selectors._$editorTextModule.find('.Eleditor-textStyle-fontSize').removeClass('Eleditor-active');
                }
                selectors._$editorFontsizeModule.hide();
            });

            selectors._$editorTextModule.on('click', ".Eleditor-textStyle-align", function () {
                var _align = $(this).attr('align');
                selectors._$editorTextArea.css({ "text-align": _align, "display": 'block' });
                selectors._$editorTextModule.find(".Eleditor-textStyle-align.Eleditor-active").removeClass('Eleditor-active');
                $(this).addClass('Eleditor-active');
            });

            selectors._$editorTextModule.on('click', ".Eleditor-textEditor-format", function () {
                var _$cloneTextArea = selectors._$editorTextArea,
                    _removeAttrs = 'style width height border bgcolor align color';

                _$cloneTextArea.removeAttr(_removeAttrs);
                $.each(_$cloneTextArea.find('*'), function (_i, _e) {
                    var _$eachElm = _$cloneTextArea.find(_e);
                    if (_inArray(_e.tagName.toLocaleLowerCase(), ['script', 'style'])) {
                        _$eachElm.remove();
                    } else {
                        _$eachElm.removeAttr(_removeAttrs);
                    }
                });

                selectors._$editorTextArea.html(_$cloneTextArea.html());
                selectors._$editorTextModule.find('.Eleditor-active').removeClass('Eleditor-active');
            });

            selectors._$editorTextModule.on('click', ".Eleditor-textEditor-clean", function () {
                confirm('确定清空内容（不可恢复）？') && selectors._$editorTextArea.html("");
            });

            selectors._$editorTextModule.on('click', ".Eleditor-cancel,.Eleditor-commit", function () {
                arguments[0].preventDefault();
                if ($(this).hasClass('Eleditor-commit')) {
                    var _style = selectors._$editorTextArea.attr('style') || '';
                    var _content = selectors._$editorTextArea.html();
                    var _unode = selectors._$selected.clone();
                    if (!_content) {
                        return alert('请输入内容文字');
                    }

                    if (selectors._$editorTextModule.attr('role') == 'edit' || selectors._$selected.hasClass('Eleditor-placeholder')) {
                        if (selectors._$editorTextModule.attr('type') == 'link') {
                            var _link = selectors._$editorTextLinkArea.val();
                            _$selected.attr('href', _link);
                        }
                        selectors._$selected.attr('style', _style).removeClass('Eleditor-placeholder').html(_content);

                        _appendHistory($this, { m: 'editNode', node: selectors._$selected, unode: _unode });
                        //_flushEditorControllerLayerPosi();
                    } else {
                        var _buildWordHtml = '';
                        if (selectors._$editorTextModule.attr('type') == 'link') {
                            var _link = selectors._$editorTextLinkArea.val();
                            _buildWordHtml = '<a target="_BLANK" style="' + _style + '" href="' + _link + '">' + _content + '</a>';
                        } else {
                            _buildWordHtml = '<p style="' + _style + '">' + _content + "</p>";
                        }
                        var _buildWordHtml = $(_buildWordHtml);
                        selectors._$selected.after(_buildWordHtml);
                        //_flushEditorControllerLayerPosi();
                        _appendHistory($this, { m: 'insertNode', node: _buildWordHtml });
                    }
                }

                selectors._$editorTextModule.find('.Eleditor-active').removeClass('Eleditor-active');
                selectors._$editorTextModule.find('.Eleditor-textStyle-color span').removeAttr('style');
                selectors._$editorTextArea.removeAttr('style').html('');
                selectors._$editorTextLinkArea.val('');
                _hideEditorWrapMask();
                selectors._$editorTextModule.hide();
                _hideEditorControllerLayer();
            });

            selectors._$editorColorModule.on('click', 'ul li span', function () {
                var _color = $(this).css('background-color');
                if (selectors._$editorColorModule.attr('role') == 'color') {
                    if (!$(this).hasClass('Eleditor-inheritValue')) {
                        selectors._$editorTextArea.css("color", _color);
                        selectors._$editorTextModule.find('.Eleditor-textStyle-color span').css("background-color", _color);
                    } else {
                        selectors._$editorTextArea.css("color", 'inherit');
                        selectors._$editorTextModule.find('.Eleditor-textStyle-color').removeClass('Eleditor-active').find('span').removeAttr('style');
                    }
                } else {
                    if (!$(this).hasClass('Eleditor-inheritValue')) {
                        selectors._$editorTextArea.css("background-color", _color);
                    } else {
                        selectors._$editorTextArea.css("background-color", 'inherit');
                        selectors._$editorTextModule.find('.Eleditor-textStyle-bgColor').removeClass('Eleditor-active');
                    }
                }
                selectors._$editorColorModule.hide();
            });
        }
    }]);
    return Text;
}();

//封装Uploader函数


var _controllerUploader = null;
var _stylebarUploader = null;
function initUpload($this) {
    if (_inArray('insertImage', config.toolbars) && typeof WebUploader != 'undefined') {
        _controllerUploader = WebUploader.create({
            auto: true,
            server: config.upload.server || '/upload',
            pick: selectors._$editorUploadImageBtn, duplicate: true, resize: false,
            fileSingleSizeLimit: config.upload.fileSizeLimit ? config.upload.fileSizeLimit * 1024 * 1024 : undefined,
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
            $this._hideLoadingMask();
        });
        _controllerUploader.on('uploadSuccess', function (_file, _call) {
            if (_call.status == 1) {
                var _$upImg = $('<img src="' + _call.url + '">');
                selectors._$selected.after(_$upImg);
                _appendHistory($this, { m: 'insertNode', node: _$upImg });
            } else {
                alert(_call.msg);
            }
        });

        //bar
        _stylebarUploader = WebUploader.create({
            auto: true,
            server: config.upload.server || '/upload',
            pick: selectors._$editorBarUploadImageBtn, duplicate: true, resize: false, compress: false,
            fileSingleSizeLimit: config.upload.fileSizeLimit ? config.upload.fileSizeLimit * 1024 * 1024 : undefined,
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
                selectors._$editorTextArea.append('<img src="' + _call.url + '">');
            } else {
                alert(_call.msg);
            }
        });
    }
}

//事件处理对象
var _editorModuleEvents = {
    insertText: function insertText($this) {
        _showEditorWrapMask();
        selectors._$editorTextModule.attr({ 'role': 'insert', 'type': 'word' }).show();
    },
    insertLink: function insertLink($this) {
        _showEditorWrapMask();
        selectors._$editorTextModule.attr({ 'role': 'insert', 'type': 'link' }).show();
    },
    insertImage: function insertImage($this) {
        if (typeof WebUploader === 'undefined') {
            alert('图片上传请手动引入插件根目录webuploader.min.js');
        }
    },
    insertHr: function insertHr($this) {
        var _$hr = $('<div class="horizontal-line" style="padding: 10px 0;border-bottom: 1px solid #aaa;margin-bottom: 20px;"></div>');
        selectors._$selected.after(_$hr);
        _appendHistory($this, { m: 'insertNode', node: _$hr });
        _hideEditorControllerLayer();
    },
    editText: function editText($this) {
        if (_inArray(selectors._$selected[0].tagName, config._notctname)) {
            return this.insertText($this);
        }
        _showEditorWrapMask();
        $this.Text._syncRenderTextEditorView($this);
    },
    deleteThis: function deleteThis($this) {
        _appendHistory($this, { m: 'deleteNode', node: selectors._$selected, pnode: selectors._$selected.prev() });
        selectors._$selected.remove();
        _hideEditorControllerLayer();
        _correctHtmlStructure(selectors._$wrap, config.placeHolder);
    },
    deleteBefore: function deleteBefore($this) {
        var _$prev = selectors._$selected.prev();
        _appendHistory($this, { m: 'deleteBeforeNode', node: selectors._$selected, bnode: selectors._$selected.prevAll() });
        var _$prev_prev;
        while (_$prev.length > 0) {
            _$prev_prev = _$prev.prev();
            _$prev.remove();
            _$prev = _$prev_prev;
        }
        var _$parent = selectors._$selected.parent();
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
        _correctHtmlStructure(selectors._$wrap, config.placeHolder);
    },
    deleteAfter: function deleteAfter($this) {
        var _$next = selectors._$selected.next();
        _appendHistory($this, { m: 'deleteAfterNode', node: selectors._$selected, anode: selectors._$selected.nextAll() });
        var _$next_next;
        while (_$next.length > 0) {
            _$next_next = _$next.next();
            _$next.remove();
            _$next = _$next_next;
        }
        var _$parent = selectors._$selected.parent();
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
        _correctHtmlStructure(selectors._$wrap, config.placeHolder);
    },
    undo: function undo($this) {
        _handleHistory($this);
        _hideEditorControllerLayer();
    },
    cancel: function cancel($this) {
        _hideEditorControllerLayer();
    }
};

function initEvent() {
    for (var i = 0; i < config.toolbars.length; i++) {
        if (_typeof(config.toolbars[i]) === 'object') {
            _editorModuleEvents[config.toolbars[i].id] = config.toolbars[i].handle;
        }
    }
}

function initTool($editor) {
    selectors._$editorController.on('click', 'ul li', function () {
        var _$this = $(this),
            _event = _$this.attr('event');
        if (typeof _editorModuleEvents[_event] === 'function') {
            if (typeof config._toolnames[_event] != 'undefined') {
                _editorModuleEvents[_event]($editor);
            } else {
                _editorModuleEvents[_event](selectors._$selected, _$this) !== false && _editorModuleEvents.cancel($editor);
            }
        }
    });
}

/**
 * 编辑器构造函数
 */

var mobeditor$1 = function () {
    function mobeditor(params) {
        classCallCheck(this, mobeditor);

        this.init(params);
    }

    createClass(mobeditor, [{
        key: 'init',
        value: function init(params) {
            console.log('editor start init');

            //插入base.css
            //_scriptPath();

            //合并配置参数
            var _arg = Object.assign({}, config, params);

            Object.assign(config, params);

            var _editorUid = _genEditorUid();

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

            initele(_$editorWrap, _$wrap);
            console.log('editor is  mounted to', _$wrap);

            initEvent(_arg);

            _$wrap.on('click', '*', function (_e) {
                var _$this = $(this);
                if (!_$this.hasClass('Eleditor-active')) {
                    _hideEditorControllerLayer();
                    _showEditorControllerLayer(_$this);
                }
                return _e.preventDefault() == 0;
            });

            //初始化工具栏
            initTool(this);

            //初始化图片上传
            initUpload(this);

            this.Text = new Text(this);
        }
    }, {
        key: 'append',
        value: function append() {
            selectors._$wrap.find('.Eleditor-placeholder').remove();
            return selectors._$wrap.append(arguments[0]);
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
            return selectors._$wrap.html();
        }
    }, {
        key: 'getContentText',
        value: function getContentText() {
            return _formatInnerText(selectors._$wrap.text());
        }
    }, {
        key: 'destory',
        value: function destory() {
            selectors._$wrap.removeAttr('Eleditor-Inited Eleditor-Uid');
            selectors._$wrap.removeClass('Eleditor-area');
            selectors._$wrap.find('.Eleditor-placeholder').remove();
            selectors._$wrap.off().find('.Eleditor-active').removeClass('Eleditor-active');
            selectors._$editorWrap.find('*').off();
            selectors._$editorWrap.remove();
            console.log('|--Eleditor ' + this._editorUid + ' destoryed');
        }
    }]);
    return mobeditor;
}();

var _correctHtmlStructure = function _correctHtmlStructure(_wrap, _empty) {
    if (_formatInnerText(_wrap.text()) == '' && _wrap.find('img').length === 0) _wrap.append(_empty);
    if (_wrap.find('*').length === 0) _wrap.html('<p class="Eleditor-placeholder">' + _wrap.html() + '</p>');
};

/**
 * 生成编辑框
 * @param {*array} _toolbars  配置菜单
 * @param {*string} _uid  编辑器的标记
 */
function _buildEditorModule(_toolbars, _uid) {
    var _html = '\n                <div class="Eleditor-wrap" style="z-index:' + _getLayerMaxZIndex() + '" id="' + _uid + '">\n                    <div class="Eleditor-controller">\n                <ul>\n                ';

    for (var i = 0; i < _toolbars.length; i++) {
        var _it = _toolbars[i],
            _id = (typeof _it === 'undefined' ? 'undefined' : _typeof(_it)) === 'object' ? _it.id : _it,
            _tag = (typeof _it === 'undefined' ? 'undefined' : _typeof(_it)) === 'object' && _it.tag ? _it.tag.toLocaleLowerCase() : null,
            _name = (typeof _it === 'undefined' ? 'undefined' : _typeof(_it)) === 'object' ? _it.name : config._toolnames[_it];
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
    selectors._$selected = _$e;
    _$e.addClass('Eleditor-active');
    var _calTop = _$e.offset().top + _$e.outerHeight();
    $.each(selectors._$editorController.find('li'), function (i, e) {
        var _$e = $(e),
            _tgs = _$e.attr('bind-tags');
        if (_tgs) {
            _tgs = _tgs.toLocaleLowerCase().split(',');
            if (_inArray(selectors._$selected[0].tagName.toLocaleLowerCase(), _tgs)) {
                _$e.show();
            } else {
                _$e.hide();
            }
        }
    });

    selectors._$editorController.removeClass('out').addClass('in');

    if (typeof selectors._$scrollWrap.animate === 'function') {
        selectors._$scrollWrap.stop().animate({ scrollTop: _calTop - 150 + 'px' }, 500);
    } else {
        selectors._$scrollWrap.scrollTop(_calTop - 150 + 'px');
    }

    _controllerUploader && _controllerUploader.refresh();
}

/**
     * 隐藏编辑器
     */
function _hideEditorControllerLayer() {
    selectors._$wrap.find('.Eleditor-active').removeClass('Eleditor-active');
    selectors._$editorController.removeClass('in').addClass('out');
}

/**
 * 显示修改文字编辑框
 */
function _showEditorWrapMask() {
    if (_inArray('insertImage', config.toolbars)) {
        selectors._$editorBarUploadImageBtn.show();
    }
    selectors._$editorController.removeClass('in').addClass('out');
    selectors._$editorWrap.addClass('Eleditor-mask');
    selectors._lastScrollH = selectors._$window.scrollTop();
    selectors._$scrollWrap.addClass('Eleditor-scrollLocked');
}

/**
 * 隐藏修改文字编辑框
 */
function _hideEditorWrapMask() {
    selectors._$editorWrap.removeClass('Eleditor-mask out');
    selectors._$scrollWrap.removeClass('Eleditor-scrollLocked');
    selectors._$window.scrollTop(selectors._lastScrollH);
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
            selectors._$wrap.prepend(_handle.node);
        }
        selectors._$wrap.find('.Eleditor-placeholder').remove();
    }
    if (_handle.m == 'deleteBeforeNode') {
        for (var i = _handle.bnode.length - 1; i >= 0; i--) {
            _handle.node.before(_handle.bnode[i]);
        }
    }
    if (_handle.m == 'deleteAfterNode') {
        _handle.node.after(_handle.anode);
    }
    _flushHistoryBtn(editor);
}

function _flushHistoryBtn(editor) {
    if (editor._historys.length == 0) selectors._$editorUndoBtn.hide();else selectors._$editorUndoBtn.show();
}

/**
 * 设置编辑器的位置
 */

__$styleInject("/**\r\n* Version: 1.6\r\n* Title: Eleditor 移动端富文本编辑器\r\n* Site: https://eleditor.fixel.cn\r\n* Author: Try\r\n*/\r\n\r\n.Eleditor-scrollLocked {\r\n    height: 100%;\r\n    overflow: hidden\r\n}\r\n\r\n.Eleditor-loading {\r\n    display: none;\r\n    position: absolute;\r\n    padding: 15px;\r\n    background: rgba(255, 255, 255, .9);\r\n    z-index: 999;\r\n    width: 100%;\r\n    height: 100%\r\n}\r\n\r\n.Eleditor-loading p {\r\n    font-size: 12px;\r\n    color: #666;\r\n    text-align: center;\r\n    position: absolute;\r\n    top: 50%;\r\n    left: 50%;\r\n    transform: translate(-50%, -50%);\r\n    -webkit-transform: translate(-50%, -50%)\r\n}\r\n\r\n.Eleditor-loading p:before {\r\n    content: '';\r\n    width: 25px;\r\n    height: 25px;\r\n    margin: 0 auto;\r\n    background: url(data:image/gif;base64,R0lGODlhIAAgALMAAP///7Ozs/v7+9bW1uHh4fLy8rq6uoGBgTQ0NAEBARsbG8TExJeXl/39/VRUVAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFBQAAACwAAAAAIAAgAAAE5xDISSlLrOrNp0pKNRCdFhxVolJLEJQUoSgOpSYT4RowNSsvyW1icA16k8MMMRkCBjskBTFDAZyuAEkqCfxIQ2hgQRFvAQEEIjNxVDW6XNE4YagRjuBCwe60smQUDnd4Rz1ZAQZnFAGDd0hihh12CEE9kjAEVlycXIg7BAsMB6SlnJ87paqbSKiKoqusnbMdmDC2tXQlkUhziYtyWTxIfy6BE8WJt5YEvpJivxNaGmLHT0VnOgGYf0dZXS7APdpB309RnHOG5gDqXGLDaC457D1zZ/V/nmOM82XiHQjYKhKP1oZmADdEAAAh+QQFBQAAACwAAAAAGAAXAAAEchDISasKNeuJFKoHs4mUYlJIkmjIV54Soypsa0wmLSnqoTEtBw52mG0AjhYpBxioEqRNy8V0qFzNw+GGwlJki4lBqx1IBgjMkRIghwjrzcDti2/Gh7D9qN774wQGAYOEfwCChIV/gYmDho+QkZKTR3p7EQAh+QQFBQAAACwBAAAAHQAOAAAEchDISWdANesNHHJZwE2DUSEo5SjKKB2HOKGYFLD1CB/DnEoIlkti2PlyuKGEATMBaAACSyGbEDYD4zN1YIEmh0SCQQgYehNmTNNaKsQJXmBuuEYPi9ECAU/UFnNzeUp9VBQEBoFOLmFxWHNoQw6RWEocEQAh+QQFBQAAACwHAAAAGQARAAAEaRDICdZZNOvNDsvfBhBDdpwZgohBgE3nQaki0AYEjEqOGmqDlkEnAzBUjhrA0CoBYhLVSkm4SaAAWkahCFAWTU0A4RxzFWJnzXFWJJWb9pTihRu5dvghl+/7NQmBggo/fYKHCX8AiAmEEQAh+QQFBQAAACwOAAAAEgAYAAAEZXCwAaq9ODAMDOUAI17McYDhWA3mCYpb1RooXBktmsbt944BU6zCQCBQiwPB4jAihiCK86irTB20qvWp7Xq/FYV4TNWNz4oqWoEIgL0HX/eQSLi69boCikTkE2VVDAp5d1p0CW4RACH5BAUFAAAALA4AAAASAB4AAASAkBgCqr3YBIMXvkEIMsxXhcFFpiZqBaTXisBClibgAnd+ijYGq2I4HAamwXBgNHJ8BEbzgPNNjz7LwpnFDLvgLGJMdnw/5DRCrHaE3xbKm6FQwOt1xDnpwCvcJgcJMgEIeCYOCQlrF4YmBIoJVV2CCXZvCooHbwGRcAiKcmFUJhEAIfkEBQUAAAAsDwABABEAHwAABHsQyAkGoRivELInnOFlBjeM1BCiFBdcbMUtKQdTN0CUJru5NJQrYMh5VIFTTKJcOj2HqJQRhEqvqGuU+uw6AwgEwxkOO55lxIihoDjKY8pBoThPxmpAYi+hKzoeewkTdHkZghMIdCOIhIuHfBMOjxiNLR4KCW1ODAlxSxEAIfkEBQUAAAAsCAAOABgAEgAABGwQyEkrCDgbYvvMoOF5ILaNaIoGKroch9hacD3MFMHUBzMHiBtgwJMBFolDB4GoGGBCACKRcAAUWAmzOWJQExysQsJgWj0KqvKalTiYPhp1LBFTtp10Is6mT5gdVFx1bRN8FTsVCAqDOB9+KhEAIfkEBQUAAAAsAgASAB0ADgAABHgQyEmrBePS4bQdQZBdR5IcHmWEgUFQgWKaKbWwwSIhc4LonsXhBSCsQoOSScGQDJiWwOHQnAxWBIYJNXEoFCiEWDI9jCzESey7GwMM5doEwW4jJoypQQ743u1WcTV0CgFzbhJ5XClfHYd/EwZnHoYVDgiOfHKQNREAIfkEBQUAAAAsAAAPABkAEQAABGeQqUQruDjrW3vaYCZ5X2ie6EkcKaooTAsi7ytnTq046BBsNcTvItz4AotMwKZBIC6H6CVAJaCcT0CUBTgaTg5nTCu9GKiDEMPJg5YBBOpwlnVzLwtqyKnZagZWahoMB2M3GgsHSRsRACH5BAUFAAAALAEACAARABgAAARcMKR0gL34npkUyyCAcAmyhBijkGi2UW02VHFt33iu7yiDIDaD4/erEYGDlu/nuBAOJ9Dvc2EcDgFAYIuaXS3bbOh6MIC5IAP5Eh5fk2exC4tpgwZyiyFgvhEMBBEAIfkEBQUAAAAsAAACAA4AHQAABHMQyAnYoViSlFDGXBJ808Ep5KRwV8qEg+pRCOeoioKMwJK0Ekcu54h9AoghKgXIMZgAApQZcCCu2Ax2O6NUud2pmJcyHA4L0uDM/ljYDCnGfGakJQE5YH0wUBYBAUYfBIFkHwaBgxkDgX5lgXpHAXcpBIsRADs=) no-repeat center top;\r\n    background-size: 100%;\r\n    display: inline-block;\r\n    vertical-align: middle;\r\n    margin-right: 10px\r\n}\r\n\r\n.Eleditor-wrap ul {\r\n    list-style: none\r\n}\r\n\r\n.Eleditor-area,\r\n.Eleditor-area *,\r\n.Eleditor-wrap,\r\n.Eleditor-wrap * {\r\n    cursor: pointer;\r\n    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\r\n}\r\n\r\n.Eleditor-area .Eleditor-active {\r\n    background: #cce0f2!important;\r\n    padding: 2%!important\r\n}\r\n\r\n.Eleditor-wrap {\r\n    position: fixed;\r\n    bottom: 0;\r\n    left: 0;\r\n    z-index: 11000;\r\n    width: 100%;\r\n    -webkit-transform: translate3d(0, 100%, 0);\r\n    transform: translate3d(0, 100%, 0);\r\n}\r\n\r\n.Eleditor-wrap.in {\r\n    -webkit-transition-duration: 300ms;\r\n    -o-transition-duration: 300ms;\r\n    transition-duration: 300ms;\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n}\r\n\r\n.Eleditor-wrap.out {\r\n    z-index: 10999;\r\n    -webkit-transition-duration: 300ms;\r\n    -o-transition-duration: 300ms;\r\n    transition-duration: 300ms;\r\n    -webkit-transform: translate3d(0, 100%, 0);\r\n    transform: translate3d(0, 100%, 0);\r\n}\r\n\r\n.Eleditor-wrap.Eleditor-mask {\r\n    position: absolute;\r\n    left: 0;\r\n    top: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    background: rgba(0, 0, 0, .5);\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n}\r\n\r\n.Eleditor-controller {\r\n    background: #fafafa;\r\n    box-sizing: border-box;\r\n    margin-top: 5px;\r\n    box-shadow: 0 0 20px rgba(0, 0, 0, .2);\r\n    -webkit-box-shadow: 0 0 20px rgba(0, 0, 0, .2);\r\n    border-bottom: 1px solid #e1e1e1;\r\n    border-radius: 3px;\r\n    -webkit-border-radius: 3px\r\n}\r\n\r\n.Eleditor-controller ul {\r\n    margin-bottom: 2.5%;\r\n    padding-left: 0\r\n}\r\n\r\n.Eleditor-controller ul:after {\r\n    content: '';\r\n    display: block;\r\n    height: 0;\r\n    clear: both\r\n}\r\n\r\n.Eleditor-controller ul li {\r\n    float: left;\r\n    width: 30%;\r\n    margin: 2% 0 0 2.5%;\r\n    height: 42px;\r\n    border-radius: 3px;\r\n    -webkit-border-radius: 3px;\r\n    line-height: 42px;\r\n    padding-left: 10%;\r\n    box-sizing: border-box;\r\n    font-size: 14px;\r\n    border-right: 1px solid #ddd;\r\n    border-bottom: 1px solid #ddd;\r\n    border-top: 1px solid #eee;\r\n    border-left: 1px solid #eee;\r\n    white-space: nowrap;\r\n    position: relative\r\n}\r\n\r\n.Eleditor-controller ul li.Eleditor-undo {\r\n    display: none\r\n}\r\n\r\n.Eleditor-controller ul li:before {\r\n    background-size: 100%;\r\n    background-repeat: no-repeat\r\n}\r\n\r\n.Eleditor-controller ul li:before {\r\n    content: '';\r\n    position: absolute;\r\n    left: 8px;\r\n    top: 12px;\r\n    width: 15px;\r\n    height: 15px;\r\n    display: block;\r\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAANlBMVEUAAABIotJIodFIo9NIo9NHotJAn89IotFHotJHodFIn9dHotJIodJHotFHodFHodFHodFIotIElcMpAAAAEXRSTlMAwIBAf7AQ4HDvINCg8M+Qb3nwl3EAAAC/SURBVDjL7dPRasQgEEbhf3THqEm2Pe//sl3Ixc5GF3JRaAv97tQDwojiVfOsh+yNV2LQpc5AYCnYIEkJPAUGgqRowSRjVZQmoR2h/Yd/KNwUNVxymqIN5LDY0wJVqtDC5h1MmZO9SGXnJEs9WeC16KFUt+Cj65usS3ku+s0C/wxHGXJYnLQyDw3WYTyTcBj4jk/D2RP+aJgPFWo+lGl4Z7BMw/VqWCZX/7rxXAmX96Hdgg3Sm3DQL4W75/lX+ALtiBv2wt/cBwAAAABJRU5ErkJggg==)\r\n}\r\n\r\n.Eleditor-controller ul li.Eleditor-insertText:before {\r\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjBAMAAADs965qAAAAHlBMVEUAAAAmk/8mk/8mk/8mk/8mk/8mk/8mk/8mk/8mk//nRnVBAAAACXRSTlMAQBCAcMAgMKCd1QxoAAAAf0lEQVQoz2NwlJyJCiYwCHASIzRziiAyEAEJTWRABoxECiHMEmNgKBQUAgohbJzMwBAJ1AESaracOTM0EkUIpIKBE0UI7JYpyGaBbUHYSroQE8htKGYBMQhMJEUI0yxjMwwbgVwihRBmwYUQNpImxCQohDCL8nhEpAmciYmwEAAsoK4MjVmkgQAAAABJRU5ErkJggg==)\r\n}\r\n\r\n.Eleditor-controller ul li.Eleditor-insertImage:before {\r\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAMAAAApB0NrAAAAM1BMVEUAAAD/gAD/gAD/gAD/gAD/gAD/gAD/gAD/gAD/gAD/gAD/gAD/gAD/gAD/gAD/gAD/gABSMWeoAAAAEHRSTlMAwKDiQBBQ8CCwkIBg0HAwYTpfggAAAMVJREFUOMvN1EsOgzAMBFA7H/6lvv9pa1DK1IlwWHYWQRo9RmJBiIYoXuKgRHoZSFdGvs+xREoy3ScrUsPkhX9N3pmX7Jr8Es349kwon+qZUWTf9KiHIow+5XwpWRLE7syLFlNDYFY5wy2BoVk0r1yTCKNJ67o1K4FhEEuoGI8YM6WUW2LMIkc3VQSmVFAgMGfFfCkQmFKlotJFYFAVBfI1ERW2yBhURQWeN6oMCGINiGci9Q3/mZHu/x716NwbT+6fJ/fYB/HBGdUQKWkCAAAAAElFTkSuQmCC)\r\n}\r\n\r\n.Eleditor-controller ul li.Eleditor-undo:before {\r\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAMAAAApB0NrAAAATlBMVEUAAABubm5wcHBpaWpwcHBwcHBsbG5nZ2lwcHBwcHBwcHBwcHBwcHBubnBpaWlwcHBwcHBwcHBwcHBwcHBwcHBpaWlwcHBwcHBoaGhwcHCaDFyHAAAAGXRSTlMAPsUR69IhMvZKpZJ9Vgfg2a5kmnQruYYXgiMi7QAAAM1JREFUOMvlklmSwyAMRI0QiwGvGSd597/oDJWqzGIH/0/6D9UDpFZ376Hr9RS5QGgTVgDTRPzMGWMUpM0MwBqa/XwAQ2eghPsLJIN+/dIDxDkNdkeMC8y+tj3xUExmP7PYB333Zr04gGX7gfQO0u9b200hrt8FwO39LBFy652qzcHtsB9rx2fZQX80V4w6yVIGXyFFxwN/npLi63E98jmXvDilKnlBXu7LmiJAdGho7T0kqnI7P2YC3EkO6/TxLM92QnfmivyJlfbdv9Unig4RkspeaqcAAAAASUVORK5CYII=)\r\n}\r\n\r\n.Eleditor-controller ul li.Eleditor-insertImage div[id^='rt_rt_'] {\r\n    left: 0!important;\r\n    width: 100%!important;\r\n    opacity: 0;\r\n    -webkit-tap-highlight-color: rgba(0, 0, 0, 0)\r\n}\r\n\r\n.Eleditor-controller ul li.Eleditor-insertLink:before {\r\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAMAAAApB0NrAAAAM1BMVEUAAAAmk/8mk/8mk/8mk/8mk/8mk/8mk/8mk/8mk/8mk/8mk/8mk/8mk/8mk/8mk/8mk/+67wOaAAAAEHRSTlMA8NAwEIBAwCCwoHBgUOCQaFFl2wAAAPlJREFUOMuFlN0ShSAIhP0DMU/l+z/tkZxsm2LaK2M+BDcG9ypefGvNL+wsxdxO5WRc4tslH9+QX1OVylQOSAwkyCgatNw7spxdJIX4FYH2xyeKBwIqvaPHo9bqUNST3IfYYux7eM+9eK5i9iN5WksXImrnfCT+gHDzZ70hgWjfjgMgAZEwDK16pon4iEiChM1EhEiLr0Ri3rLNoF2INFyHWYi4MJB5bttOFBoiv4cfzzHVgQT3aXqZr6hXs0FSs+/AjtPXM6r70DGw3wzhd6IVcp79oHWopceiiQwx+oMIKis0woIISg7XCnEt9hKI1p5AJdg3BvK5t/7GyxRFV0zN3AAAAABJRU5ErkJggg==)\r\n}\r\n\r\n.Eleditor-controller ul li.Eleditor-insertHr:before {\r\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjBAMAAADs965qAAAAG1BMVEUAAAAmk/8mk/8mk/8mk/8mk/8mk/8mk/8mk//SKiEGAAAACHRSTlMAgEAQ0CCgwHszpJ0AAABeSURBVCjPYwABiQ4k0IBTqE0QDiqgQk1gCsKmuZABppAzplCLAYZQhzOmEFBZkDJCKEiBoQOoDA10gJQxIgJCACTUkYAuhKkK0yysNjoT43pnokKCYTALYaQcwkkOAOuLWyAmEX4YAAAAAElFTkSuQmCC)\r\n}\r\n\r\n.Eleditor-controller ul li.Eleditor-deleteThis:before,\r\n.Eleditor-controller ul li.Eleditor-deleteBefore:before,\r\n.Eleditor-controller ul li.Eleditor-deleteAfter:before {\r\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjBAMAAADs965qAAAALVBMVEUAAAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAB21glVAAAADnRSTlMAwEDQMBDgUPCgYCCQgBYit2kAAACsSURBVCjP5czBCcIwFMbxr6UgejI3T0UygFQHCIILBDzosRMED87TGZxAOoJukLaCVeHNYBpCEnrz7P/wDj/4HmwzGnoj6miplxFVPWNsQXWQlFq7/gRKaA5T3sB2NxNBa2ZSNNwbaJyGGFOBlNOG+0TLYTK/fbmGozNwkMhOgaZ0gSpxfQVKaAnSWDV/T5NOoqqxfwaC7zcqAglHDy8ZOYpypGIqLe0i6bbAFx3L0mvjGhXnAAAAAElFTkSuQmCC)\r\n}\r\n\r\n.Eleditor-controller ul li.Eleditor-cancel:before {\r\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjBAMAAADs965qAAAAJ1BMVEUAAACIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIgln7UqAAAADHRSTlMAYLAgMfKf4EGAclBp3/IGAAAA9UlEQVQoz2MAA+ZFNWfOFC1mQAAOnTNgoAEXYdY5czxTQjL9zBllmNDWM8ccQLTbmaMbICKMZw4ZQFhGZw5CGDJHBWDqRc+AmdxnQuCmssScBlGmRx0QdrseBZmhA9EPM1cB6CYQ4QxxjANQwQkGBqYzBgwsEFNljjAw2BwC4mNAaaDlIE2HGRjYgCrWHAHJA5WBCaCGBQw6BWAFB8EYCGoUGGoSGCDKZCAG5hQwnJkAsfwY1DNzDjAA5SDKYAygUAOQBtl0DOLYHuyqMM3CtBGbuzBdj82PmCGBGV5YQxUz7DFjCDMeMWMbZ5rATDmY6QszFQIAly6EERaFwtIAAAAASUVORK5CYII=)\r\n}\r\n\r\n.Eleditor-controller ul li.Eleditor-editText:before {\r\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjBAMAAADs965qAAAAJ1BMVEUAAAAmk/8mk/8mk/8mk/8mk/8mk/8mk/8mk/8mk/8mk/8mk/8mk//34ERwAAAADHRSTlMAgEAQ0KBgMMDwcOAe1XweAAAA3UlEQVQoz4XRrcoCQRjF8fPiOwomRRARg3gFghttYjMs5g02i8FL8ALsGgxegs2q4ieci3J2d2aPA4In/vjDAzMIVlofAVR6fl0g4msJJPSLgQm5AQq5AVgwzaiotC+TPIDPerY2EN3S7ASei3MTxjZbQRSRNrv2LSmizUYQRe5sRorIfU6KeO07UjSCJ0UiRVNHiszFkaLEkaIqPXV89FeQcZGoiSSPROuZySPR7o4kjUQVcmbSSFQm72jgkwxthoD+yW0tpOF4DoQ08CDCT8p+W2tlFO4bPfxTaTHeolbpPP71OVwAAAAASUVORK5CYII=)\r\n}\r\n\r\n@media screen and (max-width:300px) {\r\n    .Eleditor-controller ul li {\r\n        width: 30%;\r\n        text-align: center;\r\n        padding-left: 0;\r\n        font-size: 12px\r\n    }\r\n    .Eleditor-controller ul li:before {\r\n        display: none\r\n    }\r\n}\r\n\r\n.Eleditor-textEditor {\r\n    display: none;\r\n    width: 100%;\r\n    height: 100%;\r\n    background: #fff;\r\n    position: fixed;\r\n    left: 0;\r\n    top: 0\r\n}\r\n\r\n.Eleditor-textEditor-colors,\r\n.Eleditor-textEditor-fontsizes,\r\n.Eleditor-textEditor-lineheight,\r\n.Eleditor-textEditor-linedecorations {\r\n    display: none;\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    background: #fff;\r\n    z-index: 1\r\n}\r\n\r\n.Eleditor-textEditor-modulePane {\r\n    margin: 10px 8px;\r\n    border-bottom: 1px solid #ccc;\r\n    padding-bottom: 10px\r\n}\r\n\r\n.Eleditor-textEditor-linedecorations .Eleditor-textEditor-modulePane {\r\n    margin-bottom: 0\r\n}\r\n\r\n.Eleditor-textEditor-linedecorations ul li {\r\n    text-align: center;\r\n    display: block;\r\n    color: #555;\r\n    font-size: 14px;\r\n    letter-spacing: 2px;\r\n    padding: 20px 0;\r\n    border-bottom: 1px solid #eee\r\n}\r\n\r\n.Eleditor-textEditor-colors ul:after {\r\n    content: '';\r\n    display: block;\r\n    clear: both;\r\n    height: 0\r\n}\r\n\r\n.Eleditor-textEditor-colors ul li {\r\n    float: left;\r\n    text-align: center;\r\n    width: 20%;\r\n    margin-bottom: 10px\r\n}\r\n\r\n.Eleditor-textEditor-colors ul li span {\r\n    width: 40px;\r\n    height: 40px;\r\n    display: inline-block;\r\n    border-radius: 3px;\r\n    cursor: pointer;\r\n    position: relative\r\n}\r\n\r\n.Eleditor-textEditor-colors ul li span.transparent:after,\r\n.Eleditor-textEditor-colors ul li span.transparent:before {\r\n    position: absolute;\r\n    background: #dedede;\r\n    content: '';\r\n    transform: rotate(45deg);\r\n    -webkit-transform: rotate(45deg)\r\n}\r\n\r\n.Eleditor-textEditor-colors ul li span.transparent:after {\r\n    width: 1px;\r\n    height: 100%;\r\n    left: 50%;\r\n    top: 0\r\n}\r\n\r\n.Eleditor-textEditor-colors ul li span.transparent:before {\r\n    width: 100%;\r\n    height: 1px;\r\n    left: 0;\r\n    top: 50%\r\n}\r\n\r\n.Eleditor-textEditor-fontsizes ul li,\r\n.Eleditor-textEditor-lineheight ul li {\r\n    text-align: center;\r\n    color: #333;\r\n    font-size: 14px;\r\n    line-height: 30px\r\n}\r\n\r\n.Eleditor-textStyle {\r\n    display: flex;\r\n    display: -webkit-flex;\r\n    position: relative;\r\n    border-bottom: 1px solid #eee;\r\n    overflow-x: auto;\r\n    overflow-y: hidden;\r\n    box-shadow: 0 0 10px rgba(0, 0, 0, .1);\r\n    -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, .1)\r\n}\r\n\r\n.Eleditor-textStyle .Eleditor-textStyle-item {\r\n    flex: 1;\r\n    -webkit-flex: 1;\r\n    padding: 10px 0\r\n}\r\n\r\n.Eleditor-textStyle .Eleditor-textStyle-item div {\r\n    width: 24px;\r\n    height: 24px;\r\n    position: relative;\r\n    margin: auto\r\n}\r\n\r\n.Eleditor-textStyle .Eleditor-textStyle-item div:before {\r\n    content: '';\r\n    position: absolute;\r\n    left: 0;\r\n    top: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    display: block;\r\n    background-size: 20px;\r\n    background-position: center;\r\n    background-repeat: no-repeat\r\n}\r\n\r\n.Eleditor-textStyle .Eleditor-textStyle-item .Eleditor-active {\r\n    background-color: #FFE69F!important;\r\n    padding: 0;\r\n    border: 1px solid #DCAC6C;\r\n    border-radius: 2px\r\n}\r\n\r\n.Eleditor-textStyle .Eleditor-textStyle-item .Eleditor-textStyle-bold:before {\r\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAACgUlEQVRYR82Y0XEaQQyGpWWO19BB7AqCKwipIHYFcQeBh9MOT8FPzC4PmApyVBB3ENOBU0FIBbGf4U4ZkSVzM8GsbjycV08wo+O+ldC//y5C4oGJ80EU0Dk3McawZiHM/AgAD5JLRCvNM7GcKKD3XgX3zIsEtsiybDkajQS+cagAmfkJEXeV0QQz9xHxTS33ERFv8zy/0Txfz1EBAsCKiAZNfnw+n/c2m80lAEwA4G149j7Lsqsm1TwZYH0xzrkhIs73kET0QbvYVgAFxnt/DQBf5TMzj6y1txrI1gAD5B0AfGTmtbX2PDnA6XR61ul0fgawCyKKDl6rFRQw59wDIr5j5htrrQzQ0Wgd0Ht/DwDvkwVMuoJBG3+HSb6y1srQpNPiuh6WZXk+Ho/XyQB67/sA8B0Aesy8tNaKLkajlSERR4SInwPcU1VVfU31hP5kgEHzRJRlmzsL/zsxHQON/u1LqwX85/OiPfmbcMhYrMqyvNZWrimgkutwGiJOttvtsimcusVN/aAI8SFUZr4zxizyPBexVoW2xY39oLxd/ofGGJle8YWXNRM7JKKFhvCkgHWAINKFuJkwMCrL1RrgHtY5VyDiJ/muEevWAQXMey87iBwDFkQ0PNbqVwEMwv1FjqhEdJEc4Gw2GzCzbHtyfj5apFepYPKAzjmRnG/JVrA2yVF9bb3FQQ/l4CS2K6qFrQN673dHzyR1sC7SSR2agjeUW4WdDWPmH9Za2aOjcdIWh2mVdopZ6O3hut3uQHuBpAKUqwpjjGz0zwYz102qwPxXIW1b6y9RAUb7cDzhFzMXVVUVpzKsanMZWrjPlyuOdZPzx6F1Riv4wuq9+PHkAf8AXHXCODnTUHYAAAAASUVORK5CYII=)\r\n}\r\n\r\n.Eleditor-textStyle .Eleditor-textStyle-item .Eleditor-textStyle-color:before {\r\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAC6klEQVRYR82YTW4TMRSA3xspWSGRLliTnIB2yYr0BMAJCNLYqsQCOAFwAsoGRX6JmJ6AcgLCCVpO0HACWokFmjDzkKNM5Px4xj+DindRPJ7Pb+zP7xmhxZam6QUi/iaih20Ni20NJKV8AgCf9XhJkgzG4/G8jbFbAxRCzBDx0QrqTCk1+m8AT05O+mVZXgHALwC4w8zXi8VikGXZdSxkKxGUUmYA8AwAzpi5v4rka6XU6a0DjkajXqfTuULEnl57RVEMEfETAMyVUoNbB5RSvgWAN8z8jYiGGkgIMUfE+8z8nIh0dINb9CeuYADgqVLqXJMY0DMiOg6mA4AoQCHESH9OZv5BRP0KRH/2brf7U/9m5iMiugyFjAWs1LKzIcyNE6OcYEAhxCEiXgDATZ7n/W2lGOqBPM8PQpUTDOgSIUPe75RSejN5tyBAc43VHWvG8ResnCBAY5d+ISJ9BltbrHKCAKuXlmV5PJlMZnWAUspXAPCemYOU4w1oU4sNcrUcdGZz12VC2+OEAC7V4nNKCCFOEfGlPqt9leMFmKbpMEmSrza12KJoKsc3V/QCrNTCzB+ISK8t5yaEOEfExwDgpRxnwJgo6FlU0de5IhEduM7MGdBHLbaXhyjHB1Bnx0E7sQI2DHBJREcuUXQCrAYGgO9KqUOXgff1CVGOE6CUUqdLD3zUYpuE71JpBDTVopTqhUaves53szUCGlmLlx4ajr9lkeWiq1pAc7axkbM8/yfP83t1uWItoHFE6fTd2V0+kymK4sV0Ov1oe8YKaJaTIYd8E6Rhhtpc0QrYlloa1mKjW+sAW6ttY5SzF7BttTTkisvy1Jbl7AUMzTya1t2+/5uKrx3AtspFV9iqfLXdiO0AxmS/rlDb/YzydOcCYAPQVEvslYUPbJ1yNgCNdGh9U+Xzopi++y6h9HjbgP9cLQ7K2ShP14BGSr5xUxUTFZ9nzVzRVM4acLX+MkTMqns+nxe00Xe1xIZmafoXDcwGR/w9qZwAAAAASUVORK5CYII=);\r\n    background-size: 16px\r\n}\r\n\r\n.Eleditor-textStyle .Eleditor-textStyle-item .Eleditor-textStyle-color:before {\r\n    background-position: center 3px;\r\n    background-size: 15px\r\n}\r\n\r\n.Eleditor-textStyle .Eleditor-textStyle-item .Eleditor-textStyle-color span {\r\n    display: block;\r\n    width: 18px;\r\n    height: 1px;\r\n    background: #333;\r\n    position: absolute;\r\n    bottom: 2px;\r\n    left: 4px\r\n}\r\n\r\n.Eleditor-textStyle .Eleditor-textStyle-item .Eleditor-textStyle-linedecoration:before {\r\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAACd0lEQVRYR+2YS3LaQBCGuwVoa98g9glCThByA3wCkxMEFswUqzgrqoeFyAlCTmBuEPsEISewfQO85aFOtWpGRWE9kShvNCsYaVqf/n7NCCFhENE9IvYQ8WY8Hj8k3VPX3Gw26zHzPTM/aK1vju1i0oOMMSzzzPxDa31XF0yKGHeI+F2uKaXe8DSAeeoTUaNgnkiZ1xsFK8kHAI2CjYJNJ8mJgSZJmiRpkuScSQIAP5VSw6pxlrXeGDMHgG+lNqxEtELEjwDwqJTqnRlQjhSfmfmf1rpbdMvvFj1rra/PCUhET4h4lSZG2pY/lh0APimlVueANMaIYn+t7cRwSgPMXVgHMBEtEPHW2koUIhFQFhhjngHgg/ze7/fXk8lE/tc2ptPpVavVerIGX5RS4uY3IwtwAAC/ZAUzL5POrFVo7dm7b218VUotSgFaFaNksZAjrbXEZuVBRENEDKyhzEqRqqAF7MqJHxEv8t60KLUx5tAzr/IFIysJMwHlofbTxB8HwMxzrfWoKNDhfUQUIGJc+BHxS96nlVxAq+RAwJySzCwJIy5fFgElIslUOaBHicDMotwwLe4ObRYCdO4GAAGKMts+SECXiCjzr85Vtr5dMLMkQd+B2WUvMle0thYGFONBEFxuNhtxkQS5i8siIkaqAcDc9/35aDRaF1oEAKUAnVELOkBEUSjK8ozxKGXK9/1FGTBn7yTAQxiB3e123TAMLwHANfuV53nrdru9OgXqpBgs6pK676usYN1Ax/YawKoKxwpKsG+321tElGB/t8HM606n89slVwx41MDfDdA2gHhjEgNKzw3DULpCqQJc95tIQfc8r+969H9Yv8s4C539kQAAAABJRU5ErkJggg==);\r\n    background-size: 18px;\r\n    background-position: center 3px\r\n}\r\n\r\n.Eleditor-textStyle .Eleditor-textStyle-item .Eleditor-textStyle-bgColor:before {\r\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAC5ElEQVRYR82YTXLTQBCFuy3JW5ITYJ8AcgKSExBOAJyAeOGe8oqwcs14YTgB4QTACRJOgDlBkhNg1i5Xp1olqcZj/cxIqkKzk0oafeqZ9/pJCAMf2IVPa305Go1eyBzM/EhEN13mK7u3NeB6vT7Z7Xb3AHCST5wkyelsNtv2Cdka0BjzDgC+2jDMPFNKfR4K4G8AeAkAjwDwPFvmB6XU9L8DGmMETABl731CRDl+nYGdEdGmL8hWS6y1vkHEtwKx3++nURSd58vNzN+UUrL8vYxgQEccv4hI4EBrvUXEZwCwTZJk2pdYggEdcbzPrcWuKgAU57uWsQ1gKg5m/qeUKizG3pcAsCGis65wcn8QoAPxhYiubAit9QYRU+MGgF7EEgToimOxWDw4gFeIuM7OHb1Am4p6A9riYOY/SimxloORXfM3O7klotM2UPY93oBV4nABjDE/LE/sLJYQwEIc4/F4UmUjEiAQ8XsGfkdEF12q6AXodI5GI7Y8MTVyd6+GAHsBOh7XqE5jjASGD32IpRHQRxwl+7Do1dJZuoilEVBrXVhHSJyyPZGZ3yilRDzBwwfwHhEnMnNIILVfDAB+EtFlMF1TJ1mtVufMfJv7mrSwgIdIGyy8sq1YaivoiCOA7fhSyY1KqevQSSoB7a4gwQARQ6pnc7ySA2ZulbYrAZ091LqvGmOkX+efBMFiqQMsxNF2/0jlHBdoNHl3C5QC2uKoCga+e2m5XE6iKJLP03SEOIFcXwrYdzq2A0SIl5YCuuKoCwa+VbQDRKhYjirYdc9UQdtiQcSL+Xx+5/OCZYCFOEImanqY1voaET9mluMtlgNAp3PIz6C0xfUxfMUi0c7+8D8AtMURupl9XqIpbWe589ZOP0cVzB8Ux/Gmr4/vfE6pYhzH6aows8SwojvlcPK3jIgKrsY041OZrtfYcDLXoABduEEBlsENBrAKbhCAdXCDAJRuZf/bdkVmB9tBqLjOBZ4AEfu5OCh98OAAAAAASUVORK5CYII=);\r\n    background-position: center 3px\r\n}\r\n\r\n.Eleditor-textStyle .Eleditor-textStyle-item .Eleditor-textStyle-fontSize:before {\r\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAAoCAYAAABerrI1AAAD/0lEQVRoQ8VZ0VEbMRDVwvh+QyoIVJCkgpgKQipIqCD4w9LwBXwxkj+cVBBTQUgFIRUEKsBUEPxrA8rszelmvae7k+5k0A8zWNLuO63evl2B6DEmk8nQWntSbHEjpTzqsV2ypdBnJ631DAA+uz0eHx/3jo+P5332TLG2M6jpdLqzWq3+USestWdKqdMUjvXZozMorfURAEwL43dCiDfW2rlSaq+PQynW9gF1CwC71tobAPgmhPiBDllrPymlLlM413WPTqAKgvhdgBhlWTZbLpdzAHglhPglpTzo6lCKdZ1AUYIYDAavR6PRPf3fSxNGNChKENbaC6XUF/y67PRelDCiQVGC4PfHGIN0vjHCmEwmJ09PT/lH3Nramo3H4zNfuHYBlROEEOJOSol/y9EEuO9dMcYgmJyMyJhJKQ/53lGgaIgJIb5zBXF+fr67vb19WxhJRhgckLV2UZASmjqUUs4osChQIWRgjEE6/4hGUhCG54QOrbX3APCTAFkDFgyKKYg/UsqhL6SoE30VhjHmnRDir895H1h3YsGgmIKoHDm7W/glX/VRGAUgzIU7Lh8qpTDJl4MBuxdC7Espr2NAOQWxyLJsF3NT3eU3xqDxr4Uz0QrDA6hMHdym1voUAFylkAMLAsVyUK0BZ5CFTTRhGGPwhPLwprmw7iPSu47REQSKlRjv8YjbKFprfQ0Ab7sQhjHmSgjxIUZyER/vWkExgqjkpoYQLPNKLGGgzeVyOYwVxhhRDw8P7SfFEuqIX9Y6UExOPWtJ0npSWmunIKLzDov1aMJoC/G63xtBMQURfeG11gckSUav3wioFF/aidwuhJEcFLsTC6VUngRjB80jsYQRa8vNrw0/piAq4jXUIBW5fRRGqD2c1wSqJIiYDdvmPkcPwwuKEUSbn7G/b5wwvKAYQVwIIVI0KLGlho2Z6NQQ+9UqoHiT0jVWYjf2CM+ym7tpwqiAYgqiVbyGgqUit40wiMpvLHGobVeGWGsvfaBKggCA/fF4jOIyyaA5q4kw6Dxfuc6dYYXpYg0UI4hg8RqKmKWJWsJoqmo9gCrV8RooRhDJe3f8vjb1MOqqWhZyCKhSHZegYgyGnoxvHm3MtBGGr6p1tVxTdVyCYqFR21jpAwjXUpHbRhjFfPoGlpfrg8FgvlqtsBXn+hdrhEZBUQURzDpdQGqt88YMrg1RGKzydlU3hh6Oyt3MQbEeRGfxGgqQNmZCS3Yats4OPiNlWTbkTaAcFFcQrukf6mTsPNbJDVIYRYl/5foedYDQF/A8cwY1VmKBeBRG2ZhpIwwP44mm5g8wBXGjlHKx2tfvxvUsYSbtYSAoZBf3eoGvCGvN9k0hKyKEPqMehbTeQvz5D/g1DKSBanO4AAAAAElFTkSuQmCC);\r\n    background-size: 22px\r\n}\r\n\r\n.Eleditor-textStyle .Eleditor-textStyle-item .Eleditor-textStyle-lineHeight:before {\r\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAABl0lEQVRYR+2Xy03EMBCG7Y1yhhLoANIBJSyVQC5j5cRyipxcoAM6ACpAVEBKWDpIA8kgr3Ylk9ckmdhaieTqeXz+57cVS3HmnzxzPrECcic0SkGt9bau6yJJkj234dR8EjBN06sgCL6FEHsAiKY24MaTgFrrQkp5fWz0AgAP3KZT8gcBsyx7FkLc2wUR8U4p9T6lCSe2F9D4Tkr51lG8rKoq8uXHTkDLd5c9uy98+bETsOG7vgm1/Ki13kkpH+eOFBGflFI7O78F2OW7voZNP3oBzPP8dqwCiFgCQDE2fk4cec3MKbpkzgrIVXNRBY1/EfGTAfUFAH/OwP8CZCjXm7qogiugCwW4NRcd8XqKueNwkb/oiFdAFwpwa7ZGPPJv+tAXEWOllHlYHT4vp9i8RzabjXlqXhC7/wCArR3jBdA0HHjRnXh+wjC8ieO45I6Qyu89xcTbJHL9q38CH7xmuvzY9B2lAHd9ELDDjy3fcQGofPKitvzozXc2NAlogo9+fPXlu8mA1Bhcro9S0CUAVXsFpBSi1n8Brg2tKfeVeOYAAAAASUVORK5CYII=)\r\n}\r\n\r\n.Eleditor-textStyle .Eleditor-textStyle-item .Eleditor-textStyle-alignLeft:before {\r\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAABJElEQVRYR+2WQQ6CMBBFO4Gu9QZ6BLiBV/AG3kDZ0LBzR1IWxBOoJ9EjeASOgFsCHUOCiQvbRIYmkkzX/X9+XmcmBfHnB/48n+CA1BdigkyQSoCqn28P5nm+DoLgTCUgpdwmSVKP9bESHAJexhoPulpKufMSkBhsMvl8e3AyBESjeRPUWu8AYEWEYJUbYyql1NXlbyVYFMUGEW++wn34xmmaPmx1nE+stY4AYOkrJCLWrnB93Xn3oC9yv/gywV9ofbtrJdgPiBCin2LKkNRd18VZllVjg1oDlmW5bJrmMNb4rVNKHSke3IMUerwHqfScBPshadt2P0URl0cYhifXj9u5ZhDxDgALXyER8WmMiVxriKeYSp8JMkEqAaqee5AJUglQ9S80f0opswUQfwAAAABJRU5ErkJggg==);\r\n    background-size: 25px\r\n}\r\n\r\n.Eleditor-textStyle .Eleditor-textStyle-item .Eleditor-textStyle-alignCenter:before {\r\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAABGUlEQVRYR+2Xuw2DMBCGbU+QTZINwgbJBskIaThEl9amQNnAbJARYJPsgWQi2ijgx48liqO+x8d3Piyk2Pkjd84nGBCdEBtkg6gBNJ/PYHaDxpi3EOKCNvLkv4jo8S/GO2Kt9VUIccoJqJTqy7LskwBzgoXU9hoMKZIzhgFRu9EG56VRSh3BxsPSUvzWTQG0UsobCLj4WYEBQbDo9GiD0R3ABAYEBfr/Sdq2PYzjiG7tKicRDUsB3hEbY+Y78oyaWMufpqmrquqedBc3TVM454qcgM45W9f1JwkwJ1hIbe+IQ4rkjGFA1G60Qa31U0qJbnVHRDYEPhUQ3WqbDTDkrbeMiTa4ZfOQWgwYYmkthg2yQdQAmr/7M/gFx6c4KVrJFfgAAAAASUVORK5CYII=);\r\n    background-size: 25px\r\n}\r\n\r\n.Eleditor-textStyle .Eleditor-textStyle-item .Eleditor-textStyle-alignRight:before {\r\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAQAAAAm93DmAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfhCQ8REBuZ/AJaAAAAoklEQVRIx2NgGAWjYBgCRvzS/QK/1xMy4m9i5QMEj4mglR8ZGAnAUUBlgBGknfFMCqQY8P9h2QI8BnYZMJwn2U2OpQfwuLDLgFGAJBd+KLtAcTiNAhRAICe2KzCfZxDAq+QDgyNytLDgN7DyQedEQm5iezDQoTLcAFos9wv8ySfVCJaJhR+QeKiSPwSYChn5STHu/8ffGxkuDHS4jIJRMNQAAJ5SImJVnuoKAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTA5LTE1VDE3OjE2OjI3KzA4OjAwUsazsgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wOS0xNVQxNzoxNjoyNyswODowMCObCw4AAAAASUVORK5CYII=);\r\n    background-size: 25px\r\n}\r\n\r\n.Eleditor-textStyle .Eleditor-textStyle-item .Eleditor-textStyle-upImg:before {\r\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAARVBMVEUAAACKioqJiYmLi4uKioqLi4uIiIiKioqKioqJiYmJiYmJiYmKioqKioqPj4+KioqKioqLi4uKioqJiYmKioqJiYmKiopHpOm/AAAAFnRSTlMAwIB/XkAf79Dyn1DgMBBvkHA/r8SPuxOfgwAAANRJREFUOMvl0MtygzAMheEjI98wGELa8/6PWsxAsik2M22yyb/VN2NL+NRsV8muU92hoZxGoxLlAXEaDSDvhbbTS1BJzlegcO1foY3kdAXCpfHv5xkHSr4A1ZMMbajcMi04c8/WYc8jn2tQ+ExQct/39Avce35z9CT7BqTdXJEayKH7OoM+ee7NN50Ghgc8KTqUAl0dlrnTFQxSh3cAthilq8Ib3DKFZQFoG1AlRJEmNMfTjmMV+gP2sbF1j61ERTVll4E8+R6N0sAgjAbtrDEp40X9AEsWInSQgk2QAAAAAElFTkSuQmCC);\r\n    background-size: 22px\r\n}\r\n\r\n.Eleditor-textStyle .Eleditor-textStyle-item-upImg {\r\n    display: none;\r\n    position: relative\r\n}\r\n\r\n.Eleditor-textStyle .Eleditor-textStyle-item-upImg>:not(.webuploader-pick) {\r\n    transform: translate(-50%, -50%);\r\n    -webkit-transform: translate(-50%, -50%);\r\n    top: 50%!important;\r\n    left: 50%!important;\r\n    opacity: 0\r\n}\r\n\r\n.Eleditor-textStyle .Eleditor-textStyle-item-upImg>:not(.webuploader-pick) label {\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%\r\n}\r\n\r\n.Eleditor-textEditor-formats {\r\n    position: absolute;\r\n    right: -60px;\r\n    bottom: 20%;\r\n    border-radius: 50%;\r\n    -webkit-border-radius: 50%;\r\n    width: 100px;\r\n    height: 100px;\r\n    box-shadow: 0 0 5px rgba(0, 0, 0, .1);\r\n    background: #fff;\r\n    z-index: 1\r\n}\r\n\r\n.Eleditor-textEditor-formats div {\r\n    background-repeat: no-repeat;\r\n    width: 100%;\r\n    height: 32px;\r\n    background-position-x: 12px;\r\n    background-position-y: center;\r\n    position: absolute\r\n}\r\n\r\n.Eleditor-textEditor-formats .Eleditor-textEditor-format {\r\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAPFBMVEUAAACPj4+Li4uKioqKioqKioqKioqKioqHh4eJiYmJiYmJiYmKioqKioqJiYmKioqJiYmJiYmJiYmKiooOOgKOAAAAE3RSTlMAEEBggO/AoCDQ8N8w4LCQUHCP4ZsY5wAAAUlJREFUOMvFk92WgyAMhAUJ4U9E5/3fdStCaYtlvdmzuVGPH5kkE6Z/iD3d4xTmW5wgey8hI4zk2JQ3CTXgEkBKZGG/jMuS+kRXyFFZx9+MSqwDToLP5wLADIQtdNGbF/j5O2eVgza/ouzCJFaAxQsq+nwH9wjDINVQMp2uC7Ul3URnbB/9+sLVrm3p6t0esUO3YopoPETlW0Zpe1uFctjFA2z+GA0drqZ1dLXhuSOM5dtkTQRcOaVhK8bUozN0feFWAF+BW3M35NLJpSuzniWKFbTJnRBFyWy6W9N8gOM6hETcKbdPByXq4O3rpLwrOk3fp+OEf1/r1PsgLSL7trb+THi15Qog+bTEZrxLWAfpMznTCQh6rfCzKal8dT7i+6VhoNWJOLqveQ2PCJ1w1xSlXCDSNI5gEY2wZaLjpA4EPd0Is+q8I38XPwbTDcl2Nko+AAAAAElFTkSuQmCC);\r\n    background-size: 20px;\r\n    border-bottom: 1px solid #F5F5F5;\r\n    top: 15px\r\n}\r\n\r\n.Eleditor-textEditor-formats .Eleditor-textEditor-clean {\r\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAABkUlEQVRYR+3XvU3DQBQA4PdsUUBSMAIjpKLOCIwQK9QEb8AGRrgE5EyAYIKkoWcERqAIpME+ZISlyPL53p+lCMX13b3P7/z87hD2/ME998EBqN0hbwa3RXZ2nKTv2gCU+X2xOoHb+3xaonuGuJyOk/SNEkQ6ZlNkE6iiFQCm4/nVsr2ON4Obx7sZOLgdEtng0MHL6HIx63rJ3iIZEknB1eBgFQ+BpOJIwHqQJZKDIwOtkFwcC6hFSnBsoBQpxYmAXKQGJwZSkVqcChhCWuDUQB/SCmcCbCN/21UVrfraF6dvBzsJdbH6Z+6cyxGcQ8AnX2+lrteMswMW2QTL6BUAjlxcnVudgkyAu9+cQ1xbnoLUwK6CsOzdKmBftVohxUDKr8QCKQJScE0VapFsIAdngWQBJTgtkgzU4DRIEtACJ0UGgZY4CbL/2vl3qbZq/Lt9mFrd/ov7gDhOJjuBQ2yr7xQTymQn0BXZ6VcVXY/mixvu8Ugy/vMhvziJv9eYpB/t+cEikQS0nHMAarN5yOC/z+APDA6MODgVGhsAAAAASUVORK5CYII=);\r\n    background-size: 20px;\r\n    bottom: 15px\r\n}\r\n\r\n.Eleditor-inputarea {\r\n    position: absolute;\r\n    top: 45px;\r\n    bottom: 40px;\r\n    width: 100%\r\n}\r\n\r\n.Eleditor-textEditor[type=link] .Eleditor-inputarea {\r\n    bottom: 95px\r\n}\r\n\r\n.Eleditor-inputarea .textarea {\r\n    -webkit-user-select: auto;\r\n    overflow-y: auto;\r\n    overflow-x: hidden;\r\n    height: 100%;\r\n    width: 100%;\r\n    padding: 10px;\r\n    box-sizing: border-box;\r\n    font-size: 14px;\r\n    color: #555;\r\n    border: none;\r\n    word-wrap: break-word;\r\n    word-break: normal\r\n}\r\n\r\n.Eleditor-inputarea input {\r\n    display: none\r\n}\r\n\r\n.Eleditor-inputarea .textarea img {\r\n    width: 100%;\r\n    height: auto;\r\n    box-sizing: border-box\r\n}\r\n\r\n.Eleditor-textEditor[type=link] .Eleditor-inputarea input {\r\n    height: 33px;\r\n    display: block;\r\n    border: none;\r\n    border-bottom: 1px solid #ddd;\r\n    width: 100%;\r\n    margin: 10px;\r\n    color: #333;\r\n    outline: none\r\n}\r\n\r\n.Eleditor-method {\r\n    border-top: 1px solid #eee;\r\n    position: absolute;\r\n    bottom: 0;\r\n    width: 100%;\r\n    box-shadow: 0 0 10px rgba(0, 0, 0, .1);\r\n    -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, .1)\r\n}\r\n\r\n.Eleditor-method:after {\r\n    content: '';\r\n    clear: both;\r\n    display: block;\r\n    height: 0\r\n}\r\n\r\n.Eleditor-method button {\r\n    width: 50%;\r\n    border: none;\r\n    padding: 0;\r\n    margin: 0;\r\n    box-sizing: border-box;\r\n    float: left;\r\n    background: #fff;\r\n    height: 40px;\r\n    color: #333\r\n}\r\n\r\n.Eleditor-method .Eleditor-commit {\r\n    border-right: 1px solid #ddd\r\n}\r\n\r\n.Eleditor-placeholder {\r\n    color: #999\r\n}", undefined);

return mobeditor$1;

})));
