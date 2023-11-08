'use client'
import { Flex, Text, Button } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import Pagination from './Pagination'

export default function Home({searchParams}:  {searchParams: {page: string}}) {
  const router = useRouter()

  return (
    <div>
      <h1>Home page</h1>
        <Pagination currentPage={parseInt(searchParams.page)} pageSize={10} itemCount={100} />
    </div>
  )
}
