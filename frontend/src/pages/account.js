import React from 'react'
import { supabase } from '../config/config'
import { Formik, Form, Field, ErrorMessage } from 'formik';

const LoginForm = () =>{
    return(
       <Formik
    
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col">
            <Field className="bg-indigo-100 mb-3 p-2" type="email" name="email" />
            <ErrorMessage name="email" component="div" />
            <Field className="bg-indigo-100 p-2 mb-3" type="text" name="password" />
            <ErrorMessage name="password" component="div" />
            <button type="submit" className='font-semibold bg-indigo-600 text-white pt-[10px] pb-[10px] rounded-[3px] shadow-lg ' disabled={isSubmitting}>
              Log In
            </button>
          </Form>
        )}
      </Formik>
  
    )
}

export default function AccountPage() {


    return (
    <div className='pt-[130px]'>
    <h1 className='font-semibold text-4xl pb-4'>MI CUENTA</h1>
    <div className="grid grid-cols-2 gap-3">
    <div className='pb-8 pl-8 pr-8 shadow-md ml-4 rounded-md'>
    <h2 className='mb-4 font-semibold text-lg'>INGRESA A TU CUENTA</h2>
        <LoginForm/>
    </div> 
    <div className='p-8 shadow-md'> COL2</div>
    </div>
    </div>

  )
}
