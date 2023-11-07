import authOptions from "@/app/auth/authOptions";
import { patchIssueSchema } from "@/app/validateSchema";
import prisma from "@/prisma/client";
import delay from "delay";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH( request: NextRequest, {params}: {params: {id: string}}) {
    
    const session = await getServerSession(authOptions)   
    if (!session)
        return NextResponse.json({}, {status: 401})
    const body = await request.json()
    const validation = patchIssueSchema.safeParse(body)
    const { title, description, assignedToUserId } = body
    if (!validation.success)
        return NextResponse.json(validation.error.format(), {status: 400})

    if (assignedToUserId) {
        const user = prisma.user.findUnique({
            where: {
                id: assignedToUserId
            }
        })
        if (!user)
            return NextResponse.json({error: 'Invalid user.'}, {status: 400} )
    }
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })
    if (!issue) 
        return NextResponse.json({ error: 'Invalid issue'}, {status: 404})
    
    const updateIssue = await prisma.issue.update({
        where: {
            id: parseInt(params.id)
        },
        data: {
            title,
            description,
            assignedToUserId
        }
    })
    return NextResponse.json(updateIssue, {status: 201})
}

export async function DELETE( request: NextRequest, {params}: {params: {id: string}}) {
    const session = await getServerSession(authOptions)   
    if (!session)
        return NextResponse.json({}, {status: 401})
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })
    // await delay(2000)
    if (!issue) 
        return NextResponse.json({ error: 'Invalid issue'}, {status: 404})
    
    const DeleteIssue = await prisma.issue.delete({
        where: {
            id: parseInt(params.id)
        }
    })
    return NextResponse.json({}, {status: 201})
}