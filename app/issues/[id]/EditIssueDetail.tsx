import { IssueStatusBadge } from '@/app/components'
import { Issue } from '@prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import Markdown from 'react-markdown'


const EditIssueDetail = ({issue}: {issue: Issue}) => {
  return (
    <>
        <Heading as="h1" align={'center'}>Issue Detail Page</Heading>
        <Heading as="h3">{issue.title}</Heading>
        <Flex gap="4" my="3">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        
        <Card className='prose max-w-full'>
        <Markdown>
          {issue.description}
        </Markdown> 
        </Card>
    </>
  )
}

export default EditIssueDetail