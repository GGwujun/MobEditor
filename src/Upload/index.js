import config from '../config'
import { _inArray } from '../Util/lang'
import { Text } from '../Text/'
import { selectors } from '../Selector/'
import { _showEditorWrapMask, _hideEditorWrapMask, _appendHistory, _hideEditorControllerLayer, _correctHtmlStructure } from '../Editor/'
//封装Uploader函数


export var _controllerUploader = null;
export var _stylebarUploader = null;
export function initUpload($this) {
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
            if (arguments[0] == "F_EXCEED_SIZE") alert("文件大小不能超过" + (arguments[1] / 1048576) + "M");
        });
        _controllerUploader.on('uploadComplete', function () { $this._hideLoadingMask(); });
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
            if (arguments[0] == "F_EXCEED_SIZE") alert("文件大小不能超过" + (arguments[1] / 1048576) + "M");
        });
        _stylebarUploader.on('uploadComplete', function () { $this._hideLoadingMask(); });
        _stylebarUploader.on('uploadSuccess', function (_file, _call) {
            if (_call.status == 1) {
                selectors._$editorTextArea.append('<img src="' + _call.url + '">');
            } else {
                alert(_call.msg);
            }
        });
    }
}
