<?php

namespace CMTV\Math\BbCode\ProcessorAction;

use XF\BbCode\Processor;
use XF\BbCode\ProcessorAction\FiltererHooks;
use XF\BbCode\ProcessorAction\FiltererInterface;
use CMTV\Math\MathDelimiter;
use CMTV\Math\Str\MathFormatter;

class MathDelimiters implements FiltererInterface
{
    public function addFiltererHooks(FiltererHooks $hooks)
    {
        $hooks->addFinalHook('filterInput');
    }

    public function filterInput($string, Processor $processor)
    {
        $rawDelimiters = json_decode(\XF::options()->CMTV_Math_customMathDelimiters);

        if (!empty($rawDelimiters))
        {
            $delimiters = $this->parseRawDelimiters($rawDelimiters);
            $formatter = new MathFormatter();

            $string = $formatter->formatMath($string, $delimiters);
        }

        return $string;
    }

    public function parseRawDelimiters($rawDelimiters)
    {
        $delimiters = [];

        foreach ($rawDelimiters as $rawDelimiter)
        {
            array_push($delimiters, new MathDelimiter(
                !!$rawDelimiter->display,
                $rawDelimiter->left,
                $rawDelimiter->right
            ));
        }

        return $delimiters;
    }
}