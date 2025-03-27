import { Link } from "react-router-dom";

export const Header = () => {
    return (
        <div className="w-full h-16 bg-slate-500 text-white flex flex-row justify-around items-center mb-5 py-2 px-5">
            <h1>Header</h1>
            <Link
             to={`/user`}
            >
            <label>Profile</label>
            </Link>
            
        </div>
    )
}