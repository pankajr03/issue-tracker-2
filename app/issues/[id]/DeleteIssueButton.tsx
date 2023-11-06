'use client'
import { Spinner } from '@/app/components'
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogTrigger, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const DeleteIssueButton = ({issueId}: {issueId: number}) => {
  const router = useRouter()
  const [error, setError] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const deleteIssue = async() => {
    try {
      setIsDeleting(true)
      await axios.delete('/api/issues/'+issueId)
      router.push('/issues/list')
      router.refresh()
    } catch (error) {
      setIsDeleting(false)
      setError(true)
    }
      
    
  }
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button disabled={isDeleting}>
            Delete Issue {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>

        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>Confirm delete Item</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure? This application will no longer be accessible and any
            existing sessions will be expired.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">Cancel</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red" onClick={deleteIssue}>
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root>
        <AlertDialogTrigger>
          
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Confirm Delete Item</AlertDialogTitle>
        </AlertDialogContent>
      </AlertDialog.Root>
     
     <AlertDialog.Root open={error}>
      <AlertDialog.Content>
        <AlertDialog.Title>
          Error
        </AlertDialog.Title>
        <AlertDialog.Description>
          This isssue cannot be deleted!
        </AlertDialog.Description>
        <Button color='gray' mt="2" onClick={()=>setError(false)}>Okay</Button>
      </AlertDialog.Content>
     </AlertDialog.Root>
    </>
    
  )
}

export default DeleteIssueButton