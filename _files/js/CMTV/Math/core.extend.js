(function ($, document)
{
    $(document).on('xf:reinit', function (e, $element)
    {
        if ($element === document)
        {
            return;
        }

        CMTV_Math.SResolver.resolve();
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    });

    $(function ()
    {
        var observer = new MutationObserver(function (mutationsList) {
            CMTV_Math.SResolver.resolve();
            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        });

        $('.js-previewContainer').each(function ()
        {
            observer.observe($(this).parent().get(0), { childList:true });
        });
    });
})
(jQuery, document);