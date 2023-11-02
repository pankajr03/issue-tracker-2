import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { Card, Flex, Heading,Text } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const loadingDetailPage = () => {
  return (
    <div className='p-6 max-w-4xl'>
      <Heading as="h1" align={'center'}>Issue Detail Page</Heading>
        
      <Card className='space-y-6'>
        <Heading as="h3"><Skeleton /></Heading>
        <Flex gap="4" my="3">
        <Skeleton />
        <Skeleton />
        </Flex>
        <Card>
        <p><Skeleton /></p>
        </Card>
      </Card>
    </div>
  )
}

export default loadingDetailPage