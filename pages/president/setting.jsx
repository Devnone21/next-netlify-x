import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Script from 'next/script'
import Header from '@components/Header'
import Footer from '@components/Footer'

import netlifyAuth from '../../netlifyAuth.js'

export default function SettingPage() {
  const loggedIn = netlifyAuth.isAuthenticated;
  // let [loggedIn, setLoggedIn] = useState(netlifyAuth.isAuthenticated)
  // let [user, setUser] = useState(null)
  // useEffect(() => {
  //   let isCurrent = true
  //   netlifyAuth.initialize((user) => {
  //     if (isCurrent) {
  //       setLoggedIn(!!user)
  //       setUser(user)
  //     }
  //   })

  //   return () => {
  //     isCurrent = false
  //   }
  // }, [])

  return (
    <div className="container">
      <Head>
        <title>Control Center X - President Only</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="/css/style.min.css" rel="stylesheet" />
      </Head>
      <Script src="/js/scripts.js" async />

      {loggedIn ? (
        <main>
          <Header title={'Private Space™'} />

      <div class="container-fluid table-responsive pt-3">
        <table class="table table-sm no-wrap">
          <thead>
            <tr class="table-primary">
              <th scope="col"><h3 class="box-title mb-0 strong">App Profile: </h3></th>
              <th scope="col">
                <select name="app" id="appDropdown">
                    <option selected disabled value="">choose one</option>
                </select>
              </th>
            </tr>
          </thead>

          <tbody id="tableSetting" class="visually-hidden">
            <tr><th scope="row">Breaker: </th>
              <td>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="brkSwitch"/>
                    <label class="form-check-label" id="brkStatus" for="brkSwitch">Active</label>
                </div>
              </td>
            </tr>
            <tr><th scope="row">Account: </th>
              <td><select name="account" id="accDropdown"></select></td>
            </tr>

            <tr><th scope="row">Symbols: </th>
              <td><div class="btn-group-sm" role="group" id="sbBtncheck" aria-label="sb"></div></td>
            </tr>
            <tr><th scope="row">Time Frame: </th>
              <td><select name="timeframe" id="tfDropdown"></select></td>
            </tr>
            <tr><th scope="row">Volume: </th>
              <td><select name="volume" id="vlDropdown"></select></td>
            </tr>
  
            <tr><th scope="row">Rate T/P: <br/><small>(of price)</small></th>
              <td><select name="rate_tp" id="tpDropdown"></select></td>
            </tr>
            <tr><th scope="row">Rate S/L: <br/><small>(of price)</small></th>
              <td><select name="rate_sl" id="slDropdown"></select></td>
            </tr>

            <tr><th scope="row">Indicator: </th>
              <td><select name="indicator" id="indDropdown"></select></td>
            </tr>
            <tr><th scope="row">Ind. Preset: </th>
              <td><select name="indicatorPreset" id="presetDropdown"></select></td>
            </tr>

            <tr>
                <th scope="row">
                    <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                        <input type="text" id="currentAppIndex" value="" disabled hidden />
                    </div>
                </th>
                <td>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                        <button id="btnPreview" class="btn btn-warning visually-hidden">Preview</button>
                        <button id="btnSave" class="btn btn-success">Save Profile</button>
                    </div>
                </td>
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