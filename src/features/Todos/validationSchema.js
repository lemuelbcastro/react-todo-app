import * as yup from 'yup';

const validationSchema = yup.object().shape({
  name: yup.string().required('This field is required'),
  schedule_date: yup
    .date()
    .typeError('Please select a valid date')
    .required('This field is required'),
});

export default validationSchema;
