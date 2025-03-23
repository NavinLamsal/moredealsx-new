import { getMetadata } from '@/lib/action/PubilcCommon';
import { CompanyMeta } from '@/lib/type/CommonType';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const AuthHeaders = async() => {
const MetaDatas : CompanyMeta = await getMetadata();
  return (
    <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <Logos logos={[MetaDatas.black_logo, MetaDatas.white_logo  ]}/>
            <strong>{MetaDatas.name}</strong>
          </Link>
        </div>
  )
}

export default AuthHeaders


export const Logos = ({logos}:{logos:string[]}) => (
    <Link href="/" className="flex items-center gap-3">
        <Image src={logos[0]} alt="Logo" width={100} height={100} className='w-12 md:w-16 lg:w-20 dark:hidden block' />
        <Image src={logos[1]} alt="Logo" width={100} height={100} className='w-12 md:w-16 lg:w-20 dark:block hidden' />
    </Link>
)
