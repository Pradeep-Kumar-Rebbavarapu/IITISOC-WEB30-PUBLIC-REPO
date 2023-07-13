import React from "react";
import Input from "./Input";
import { QueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useContext, useEffect } from "react";
import context from "../context/Context";
import Link from "next/link";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { GoogleOAuthProvider } from "google-oauth-gsi";
import Context from "../context/Context";
import GoogleButton from "./GoogleButton";

export default function SignupForm({ ToggleForm }) {
    const {setauth,setuser} = useContext(Context)
    const router = useRouter();
    const initialValues = {
        email: "",
        password1: "",
        username: "",
        password2: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid Email Format!")
            .required("Required!")
            .min(5, "Atleast 5 characters required!"),

        password1: Yup.string()
            .required("Required!")
            .matches(/^(?=.{6,})/, "Must Contain 6 Characters!")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])/,
                "Must Contain One Uppercase, One Lowercase!"
            )
            .matches(
                /^(?=.*[!@#\$%\^&\*])/,
                "Must Contain One Special Case Character!"
            )
            .matches(/^(?=.{6,20}$)\D*\d/, "Must Contain One Number!"),

        username: Yup.string()
            .required("Required!")
            .min(5, "Atleast 5 characters required!"),

        password2: Yup.string()
            .required("Required!")
            .test("passwords-match", "Passwords must match!", function (value) {
                return this.parent.password1 === value;
            }),
    });

    const less = useCreateUser();
    const onSubmit = (values) => {
        less.mutate(values);
    };

    const googleProvider = new GoogleOAuthProvider({
        clientId:"106702296957-om2ja3dqros1vprnuqc2ua3a7rieuhs5.apps.googleusercontent.com",
        onScriptLoadError: () => console.log("onScriptLoadError"),
        onScriptLoadSuccess: () => console.log("onScriptLoadSuccess"),
    });
    const login = googleProvider.useGoogleLogin({
        flow: "auth-code",
        onSuccess: async (res) => {
            console.log(res);
            const code = res.code;
            await axios
                .post(
                    "https://www.pradeeps-video-conferencing.store/dj-rest-auth/google/",
                    { code: code }
                )
                .then((response) => {
                    
                    setauth({
                        access: response.data.access,
                        refresh: response.data.refresh,
                    });
                    Cookies.set(
                        "auth",
                        JSON.stringify({
                            access: response.data.access,
                            refresh: response.data.refresh,
                        }),
                        { expires: 365, path: "/" }
                    );
                    Cookies.set(
                        "user",
                        JSON.stringify({
                            username: response.data.user.username,
                            email: response.data.user.email,
                            id: response.data.user.pk,
                        }),
                        { expires: 365, path: "/" }
                    );
                    setuser({
                        username: response.data.user.username,
                        email: response.data.user.email,
                        id: response.data.user.pk,
                    });
                    router.push("/");
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        onError: (err) => console.error("Failed to login with google", err),
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {(formik) => {
                return (
                    <Form>
                        <Input type="username" name="username" id="username" required />

                        <Input type="email" name="email" id="email" required />

                        <Input type="password" name="password1" id="password1" label='password' required />

                        <Input
                            type="password"
                            name="password2"
                            id="password2"
                            label='confirm password'
                            required
                        />
                        <button
                            disabled={
                                !formik.errors ||
                                formik.isValidating ||
                                (less.isLoading && !less.isError)
                            }
                            className="w-full h-11 text-white bg-[#154360] rounded-md cursor-pointer text-lg mb-6 font-medium hover:ring-4 hover:ring-opacity-50 hover:ring-[#154360] transition-all fade-in-ou"
                            type="submit"
                        >
                            {less.isLoading && !less.isError ? "Loading..." : "Register"}
                        </button>
                        <GoogleButton/>
                        <div className="text-sm text-[#154360] text-center font-medium my-4">
                            <div>
                                Already have an account?{" "}
                                <div
                                    disabled={
                                        !formik.errors ||
                                        formik.isValidating ||
                                        (less.isLoading && !less.isError)
                                    }
                                    onClick={() => {
                                        ToggleForm("login");
                                    }}
                                    className="text-[#154360] font-semibold hover:underline login-link"
                                >
                                    Login
                                </div>
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
}

const CreateUser = async (user) => {
    return axios
        .post(
            "https://www.pradeeps-video-conferencing.store/dj-rest-auth/registration/",
            user,
            {
                withCredentials: true,
            }
        )
        .then((response) => {
            return response.data;
        });
};

const useCreateUser = () => {
    const router = useRouter();
    return useMutation(CreateUser, {
        onSuccess: (response) => {
            
            // router.push('/JoinUsPage')
            toast.success("Activation Link Sent To Your Email", {
                position: toast.POSITION.TOP_LEFT,
            });
        },
        onError: (error) => {
            const newerror = error.response.data;

            if (error.message == "Network Error") {
                toast.error("Network Error Please Try After Some Time", {
                    position: toast.POSITION.TOP_LEFT,
                });
            }
            if (newerror.username || newerror.error) {
                toast.error(
                    newerror.username ? newerror.username[0] : newerror.error[0],
                    { position: toast.POSITION.TOP_LEFT }
                );
            }
            if (newerror.email) {
                toast.error(newerror.email[0], { position: toast.POSITION.TOP_LEFT });
            } else {
                toast.error("Signup Unsuccesful Retry Again Later", {
                    position: toast.POSITION.TOP_LEFT,
                });
            }
        },
    });
};
