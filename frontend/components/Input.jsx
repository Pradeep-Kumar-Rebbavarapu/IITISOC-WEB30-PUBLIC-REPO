import React from 'react'
import { Field, ErrorMessage } from 'formik'
import { useEffect } from 'react';
export default function Input(props1) {
    const { children, id, type, name, className, icon, label, ...rest } = props1

    return (
        <div id="input" className=''>

            <div className=''>


                <Field as={props1.as} name={name}  {...rest}>
                    {
                        (props2) => {

                            const { field, form, meta } = props2

                            return (

                                <div className="relative w-full h-[50px] border-b-2 border-[#162983] my-[30px] flex">
                                    <span className="absolute right-2 text-xl text-[#154360] leading-[57px]"><ion-icon name="lock-closed"></ion-icon></span>


                                    <input {...field} className="w-full h-full bg-transparent border-none outline-none peer font-semibold pr-8 pl-1" required name={name} id={name} type={type} />
                                    <label htmlFor={name} className="absolute top-[30px] left-[5px] translate-y-[-50%] text-lg text-[#154360] font-semibold peer-focus:top-[-5px] peer-valid:top-[-5px] transition-all duration-500 uppercase">{label?label:name}</label>
                                    <div className='translate-y-[20px] text-red-500'>
                                        <ErrorMessage className='' name={name}>
                                            {msg => {
                                                return (
                                                    <div className="">
                                                        <p className='p-1 text-center text-red-500 bg-white '>{msg}</p>
                                                    </div>
                                                )
                                            }}

                                        </ErrorMessage>
                                    </div>
                                </div>

                            )



                        }
                    }
                </Field>




            </div>




        </div>

    )
}