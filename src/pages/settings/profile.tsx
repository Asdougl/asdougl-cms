import type { NextPage } from 'next'
import { signOut } from 'next-auth/react'
import { Button } from '../../components/Button'
import { PageLayout } from '../../layout/PageLayout'

const Settings: NextPage = () => {
  return (
    <PageLayout title={['Settings', 'Profile']}>
      <Button onClick={() => signOut()}>Logout</Button>
    </PageLayout>
  )
}

export default Settings
