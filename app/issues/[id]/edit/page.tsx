import prisma from '@/prisma/client'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
const IssueForm = dynamic(()=> import("../../_components/IssueForm"), {
  ssr: false
})
type Props = {
    params: {id: string}
}
const EditIssuePage = async({params}: Props) => {
  if (typeof params.id !== 'string') notFound()
  
  const issue = await prisma.issue.findUnique({
    where: {
        id: parseInt(params.id)
    }
  })
  if (!issue) notFound()
  
  return (
    <IssueForm issue={issue} />
  )
}

export default EditIssuePage