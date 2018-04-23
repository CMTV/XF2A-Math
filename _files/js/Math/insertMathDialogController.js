(function($) {
    "use strict";

    XF.InsertMathDialogController = XF.Element.newHandler({
        options: {
            switcher: '.math-type',
            input: '[name=math-input]',
            outputWrapper: '.math-output-wrapper',
            preview: '.math-preview',
            typeTimeoutTime: 450
        },

        typeTimeout: null,

        $switcher: null,
        $input: null,
        $outputWrapper: null,
        $preview: null,

        init: function()
        {
            this.$switcher = this.$target.find(this.options.switcher);
            this.$input = this.$target.find(this.options.input);
            this.$outputWrapper = this.$target.find(this.options.outputWrapper);
            this.$preview = this.$target.find(this.options.preview);

            this.$switcher.on('change', XF.proxy(this, 'preview'));
            this.$input.on('input', XF.proxy(this, 'mathInputChange'));

            this.$preview.hide();
            this.$target.find('.math-incorrect-message').hide();
        },

        mathType: function()
        {
            return this.$switcher.find(':checked').val();
        },

        mathInputChange: function()
        {
            clearTimeout(this.typeTimeout);
            this.typeTimeout = setTimeout(this.preview.bind(this), this.options.typeTimeoutTime);
        },

        preview: function()
        {
            var input = this.$input.val().trim();

            this.preRender().done(function()
            {
                if(input)
                {
                    this.$target.find('.math-message').hide();
                    this.$preview.show();
                    this.render();
                    return;
                }
                else
                {
                    this.$preview.hide();
                    this.$target.find('.math-incorrect-message').hide();
                    this.$target.find('.math-init-message').show();
                }

                this.postRender();
            });
        },

        preRender: function()
        {
            var deferred = $.Deferred();

            this.$target.find('.math-preview-loading').addClass('showing');

            this.$outputWrapper.animate({
                opacity: 0
            }, 100, deferred.resolve.bind(this));

            return deferred.promise();
        },

        postRender: function()
        {
            this.$target.find('.math-preview-loading').removeClass('showing');

            this.$outputWrapper.animate({
                opacity: 1
            }, 100);
        },

        render: function()
        {
            var start = '\\[ ',
                end = ' \\]';

            if(this.mathType() === 'inline')
            {
                start = '\\( ';
                end = ' \\)';
            }

            var toRender = start + this.$input.val().trim() + end;

            this.$preview.html(toRender);

            MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.$preview.get(0)], this.postMathJax.bind(this, toRender));
        },

        postMathJax: function(toRender)
        {
            if(toRender === this.$preview.html())
            {
                this.$preview.hide();
                this.$target.find('.math-incorrect-message').show();
            }

            this.postRender();
        }
    });

    XF.Element.register('insert-math-dialog-controller', 'XF.InsertMathDialogController');

})(jQuery);