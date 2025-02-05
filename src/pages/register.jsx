import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const validationSchema = z.object({
    name: z.string().min(5, {message: 'Required (field cannot be empty)'}),
    email: z.string().min(1).email({message: 'Must be a valid email address'}),
    password: z.string().min(8, {message: 'Must have at least 8 characters'})
})


export const Register = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({resolver:zodResolver(validationSchema)})
    const submitForm = (data) => {
        console.log(data)
    }
    return(
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
                <input 
                type="password" 
                required 
                placeholder="Enter your password" 
                className="mt-2 border border-slate-400 rounded-lg p-1 max-w-72"
                {...register('password',{required:true})}
                />
                {errors.password && <span className="text-sm text-red-500 mb-5">{errors.password.message}</span>}
                <button type="submit" className="border border-purple-400 bg-purple-500 text-xl p-1 rounded-lg mt-10 text-white max-w-28">Register</button>
            </form>
        </div>
    )
}