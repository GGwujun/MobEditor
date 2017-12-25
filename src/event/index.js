import { _formatInnerText, _getLayerMaxZIndex, _genEditorUid, _inArray, _scriptPath } from '../Util/lang'
import config from '../config'
import { Text } from '../Text/'
import { selectors } from '../Selector/'
import { _showEditorWrapMask, _handleHistory, _appendHistory, _hideEditorControllerLayer, _correctHtmlStructure } from '../Editor/'



//事件处理对象
export var _editorModuleEvents = {
    insertText: function ($this) {
        _showEditorWrapMask();
        selectors._$editorTextModule.attr({ 'role': 'insert', 'type': 'word' }).show();
    },
    insertLink: function ($this) {
        _showEditorWrapMask();
        selectors._$editorTextModule.attr({ 'role': 'insert', 'type': 'link' }).show();
    },
    insertImage: function ($this) {
        if (typeof WebUploader === 'undefined') {
            alert('图片上传请手动引入插件根目录webuploader.min.js');
        }
    },
    insertHr: function ($this) {
        var _$hr = $('<div class="horizontal-line" style="padding: 10px 0;border-bottom: 1px solid #aaa;margin-bottom: 20px;"></div>');
        selectors._$selected.after(_$hr);
        _appendHistory($this, { m: 'insertNode', node: _$hr });
        _hideEditorControllerLayer();
    },
    editText: function ($this) {
        if (_inArray(selectors._$selected[0].tagName, config._notctname)) {
            return this.insertText($this);
        }
        _showEditorWrapMask();
        $this.Text._syncRenderTextEditorView($this);
    },
    deleteThis: function ($this) {
        _appendHistory($this, { m: 'deleteNode', node: selectors._$selected, pnode: selectors._$selected.prev() });
        selectors._$selected.remove();
        _hideEditorControllerLayer();
        _correctHtmlStructure(selectors._$wrap, config.placeHolder);
    },
    deleteBefore: function ($this) {
        var _$prev = selectors._$selected.prev();
        _appendHistory($this, { m: 'deleteBeforeNode', node: selectors._$selected, bnode: selectors._$selected.prevAll() });
        var _$prev_prev;
        while (_$prev.length > 0) {
            _$prev_prev = _$prev.prev();
            _$prev.remove();
            _$prev = _$prev_prev
        }
        var _$parent = selectors._$selected.parent();
        while (_$parent.length > 0 && !_$parent.hasClass("Eleditor-area")) {
            _$prev = _$parent.prev();
            while (_$prev.length > 0) {
                _$prev_prev = _$prev.prev();
                _$prev.remove();
                _$prev = _$prev_prev
            }
            _$parent = _$parent.parent()
        }
        _hideEditorControllerLayer();
        _correctHtmlStructure(selectors._$wrap, config.placeHolder);
    },
    deleteAfter: function ($this) {
        var _$next = selectors._$selected.next();
        _appendHistory($this, { m: 'deleteAfterNode', node: selectors._$selected, anode: selectors._$selected.nextAll() });
        var _$next_next;
        while (_$next.length > 0) {
            _$next_next = _$next.next();
            _$next.remove();
            _$next = _$next_next
        }
        var _$parent = selectors._$selected.parent();
        while (_$parent.length > 0 && !_$parent.hasClass("Eleditor-area")) {
            _$next = _$parent.next();
            while (_$next.length > 0) {
                _$next_next = _$next.next();
                _$next.remove();
                _$next = _$next_next
            }
            _$parent = _$parent.parent()
        }
        _hideEditorControllerLayer();
        _correctHtmlStructure(selectors._$wrap, config.placeHolder);
    },
    undo: function ($this) {
        _handleHistory($this);
        _hideEditorControllerLayer();
    },
    cancel: function ($this) {
        _hideEditorControllerLayer();
    }
};

export function initEvent() {
    for (var i = 0; i < config.toolbars.length; i++) {
        if (typeof config.toolbars[i] === 'object') {
            _editorModuleEvents[config.toolbars[i].id] = config.toolbars[i].handle;
        }
    };
}