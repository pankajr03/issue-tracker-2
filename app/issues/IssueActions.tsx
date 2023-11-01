import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const IssueActions = () => {
  return (
    <>
    <div>Issues Page</div>
    <Link href='/issues/new' ><Button>Add New Issue</Button></Link>
    </>
  )
}

export default IssueActions