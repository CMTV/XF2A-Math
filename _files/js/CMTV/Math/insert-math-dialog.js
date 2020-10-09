var CMTV_Math = window.CMTV_Math || {};

!function ($, window, document)
{
    "use strict";

    CMTV_Math.InsertMathForm = XF.Element.newHandler({
        $type: null,
        $latexInput: null,
        $loading: null,
        $previewContainer: null,
        $preview: null,
        $previewError: null,
        $previewEmpty: null,

        state: 'empty', // States: "empty", "error", "preview"
        resetMode: false,

        _typeTimeout: null,
        _fadeOutTimeout: null,

        typeVal: function ()
        {
            return this.$target.find('[name="math_type"]:checked').val();
        },

        init: function ()
        {
            this.$type =                this.$target.find('[name="math_type"]');
            this.$latexInput =          this.$target.find('[name="latex_input"]');
            this.$loading =             this.$target.find('.preview-loading');
            this.$previewContainer =    this.$target.find('.preview-container');
            this.$preview =             this.$target.find('.preview');
            this.$previewError =        this.$target.find('.error');
            this.$previewEmpty =        this.$target.find('.empty');

            this.$type.on('change', XF.proxy(this, 'onTypeChange'));
            this.$latexInput.on('input', XF.proxy(this, 'onLatexInput'));

            this.$target.on('form:reset', XF.proxy(this, 'reset'));

            this.setState('empty');
        },

        onTypeChange: function ()
        {
            if (!this.resetMode)
            {
                this.updatePreview();
            }

        },

        onLatexInput: function ()
        {
            clearTimeout(this._typeTimeout);

            if (!this.resetMode)
            {
                this._typeTimeout = setTimeout(XF.proxy(this, 'updatePreview'), 450);
            }
        },

        updatePreview: function ()
        {
            this.fadeOut();

            clearTimeout(this._fadeOutTimeout);
            this._typeTimeout = setTimeout(XF.proxy(this, 'changePreview'), 200);
        },

        changePreview: function ()
        {
            var linput = this.$latexInput.val().trim(),
                that = this;

            if (!linput.length)
            {
                this.setState('empty');
                this.fadeIn();
                return;
            }

            var toRender = this.wrapMath(linput);

            this.$preview.html(toRender);

            this.setState('preview');

            renderMathInElement(this.$preview.get(0), Object.assign(CMTV_MATH_RENDER_OPTIONS, { errorCallback: () => this.setState('error') }));
            this.fadeIn();
        },

        wrapMath: function (math)
        {
            let delimiters = this.getMathDelimiters(this.typeVal() !== 'inline');
            return delimiters.left + math + delimiters.right;
        },

        getMathDelimiters: function(isDisplay = true)
        {
            let left = '\\[', right = '\\]';

            if (isDisplay === false)
            {
                left = '\\('; right = '\\)';
            }

            for (let i = 0; i < CMTV_MATH_RENDER_OPTIONS.delimiters.length; i++)
            {
                let delimiterObj = CMTV_MATH_RENDER_OPTIONS.delimiters[i];

                if (delimiterObj.display === isDisplay)
                {
                    left =  delimiterObj.left;
                    right = delimiterObj.right;

                    break;
                }
            }

            return { left: left, right: right }
        },

        fadeIn: function ()
        {
            this.$loading.removeClass('showing');
            this.$previewContainer.addClass('showing');
        },

        fadeOut: function ()
        {
            this.$loading.addClass('showing');
            this.$previewContainer.removeClass('showing');
        },

        setState: function (state)
        {
            this.$preview.hide();
            this.$previewError.hide();
            this.$previewEmpty.hide();

            this.stateVar(state).show();

            this.state = state;
        },

        stateVar: function (state)
        {
            switch (state)
            {
                case 'empty':
                    return this.$previewEmpty;
                case 'error':
                    return this.$previewError;
                case 'preview':
                    return this.$preview;
            }
        },

        reset: function ()
        {
            this.resetMode = true;

            this.$target.find('[name="math_type"][value="block"]').trigger('click');
            this.$latexInput.val('');
            this.updatePreview();

            this.resetMode = false;
        }
    });

    XF.Element.register('insert-math-form', 'CMTV_Math.InsertMathForm');
}
(jQuery, window, document);