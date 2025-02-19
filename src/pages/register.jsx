import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeOff, Eye } from "lucide-react";
import { useState } from "react";
import registerApi from "../api/register";

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

//  const handleRegister = async (formData) => {
//     try {
//       const response = await registerUser({
//         email: formData.email,
//         password: formData.password,
//         name: formData.name,
//         // Add other fields as needed
//       });
//       // Handle successful registration
//       console.log('Registration successful:', response);
//     } catch (error) {
//       // Handle registration error
//       console.error('Registration failed:', error);
//     }
//   };



 const LabelPassword = ({label, placeholder, register, name, error}) => {

    const [isVisible, setIsVisible] = useState(false)
    const toggleVisibility = () => setIsVisible(prevState => !prevState)
    return(
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



export const Register = () => {

    const { register, formState: { errors, isValid } } = useForm({ resolver: zodResolver(validationSchema), mode: "onChange" })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setSuccess(false)
    
        try {
          const response = await registrationApi.post("/register", formData)
          console.log("Registration successful:", response.data)
          setSuccess(true)
          setFormData({ username: "", email: "", password: "" }) // Reset form
        } catch (error) {
          console.error("Registration error:", error)
          setError("Registration failed. Please try again.")
        }
      }

    return (
        <div className="p-10 min-w-[500px] mx-6  bg-white border border-stone-200 shadow-md rounded-xl">
            <form onSubmit={handleSubmit} className="flex flex-col w-full">
                <h2 className="text-4xl font-semibold text-center mb-5">Sign up</h2>
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
                <div className="flex justify-center">
                 <button type="submit" disabled={!isValid} 
                   className=" border border-blue-400 bg-blue-500 text-xl px-5 py-2 w-full rounded-lg mt-10 text-white disabled:bg-gray-200 disabled:border-gray-200 disabled:text-gray-400">
                   Register
                 </button>
                </div>
                <div className="flex justify-center mt-2">
                <label className="text-sm font-light text-muted-foreground mr-1">Already have an account?</label>
                <label className="text-sm font-semibold hover:text-blue-500 hover:underline hover:decoration-blue-500 hover:cursor-pointer">Log in</label>
                </div>
            </form>
        </div>
    )
}