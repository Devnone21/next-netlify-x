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
        <title>X Setting - President Only</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" 
            integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" 
            integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous">
        </script>
      </Head>

      {loggedIn ? (
        <main>
          <Header title={'Welcome to the Private Space™'} />
          <p className="description">
            Wow, secrets are super cool. Welcome {user?.user_metadata.full_name}!
          </p>
          <button onClick={() => {
              netlifyAuth.signout(() => {setLoggedIn(false); setUser(null);})
            }}
            >Log out.</button>

<div class="container-fluid">
        <table class="table" style="max-width: 28em;">
          <thead>
            <tr><th scope="col" style="min-width: 7.5em;">Choose App: </th>
              <th scope="col">
                <div class="btn-group">
                  <button class="btn btn-outline-info btn-sm dropdown-toggle text-end" type="button" 
                    data-bs-toggle="dropdown" aria-expanded="false" style="min-width: 7.5em;">app name</button>
                  <ul class="dropdown-menu" id="appDropdown">
                  </ul>
                </div>
              </th>
            </tr>
          </thead>

          <tbody class="table-group-divider">
            <tr><th scope="row">Symbol: </th>
              <td>Multi-select</td>
            </tr>
            <tr><th scope="row">Time Frame: </th>
              <td>
                <div class="btn-group">
                    <button class="btn btn-outline-info btn-sm dropdown-toggle text-end" type="button" 
                      data-bs-toggle="dropdown" aria-expanded="false" style="min-width: 7.5em;">choose one</button>
                    <ul class="dropdown-menu" id="tfDropdown">
                      <li id="tf1" value="15">15m</li>
                      <li id="tf2" value="30">30m</li>
                      <li id="tf3" value="60">1H</li>
                      <li id="tf4" value="240">4H</li>
                    </ul>
                  </div>
              </td>
            </tr>

            <tr><th scope="row">Rate TP: <br/><small>(of price)</small></th>
              <td>Dropdown</td>
            </tr>
            <tr><th scope="row">Rate SL: <br/><small>(of price)</small></th>
              <td>Dropdown</td>
            </tr>

            <tr><th scope="row">Indicator: </th>
              <td>Dropdown</td>
            </tr>
            <tr><th scope="row">Ind. Preset: </th>
              <td>Dropdown</td>
            </tr>

          </tbody>
        </table>
      </div>
          
        </main>
      ) : (
        <main>
          <p>YOU ARE NOT ALLOWED HERE.</p>
          <Link href="/">
            <a>Go back to the grody public space.</a>
          </Link>
        </main>
      )}

      <Footer />
    </div>
  )
}