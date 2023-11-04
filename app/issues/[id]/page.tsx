import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import EditIssueDetail from './EditIssueDetail'
import DeleteIssueButton from './DeleteIssueButton'

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
    <Grid columns={{initial: "1", sm: "5"}} gap="5" pl={"5"} >
      <Box mb={"5"} className='md:col-span-4'>
        <EditIssueDetail issue={issue}
         />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <EditIssueButton issueId={issue.id}/>
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      </Box>
    </Grid>
  )
}

export default issueDetailPage