'use client'
import { Flex, Text, Button, Grid } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import Pagination from './Pagination'
import LatestIssues from './LatestIssues'
import IssueSummary from './IssueSummary'
import prisma from '@/prisma/client'
import IssueChart from './IssueChart'

export default async function Home({searchParams}:  {searchParams: {page: string}}) {
  const router = useRouter()
  const countOpen = await prisma.issue.count({
    where: {status: 'OPEN'}
  })

  const countClosed = await prisma.issue.count({
    where: {status: 'CLOSED'}
  })

  const countInProgress = await prisma.issue.count({
    where: {status: 'IN_PROGRESS'}
  })
  

  return (
    <Grid columns={{initial: "1",md: "2"}} gap={"5"}>
      <Flex direction={'column'} gap="5">
      <IssueSummary open={countOpen} closed={countClosed} in_progress={countInProgress}/>
      <IssueChart open={countOpen} closed={countClosed} in_progress={countInProgress}/>
      
      </Flex>
      <LatestIssues />
    </Grid>
   
  )
}
