import { Button, Flex, Heading } from '@radix-ui/themes'
import Link from 'next/link'
import IssueStatusFilter from './IssueStatusFilter'

const IssueActions = () => {
  return (
    <Flex justify='between'>
      <IssueStatusFilter />
      <Link href='/issues/new'><Button>Add New Issue</Button></Link>
    </Flex>
  )
}

export default IssueActions