import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import ModalDisplay from './ModalDisplay';

const ModalConfirm = (props) => {
  const {
    children,
    title,
    contentDividers,
    open,
    handleCancel,
    handleConfirm,
    ...rest
  } = props;

  const dialogActions = (
    <React.Fragment>
      <Button onClick={handleCancel} color="primary">
        Cancel
      </Button>
      <Button onClick={handleConfirm} color="primary">
        Confirm
      </Button>
    </React.Fragment>
  );

  return (
    <ModalDisplay
      dialogTitle={title}
      open={open}
      contentDividers={contentDividers}
      dialogActions={dialogActions}
      {...rest}
    >
      {children}
    </ModalDisplay>
  );
};

ModalConfirm.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  open: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
};

export default ModalConfirm;
