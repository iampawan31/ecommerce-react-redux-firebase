import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'

const Login = () => {
  return (
    <div className="flex justify-center items-center h-full min-h-screen">
      <div className="bg-gray-300 rounded shadow border h-80 border-emerald-300 w-full max-w-lg px-8 py-6">
        <div className="text-3xl text-center pb-4">Login</div>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={(values) => {
            const errors = {}
            if (!values.email) {
              errors.email = 'Required'
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address'
            }
            return errors
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2))
              setSubmitting(false)
            }, 400)
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <Form>
              <Field
                className="block w-full border px-4 py-2 my-2 rounded border-emerald-300"
                type="email"
                name="email"
                placeholder="email"
                autocomplete="off"
              />
              <ErrorMessage name="email" component="div" />
              <Field
                className="block w-full border px-4 py-2 my-2 rounded border-emerald-300"
                type="password"
                name="password"
                placeholder="password"
              />
              <ErrorMessage name="password" component="div" />
              <button
                className="w-full bg-emerald-400 py-2 px-4 rounded"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Login
