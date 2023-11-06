'use client'
import Link from 'next/link'
import React from 'react'
import {AiFillBug} from 'react-icons/ai'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes'
import { stat } from 'fs'


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
        <nav className='border-b mb-5 items-center py-3'>
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
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger >
                            {status ==='authenticated' && <Avatar src={session?.user?.image!} 
                            alt={session?.user?.email!}
                            radius='full'
                            fallback="?"
                            className='cursor-pointer'
                            />}
                            
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content>
                            <DropdownMenu.Label>
                                <Text>{session?.user?.email!}</Text>
                            </DropdownMenu.Label>
                            <DropdownMenu.Label>
                                <Link href="/api/auth/signout">Signout</Link>
                                
                            </DropdownMenu.Label>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                    {status === 'unauthenticated' && <Link href='/api/auth/signin'>Login</Link> }
                    
                </Box>
            </Flex>
        </Container>
        
    </nav>
  )
}

export default Navbar