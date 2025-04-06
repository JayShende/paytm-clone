import React from 'react';
export function Button({label,onClick}){

    return(
        <div className="bg-zinc-900 text-white py-2 mx-3 rounded-md text-center font-medium hover:bg-zinc-700 cursor-pointer"
        onClick={onClick}
        >
            {label}
        </div>
    )
}