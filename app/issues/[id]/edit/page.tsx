import { Grid, Box } from '@radix-ui/themes'
import React from 'react'
import EditIssueButton from '../EditIssueButton'
import EditIssueDetail from '../EditIssueDetail'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import IssueForm from '../../_components/IssueForm'
type Props = {
    params: {id: string}
}
const EditIssuePage = async({params}: Props) => {
  if (typeof params.id !== 'string') notFound()
  
  const issue = await prisma.issue.findUnique({
    where: {
        id: parseInt(params.id)
    }
  })
  if (!issue) notFound()
  console.log(issue)
  return (
    <IssueForm issue={issue} />
  )
}

export default EditIssuePage