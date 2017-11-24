export let selectors = Object.create(null);
export function initele(editor, _$wrap) {
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