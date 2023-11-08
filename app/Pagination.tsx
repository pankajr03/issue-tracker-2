'use client'
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons'
import { Button, Flex, Text } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

interface Props {
    currentPage: number,
    pageSize: number,
    itemCount: number
}

const Pagination = ({itemCount, pageSize, currentPage}: Props) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pageCount = Math.ceil(itemCount/pageSize)

    const changePage = (page: number) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', page.toString())
        router.push('?' + params.toString())
    }
    if (pageCount <=1 ) return null
    return (
        <Flex align={'center'} gap={"4"}>
            <Text size="4">Page {currentPage} of {pageCount}</Text>
            <Button  color='brown' disabled={currentPage === 1} variant='soft' onClick={()=>changePage(1)}>
                <DoubleArrowLeftIcon />
            </Button>

            <Button  color='brown' disabled={currentPage === 1} variant='soft' onClick={()=>changePage(currentPage - 1)}>
                <ChevronLeftIcon />
            </Button>

            <Button  color='brown' disabled={currentPage === pageCount} variant='soft' onClick={()=>changePage(currentPage + 1)}>
                <ChevronRightIcon />
            </Button>

            <Button  color='brown' disabled={currentPage === pageCount} variant='soft' onClick={()=>changePage(pageCount)}>
                <DoubleArrowRightIcon />
            </Button>
        </Flex>
    )
}

export default Pagination