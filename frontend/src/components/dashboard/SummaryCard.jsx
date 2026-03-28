//import React from "react";

const SummaryCard =({icon, text, number, color}) => {
    return(
        <div className='app-card p-4 flex items-center gap-4'>
            <div className={`text-2xl h-12 w-12 rounded-xl flex justify-center items-center ${color} text-white shadow-sm`}>
                {icon}
            </div>
            <div>
                <p className='text-sm font-semibold text-slate-500'>{text} </p>
                <p className='text-2xl font-extrabold text-slate-900'>{number}</p>
            </div>
        </div>
    )

}

export default SummaryCard