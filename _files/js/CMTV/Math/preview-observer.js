var CMTV_Math = window.CMTV_Math || {};

(function ($, document)
{
    "use strict";

    CMTV_Math.PreviewObserver = new MutationObserver(function ()
    {
        renderMath();
    });

    $(document).on('xf:reinit', function (e, $element)
    {
        if ($element === document)
        {
            return;
        }

        renderMath();
        registerObservers($element);
    });

    $(function ()
    {
        registerObservers($(document));
    });

    function registerObservers($element)
    {
        $element.find('.js-previewContainer').each(function ()
        {
            CMTV_Math.PreviewObserver.observe($(this).parent().get(0), { childList: true });
        });
    }

    function renderMath()
    {
        CMTV_Math.SResolver.resolve();
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    }
})
(jQuery, document);