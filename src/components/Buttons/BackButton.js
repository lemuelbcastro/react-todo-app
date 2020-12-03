import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const BackButton = (props) => {
  const { onClick, ...rest } = props;

  return (
    <Tooltip title="Back">
      <span>
        <IconButton onClick={onClick} {...rest}>
          <ArrowBackIcon fontSize="small" />
        </IconButton>
      </span>
    </Tooltip>
  );
};

BackButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default BackButton;
