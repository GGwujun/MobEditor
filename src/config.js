/**
 * config  配置信息
 */

const config = {
    // 是否开启 debug 模式（debug 模式下错误会 throw error 形式抛出）
    _debug: false,
    _version: '1.6',
    _notctname: ['INPUT', 'IMG', 'TEXTAREA'],
    placeHolder: '<p class="Eleditor-placeholder">点击此处编辑内容</p>',
    toolbars: [
        'insertText',
        'editText',
        'insertImage',
        'insertLink',
        'deleteBefore',
        'deleteAfter',
        'insertHr',
        'deleteThis',
        'undo',
        'cancel',
    ],
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
        cancel: '取消',
    },
    
}

export default config