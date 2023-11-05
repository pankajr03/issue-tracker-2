'use client'
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogTrigger, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const DeleteIssueButton = ({issueId}: {issueId: number}) => {
  const router = useRouter()
  const [error, setError] = useState(false)
  const deleteIssue = async() => {
    try {
      throw new Error()
      await axios.delete('/api/issues/'+issueId)
      router.push('/issues')
      router.refresh()
    } catch (error) {
      setError(true)
    }
      
    
  }
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button>
            Delete Issue
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