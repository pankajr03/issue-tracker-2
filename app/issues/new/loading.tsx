import React from 'react'
import { Skeleton } from "@/app/components"

const loading = () => {
  return (
    <div className="max-w-xl p-6 mb-6 space-y-4">
        
        <form className="space-y-3" >
            
            <Skeleton height={"2rem"} className='my-6' />
        
            <Skeleton height={"20rem"} />
            
            <Skeleton width={"10rem"} className='my-6'/>
            
        </form>
    </div>
    
  )
}

export default loading