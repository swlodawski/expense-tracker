import Image from 'next/image';
import Link from 'next/link';

import logo from 'public/icons/logo.svg';

import Footer from 'components/footer';
import Features from 'components/home/features';

import url from 'constants/url';
import { premiumPlan } from 'constants/usage';

export default function Home() {
    return(
        <div className='relative h-full bg-gradient-to-br from-sky-100 via-white to-sky-100 pl-2 pr-2 text-gray-800"'>
            <header className='relative m-auto h-[56px] max-w-4xl pt-3'>
                <div className='absolute left-0 right-0 top-3 z-20 flex items-center justify-between'>
                    <Link href={'/'} className='flex max-w-[180px] items-center p-3 text-2xl'>
                    <Image src={logo} width={30} height={30} alt='Expense-Tracker logo' className='mr-2'/>
                    <span className='font-black tracking-[-0.03em] text-gray-900'>Expense Tracker</span></Link>
                    <Link href={url.app.sigin}
                    className='leading-2 mr-4 inline-flex h-[34px] items-center overflow-hidden rounded-full bg-gray-900 px-4 py-1 text-sm font-medium text-white transition hover:bg-primary/90'>
                        Sign In
                    </Link>  
                </div>
            </header>
            <main>
                <div className='absolute inset-x-0 top-[-55px] z-10 h-96 overflow-hidden text-gray-900/40 opacity-10 [mask-image:linear-gradient(to_top,transparent,white)]'>
                <svg className='absolute inset-0 top-0 h-full w-full text-gray-900' xmlns='http://www.w3.org/2000/svg'>
                <defs>
                    <pattern 
                    id='pattern'
                    width='32'
                    height='32'
                    patternUnits='userSpaceOnUse'
                    x='50%'
                    y='100%'
                    patternTransform='translate(0, -1'>
                        <path d='M0 32V.5H32' fill='none' stroke='curretnColor'></path>
                        </pattern>
                    </defs>
                    <rect width='100%' height='100%' fill='url(#pattern'></rect>
                    </svg>
                </div>
                
            </main>
        </div>
    
    )
}