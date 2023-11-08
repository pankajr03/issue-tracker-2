'use client'
import { Flex, Text, Button } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import Pagination from './Pagination'
export default function Home() {
  const router = useRouter()
  return (
    <div>
      <h1>Home page</h1>
        <Pagination currentPage={10} pageSize={10} itemCount={100} />
    </div>
  )
}
