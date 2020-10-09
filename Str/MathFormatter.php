<?php

namespace CMTV\Math\Str;

use CMTV\Math\MathDelimiter;

class MathFormatter
{
    protected $placeholders = [];

    /**
     * @param $string
     * @param $delimiters MathDelimiter[]
     * @return string
     */
    public function formatMath($string, array $delimiters)
    {
        // TODO: this regex needs to respect tags that disable parsing or tags that disable autolink
        $string = $this->setupPlaceholders($string,
            '#\[(code|php|html|plain|media|url|img|user|quote|attach)([= ][^\]]*)?](.*)\[/\\1]#siU'
        );

        // Locating 'display' delimiters at the top to prevent errors when rendering
        // math with the similar 'display' and 'inline' delimiters
        usort(
            $delimiters,
            function ($a, $b)
            {
                return ($a->isBlock) ? -1 : 1;
            }
        );

        foreach ($delimiters as $delimiter)
        {
            $string = preg_replace_callback(
                $delimiter->getRegex(),
                function ($matches) use ($delimiter)
                {
                    if ($matches[1] !== "")
                        return $this->wrapMath($matches[1], $delimiter->isBlock);
                    else return $matches[0];
                },
                $string
            );
        }

        $string = $this->restorePlaceholders($string);

        return $string;
    }

    public function wrapMath($toWrap, $isBlock)
    {
        if ($isBlock)
            return '[math]' . trim($toWrap) . '[/math]';
        else
            return '[imath]' . trim($toWrap) . '[/imath]';
    }

    //
    // Proudly copied from \XF\Str\MentionFormatter
    //

    protected function setupPlaceholders($message, $regex)
    {
        $this->placeholders = [];

        return preg_replace_callback($regex, function($match)
        {
            $replace = "\x1A" . count($this->placeholders) . "\x1A";
            $this->placeholders[$replace] = $match[0];

            return $replace;
        }, $message);
    }

    protected function restorePlaceholders($message)
    {
        if ($this->placeholders)
        {
            $message = strtr($message, $this->placeholders);
            $this->placeholders = [];
        }

        return $message;
    }
}