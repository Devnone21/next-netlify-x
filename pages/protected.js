import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import Header from '@components/Header'
import Footer from '@components/Footer'

import netlifyAuth from '../netlifyAuth.js'

export default function Protected() {
  let [loggedIn, setLoggedIn] = useState(netlifyAuth.isAuthenticated)
  let [user, setUser] = useState(null)

  useEffect(() => {
    let isCurrent = true
    netlifyAuth.initialize((user) => {
      if (isCurrent) {
        setLoggedIn(!!user)
        setUser(user)
      }
    })

    return () => {
      isCurrent = false
    }
  }, [])

  return (
    <div className="container">
      <Head>
        <title>Members Only</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {loggedIn ? (
        <main>
          <Header title={'Welcome to the Private Space™'} />
          <p className="description">
            Wow, welcome {user?.user_metadata.full_name}!
          </p>
          <button
            onClick={() => {
              netlifyAuth.signout(() => {
                setLoggedIn(false)
                setUser(null)
              })
            }}
          >
            Log out.
          </button>
          <p>Still Continue? </p>
          <Link href="/president/setting">
              <a>Go to Setting</a>
          </Link>
        </main>
      ) : (
        <main>
          <p>YOU ARE NOT ALLOWED HERE. </p>
          <Link href="/">
            <a>Go back to the grody public space.</a>
          </Link>
        </main>
      )}

      <Footer />
    </div>
  )
}