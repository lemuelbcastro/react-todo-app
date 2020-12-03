import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles({
  root: {
    padding: 0,
  },
});

const TableCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  const classes = useStyles();

  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <Checkbox
        className={classes.root}
        disableRipple
        ref={resolvedRef}
        {...rest}
      />
    </>
  );
});

export default TableCheckbox;
