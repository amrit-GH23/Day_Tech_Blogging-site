import React from 'react'
import toast from 'react-hot-toast';

const Confirm = ({id,onConfirm,onCancel}) => {
    const API_BASE = import.meta.env.VITE_API_URL;
    const handleDelete= async(id)=>{
        try{
        const response = await fetch(`${API_BASE}/api/delete/${id}/`,{ 
          method: "DELETE"
         } )
        if(response.status==200){
          toast.success("blog deleted")
          onConfirm()
        }
        else{
          toast.error("Error occurred")
        }
        }
        catch(error){
            console.log("error",error);
        }
        
      }

  return (
    <div>
       <div>
          <p className='bg-black text-white p-1.5 rounded-xl '>Do you want to delete the blog</p>
       </div>
       <div className='flex justify-evenly mt-2.5'>
           <button
            className='bg-red-600 p-2 rounded-xl cursor-pointer'
                onClick={
                    (e)=>{
                        e.stopPropagation()
                        handleDelete(id)
                    }
                }
                >YES</button>
            <button
            className='bg-green-600 p-2 rounded-xl cursor-pointer'
                onClick={(e)=>{
                    e.stopPropagation()
                    onCancel()
                }}
                >No</button>
       </div>
    </div>
  )
}

export default Confirm
