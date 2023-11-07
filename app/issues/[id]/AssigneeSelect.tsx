'use client'
import Skeleton from '@/app/components/Skeleton'
import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

const AssigneeSelect = ({issue}: {issue: Issue}) => {
  const {data: users, error, isLoading} = useUsers()
    
  if (isLoading) return <Skeleton width={"12rem"} />
  
  const issueSelector = (userId: string)=> {
    axios
    .patch('/api/issues/'+issue.id, {
      assignedToUserId: userId || null
    })
    .catch(()=> {
      toast.error('Changes could not be saved!')
    })
  }

  return (
    <>
    <Select.Root defaultValue={issue.assignedToUserId || ""}
      onValueChange={issueSelector}
    >
        <Select.Trigger placeholder='Assign...' />
        <Select.Content>
            <Select.Group>
                <Select.Label>Unassigned</Select.Label>
                {users?.map((user)=> <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item> )}
                
            </Select.Group>
            
        </Select.Content>
        </Select.Root>
        <Toaster />
    </>
  )
}

const useUsers = () => 
  useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then(res => res.data),
    staleTime: 60 * 1000,
    retry: 2
  })
export default AssigneeSelect