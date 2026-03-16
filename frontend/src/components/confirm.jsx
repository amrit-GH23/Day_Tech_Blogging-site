import React from 'react'
import toast from 'react-hot-toast';

const Confirm = ({id,onConfirm,onCancel}) => {
    const token = localStorage.getItem("accessToken");
    const API_BASE = "https://day-tech-blogging-site.onrender.com";
    const handleDelete= async(id)=>{
        try{
        if (!token) {
        toast.error("Authentication required");
        return;
        }

        const response = await fetch(`${API_BASE}/api/delete/${id}/`,{ 
          method: "DELETE",
          headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${token}`,
         },
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
