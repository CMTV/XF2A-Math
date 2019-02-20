<?php
/**
 * Math xF2 addon by CMTV
 * Enjoy!
 */

namespace CMTV\Math\Option;

use XF\Option\AbstractOption;

class SelectorsArray extends AbstractOption
{
    public static function renderOption(\XF\Entity\Option $option, array $htmlParams)
    {
        $selectors = [];

        foreach ($option->option_value as $selector)
        {
            $selectors[] = $selector;
        }

        return self::getTemplate('admin:option_template_CMTV_Math_selectorsArray', $option, $htmlParams, [
            'selectors' => $selectors,
            'nextCounter' => count($selectors)
        ]);
    }

    public static function verifyOption(array &$value)
    {
        $output = [];

        foreach ($value as $selector)
        {
            if (empty($selector))
            {
                continue;
            }

            $output[] = $selector;
        }

        $value = $output;

        return true;
    }
}