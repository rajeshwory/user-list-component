import React from "react"

export const Card = ({user}) => {
    return(
        <div className="flex flex-col border-2 rounded-lg border-slate-200 text-black-500 text-base bg-slate-100 p-2">
            <label>{user.name}</label>
            <label>{user.email}</label>
            <label>{user.phone}</label>
        </div>
    )
}