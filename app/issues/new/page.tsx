'use client'
import { TextField, Button, Callout } from '@radix-ui/themes'
import React, { useState } from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {useForm, Controller} from "react-hook-form"
import { Issue } from '@prisma/client';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { AiFillInfoCircle } from 'react-icons/ai'

interface IssueForm {
    title: string;
    description: string
}
const NewIssue = () => {
    const {register, control, handleSubmit} = useForm<IssueForm>()
    const router = useRouter()
    const [error, setError] = useState('')
  return (
    <div className='max-w-xl p-6 mb-6 space-y-4 '>
        {error && 
        <Callout.Root>
            <Callout.Icon>
                <AiFillInfoCircle />
            </Callout.Icon>
            <Callout.Text>
                {error}
            </Callout.Text>
            </Callout.Root>
}
        <form className='space-y-4 ' onSubmit={handleSubmit(
            async(data) => {
                
                try {
                    await axios.post('/api/issues',data);
                    router.push('/')    
                } catch (error) {
                    setError('It is an unexpected error!')
                }
                
            
            })} >
            <TextField.Root>
            <TextField.Input placeholder="Enter title" {...register('title')}/>
            </TextField.Root>
            
            <Controller 
            name="description" 
            control={control} 
            render={({field})=> <SimpleMDE placeholder="Enter comment…" {...field} />}
            />
            
            <Button>Add Issue</Button>

        </form>
    </div>
  )
    
}

export default NewIssue