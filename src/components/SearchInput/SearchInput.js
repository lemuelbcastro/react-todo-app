import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const SearchInput = (props) => {
  const { className, onChange, style, clear, value, ...rest } = props;

  return (
    <FormControl>
      {props.label ? (
        <InputLabel htmlFor="search-input">{props.label}</InputLabel>
      ) : null}
      <Input
        {...rest}
        id="search-input"
        className={className}
        style={style}
        value={value}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              disabled={!value}
              onClick={clear}
            >
              <CloseIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

SearchInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object,
  clear: PropTypes.func,
  value: PropTypes.string,
};

export default SearchInput;
