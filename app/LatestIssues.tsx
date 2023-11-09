import prisma from '@/prisma/client'
// import { Issue } from '@prisma/client'
import { Flex, Heading, Text, Card, Table, Avatar } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import { IssueStatusBadge } from './components'

const LatestIssues = async() => {
  const fiveLatestIssues = await prisma.issue.findMany({
    orderBy: {createdAt: 'desc'},
    take: 5,
    include: {
      assignedToUser: true
    }
  })

  return (
        <Card>
          <Heading mb={"5"}>Latest Issues</Heading>
        <Table.Root>
          <Table.Body>
              {fiveLatestIssues.map(issue => (
                  <Table.Row key={issue.id}>
                      <Table.Cell>
                        <Flex justify={'between'} gap={"1"}>
                        <Flex direction={'column'} align={'start'} gap="2">
                          <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                          <IssueStatusBadge status={issue.status}/>
                        </Flex>
                        {issue.assignedToUser! && 
                        <Avatar src={issue.assignedToUserId.image!}
                        radius='full'
                        fallback="?"
                        className='cursor-pointer'
                        referrerPolicy='no-referrer'
                        />
                        }
                        </Flex>
                        
                      </Table.Cell>
                    </Table.Row> )
              )}
          </Table.Body>
        </Table.Root>
        </Card>

  )
}

export default LatestIssues