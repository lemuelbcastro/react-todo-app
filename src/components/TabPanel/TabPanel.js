import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

function TabPanel(props) {
  const { children, value, index, ...rest } = props;

  return (
    <Typography component="div" hidden={value !== index} {...rest}>
      {value === index && children}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default TabPanel;
