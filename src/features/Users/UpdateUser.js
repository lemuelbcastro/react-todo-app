import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Grid } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import ModalForm from 'components/Modal/ModalForm';
import { updateOne } from './usersSlice';
import { updateSchema as validationSchema } from './validationSchema';

const UpdateUser = (props) => {
  const { open, handleClose } = props;
  const dispatch = useDispatch();
  const { selected: user } = useSelector((state) => state.users);
  const defaultValues = useMemo(
    () => ({
      name: '',
      email: '',
      password: '',
      confirm_password: '',
    }),
    []
  );
  const { control, handleSubmit, reset, errors } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = (data) => dispatch(updateOne({ id: user.id, user: data }));

  useEffect(() => {
    const { name, email } = user;
    reset({ ...defaultValues, name, email });
  }, [user, defaultValues, reset]);

  return (
    <ModalForm
      open={open}
      dialogTitle="Update User"
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
            as={TextField}
            control={control}
            fullWidth
            label="Email"
            margin="dense"
            name="email"
            variant="outlined"
            error={errors?.email ? true : false}
            helperText={errors?.email?.message}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Controller
            as={TextField}
            control={control}
            fullWidth
            label="Password"
            margin="dense"
            name="password"
            variant="outlined"
            type="password"
            error={errors?.password ? true : false}
            helperText={errors?.password?.message}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Controller
            as={TextField}
            control={control}
            fullWidth
            label="Confirm Password"
            margin="dense"
            name="confirm_password"
            variant="outlined"
            type="password"
            error={errors?.confirm_password ? true : false}
            helperText={errors?.confirm_password?.message}
          />
        </Grid>
      </Grid>
    </ModalForm>
  );
};

UpdateUser.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default UpdateUser;
