import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles(() => ({
  dialogContent: {
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
}));

const ModalForm = (props) => {
  const classes = useStyles();
  const {
    children,
    open,
    handleClose,
    handleSubmit,
    dialogTitle,
    scroll,
    contentDividers,
    loading,
    ...rest
  } = props;

  return (
    <Dialog scroll={scroll} open={open} onClose={handleClose} {...rest}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      {loading && <LinearProgress />}
      <DialogContent
        dividers={contentDividers}
        className={classes.dialogContent}
      >
        <form id="modal-form" onSubmit={handleSubmit}>
          {children}
        </form>
        {loading && <div className={classes.overlay}></div>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
        <Button
          form="modal-form"
          type="submit"
          color="primary"
          disabled={loading}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ModalForm.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  dialogTitle: PropTypes.string.isRequired,
  contentDividers: PropTypes.bool,
  scroll: PropTypes.string,
  loading: PropTypes.bool,
};

export default ModalForm;
