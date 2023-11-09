import { Status } from '@prisma/client'
import { Flex, Card, Text } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
interface Props {
    open: number,
    closed: number,
    in_progress: number
}
const IssueSummary = ({open, closed, in_progress}: Props)   => {
  const statues: {
    label: string;
    value: number;
    status: Status
  } [] = [
    {label: 'Open Issues', value: open, status: 'OPEN' },
    {label: 'Closded Issues', value: closed, status: 'CLOSED' },
    {label: 'In Progress Issues', value: in_progress, status: 'IN_PROGRESS' }
  ] 
  return (
    <Flex gap={"4"}>
        {statues.map(status => (
            <Card key={status.value}>
                <Flex direction={"column"}>
                <Link className="text-sm font-medium" href={`/issues/list?status=${status.status}`}>{status.label}</Link>
                <Text size={"5"} className='font-bold'>{status.value}</Text>
                </Flex>
                
            </Card>
        ) )}
    </Flex>
  )
}

export default IssueSummary