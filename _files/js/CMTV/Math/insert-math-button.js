var CMTV_Math = window.CMTV_Math || {};

!function($, window, document)
{
    "use strict";

    CMTV_Math.EditorDialogMath = XF.extend(XF.EditorDialog, {
        $form: null,
        formHandler: null,

        _beforeShow: function (overlay)
        {
            this.ed.$el.blur();
        },

        _afterHide: function (overlay)
        {
            console.log('here!');
        },

        _init: function (overlay)
        {
            this.$form = $('#editor_math_form');
            this.$form.submit(XF.proxy(this, 'submit'));

            this.formHandler = XF.Element.getHandler(this.$form, 'insert-math-form');
        },

        submit: function (e)
        {
            e.preventDefault();

            var ed = this.ed,
                overlay = this.overlay;

            var toInsert = this.formHandler.wrapMath(this.formHandler.$latexInput.val().trim());

            ed.selection.restore();
            ed.html.insert(toInsert);

            overlay.hide();
            this.$form.trigger('form:reset');
        }
    });

    XF.EditorHelpers.dialogs.CMTVMath = new CMTV_Math.EditorDialogMath('CMTV_Math');

    //
    // Registering "Insert math" button in Froala editor
    //

    $(document).on('editor:first-start', function ()
    {
        $.FE.DefineIcon('CMTV_Math', { NAME: 'function' });
        $.FE.RegisterCommand('CMTV_Math', {
            title: 'CMTV_Math_insert_math',
            icon: 'CMTV_Math',
            undo: true,
            focus: true,
            callback: function ()
            {
                XF.EditorHelpers.loadDialog(this, 'CMTVMath'); // @see https://xenforo.com/community/threads/actiondialog-silently-removes-underscores-_.161122
            }
        });

        XF.editorStart.custom.push('CMTV_Math');
    });
}
(jQuery, window, document);