import type { NextPage } from 'next'
import { signIn } from 'next-auth/react'

const Login: NextPage = () => {
  return (
    <>
      <div className="container mx-auto">
        <h1>Login</h1>
        <div>
          <button onClick={() => signIn('github')}>Login with Github</button>
        </div>
      </div>
    </>
  )
}

export default Login
