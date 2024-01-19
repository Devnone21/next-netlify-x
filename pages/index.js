import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import netlifyAuth from '../netlifyAuth.js'

import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
  let [loggedIn, setLoggedIn] = useState(netlifyAuth.isAuthenticated)

  useEffect(() => {
    let isCurrent = true
    netlifyAuth.initialize((user) => {
      if (isCurrent) {
        setLoggedIn(!!user)
      }
    })

    return () => {
      isCurrent = false
    }
  }, [])

  let login = () => {
    netlifyAuth.authenticate((user) => {
      setLoggedIn(!!user)
    })
  }

  return (
    <div className="container">
      <Head>
        <title>Control Center X</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title={'Public Space™'} />
        <p className="description">
          You are there in a public space.
        </p>
        {loggedIn ? (
          <div>
            <Link href="/protected">
              <a>Continue to members-only space.</a>
            </Link>
          </div>
        ) : (
          <button onClick={login}>Please log in here to access the members-only area.</button>
        )}
      </main>

      <Footer />

    </div>
  )
}
