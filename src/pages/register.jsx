import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const Register = () => {
    const {register, handleSubmit, formState: {errors}} = useForm()
    return(
        <div>
            <form onSubmit={handleSubmit((data) => console.log(data))} className="flex flex-col">
                <label>Name</label>
                <input 
                type="text" 
                required 
                placeholder="Enter your name" 
                className="my-2 border border-slate-400 rounded-lg p-1 max-w-72"/>
                <label>Email</label>
                <input 
                type="email" 
                required 
                placeholder="Enter your email" 
                className="my-2 border border-slate-400 rounded-lg p-1 max-w-72"/>
                <label>Password</label>
                <input 
                type="password" 
                required 
                placeholder="Enter your password" 
                className="mt-2 border border-slate-400 rounded-lg p-1 max-w-72"/>
                <button type="submit" className="border border-purple-400 bg-purple-500 text-xl p-1 rounded-lg mt-10 text-white max-w-28">Register</button>
            </form>
        </div>
    )
}