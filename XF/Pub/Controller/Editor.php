<?php
/**
 * Question Threads
 *
 * You CAN use/change/share this code.
 * Enjoy!
 *
 * Written by CMTV
 * Date: 16.04.2018
 * Time: 17:06
 */

namespace Math\XF\Pub\Controller;

class Editor extends XFCP_Editor
{
    protected function loadDialog($dialog)
    {
        parent::loadDialog($dialog);

        $view = 'XF:Editor\Dialog';
        $template = null;

        if ($dialog == 'math')
        {
            $template = 'editor_dialog_Math_insert';
        }

        $data = [
            'dialog' => $dialog,
            'view' => $view,
            'template' => $template,
            'params' => []
        ];

        $this->app->fire('editor_dialog', [&$data, $this], $dialog);

        return $data;
    }
}