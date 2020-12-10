import * as yup from 'yup';

const addSchema = yup.object().shape({
  name: yup.string().required('This field is required'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('This field is required'),
  password: yup.string().required('This field is required'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('This field is required'),
});

const updateSchema = yup.object().shape({
  name: yup.string().required('This field is required'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('This field is required'),
  password: yup.string(),
  confirm_password: yup.string().when(['password'], {
    is: (password) => !!password,
    then: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  }),
});

export { addSchema, updateSchema };
