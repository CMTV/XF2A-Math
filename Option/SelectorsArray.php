<?php
/**
 * Question Threads
 *
 * You CAN use/change/share this code.
 * Enjoy!
 *
 * Written by CMTV
 * Date: 21.04.2018
 * Time: 12:32
 */

namespace Math\Option;

use XF\Option\AbstractOption;

class SelectorsArray extends AbstractOption
{
    public static function renderOption(\XF\Entity\Option $option, array $htmlParams)
    {
        $selectors = [];
        foreach ($option->option_value AS $selector)
        {
            $selectors[] = $selector;
        }

        return self::getTemplate('admin:option_template_Math_selectorsArray', $option, $htmlParams, [
            'selectors' => $selectors,
            'nextCounter' => count($selectors)
        ]);
    }

    public static function verifyOption(array &$value)
    {
        $output = [];

        foreach ($value AS $selector)
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