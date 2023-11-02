'use client'
import { Flex, Text, Button } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
export default function Home() {
  const router = useRouter()
  return (
    <div>
      <h1>Home page</h1>
        <Button onClick={()=> router.push('/issues/new') }>Add Button</Button>
    </div>
  )
}
