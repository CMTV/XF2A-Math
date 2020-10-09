<?php

namespace CMTV\Math;

class MathDelimiter
{
    public $isBlock;
    public $left, $right;

    public function __construct($isBlock, $left, $right = null)
    {
        $this->isBlock = $isBlock;
        $this->left = $left;
        $this->right = ($right === null) ? $left : $right;
    }

    public function getRegex()
    {
        $regexContent = '';

        if ($this->isBlock)
        {
            $regexContent = preg_quote($this->left) . '([\s\S]*?)' . preg_quote($this->right);
        }
        else
        {
            $regexContent = preg_quote($this->left) . '(.*?)' . preg_quote($this->right);
        }

        return '/' . $regexContent . '/m';
    }
}