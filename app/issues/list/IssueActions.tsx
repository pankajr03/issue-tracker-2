import { Button, Heading } from '@radix-ui/themes'
import Link from 'next/link'

const IssueActions = () => {
  return (
    <div className='space-x-3 py-6'>
      <Heading as='h2' className='py-2'>Issues Page</Heading>
      <Link href='/issues/new'><Button>Add New Issue</Button></Link>
    </div>
  )
}

export default IssueActions