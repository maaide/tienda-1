import { useSession } from 'next-auth/react'
import React from 'react'

const AccountPage = () => {

  const { data: session, status } = useSession()

  console.log(session)
  console.log(status)

  return (
    <div>
      <p>Cuenta</p>
    </div>
  )
}

export default AccountPage