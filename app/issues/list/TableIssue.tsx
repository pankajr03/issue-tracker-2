import { IssueStatusBadge, LinkRadixLink } from '@/app/components'
import { Issue, Status } from '@prisma/client'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import { Table } from '@radix-ui/themes'
import Link from 'next/link'
export interface IssueQuery {
    status: Status, 
    orderBy: keyof Issue, 
    page: string
}
interface Props {
    searchParams: IssueQuery,
    issues: Issue[]
  }
const tableIssue = async({searchParams, issues}: Props) => {
      
  return (
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
  )
}

export default tableIssue
const columns = [
    {label: 'Title', value: 'title' },
    {label: 'Status', value: 'status', className: 'hidden md:table-cell' },
    {label: 'Created Date', value: 'createdAt', className: 'hidden md:table-cell'  }
  ] 
export const columnNames = columns.map(column => column.value)
