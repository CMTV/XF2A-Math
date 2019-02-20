<?php
/**
 * Math xF2 addon by CMTV
 * Enjoy!
 */

namespace CMTV\Math;

use XF\Data\Editor;
use XF\Mvc\Controller;
use XF\Repository\Language;

class EventsListener
{
    public static function editorButtonData(array &$buttons, Editor $editorData)
    {
        $buttons['CMTV_Math'] = [
            'fa' => 'fa-function',
            'title' => \XF::phrase('CMTV_Math_math')
        ];
    }

    public static function editorDialog(array &$data, Controller $controller)
    {
        $data['params']['test_param'] = 'test_param_value';
        $data['template'] = 'CMTV_Math_editor_dialog_math';
    }
}