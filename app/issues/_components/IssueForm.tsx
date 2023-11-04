'use client'
import { ErrorMessage, Spinner } from "@/app/components";
import { schema } from '@/app/validateSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FaSave } from 'react-icons/fa';
import SimpleMdeReact from 'react-simplemde-editor';
// const SimpleMdeReact = dynamic(
//     () => import ("react-simplemde-editor"), {
//         ssr: false
//      })
interface Inputs {
    title: string
    description: string
}

const IssueForm = ({issue}: {issue?: Issue}) => {
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const {
        register,
        handleSubmit,
        control,
        formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema)
  })

  const onSubmit: SubmitHandler<Inputs> = async(data) => {
    try {
        setIsSubmitting(true)
        if (issue) {
            await axios.patch('/api/issues/' + issue.id, data)
        } else {
            await axios.post('/api/issues',data);
        }
         
        router.push('/issues')
        router.refresh()    
    } catch (error) {
        setIsSubmitting(false)
        setError('It is an unexpected error!')
    }
  }

  

  return (
    <div className="max-w-xl p-6 mb-6 space-y-4">
        {error && 
        <Callout.Root>
            
            <Callout.Text>
                {error}
            </Callout.Text>
            </Callout.Root>
        }
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <TextField.Root>
                <TextField.Input defaultValue={issue?.title} placeholder="Input title" {...register('title')} />
            </TextField.Root>

            <ErrorMessage>
                {errors.title?.message}
            </ErrorMessage>

            <Controller 
            name="description" 
            control={control} 
            defaultValue={issue?.description}
            render={({field})=> <SimpleMdeReact placeholder="Reply to comment…" {...field} /> }
            />
            <ErrorMessage>
                {errors.description?.message}
            </ErrorMessage>
            
            <Button disabled={isSubmitting}>
                <FaSave width="16" height="16" /> {issue ? 'Update Form': 'Save Form'} { ' ' } {isSubmitting && <Spinner />}
            </Button>
            
        </form>
    </div>
  )
}

export default IssueForm