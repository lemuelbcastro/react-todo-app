import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { TextField, Grid } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import ModalForm from 'components/Modal/ModalForm';
import { addOne } from './todosSlice';
import validationSchema from './validationSchema';

const AddTodo = (props) => {
  const { open, handleClose } = props;
  const dispatch = useDispatch();
  const { control, handleSubmit, errors } = useForm({
    defaultValues: {
      name: '',
      schedule_date: null,
    },
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = (data) => dispatch(addOne(data));

  return (
    <ModalForm
      open={open}
      dialogTitle="Add Todo"
      contentDividers={true}
      handleClose={handleClose}
      handleSubmit={handleSubmit(onSubmit)}
    >
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <Controller
            as={TextField}
            control={control}
            fullWidth
            label="Name"
            margin="dense"
            name="name"
            variant="outlined"
            error={errors?.name ? true : false}
            helperText={errors?.name?.message}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Controller
            name="schedule_date"
            render={(props) => (
              <DatePicker
                onChange={(date) => props.onChange(date)}
                value={props.value}
                fullWidth
                label="Schedule Date"
                margin="dense"
                inputVariant="outlined"
                format="yyyy/MM/dd"
                disablePast
                error={errors?.schedule_date ? true : false}
                helperText={errors?.schedule_date?.message}
              />
            )}
            control={control}
          />
        </Grid>
      </Grid>
    </ModalForm>
  );
};

AddTodo.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default AddTodo;
