import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeOff, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";

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



export const Register = () => {
    
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const { register, handleSubmit: hookFormSubmit, formState: { errors, isValid } } = useForm({ resolver: zodResolver(validationSchema), mode: "onChange" })
    const handleGoogleSignin = async () => {
        setError(null);
    
        try {
          const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
              redirectTo: `${window.location.origin}/app`, // Redirect after login
            },
          });
          if (error) throw error;
          // No need to redirect here; Supabase handles it
        } catch (err) {
          setError(err.message);
        }
      };

      const handleGithubSignin = async () => {
        setError(null);
        try {
          const { error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: { redirectTo: `${window.location.origin}/app` },
          });
          if (error) throw error;
        } catch (err) {
          setError(err.message);
        }
      };

    useEffect(() => {  
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (_event, session) => {
            if (!session) {
              navigate('/register'); 
            }
            else navigate('/')
          }
        );
  
        return () => {
          subscription.unsubscribe();
        };
      }, []);

    const handleSubmit = hookFormSubmit( async (formData) => {
        setError(null)
        setSuccess(false)

        try {
            const {data, error: supabaseError} = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        name: formData.name,
                    }
                }
            });

            if (supabaseError) throw supabaseError

            console.log("Registration successful", data)
            setSuccess(true)
        } catch (error) {
            console.error("Registration error:", error)
            setError(error.message || "Registration failed. Please try again.")
        }
    })

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
                    <Link to="/login" className="text-sm font-semibold hover:text-blue-500 hover:underline hover:decoration-blue-500 hover:cursor-pointer">Log in</Link>
                </div>
            </form>

            <div className="my-6 flex flex-col items-center justify-center gap-2">
            <p className="text-center text-gray-500">Or sign in with</p>
            <button
            onClick={handleGoogleSignin}
            className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-red-600 disabled:bg-gray-400 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748H12.545z"
              />
            </svg>
          </button>
          <button
            onClick={handleGithubSignin}
            className="my-2 w-1/3 bg-gray-500 text-white p-2 rounded hover:bg-gray-900 disabled:bg-gray-400 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              />
            </svg>
          </button>           
            </div>
        </div>
    )
}