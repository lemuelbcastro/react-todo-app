import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import ButtonGroup from '../Buttons/ButtonGroup';

const TableButtons = (props) => {
  const { onClick, disabled, addOnButtons } = props;

  return (
    <ButtonGroup>
      {onClick?.add && (
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={onClick.add}
          disabled={disabled?.ddd}
        >
          Add
        </Button>
      )}
      {onClick?.update && (
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={onClick.update}
          disabled={disabled?.update}
        >
          Update
        </Button>
      )}
      {onClick?.remove && (
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={onClick.remove}
          disabled={disabled?.remove}
        >
          Remove
        </Button>
      )}
      {addOnButtons}
    </ButtonGroup>
  );
};

TableButtons.propTypes = {
  onClick: PropTypes.shape({
    add: PropTypes.func,
    update: PropTypes.func,
    remove: PropTypes.func,
  }).isRequired,
  disabled: PropTypes.shape({
    add: PropTypes.bool,
    update: PropTypes.bool,
    remove: PropTypes.bool,
  }),
  addOnButtons: PropTypes.node,
};

export default TableButtons;
