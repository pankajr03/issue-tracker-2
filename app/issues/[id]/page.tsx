import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import React from 'react'
type Props = {
    params: {id: string}
}
const issueDetailPage = async({params}: Props) => {
  if (typeof params.id !== 'number') notFound()
  
  const issue = await prisma.issue.findUnique({
    where: {
        id: parseInt(params.id)
    }
  })
  if (!issue) notFound()

  return (
    <div>
        <h1>Issue Detail Page</h1>
        <p>{issue.id}</p>
        <p>{issue.title}</p>
        <p>{issue.description}</p>
        <p>{issue.status}</p>
        <p>{issue.createdAt.toDateString()}</p>
    </div>
  )
}

export default issueDetailPage