"use client"; // this is a client component
import Image from 'next/image'
import Head from 'next/head'
import Dashboard from '../../components/mainbody'
import MainBody from '../../components/mainbody';


export default function Home() {
    return (
        <div>
            <Head>
                <title>WRCMS</title>
                <meta name="description" content="College management system" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MainBody />
        </div>
    )
}
