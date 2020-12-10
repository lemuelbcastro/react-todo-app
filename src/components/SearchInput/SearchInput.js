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
  const { onChange, clear, value, ...rest } = props;

  return (
    <FormControl>
      {props.label ? (
        <InputLabel htmlFor="search-input">{props.label}</InputLabel>
      ) : null}
      <Input
        {...rest}
        id="search-input"
        value={value}
        onChange={onChange}
        endAdornment={
          clear && (
            <InputAdornment position="end">
              <IconButton disabled={!value} onClick={clear}>
                <CloseIcon />
              </IconButton>
            </InputAdornment>
          )
        }
      />
    </FormControl>
  );
};

SearchInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  clear: PropTypes.func,
};

export default SearchInput;
