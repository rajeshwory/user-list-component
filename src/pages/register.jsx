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



export const Register = () => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [isConfirmVisible, setIsConfirmVisible] = useState(false)

    const togglePasswordVisibility = () => setIsPasswordVisible(prevState => !prevState)
    const toggleConfirmVisibility = () => setIsConfirmVisible(prevState => !prevState)

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ resolver: zodResolver(validationSchema), mode: "onChange" })
    const submitForm = (data) => {
        console.log(data)
    }
    return (
        <div>
            <form onSubmit={handleSubmit(submitForm)} className="flex flex-col">
                <label htmlFor="">Name</label>
                <input
                    required
                    placeholder="Enter your name"
                    className="mt-2 border border-slate-400 rounded-lg p-1 max-w-72"
                    {...register('name')}
                />
                {errors.name && <span className="text-sm text-red-500 mb-5">{errors.name.message}</span>}
                <label htmlFor="">Email</label>
                <input
                    required
                    placeholder="Enter your email"
                    className="mt-2 border border-slate-400 rounded-lg p-1 max-w-72"
                    {...register('email')}
                />
                {errors.email && <span className="text-sm text-red-500 mb-5">{errors.email.message}</span>}
                <label htmlFor="">Password</label>
                <div className="">
                    <input
                        type={isPasswordVisible ? "text" : "password"}
                        required
                        placeholder="Enter your password"
                        className="mt-2 border border-slate-400 rounded-lg p-1 min-w-72"
                        {...register('password', { required: true })}
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                        aria-pressed={isPasswordVisible}
                        aria-controls="password"
                        className="ml-2 cursor-pointer"
                    >{isPasswordVisible ? (
                        <EyeOff size={20} aria-hidden="true" />
                    )
                        : (
                            <Eye size={20} aria-hidden="true" />
                        )}</button>
                </div>
                {errors.password && <span className="text-sm text-red-500 mb-5">{errors.password.message}</span>}
                <label>Confirm Password</label>
                <div>
                    <input
                        type={isConfirmVisible ? "text" : "password"}
                        required
                        placeholder="Confirm password"
                        className="mt-2 border border-slate-400 rounded-lg p-1 min-w-72"
                        {...register('confirmPassword', { required: true })}
                    />
                    <button
                        type="button"
                        onClick={toggleConfirmVisibility}
                        aria-label={isConfirmVisible ? "Hide password" : "Show password"}
                        aria-pressed={isConfirmVisible}
                        aria-controls="confirmPassword"
                        className="ml-2 cursor-pointer"
                    >{isConfirmVisible ? (
                        <EyeOff size={20} aria-hidden="true" />
                    )
                        : (
                            <Eye size={20} aria-hidden="true" />
                        )}</button>
                </div>
                {errors.confirmPassword && <span className="text-sm text-red-500 mb-5">{errors.confirmPassword.message}</span>}
                <button type="submit" disabled={!isValid} className="border border-purple-400 bg-purple-500 text-xl p-1 rounded-lg mt-10 text-white max-w-28 disabled:bg-blue-200 disabled:border-blue-200 disabled:text-gray-500">Register</button>
            </form>
        </div>
    )
}