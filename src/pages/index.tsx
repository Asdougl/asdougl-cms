import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { PageLayout } from '../layout/PageLayout'

const Home: NextPage = () => {
  return <PageLayout title="Home">heyo</PageLayout>
}
export default Home
