import React, { Dispatch } from 'react';
import './DialogCasteChoice.scss';
import Dialog from './Dialog';
import { connect } from 'react-redux';
import { AppAction } from '../../actions';
import { DialogType } from '../../types/DialogTypes';
import { AppState } from '../../types/StateTypes';
import { openDialog } from '../../actions/DialogActions';
import { Caste } from '../../types/GameTypes';
import { deselectCasteSwitchFrom, deselectCasteSwitchTo, selectCasteSwitchFrom, selectCasteSwitchTo, deselectCasteSwitchTile, deselectCasteForSwitch, selectCasteSwitchTile, selectCasteForSwitch } from '../../actions/GameActions';
import { ReactComponent as HouseIcon } from '../../icons/house.svg';
import { ReactComponent as MonkIcon } from '../../icons/monk.svg';
import { ReactComponent as RiceIcon } from '../../icons/rice.svg';

interface StateProps {
    hasChosenFrom: boolean,
    hasChosenTo: boolean,
    isActionButtonActive: boolean,
    selectedTileId: number,
    selectedCaste: Caste,
    castes: Caste[],
}

interface DispatchProps {
    selectCasteSwitchFrom: (tile: number, caste: Caste) => void,
    selectCasteSwitchTo: (tile: number, caste: Caste) => void,
    selectCasteSwitchTile: (tile: number) => void,
    selectCasteForSwitch: (caste: Caste) => void,
    deselectCasteSwitchFrom: () => void,
    deselectCasteSwitchTo: () => void,
    deselectCasteSwitchTile: () => void,
    deselectCasteForSwitch: () => void,
    openCasteSwitchConfirmDialog: () => void,
}

type Props = StateProps & DispatchProps;

class DialogCasteChoice extends React.Component<Props, {}> {

    /**
     * Returns true when the switch data is ready in the store.
     */
    handleChoice = (): boolean => {
        const { selectedTileId, selectedCaste, hasChosenFrom, hasChosenTo, selectCasteSwitchFrom, selectCasteSwitchTo } = this.props;

        // Step 1
        if (!hasChosenFrom && !hasChosenTo) {
            selectCasteSwitchFrom(selectedTileId, selectedCaste);
        }
        
        // Step 2
        if (hasChosenFrom && !hasChosenTo) {
            selectCasteSwitchTo(selectedTileId, selectedCaste);
            return true;
        }

        return false;
    }

    handleCancel = () => {
        const { hasChosenFrom, hasChosenTo, deselectCasteSwitchFrom, deselectCasteSwitchTo, deselectCasteSwitchTile, deselectCasteForSwitch } = this.props;

        // Only go one step back at a time
        // Step 2
        if (hasChosenFrom && !hasChosenTo) {
            deselectCasteSwitchTo();
        }
        
        // Step 1
        if (!hasChosenFrom && !hasChosenTo) {
            deselectCasteSwitchFrom();
        }

        // Remove temporarily selected tile and caste
        deselectCasteSwitchTile();
        deselectCasteForSwitch();
    }

    handleAction = () => {
        const { openCasteSwitchConfirmDialog } = this.props;

        if (this.handleChoice()) {
            openCasteSwitchConfirmDialog();
        }
    }

    getCasteIcon = (caste: Caste, iconProps: object) => {
        switch (caste) {
            case Caste.Military:
                return (<HouseIcon { ...iconProps } />);
            case Caste.Religion:
                return (<MonkIcon { ...iconProps } />);
            case Caste.Commerce:
                return (<RiceIcon { ...iconProps } />);
        }
    }

    onCasteIconClick = (caste: Caste) => {
        const { selectedCaste, selectCasteForSwitch, deselectCasteForSwitch } = this.props;
        const isSelected = caste === selectedCaste;

        if (isSelected) {
            deselectCasteForSwitch();
        } else {
            selectCasteForSwitch(caste);
        }
    }

    render() {
        const { castes, selectedCaste, isActionButtonActive } = this.props;

        return (
            <Dialog
                type={DialogType.CasteChoice}
                headline='Caste Choice'
                description='Choose the caste figure you want to switch from the following:'
                actionButtonText='Choose'
                cancelButtonText='Back'
                onCancel={this.handleCancel}
                onAction={this.handleAction}
                isActionButtonActive={isActionButtonActive}
            >
                <div className='icons'>
                    {castes && castes.map((caste: Caste, index: number) => {
                        const isSelected = caste === selectedCaste;

                        return this.getCasteIcon(caste, {
                            key: `caste-icon-dialog-caste-choice-${index}`,
                            className: `caste-icon ${isSelected ? 'is-selected' : ''}`,
                            onClick: () => this.onCasteIconClick(caste),
                        });
                    })}
                </div>
            </Dialog>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    const { game, data } = state;
    const { casteSwitch, selected } = game;

    const selectedTileId = selected.boardTileForSwitch;
    const selectedCaste = selected.caste;
    const selectedTile = data.tiles.get(selectedTileId);
    const castes = selectedTile ? selectedTile.castes : [];

    const hasChosenFrom = casteSwitch.from.tile !== -1 && casteSwitch.from.caste !== Caste.Unknown;
    const hasChosenTo = casteSwitch.to.tile !== -1 && casteSwitch.from.caste !== Caste.Unknown;

    const isActionButtonActive = selected.caste !== Caste.Unknown;

    return {
        hasChosenFrom,
        hasChosenTo,
        isActionButtonActive,
        selectedTileId,
        selectedCaste,
        castes,
    }
};

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    selectCasteSwitchFrom: (tile: number, caste: Caste) => dispatch(selectCasteSwitchFrom(tile, caste)),
    selectCasteSwitchTo: (tile: number, caste: Caste) => dispatch(selectCasteSwitchTo(tile,caste)),
    selectCasteSwitchTile: (tile: number) => dispatch(selectCasteSwitchTile(tile)),
    selectCasteForSwitch: (caste: Caste) => dispatch(selectCasteForSwitch(caste)),

    deselectCasteSwitchFrom: () => dispatch(deselectCasteSwitchFrom),
    deselectCasteSwitchTo: () => dispatch(deselectCasteSwitchTo),
    deselectCasteSwitchTile: () => dispatch(deselectCasteSwitchTile),
    deselectCasteForSwitch: () => dispatch(deselectCasteForSwitch),
    
    openCasteSwitchConfirmDialog: () => dispatch(openDialog(DialogType.CasteSwitchConfirm)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogCasteChoice);