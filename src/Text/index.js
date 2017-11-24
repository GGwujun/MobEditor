import { _formatInnerText, _getLayerMaxZIndex, _genEditorUid, _inArray, _scriptPath } from '../Util/lang'
import { selectors } from '../Selector/'
import { _showEditorWrapMask, _hideEditorWrapMask, _appendHistory, _hideEditorControllerLayer, _correctHtmlStructure } from '../Editor/'
export class Text {
    constructor($this) {
        this.bindevent($this);
    }

    _syncRenderTextEditorView($this) {
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

    bindevent($this) {
        let self = this;
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
}
