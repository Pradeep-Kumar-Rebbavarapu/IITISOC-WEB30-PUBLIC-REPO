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


import jwt_decode from "jwt-decode";
import GoogleButton from "./GoogleButton";
export default function LoginForm({ ToggleForm }) {
	
	const router = useRouter()
	const {setauth,setuser} = useContext(context)
	
	
	const initialValues = {
		email: "",
		password: "",
		username: "",
	};
	const validationSchema = Yup.object({
		email: Yup.string().email("Invalid Email Format").required("Required"),

		password: Yup.string().required("Required"),

		username: Yup.string().required("Required"),
	});
	const less = useLoginUser();
	const onSubmit = (values) => {
		less.mutate(values);
	};
	const responseGoogle = (response) => {
		
	}

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
						<Input type="password" name="password" id="password" required />
						<button
							disabled={
								!formik.errors ||
								formik.isValidating ||
								(less.isLoading && !less.isError)
							}
							className="w-full h-11 text-white bg-[#154360] rounded-md cursor-pointer text-lg mb-6 font-medium hover:ring-4 hover:ring-opacity-50 hover:ring-[#154360] transition-all fade-in-out"
							type="submit"
						>
							{less.isLoading && !less.isError ? "Loading..." : "Login"}
						</button>
						<GoogleButton/>
						<div className="text-sm text-[#154360] text-center font-medium my-4">
							<div>
								Don't have an account?{" "}
								<div
									onClick={() => {
										ToggleForm("signup");
									}}
									className="text-[#154360] font-semibold hover:underline register-link "
								>
									Register
								</div>
							</div>
						</div>
					</Form>
				);
			}}
		</Formik>
	);
}

const LoginUser = (user) => {
	return axios.post("https://www.pradeeps-video-conferencing.store/dj-rest-auth/login/", user, {
		withCredentials: true,
	});
};

const useLoginUser = () => {
	const router = useRouter();
	let { setauth, setuser } = useContext(context);
	return useMutation(LoginUser, {
		onSuccess: async (res) => {
			
			Cookies.set("user", JSON.stringify(res.data.user), {
				expires: 365,
				path: "/",
			});
			Cookies.set(
				"auth",
				JSON.stringify({
					access: res.data.access,
					refresh: res.data.refresh,
				}),
				{ expires: 365, path: "/" }
			);
			setauth({ access: res.data.access, refresh: res.data.refresh });
			setuser(res.data.user);
			router.push("/");
			toast.success("Logged In", { position: toast.POSITION.TOP_LEFT });
		},
		onError: (error) => {
			const newerror = error.response.data;
			toast.error("Invalid Credentials Please Recheck", {
				position: toast.POSITION.TOP_LEFT,
			});
		},
	});
};
