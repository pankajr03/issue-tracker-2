import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Flex, Heading, Text, Card } from '@radix-ui/themes'
import delay from 'delay'
import { notFound } from 'next/navigation'
import React from 'react'
import Markdown from 'react-markdown'

type Props = {
    params: {id: string}
}
const issueDetailPage = async({params}: Props) => {
  if (typeof params.id !== 'string') notFound()
  
  const issue = await prisma.issue.findUnique({
    where: {
        id: parseInt(params.id)
    }
  })
  if (!issue) notFound()
  await delay(2000)
  return (
    <div className='p-6 max-w-4xl'>
      <Heading as="h1" align={'center'}>Issue Detail Page</Heading>
        
      <Card className='space-y-6'>
        <Heading as="h3">{issue.title}</Heading>
        <Flex gap="4" my="3">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        
        <Card className='prose'>
        <Markdown>
          {issue.description}
        </Markdown> 
        </Card>
      </Card>
    </div>
  )
}

export default issueDetailPage