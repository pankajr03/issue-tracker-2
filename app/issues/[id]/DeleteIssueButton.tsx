'use client'
import { Pencil2Icon } from '@radix-ui/react-icons'
import { Flex, AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogTrigger, Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const DeleteIssueButton = ({issueId}: {issueId: number}) => {
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button>
            {/* <Pencil2Icon />
            <Link href={`/issues/${issueId}/delete`}> 
            Delete Issue
            </Link> */}
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
              <Button variant="solid" color="red">
                Revoke access
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
     
    </>
    
  )
}

export default DeleteIssueButton