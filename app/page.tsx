'use client'
import { Flex, Text, Button } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import Pagination from './Pagination'
import LatestIssues from './LatestIssues'

export default function Home({searchParams}:  {searchParams: {page: string}}) {
  const router = useRouter()

  return (
    <div>
      <LatestIssues />
    </div>
  )
}
