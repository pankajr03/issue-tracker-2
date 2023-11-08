import { IssueStatusBadge, LinkRadixLink } from "@/app/components"
import prisma from '@/prisma/client'
import { Table } from '@radix-ui/themes'

import IssueActions from './IssueActions'
import { Issue, Status } from "@prisma/client"
import Link from "next/link"
import { ArrowUpIcon } from "@radix-ui/react-icons"
interface Props {
  searchParams: {status: Status, orderBy: keyof Issue}
}
const IssuePage = async({searchParams}: Props) => {

  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status) ? 
    searchParams.status 
    : undefined
  const orderBy = searchParams.orderBy
    
  const issues = await prisma.issue.findMany({
    where: {
      status
    }
  })

  const columns = [
    {label: 'Title', value: 'title' },
    {label: 'Status', value: 'status', className: 'hidden md:table-cell' },
    {label: 'Created Date', value: 'createdAt', className: 'hidden md:table-cell'  }
  ]

  return (
    <div className='p-6 max-w-4xl'>
    <IssueActions />

    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map(column => (
            <Table.ColumnHeaderCell className={column.className}>
              {/* <Link href={`/issues/list?orderBy=${column.value}`}>{column.label}</Link> */}
              <Link href={{
                query: {...searchParams, orderBy: column.value}
              }}>{column.label} {column.value === searchParams.orderBy && <ArrowUpIcon className="inline"/>}</Link>
            </Table.ColumnHeaderCell>  
          ))}
          
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {issues.map(issue => (
          <Table.Row key={issue.id}>
            <Table.RowHeaderCell>
              <LinkRadixLink href={`/issues/${issue.id}`}>
                {issue.title}
              </LinkRadixLink>
              
              <div className='block md:hidden'>
                <IssueStatusBadge status={issue.status} />
               
              </div>
              <div className='block md:hidden'>{issue.createdAt.toDateString()}</div>
            </Table.RowHeaderCell>
            <Table.Cell className='hidden md:table-cell'>
            <IssueStatusBadge status={issue.status} />
              
            </Table.Cell>
            <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
          </Table.Row>
        ))}
        

        
      </Table.Body>
    </Table.Root>
    </div>
  )
}
//export const dynamic = 'force-dynamic'
export const revalidate = 0 
export default IssuePage