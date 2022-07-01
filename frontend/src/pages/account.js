import React from 'react'
import { supabase } from '../config/config'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import  {signUp,logIn, updateProfile}  from '../services/auth';

const RegisterForm =  () =>{
  return(
     <Formik
  
      initialValues={{ fullname: '', emailregister: '', passwordregister: '' }}
      validate={values => {
        const errors = {};
        if (!values.emailregister) {
          errors.emailregister = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.emailregister)
        ) {
          errors.emailregister = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={async(values, { setSubmitting }) => {

          const {fullname,emailregister,passwordregister} = values
          console.log("EMAIL",typeof(emailregister))
          console.log("EMAIL",passwordregister)
           const result = await signUp({email:emailregister,password:passwordregister})
          console.log("RESULT",result)
          setSubmitting(false);
    
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col">
          <Field className="bg-indigo-100 mb-3 p-2" placeholder="Full Name" type="text" name="fullname" />
          <Field className="bg-indigo-100 mb-3 p-2" type="email" name="emailregister" />
          <ErrorMessage name="emailregister" component="div" />
          <Field className="bg-indigo-100 p-2 mb-3" type="password" name="passwordregister" />
          <ErrorMessage name="passwordregister" component="div" />
          <button type="submit" className='font-semibold bg-indigo-600 text-white pt-[10px] pb-[10px] rounded-[3px] shadow-lg ' disabled={isSubmitting}>
            Registrarse
          </button>
        </Form>
      )}
    </Formik>

  )
}

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
        onSubmit={ async(values, { setSubmitting }) => {
          const {email,password} = values
          console.log("EMAIL",email)
          console.log("PASSWORD",password)
          const result = await logIn({email:email,password:password})
           if(result){
            const user = supabase.auth.user()
            const data ={
              id: user.id,
              username: email
            }
            await updateProfile(data)
           }

           setSubmitting(false)
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
    const isLogedIn = sessionStorage.getItem("IsLogedIn")
    console.log("ESTA LOGEADO", isLogedIn)  
     if(isLogedIn == false){
      return(
        <div className='pt-[130px]'>
        PAGINA DE CLIENTE
       </div>
      )
     }
     else{

    return (
    <div className='pt-[130px]'>
    <h1 className='font-semibold text-4xl pb-4'>MI CUENTA</h1>
    <div className="grid grid-cols-2 gap-3">
    <div className='pb-8 pl-8 pr-8 shadow-md ml-4 rounded-md'>
    <h2 className='mb-4 font-semibold text-lg'>Ingresa a tu cuenta</h2>
        <LoginForm/>
    </div> 
    <div className='pb-8 pl-8 pr-8 shadow-md mr-4 rounded-md'> 
    <h2 className='mb-4 font-semibold text-lg'>Crea tu cuenta</h2>
    <RegisterForm/>
    </div>
    </div>
    </div>

  )
}
}
