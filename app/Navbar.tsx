'use client'
import Link from 'next/link'
import React from 'react'
import {AiFillBug} from 'react-icons/ai'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import { Box, Container, Flex } from '@radix-ui/themes'


const Navbar = () => {
    const {status, data: session}  = useSession()
    const  links = [
    {
        name: "Dashboard",
        href: "/"
    },
    {
        name: "Issues",
        href: "/issues/list"
    }
    ]
    const path = usePathname()
    
    return (
        <nav className='border-b mb-5 h-12 items-center py-3'>
            <Container>
            <Flex justify={'between'}>
                <Flex align={'center'} gap={'3'}>
                    <Link href='/'><AiFillBug /></Link>
                    <ul className='flex space-x-6'>
                        
                        {links.map((link, index)=> 
                            <li key={index}>
                                <Link href={link.href} 
                                    className={classNames({
                                        'text-zinc-900' : link.href === path,
                                        'text-zinc-500' : link.href !== path,
                                        'hover:text-zinc-800': true
                                    })}>
                                    {link.name}
                                </Link>
                        </li>)}
                        
                    </ul>
                </Flex>

                <Box>
                    {status==='authenticated' && <Link href="/api/auth/signout">{session.user?.name} Signout</Link>}
                    {status==='unauthenticated' && <Link href='/api/auth/signin'>Login</Link>}
                </Box>
            </Flex>
        </Container>
        
    </nav>
  )
}

export default Navbar