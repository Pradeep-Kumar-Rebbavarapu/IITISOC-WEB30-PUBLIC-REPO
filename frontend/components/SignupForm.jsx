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

export default function SignupForm({ ToggleForm }) {
    const initialValues = {
        email: '',
        password: '',
        username: '',
        confirm_password: '',
    }

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid Email Format!').required('Required!').min(5, 'Atleast 5 characters required!'),

        password: Yup.string().required('Required!').matches(/^(?=.{6,})/, "Must Contain 6 Characters!")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])/,
                "Must Contain One Uppercase, One Lowercase!"
            )
            .matches(
                /^(?=.*[!@#\$%\^&\*])/,
                "Must Contain One Special Case Character!"
            )
            .matches(/^(?=.{6,20}$)\D*\d/, "Must Contain One Number!"),

        username: Yup.string().required('Required!').min(5, 'Atleast 5 characters required!'),

        confirm_password: Yup.string().required('Required!')
            .test('passwords-match', 'Passwords must match!', function (value) {
                return this.parent.password === value
            })
    })

    const less = useCreateUser()
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

                            <Input type="password" name="confirm_password" id="confirm_password" required />
                            <button disabled={!formik.errors ||  formik.isValidating || (less.isLoading && !less.isError)} className="w-full h-11 text-white bg-[#154360] rounded-md cursor-pointer text-lg my-4 font-medium" type="submit">{(less.isLoading && !less.isError)?"Loading...":"Register"}</button>
                            <div className="text-sm text-[#154360] text-center font-medium ">
                                <div>Already have an account? <div disabled={!formik.errors ||  formik.isValidating || (less.isLoading && !less.isError)} onClick={() => {
                                    ToggleForm('login')
                                }} className="text-[#154360] font-semibold hover:underline login-link">Login</div></div>
                            </div>
                        </Form>
                    )
                }
            }
        </Formik>

    )
}


const CreateUser = (user) => {

    return axios.post('https://www.pradeeps-video-conferencing.store/api/v1/Signup/', user,{
        withCredentials: true,
    })
}

const useCreateUser = () => {
    const router = useRouter()
    return useMutation(CreateUser, {
        onSuccess: (response) => {

            router.push('/JoinUsPage')
            toast.success('Signup Succesfull', { position: toast.POSITION.TOP_LEFT })
            
        },
        onError: (error) => {
            const newerror = error.response.data

            if (error.message == "Network Error") {
                toast.error('Network Error Please Try After Some Time', { position: toast.POSITION.TOP_LEFT })
            }
            if (newerror.username || newerror.error) {
                toast.error(newerror.username ? newerror.username[0] : newerror.error[0], { position: toast.POSITION.TOP_LEFT })

            }
            else {
                toast.error('Signup Unsuccesful Retry Again Later', { position: toast.POSITION.TOP_LEFT })
            }


        }
    })
}