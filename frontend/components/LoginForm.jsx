import React from 'react'
import Input from "./Input";
import { QueryClient, useMutation } from '@tanstack/react-query'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useContext, useEffect } from "react";
import context from "../context/Context";
import Link from "next/link";
import { useRouter } from "next/router";
import { Formik, Form } from 'formik'
import * as Yup from 'yup';
import Cookies from 'js-cookie'
export default function LoginForm({ ToggleForm }) {
    const initialValues = {
        email: "",
        password: "",
        username: ""
    }
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid Email Format').required('Required'),

        password: Yup.string().required('Required'),

        username: Yup.string().required('Required'),


    });
    const less = useLoginUser()
    const onSubmit = (values) => {
        less.mutate(values)
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {
                formik => {
                    return (
                        <Form>

                            <Input type="username" name="username" id="username" required />



                            <Input type="email" name="email" id="email" required />

                            <Input type="password" name="password" id="password" required />


                            <button disabled={!formik.errors ||  formik.isValidating || (less.isLoading && !less.isError)} className="w-full h-11 text-white bg-[#154360] rounded-md cursor-pointer text-lg my-4 font-medium" type="submit">{(less.isLoading && !less.isError)?"Loading...":"Login"}</button>
                            <div className="text-sm text-[#154360] text-center font-medium ">
                                <div>Don't have an account? <div onClick={() => {
                                    ToggleForm('signup')
                                }} className="text-[#154360] font-semibold hover:underline register-link">Register</div></div>
                            </div>
                        </Form>
                    )
                }
            }
        </Formik>

    )
}



const LoginUser = (user) => {
    return axios.post('https://www.pradeeps-video-conferencing.store/api/v1/Login/', user, {
        withCredentials: true,
    })
}

const useLoginUser = () => {
    const router = useRouter()
    let { setauth } = useContext(context)
    return useMutation(LoginUser, {
        onSuccess: (response) => {
            console.log(response)
            localStorage.setItem('auth-details', JSON.stringify(response.data))
            setauth(response.data)
            router.push('/')
            toast.success('Logged In', { position: toast.POSITION.TOP_LEFT })

        },
        onError: (error) => {
            const newerror = error.response.data
            toast.error('Invalid Credentials Please Recheck', { position: toast.POSITION.TOP_LEFT })
        }
    })
}
