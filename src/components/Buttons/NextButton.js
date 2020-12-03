import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const NextButton = (props) => {
  const { onClick, ...rest } = props;

  return (
    <IconButton onClick={onClick} {...rest}>
      <NavigateNextIcon />
    </IconButton>
  );
};

NextButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default NextButton;
