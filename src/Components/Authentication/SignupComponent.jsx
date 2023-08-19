import React, { useEffect, useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup"
import api from '../../Config/api';
import { useNavigate } from 'react-router-dom';
import bg from '../../Images/mobile.png';

export default function SignupComponent() {

    const [spin, setSpin] = useState(false)
    const [message, setMessage] = useState("")
    const navigate = useNavigate();

    const handleSignup = async (param) => {
        setSpin(true)
        await api.post("/register", param)
            .then((res) => {
                if (res.data?.success) {
                    navigate("/login")
                }
            }, error => {
                setMessage(error.response.data.detail)
                setSpin(false)
            })
            .catch((error) => {
                setSpin(false)
            })
    }

    useEffect(() => {
        if (localStorage.getItem("token") != null) {
            navigate("/home/board")
        }
    }, [])

    const schema = Yup.object().shape({
        email: Yup.string()
            .matches(
                /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/,
                "Invalid email format"
            )
            .email("Invalid email format")
            .required("Email is required"),

        password: Yup.string()
            .required("Password cannot be empty")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
            ),
    });

    return (
        <div>
            <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={schema}
                onSubmit={val => { handleSignup(val) }
                }
            >
                {
                    <>
                        <div className='grid grid-cols-2 h-screen w-screen'>
                            <div className='col-span-1 flex justify-center items-center bg-gray-100'>
                                <div>
                                    <div className="text-3xl leading-tight">Organize your life, one task at a time with</div>
                                    <div className='mr-2'>
                                        <p className='text-3xl float-left'>Task</p> &nbsp; &nbsp;
                                        <span className='text-3xl font-bold text-bg_primary'>Zone</span>
                                    </div>

                                    <div className='text-center'>
                                        <img src={bg} alt="background image" className='mx-auto' />
                                    </div>
                                </div>
                            </div>
                            <div className='col-span-1 bg-white content-center min-h-screen '>
                                <div className='block w-2/3 mx-auto p-5 text-center'>
                                    <div className='w-full text-left py-14'>
                                        <p className="max-w-lg text-3xl font-semibold leading-normal text-gray-900 dark:text-white">Sign up for Task <span className='font-bold text-bg_primary'> Zone </span></p>
                                    </div>
                                    <Form action="">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-black font-medium text-sm">EMAIL</span>
                                            </label>
                                            <Field type="email" name="email" placeholder="Enter your email" className="input border border-gray-300 bg-white input-bordered  focus:ring-green-400 focus:border-bg_primary" />
                                            <div className='mt-2'>
                                                <ErrorMessage component="div" name="email" className="block w-full text-left mb-2 text-red-600 text-sm" />
                                            </div>
                                        </div>

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-black font-medium text-sm">PASSWORD</span>
                                            </label>
                                            <Field type="password" name="password" placeholder="Enter your password" className="input border border-gray-300 bg-white input-bordered  focus:ring-green-400 focus:border-bg_primary" />
                                            <div className='mt-2'>
                                                <ErrorMessage component="div" name="password" className="block w-full text-left mb-2 text-red-600 text-sm" />
                                            </div>
                                        </div>

                                        <div className="form-control mt-6">
                                            <button className="btn btn-primary bg-bg_primary hover:bg-green-300 text-white font-bold text-base capitalize">
                                                {spin == true ?
                                                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                                    </svg>
                                                    : null}
                                                Register
                                            </button>
                                        </div>
                                    </Form>
                                    <span className="label-text text-black block mt-8 text-sm">Already have an account? <a className='text-blue-700 cursor-pointer' onClick={() => navigate("/login")}>Sign in</a></span>

                                    <div className={`mt-10 ${message != "" ? "visible" : "invisible"}`}>
                                        <div className="alert alert-warning shadow-lg bg-opacity-50 border-yellow-400 border">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                                <span>{message}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </Formik>
        </div>
    )
}
