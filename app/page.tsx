import prisma from '@/prisma/client'
import { Flex, Grid } from '@radix-ui/themes'
import { Metadata } from 'next'
import IssueChart from './IssueChart'
import IssueSummary from './IssueSummary'
import LatestIssues from './LatestIssues'

export default async function Home({searchParams}:  {searchParams: {page: string}}) {
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

export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'Issue tracker as app for loggin issues in the system.'
}
