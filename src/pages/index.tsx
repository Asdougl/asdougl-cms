import type { NextPage } from 'next'
import { PageLayout } from '../layout/PageLayout'

const Home: NextPage = () => {
  return (
    <PageLayout>
      <h1>Todo</h1>
      <ul>
        <li>Search bar</li>
        <li>Unpublished Posts</li>
        <li>Recently published posts</li>
      </ul>
    </PageLayout>
  )
}
export default Home
