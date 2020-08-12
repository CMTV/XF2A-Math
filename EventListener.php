<?php
/**
 * Math xF2 addon by CMTV
 * Enjoy!
 */

namespace CMTV\Math;

use XF\Data\Editor;
use XF\Mvc\Controller;

class EventListener
{
    public static function editorButtonData(array &$buttons, Editor $editorData)
    {
        $buttons['CMTV_Math'] = [
            'fa' => 'fa-function',
            'title' => \XF::phrase('CMTV_Math_insert_math')
        ];
    }

    public static function editorDialog(array &$data, Controller $controller)
    {
        $data['template'] = 'CMTV_Math_insert_math_dialog';
    }
}