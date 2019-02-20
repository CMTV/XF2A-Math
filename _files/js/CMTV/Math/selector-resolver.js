var CMTV_Math = window.CMTV_Math || {};

!function ($, window, document)
{
    "use strict";

    CMTV_Math.SResolver = {
        inited: false,

        renderOptions: null,
        predefinedSelectors: null,

        renderSelectors: [],
        skipSelectors: [],

        init: function ()
        {
            this.renderOptions = JSON.parse($('.js-CMTV_Math_renderOptions').last().html()) || {};
            this.predefinedSelectors = JSON.parse($('.js-CMTV_Math_predefinedSelectors').last().html()) || {};

            this.renderSelectors = JSON.parse($('.js-CMTV_Math_customRenderSelectors').last().html()) || [];
            this.skipSelectors = JSON.parse($('.js-CMTV_Math_customSkipSelectors').last().html()) || [];

            if (this.predefinedSelectors.hasOwnProperty('renderDefault'))
            {
                this.renderSelectors = this.renderSelectors.concat(this.predefinedSelectors['renderDefault']);
            }

            if (this.predefinedSelectors.hasOwnProperty('skipDefault'))
            {
                this.skipSelectors = this.skipSelectors.concat(this.predefinedSelectors['skipDefault']);
            }

            if (this.renderOptions.where !== 'everywhere')
            {
                this.skipSelectors.push('body');

                var that = this;

                Object.keys(this.renderOptions.positions).forEach(function(key, index) {
                    if (that.predefinedSelectors.hasOwnProperty(key))
                    {
                        that.renderSelectors = that.renderSelectors.concat(that.predefinedSelectors[key]);
                    }
                });
            }

            this.inited = true;
        },

        resolve: function ()
        {
            if (!this.inited)
            {
                this.init();
            }

            $(this.renderSelectors.join()).addClass('mathjax-proceed');
            $(this.skipSelectors.join()).addClass('mathjax-skip');
        }
    };
}
(jQuery, window, document);