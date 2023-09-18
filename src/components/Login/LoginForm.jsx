import React, { useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios';
import { LoginSchema } from '../../schemas/LoginSchema';
import ErrorAlert from '../Alert/ErrorAlert';
import SuccessAlert from '../Alert/SuccessAlert';
import { useNavigate } from 'react-router-dom';

const initialValues = {
    email: '',
    password: '',
}

const LoginForm = () => {
    const [successMessage, setSuccessMessage] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [submitBtnText, setSubmitBtnText] = useState('Login');

    const navigate = useNavigate();

    const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: LoginSchema,
        onSubmit: async (values, action) => {
            setSubmitBtnText('Submitting..');
            setSuccessMessage(false);
            setErrorMessage(false);
            const formData = new FormData();
            formData.append('email', values.email);
            formData.append('password', values.password);
            try {
                const resp = await axios.post(`${import.meta.env.VITE_API}/login`, formData);
                // console.log('Response == ', resp.data);
                if (resp.data.success) {
                    localStorage.setItem('token',resp.data.token);
                    setSuccessMessage('Logged in successfully');
                    action.resetForm();
                    navigate('/');
                }
            } catch (error) {
                // console.log('error == ', error);
                if (error) {
                    setErrorMessage('Login credentials are invalid!')
                }
            }
            action.setSubmitting(false);
            setSubmitBtnText('Login');
        }
    })

    return (
        <React.Fragment>

            <section className="text-gray-600 body-font relative">

                <div className="container px-5 py-6 mx-auto flex">

                    <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
                        {
                            successMessage && <SuccessAlert successMessage={successMessage} />
                        }

                        {
                            errorMessage && <ErrorAlert errorMessage={errorMessage} />
                        }
                        <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="relative mb-4">
                                <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                                <input type="email" value={values.email} onChange={handleChange} onBlur={handleBlur} id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                {
                                    errors.email && touched.email &&
                                    <span className="block text-red-500">{errors.email}</span>
                                }
                            </div>
                            <div className="relative mb-4">
                                <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                                <input type="password" value={values.password} onChange={handleChange} onBlur={handleBlur} id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                {
                                    errors.password && touched.password &&
                                    <span className="block text-red-500">{errors.password}</span>
                                }
                            </div>
                            <button type='submit' disabled={isSubmitting} className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">{submitBtnText}</button>
                        </form>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default LoginForm;