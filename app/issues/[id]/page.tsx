import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import EditIssueDetail from './EditIssueDetail'
import DeleteIssueButton from './DeleteIssueButton'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'
import AssigneeSelect from './AssigneeSelect'
import { cache } from 'react'

type Props = {
    params: {id: string}
}
const fetchIssues = cache((issueId: string)=> prisma.issue.findUnique({
  where: {
    id: parseInt(issueId)
  }
}))
const issueDetailPage = async({params}: Props) => {
  const session = await getServerSession(authOptions)
  if (typeof params.id !== 'string') notFound()
  
  const issue = await fetchIssues(params.id)
  if (!issue) notFound()
  
  return (
    <Grid columns={{initial: "1", sm: "5"}} gap="5" pl={"5"} >
      <Box mb={"5"} className='md:col-span-4'>
        <EditIssueDetail issue={issue}
         />
      </Box>
      <Box>
      {session &&
        <Flex direction="column" gap="4">
          <AssigneeSelect issue={issue}/>
          <EditIssueButton issueId={issue.id}/>
          <DeleteIssueButton issueId={issue.id} />
        </Flex>}
      </Box>
    </Grid>
  )
}

export async function generateMetadata({params}: Props) {
  const issue = await fetchIssues(params.id)
  return {
    title: `Issue Tracker - ${issue?.title}`,
    description: `Issue Tracker Details - ${issue?.description}`
  }
}


export default issueDetailPage