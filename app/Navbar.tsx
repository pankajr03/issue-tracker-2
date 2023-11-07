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
    
    return (
        <nav className='border-b mb-5 items-center py-3'>
            <Container>
            <Flex justify={'between'}>
                <Flex align={'center'} gap={'3'}>
                    <Link href='/'><AiFillBug /></Link>
                    <NavLinks />
                </Flex>
                <AuthStatus />
                
            </Flex>
        </Container>
        
    </nav>
  )
}

const NavLinks = () => {
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
        <ul className='flex space-x-6'>
            
            {links.map((link, index)=> 
                <li key={index}>
                    <Link href={link.href} 
                        className={classNames({
                            'nav-link': true,
                            '!text-zinc-900' : link.href === path,
                            
                        })}>
                        {link.name}
                    </Link>
            </li>)}
            
        </ul>
    )
}
const AuthStatus = () => {
    const {status, data: session}  = useSession()
    if ( status === 'loading' ) return null
    if( status === 'unauthenticated' )
        return <Link href='/api/auth/signin' className='nav-link'>Login</Link>

    return (
        <Box>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger >
                    <Avatar src={session?.user?.image!} 
                    alt={session?.user?.email!}
                    radius='full'
                    fallback="?"
                    className='cursor-pointer'
                    referrerPolicy='no-referrer'
                    />
                    
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
            
        </Box>
    )
}

export default Navbar