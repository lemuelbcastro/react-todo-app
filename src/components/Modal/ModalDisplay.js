import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress';

const ModalDisplay = (props) => {
  const {
    children,
    open,
    handleClose,
    dialogTitle,
    contentDividers,
    dialogActions,
    loading,
    ...rest
  } = props;

  return (
    <Dialog open={open} {...rest}>
      {dialogTitle ? <DialogTitle>{dialogTitle}</DialogTitle> : null}
      {loading && <LinearProgress />}
      <DialogContent dividers={contentDividers}>{children}</DialogContent>
      <DialogActions>
        {dialogActions ? (
          dialogActions
        ) : (
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

ModalDisplay.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
  dialogTitle: PropTypes.string,
  contentDividers: PropTypes.bool,
  dialogActions: PropTypes.element,
  loading: PropTypes.bool,
};

export default ModalDisplay;
