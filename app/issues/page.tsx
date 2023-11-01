import { Button, Table, TableBody, TableHeader } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import prisma from '@/prisma/client'
const IssuePage = async() => {
  const issues = await prisma.issue.findMany()
  return (
    <div>
    <div>Issues Page</div>
    <Link href='/issues/new' ><Button>Add New Issue</Button></Link>

    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className='hidden md:table-cell'>Created Date</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {issues.map(issue => (
          <Table.Row key={issue.id}>
            <Table.RowHeaderCell>
              {issue.title}
              <div className='block md:hidden'>{issue.status}</div>
              <div className='block md:hidden'>{issue.createdAt.toDateString()}</div>
            </Table.RowHeaderCell>
            <Table.Cell className='hidden md:table-cell'>
              {issue.status}
              
            </Table.Cell>
            <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
          </Table.Row>
        ))}
        

        
      </Table.Body>
    </Table.Root>
    </div>
  )
}

export default IssuePage