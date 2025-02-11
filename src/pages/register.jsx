import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeOff, Eye } from "lucide-react";
import { useState } from "react";

const validationSchema = z
    .object({
        name: z.string().min(5, { message: 'Required (field cannot be empty)' }),
        email: z.string().min(1).email({ message: 'Must be a valid email address' }),
        password: z.string().min(8, { message: 'Must have at least 8 characters' }),
        confirmPassword: z.string().min(8)
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password don't match",
        path: ["confirmPassword"]
    })


 const LabelInput = ({error, label, placeholder, register, name}) => {
    return(
        <>
            <label>{label}</label>
                <input
                    placeholder={placeholder}
                    className="mt-2 border border-slate-400 rounded-lg p-1 w-auto"
                    {...register(name)}
                />
                {error && <span className="text-sm text-red-500 mb-5">{error?.message}</span>}
        </>
    )
 }   

 const LabelPassword = ({label, placeholder, register, name, error}) => {

    const [isVisible, setIsVisible] = useState(false)
    const toggleVisibility = () => setIsVisible(prevState => !prevState)
    return(
        <>
          <label >{label}</label>
                <div className="relative">
                    <input
                        type={isVisible ? "text" : "password"}
                        required
                        placeholder={placeholder}
                        className="mt-2 w-auto border border-slate-400 rounded-lg p-1 pr-8"
                        {...register(name, { required: true })}
                    />
                     <span
                        type="button"
                        onClick={toggleVisibility}
                        aria-label={isVisible ? "Hide password" : "Show password"}
                        aria-pressed={isVisible}
                        aria-controls="password"
                        className="absolute right-2 top-1/2 transform -translate-y-1/4 cursor-pointer"
                     >{isVisible ? (
                        <EyeOff size={20} aria-hidden="true" />
                     )
                        : (
                            <Eye size={20} aria-hidden="true" />
                        )}
                     </span>
                 </div>
                {error && <span className="text-sm text-red-500 mb-5">{error.message}</span>}
        </>
    )
 }



export const Register = () => {

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ resolver: zodResolver(validationSchema), mode: "onChange" })
    const submitForm = (data) => {
        console.log(data)
    }

    return (
        <div className="flex flex-col border border-slate-300 items-center">
            <form onSubmit={handleSubmit(submitForm)} className="flex flex-col">
                <h2 className="text-3xl text-center">Sign up</h2>
                
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
                <LabelPassword 
                 label="Confirm Password"
                 placeholder="Confirm password"
                 register={register}
                 name="confirmPassword"
                 error={errors.confirmPassword}
                />
                <button type="submit" disabled={!isValid} className="border border-purple-400 bg-purple-500 text-xl p-1 rounded-lg mt-10 text-white max-w-28 disabled:bg-blue-200 disabled:border-blue-200 disabled:text-gray-500">Register</button>
            </form>
        </div>
    )
}