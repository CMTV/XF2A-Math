(function ($, window, document) {
    "use strict";

    XF.EditorDialogMath = XF.extend(XF.EditorDialog, {
        _beforeShow: function(overlay)
        {
            var $dialog = $('#editor-insert-math-form');

            $dialog.find('[name=math-input]').val('');
            $dialog.find('.math-preview, .math-incorrect-message').hide();
            $dialog.find('.math-init-message').show();
            $dialog.find('.math-type [value=block]').prop('checked', true);
        },

        _init: function(overlay)
        {
            $('#editor-insert-math-form').submit(XF.proxy(this, 'submit'));
        },

        submit: function(e)
        {
            e.preventDefault();

            var ed = this.ed,
                overlay = this.overlay,
                $dialog = $('#editor-insert-math-form');

            ed.selection.restore();

            var bbCode = 'MATH';

            if($dialog.find('.math-type :checked').val() === 'inline')
            {
                bbCode = 'IMATH';
            }

            var toInsert = '[' + bbCode + ']' + $dialog.find('[name=math-input]').val().trim();

            XF.EditorHelpers.wrapSelectionText(ed, toInsert, '[/' + bbCode + ']', true);

            overlay.hide();
        }
    });

    XF.EditorHelpers.dialogs.math = new XF.EditorDialogMath('math');

    $.FE.DefineIconTemplate('Math_insertMathTemplate', '<i class="MathAddonIcon-insertMathIcon"></i>');
    $.FE.DefineIcon('Math_insertMathIcon', { template: 'Math_insertMathTemplate' });

    $.FE.RegisterCommand('Math_insertMath', {
        title: 'Insert math',
        icon: 'Math_insertMathIcon',
        undo: false,
        focus: true,
        callback: function()
        {
            XF.EditorHelpers.loadDialog(this, 'math');
        }
    });

    XF.editorStart.custom.push('Math_insertMath');
})(jQuery, window, document);