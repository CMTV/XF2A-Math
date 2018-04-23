(function($)
{
    var oldSetupHtmlInsert = XF.setupHtmlInsert;
    XF.setupHtmlInsert = extendedSetupHtmlInsert;

    function extendedSetupHtmlInsert(container, onReady, retainScripts)
    {
        container.content += '<script>MathJax.Hub.Queue(["Typeset",MathJax.Hub,markMathJaxElements()]);</script>';
        oldSetupHtmlInsert.call(XF, container, onReady, retainScripts);
    }
})(jQuery);