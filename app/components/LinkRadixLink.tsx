import NextLink from 'next/link';
import { Link as RadixLink } from '@radix-ui/themes'
import React, { ReactNode } from 'react'

type Props = {
    href: string;
    children: ReactNode
}
const LinkRadixLink = ({href, children}: Props) => {
  return (
    <div>
        <NextLink href={href} legacyBehavior>
            <RadixLink>{children}</RadixLink>
        </NextLink>
    </div>
  )
}

export default LinkRadixLink