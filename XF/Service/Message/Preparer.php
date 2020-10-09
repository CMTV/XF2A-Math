<?php

namespace CMTV\Math\XF\Service\Message;

use CMTV\Math\BbCode\ProcessorAction\MathDelimiters;

class Preparer extends XFCP_Preparer
{
    protected function getBbCodeProcessor()
    {
        $processor = parent::getBbCodeProcessor();
        $processor->addProcessorAction('CMTV_Math', new MathDelimiters());

        return $processor;
    }
}