import config from '../config'
import { _editorModuleEvents } from '../event/'
import { selectors } from '../Selector/'
export function initTool($editor) {
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

