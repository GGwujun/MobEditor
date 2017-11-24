import config from '../config'
import { _formatInnerText, _getLayerMaxZIndex, _genEditorUid, _inArray, _scriptPath } from '../Util/lang'
import { _controllerUploader, initUpload } from '../Upload/'
import { initEvent } from '../Event/'
import { initTool } from '../Toolbars/'
import { selectors, initele } from '../Selector/'
import { Text } from '../Text/'

/**
 * 编辑器构造函数
 */
export default class mobeditor {
    constructor(params) {
        this.init(params)
    }

    init(params) {
        console.log('|--Eleditor Initing');
        //插入base.css
        _scriptPath();

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

        initele(_$editorWrap, _$wrap)
        console.log('|--Eleditor Mounted To', _$wrap);


        initEvent(_arg);

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


        initTool(this);

        //初始化图片上传
        initUpload(this);

        this.Text = new Text(this)
    }

    append() {
        selectors._$wrap.find('.Eleditor-placeholder').remove();
        return selectors._$wrap.append(arguments[0]);
    }
    getEditNode() {
        if (_$selected === null) {
            console.warn('未选中状态getEditNode返回null');
        }
        return _$selected;
    }
    getContent() {
        return selectors._$wrap.html();
    }
    getContentText() {
        return _formatInnerText(selectors._$wrap.text());
    }
    destory() {
        selectors._$wrap.removeAttr('Eleditor-Inited Eleditor-Uid');
        selectors._$wrap.removeClass('Eleditor-area');
        selectors._$wrap.find('.Eleditor-placeholder').remove()
        selectors._$wrap.off().find('.Eleditor-active').removeClass('Eleditor-active');
        selectors._$editorWrap.find('*').off();
        selectors._$editorWrap.remove();
        console.log('|--Eleditor ' + this._editorUid + ' destoryed');
    }
}


/**
 * 设置placehoder
 * @param {*selector} _wrap 
 * @param {*string} _empty 
 */
export var _correctHtmlStructure = function (_wrap, _empty) {
    if (_formatInnerText(_wrap.text()) == '' && _wrap.find('img').length === 0)
        _wrap.append(_empty);
    if (_wrap.find('*').length === 0)
        _wrap.html(`<p class="Eleditor-placeholder">${_wrap.html()}</p>`);
};

/**
 * 生成编辑框
 * @param {*array} _toolbars  配置菜单
 * @param {*string} _uid  编辑器的标记
 */
export function _buildEditorModule(_toolbars, _uid) {
    var _html = `
                <div class="Eleditor-wrap" style="z-index:${_getLayerMaxZIndex()}" id="${_uid}">
                    <div class="Eleditor-controller">
                <ul>
                `;

    for (var i = 0; i < _toolbars.length; i++) {
        var _it = _toolbars[i],
            _id = typeof _it === 'object' ? _it.id : _it,
            _tag = (typeof _it === 'object' && _it.tag) ? _it.tag.toLocaleLowerCase() : null,
            _name = typeof _it === 'object' ? _it.name : config._toolnames[_it];
        _html += `<li event="${_id}" ${_tag ? `bind-tags="${_tag}"` : ''}class="Eleditor-${_id}">${_name}</li>`;
    }
    _html += `		
            </ul></div>
                <div class="Eleditor-loading"><p></p></div>
                <div class="Eleditor-textEditor">
                    <div class="Eleditor-textStyle">
                        <div class="Eleditor-textStyle-item"><div class="Eleditor-textStyle-bold"></div></div>
                        <div class="Eleditor-textStyle-item"><div class="Eleditor-textStyle-color"><span></span></div></div>
                        <div class="Eleditor-textStyle-item"><div class="Eleditor-textStyle-linedecoration"></div></div>
                        <div class="Eleditor-textStyle-item"><div class="Eleditor-textStyle-bgColor"></div></div>
                        <div class="Eleditor-textStyle-item"><div class="Eleditor-textStyle-fontSize"></div></div>
                        <div class="Eleditor-textStyle-item"><div class="Eleditor-textStyle-lineHeight"></div></div>
                        <div class="Eleditor-textStyle-item">
                            <div class="Eleditor-textStyle-align Eleditor-textStyle-alignLeft" align="left"></div>
                        </div>
                        <div class="Eleditor-textStyle-item">
                            <div class="Eleditor-textStyle-align Eleditor-textStyle-alignCenter" align="center">
                            </div>
                        </div>
                        <div class="Eleditor-textStyle-item">
                            <div class="Eleditor-textStyle-align Eleditor-textStyle-alignRight" align="right">
                            </div>
                        </div>
                        <div class="Eleditor-textStyle-item Eleditor-textStyle-item-upImg">
                            <div class="Eleditor-textStyle-upImg"></div>
                        </div>
                    </div>
                    <div class="Eleditor-textEditor-colors">
                        <div class="Eleditor-textEditor-modulePane"><span></span></div>
                        <ul>
                            <li><span style="background-color:#232323;"></span></li>
                            <li><span style="background-color:#2196F3;"></span></li>
                            <li><span style="background-color:#795548;"></span></li>
                            <li><span style="background-color:#00BCD4;"></span></li>
                            <li><span style="background-color:#4CAF50;"></span></li>
                            <li><span style="background-color:#E666E5;"></span></li>
                            <li><span style="background-color:#FF9800;"></span></li>
                            <li><span style="background-color:#FF5722;"></span></li>
                            <li><span style="background-color:#ff2a1a;"></span></li>
                            <li><span style="background-color:#FFEB3B;"></span></li>
                            <li><span style="background-color:#ffffff;border: 1px solid #ccc;"></span></li>
                            <li>
                                <span class="Eleditor-inheritValue" style="background-color:transparent; border: 1px solid #dedede;">
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div class="Eleditor-textEditor-fontsizes">
                        <div class="Eleditor-textEditor-modulePane"><span>字体大小</span></div>
                        <ul>
                            <li class="Eleditor-inheritValue">默认</li>
                            <li>14px</li>
                            <li>16px</li>
                            <li>20px</li>
                            <li>28px</li>
                            <li>35px</li>
                        </ul>
                    </div>
                    <div class="Eleditor-textEditor-lineheight">
                        <div class="Eleditor-textEditor-modulePane"><span>行高</span></div>
                        <ul>
                            <li class="Eleditor-inheritValue">默认</li>
                            <li>20px</li>
                            <li>25px</li>
                            <li>30px</li>
                            <li>35px</li>
                            <li>40px</li>
                        </ul>
                    </div>
                    <div class="Eleditor-textEditor-linedecorations">
                        <div class="Eleditor-textEditor-modulePane"><span>文本修饰</span></div>
                        <ul>
                            <li class="Eleditor-inheritValue">无</li>
                            <li style="text-decoration: overline">上划线修饰</li>
                            <li style="text-decoration: line-through">删除线修饰</li>
                            <li style="text-decoration: underline">下划线修饰</li>
                        </ul>
                    </div>
                    <div class="Eleditor-textEditor-formats">
                        <div class="Eleditor-textEditor-format"></div>
                        <div class="Eleditor-textEditor-clean"></div>
                    </div>
                    <div class="Eleditor-inputarea">
                        <input placeholder="请输入超链接" type="text" />
                        <div class="textarea" contenteditable="true"></div>
                    </div>
                    <div class="Eleditor-method">
                        <button class="Eleditor-commit">提交</button>
                        <button class="Eleditor-cancel">取消</button>
                    </div>
                </div>
            </div>
            `;
    return _html;
}

/**
     * 激活当前编辑的段落
     * @param {*selector} _$e 
     */
export function _showEditorControllerLayer(_$e) {
    selectors._$selected = _$e;
    var self = this;
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
        selectors._$scrollWrap.stop().animate({ scrollTop: (_calTop - 150) + 'px' }, 500);
    } else {
        selectors._$scrollWrap.scrollTop((_calTop - 150) + 'px');
    }

    _controllerUploader && _controllerUploader.refresh();
}

/**
     * 隐藏编辑器
     */
export function _hideEditorControllerLayer() {
    selectors._$wrap.find('.Eleditor-active').removeClass('Eleditor-active');
    selectors._$editorController.removeClass('in').addClass('out');
}


/**
 * 显示修改文字编辑框
 */
export function _showEditorWrapMask() {
    if (_inArray('insertImage', config.toolbars)) {
        selectors._$editorBarUploadImageBtn.show();
    }
    selectors._$editorController.removeClass('in').addClass('out');
    selectors._$editorWrap.addClass('Eleditor-mask');
    selectors._lastScrollH = selectors._$window.scrollTop();
    selectors._$scrollWrap.addClass('Eleditor-scrollLocked');
};

/**
 * 隐藏修改文字编辑框
 */
export function _hideEditorWrapMask() {
    selectors._$editorWrap.removeClass('Eleditor-mask out');
    selectors._$scrollWrap.removeClass('Eleditor-scrollLocked');
    selectors._$window.scrollTop(selectors._lastScrollH);
}


export function _showLoadingMask() {
    selectors._showEditorWrapMask();
    selectors._$editorLoadingMask.show();
    selectors._$editorLoadingMask.html('<p>' + arguments[0] + '</p>')
}

export function _hideLoadingMask() {
    _hideEditorWrapMask();
    selectors._$editorLoadingMask.hide();
}


export function _appendHistory(editor, editObj) {
    editor._historys.push(editObj);
    _flushHistoryBtn(editor);
}
export function _handleHistory(editor) {
    if (editor._historys.length === 0) return;
    var _handle = editor._historys.pop();

    if (_handle.m == 'insertNode')
        _handle.node.remove();

    if (_handle.m == 'editNode')
        _handle.node.attr('style', _handle.unode.attr('style') || '').html(_handle.unode);

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
    _flushHistoryBtn();

}


export function _flushHistoryBtn(editor) {
    if (editor._historys.length == 0)
        selectors._$editorUndoBtn.hide();
    else
        selectors._$editorUndoBtn.show();
}

/**
 * 设置编辑器的位置
 */
export function _flushEditorControllerLayerPosi() {
    if (selectors._$selected) {
        selectors._$editorController.css({
            top: _$selected.offset().top + _$selected.outerHeight(),
            width: _$wrap.width() - 5
        });
    }
};


