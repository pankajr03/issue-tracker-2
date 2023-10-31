'use client'
import { TextField, TextArea, Button } from '@radix-ui/themes'
import React from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {useForm, Controller} from "react-hook-form"
import { Issue } from '@prisma/client';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface IssueForm {
    title: string;
    description: string
}
const NewIssue = () => {
    const {register, control, handleSubmit} = useForm<IssueForm>()
    const router = useRouter()
  return (
    <form className='max-w-xl space-y-4 p-6' onSubmit={handleSubmit(
        async(data) => {
            await axios.post('/api/issues',data);
            router.push('/')
        
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
  )
    
}

export default NewIssue