import React, { useEffect, useState } from "react";

interface EventFormProps {
    show: () => void;
    id: string;
    delete:(id:string)=>void;
}

export default function DeleteModal({ show, id, delete:onDelete } : EventFormProps) {

    return (

        <div>
            <div className='flex justify-center items-center absolute left-0 right-0 bottom-0 top-0'>
                <div className="bg-[#E8F5FF] min-w-[300px] max-w-[400px] py-5 px-4 rounded-lg shadow-lg">
                    <div className="flex justify-center items-center pb-5">
                        <h1 className="sm:text-xl text-center">Comfirm Delete Event</h1>
                    </div>
                    <div className="flex justify-between mx-5">
                        <button className="bg-green-500 rounded-md p-2 text-white" onClick={()=>show()}>CANCEL</button>
                        <button className="bg-red-500 rounded-md p-2 text-white" onClick={()=> onDelete(id)}>DELETE</button>
                    </div>

                </div>
            </div>
        </div>
    );
}
