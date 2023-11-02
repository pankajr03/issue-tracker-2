import prisma from '@/prisma/client'
import { Box, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import EditIssueDetail from './EditIssueDetail'

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
  
  return (
    <Grid columns={{initial: "1", md: "2"}} pl={"5"} >
      <Box mb={"5"}>
        <EditIssueDetail issue={issue}
         />
      </Box>
      <Box>
        <EditIssueButton issueId={issue.id}/>
      </Box>
    </Grid>
  )
}

export default issueDetailPage