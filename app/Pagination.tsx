import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons'
import { Button, Flex, Text } from '@radix-ui/themes'
import React from 'react'
interface Props {
    currentPage: number,
    pageSize: number,
    itemCount: number
}

const Pagination = ({itemCount, pageSize, currentPage}: Props) => {
    const pageCount = Math.ceil(itemCount/pageSize)
    if (pageCount <=1 ) return null
    return (
        <Flex align={'center'} gap={"4"}>
            <Text size="4">Page {currentPage} of {pageCount}</Text>
            <Button  color='brown' disabled={currentPage === 1} variant='soft'>
                <DoubleArrowLeftIcon />
            </Button>

            <Button  color='brown' disabled={currentPage === 1} variant='soft'>
                <ChevronLeftIcon />
            </Button>

            <Button  color='brown' disabled={currentPage === pageCount} variant='soft'>
                <ChevronRightIcon />
            </Button>

            <Button  color='brown' disabled={currentPage === pageCount} variant='soft'>
                <DoubleArrowRightIcon />
            </Button>
        </Flex>
    )
}

export default Pagination