import React, { Dispatch } from 'react';
import './DialogCasteChoice.scss';
import Dialog from './Dialog';
import { connect } from 'react-redux';
import { AppAction } from '../../actions';
import { DialogType } from '../../types/DialogTypes';
import { AppState } from '../../types/StateTypes';
import { openDialog } from '../../actions/DialogActions';
import { Caste, CasteSwitchStep } from '../../types/GameTypes';
import { deselectTileFromForSwitch, deselectTileToForSwitch, finishCasteSwitch, deselectCasteFromForSwitch, deselectCasteToForSwitch } from '../../actions/GameActions';
import CasteComponent from '../tiles/CasteComponent';

interface StateProps {
    isChoosingFrom: boolean,
    isChoosingTo: boolean,
    hasChosenFrom: boolean,
    hasChosenTo: boolean,
    isActionButtonActive: boolean,
    castes: Caste[],
}

interface DispatchProps {
    deselectTileFromForSwitch: () => void,
    deselectTileToForSwitch: () => void,
    deselectCasteFromForSwitch: () => void,
    deselectCasteToForSwitch: () => void,
    finishCasteSwitch: () => void,
    openCasteSwitchConfirmDialog: () => void,
}

type Props = StateProps & DispatchProps;

class DialogCasteChoice extends React.Component<Props, {}> {

    handleCancel = () => {
        const { isChoosingFrom, isChoosingTo, hasChosenFrom, hasChosenTo, deselectTileFromForSwitch, deselectTileToForSwitch, deselectCasteFromForSwitch, deselectCasteToForSwitch } = this.props;

        hasChosenFrom && deselectCasteFromForSwitch() && deselectTileFromForSwitch();
        isChoosingFrom && deselectTileFromForSwitch();

        hasChosenTo && deselectCasteToForSwitch() && deselectTileToForSwitch();
        isChoosingTo && deselectTileToForSwitch();
    }

    handleAction = () => {
        const { hasChosenFrom, hasChosenTo, finishCasteSwitch, openCasteSwitchConfirmDialog } = this.props;

        if (hasChosenFrom) {
            finishCasteSwitch();
        }

        if (hasChosenTo) {
            openCasteSwitchConfirmDialog();            
        }
    }

    render() {
        const { castes, isActionButtonActive } = this.props;

        return (
            <Dialog
                type={DialogType.CasteChoice}
                headline='Caste Choice'
                description='Choose the caste figure you want to switch from the following:'
                actionButtonText='Choose'
                cancelButtonText='Back'
                onClose={this.handleCancel}
                onCancel={this.handleCancel}
                onAction={this.handleAction}
                isActionButtonActive={isActionButtonActive}
            >
                <div className='icons'>
                    {castes && castes.map((caste: Caste, index: number) => (
                        <CasteComponent
                            key={`caste-component-dialog-caste-choice-${index}`}
                            caste={caste}
                        />
                    ))}
                </div>
            </Dialog>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    const { game, data } = state;
    const { step, selection } = game;

    const isChoosingFrom = step === CasteSwitchStep.ChooseCasteFrom;
    const isChoosingTo = step === CasteSwitchStep.ChooseCasteTo;
    const hasChosenFrom = step === CasteSwitchStep.ChooseFromDone;
    const hasChosenTo = step === CasteSwitchStep.ChooseToDone;

    let selectedTileId;
    if (isChoosingFrom || hasChosenFrom) {
        selectedTileId = selection.switch.from.tile;
    } else if (isChoosingTo || hasChosenTo) {
        selectedTileId = selection.switch.to.tile;
    } else {
        selectedTileId = -1;
    }

    const selectedTile = data.tiles.get(selectedTileId);
    const castes = selectedTile ? selectedTile.castes : [];

    const isActionButtonActive = hasChosenFrom || hasChosenTo;

    return {
        isChoosingFrom,
        isChoosingTo,
        hasChosenFrom,
        hasChosenTo,
        isActionButtonActive,
        castes,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    deselectTileFromForSwitch: () => dispatch(deselectTileFromForSwitch),
    deselectTileToForSwitch: () => dispatch(deselectTileToForSwitch),
    deselectCasteFromForSwitch: () => dispatch(deselectCasteFromForSwitch),
    deselectCasteToForSwitch: () => dispatch(deselectCasteToForSwitch),
    finishCasteSwitch: () => dispatch(finishCasteSwitch),
    openCasteSwitchConfirmDialog: () => dispatch(openDialog(DialogType.CasteSwitchConfirm)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogCasteChoice);