<?php

namespace CMTV\Math;

use XF\AddOn\AbstractSetup;
use XF\AddOn\StepRunnerInstallTrait;
use XF\AddOn\StepRunnerUninstallTrait;
use XF\AddOn\StepRunnerUpgradeTrait;
use XF\Entity\EditorDropdown;

class Setup extends AbstractSetup
{
	use StepRunnerInstallTrait;
	use StepRunnerUpgradeTrait;
	use StepRunnerUninstallTrait;

	// Adding buttons to "Insert" dropdown

	public function installStep1()
    {
        /** @var EditorDropdown $insert */
        $insert = \XF::finder('XF:EditorDropdown')->whereId('xfInsert')->fetchOne();

        if (!$insert)
        {
            return;
        }

        $buttons = $insert->buttons;

        if (!in_array('CMTV_Math', $buttons))
        {
            $buttons[] = 'CMTV_Math';
        }

        $insert->set('buttons', $buttons);
        $insert->save();
    }
}