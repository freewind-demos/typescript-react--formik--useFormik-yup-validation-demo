import React from 'react'
import * as yup from 'yup';
import {Form, Field, FormikProvider, useFormik, FormikHelpers} from 'formik';
import {FormikFieldError} from './FormikFieldError';

type LoginProps = {
  username: string,
  password: string,
}

const ValidationSchema = yup.object().shape({
  username: yup.string().min(4).required(),
  password: yup.string().required(),
});

const initValues: LoginProps = {
  username: 'aaa',
  password: ''
}

export default function MyForm() {

  function onSubmit(values: LoginProps,
                    {resetForm}: FormikHelpers<LoginProps>) {
    resetForm();
    alert(JSON.stringify(values, null, 2));
  }

  function generatePassword() {
    // FIXME how to make it type-safe
    formik.setFieldValue('password', '123456');
  }

  const formik = useFormik<LoginProps>({
    initialValues: initValues,
    validationSchema: ValidationSchema,
    onSubmit: onSubmit,
    onReset: (values, {setValues}) => {
      setValues(initValues);
    },
  })

  // Note: `touched` is for mobile browsers
  const {errors, touched, values} = formik;

  return <div>
    <h1>Hello Formik</h1>
    <FormikProvider value={formik}>
      <Form>
        <div>
          <label htmlFor={'username'}>Username</label>
          <Field
            type="text"
            id="username"
            name="username" // Note: important, should be same to LoginProps
            value={values.username}
            onChange={formik.handleChange}
          />
          <FormikFieldError error={errors.username} touched={touched.username}/>
        </div>
        <div>
          <label htmlFor={'password'}>Password</label>
          <Field
            type="text"
            id="password"
            name="password" // Note: important, should be same to LoginProps
            value={values.password}
            onChange={formik.handleChange}
          />
          <button type='button' onClick={generatePassword}>Generate Password
          </button>
          <FormikFieldError error={errors.password} touched={touched.password}/>
        </div>
        <div>
          <button>Login</button>
          <button type={'reset'}>Reset</button>
        </div>
      </Form>
    </FormikProvider>
  </div>
};
