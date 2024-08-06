import * as yup from 'yup';

export const addUserValidationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
});
