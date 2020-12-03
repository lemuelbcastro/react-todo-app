import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

const PreviousButton = (props) => {
  const { onClick, ...rest } = props;

  return (
    <IconButton onClick={onClick} {...rest}>
      <NavigateBeforeIcon />
    </IconButton>
  );
};

PreviousButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default PreviousButton;
