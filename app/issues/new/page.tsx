'use client'
import { TextField, Text, Button, Callout } from '@radix-ui/themes'
import { FaSave } from 'react-icons/fa';
import React, { useState } from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from '@/app/validateSchema';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
interface Inputs {
    title: string
    description: string
}

const NewIssue = () => {
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
        await axios.post('/api/issues',data);
        router.push('/')    
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
                <TextField.Input placeholder="Input title" {...register('title')} />
            </TextField.Root>

            <ErrorMessage>
                {errors.title?.message}
            </ErrorMessage>

            <Controller 
            name="description"
            control={control}
            render={({field})=> <SimpleMDE placeholder="Reply to comment…" {...field} /> }
            />
            <ErrorMessage>
                {errors.description?.message}
            </ErrorMessage>
            
            <Button disabled={isSubmitting}>
                <FaSave width="16" height="16" /> Add Form {isSubmitting && <Spinner />}
            </Button>
            
        </form>
    </div>
  )
}

export default NewIssue