import { Viewport } from "node_modules/next";;
import { Inter } from 'next/font/google';
import  Script  from "next/script";

import './globals.css';
import './overwrites.css';

const inter = Inter({ subsets: ['latin']});

const title = 'Expense-Tracker';
const description = 'Expense Tracker with Typescript';

const GOOGLE_ANALYTICS_ID = process.env.GA4_ANALYTICS_ID;

export const metadata = {
    title,
    description,
    manifest: 'https://Expense-Tracker/manifest.json',
    twitter: {
        card: 'summary_large_image',
        title,
        description,
        creator: '@gokul_i',
        images: ['https://Expense-Tracker/og/jpg'],
    },
    openGraph: {
        title,
        description,
        url: 'https://Expense-Tracker',
        type: 'website',
        images: ['https://Expense-Tracker/og/jpg'],
    },
    icons: {
        icon: 'https://Expense-Tracker/icons/icon.svg',
		shortcut: 'https://Expense-Tracker/favicon.ico',
		apple: 'https://Expense-Tracker/icons/apple-icon.png',
    },
    appleWebApp: {
        title,
        description,
        startupImage: ['https://Expense-Tracker/icons/apple-icon.png']
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    userScalable: false,
    themeColor: '#09090b',
};

export const revalidate = 0;
 
export default function RootLayout({ children } : { children: React.ReactNode }) {
    return(
        <html lang="en">
            <body className={`${inter.className} flex h-full flex-col text-gray-600 antialiased`}>{children}</body>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
            strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
                {`window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());


                        gtag('config, '${GOOGLE_ANALYTICS_ID}')`};
            </Script>
        </html>
    );
}
