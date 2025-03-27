import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { EyeOff, Eye } from "lucide-react";
import supabase from "../config/supabaseClient";
import {  useNavigate } from "react-router-dom";

const validationSchema = z
    .object({
        name: z.string().min(3, { message: 'Required (field cannot be empty)' }),
        email: z.string().min(1).email({ message: 'Must be a valid email address' }),
        password: z.string().min(8, { message: 'Must have at least 8 characters' }),
    })

const LabelInput = ({ error, label, placeholder, register, name }) => {
    return (
        <div className="my-2">
            <label className="text-base font-light">{label}</label>
            <input
                placeholder={placeholder}
                className="mt-2 border border-slate-400 rounded-lg px-2 py-1 w-full h-11"
                {...register(name)}
            />
            {error && <span className="text-sm text-red-500 mb-5">{error?.message}</span>}
        </div>
    )
}

const LabelPassword = ({ label, placeholder, register, name, error }) => {

    const [isVisible, setIsVisible] = useState(false)
    const toggleVisibility = () => setIsVisible(prevState => !prevState)
    return (
        <div className="my-2">
            <label className="text-base font-light">{label}</label>
            <div className="relative">
                <input
                    type={isVisible ? "text" : "password"}
                    required
                    placeholder={placeholder}
                    className="mt-2 w-full border border-slate-400 rounded-lg h-11 py-1 pl-2 pr-8"
                    {...register(name, { required: true })}
                />
                <span
                    type="button"
                    onClick={toggleVisibility}
                    aria-label={isVisible ? "Hide password" : "Show password"}
                    aria-pressed={isVisible}
                    aria-controls="password"
                    className="absolute right-6 top-1/2 transform -translate-y-1/4 cursor-pointer"
                >{isVisible ? (
                    <EyeOff size={20} aria-hidden="true" />
                )
                    : (
                        <Eye size={20} aria-hidden="true" />
                    )}
                </span>
            </div>
            {error && <span className="text-sm text-red-500 mb-5">{error.message}</span>}
        </div>
    )
}

export const Login = () => {
    
    const navigate = useNavigate()
    const { register, handleSubmit: hookFormSubmit, formState: { errors, isValid } } = useForm({ resolver: zodResolver(validationSchema), mode: "onChange" })

    useEffect(() => {  
        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (_event, session) => {
            if (!session) {
              navigate('/login'); // Redirect to login if no session
            }
            else navigate('/')
          }
        );
  
        // Cleanup subscription
        return () => {
          subscription.unsubscribe();
        };
      }, []);

    const handleSubmit = hookFormSubmit( async(formData) => {

        try {
            const {data, error: supabaseError} = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        name: formData.name,
                    }
                }
            })
            if (supabaseError) throw supabaseError

            console.log("Login successful", data)
            navigate('/app')
        } catch (error) {
            console.error("Login error:", error)
            setError(error.message || "Login failed. Please try again.")
        }
    })

    return (
        <div className="p-10 min-w-[500px] mx-6  bg-white border border-stone-200 shadow-md rounded-xl">
            <form onSubmit={handleSubmit} className="flex flex-col w-full">
                <h2 className="text-4xl font-semibold text-center mb-5">Log In</h2>
                
                <LabelInput
                    label="Name"
                    placeholder="Enter your name"
                    error={errors.name}
                    name="name"
                    register={register}
                />
                <LabelInput
                    label="Email"
                    placeholder="Enter your email"
                    error={errors.email}
                    name="email"
                    register={register}
                />
                <LabelPassword
                    label="Password"
                    placeholder="Enter your password"
                    register={register}
                    name="password"
                    error={errors.password}
                />
                <div className="flex justify-center">
                    <button type="submit" disabled={!isValid}
                        className=" border border-blue-400 bg-blue-500 text-xl px-5 py-2 w-full rounded-lg mt-10 text-white disabled:bg-gray-200 disabled:border-gray-200 disabled:text-gray-400">
                        Sign In
                    </button>
                </div>
                <div className="flex justify-center mt-2">
                    <label className="text-sm font-light text-muted-foreground mr-1">Don't have an account?</label>
                    <Link to="/register" className="text-sm font-semibold hover:text-blue-500 hover:underline hover:decoration-blue-500 hover:cursor-pointer"><button>Register</button></Link>
                </div>
            </form>
        </div>
    )
}