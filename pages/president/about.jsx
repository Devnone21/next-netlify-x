import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Header from '@components/Header'
import Footer from '@components/Footer'
import netlifyAuth from '../../netlifyAuth.js'


export default function About() {
  let [loggedIn, setLoggedIn] = useState(netlifyAuth.isAuthenticated)
  let [user, setUser] = useState(null)
  useEffect(() => {
    let isCurrent = true
    netlifyAuth.initialize((user) => {
      if (isCurrent) { setLoggedIn(!!user); setUser(user); }
    })
    return () => { isCurrent = false }
  }, [])
  useEffect(() => {
    const script = document.createElement('script');
    if (loggedIn) { script.src = "js/scripts.js" }
    script.async = true;
    document.body.appendChild(script);
    
    return () => { document.body.removeChild(script); }
  }, []);

  return (
    <div className="container">
      <Head>
        <title>Control Center X</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header title={'Nowhere Space™'} />
        <p className="description">This is about page</p>
        <Link href="/"><a>Back to Home</a></Link>
      </main>
      <Footer />
    </div>
  )
}

// const About = () => {
//   return (
//     <div className="container">
//       <Head>
//         <title>Control Center X</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <main>
//         <Header title={'Nowhere Space™'} />
//         <p className="description">This is about page</p>

//         <Link href="/"><a>Back to Home</a></Link>
//       </main>
//       <Footer />
//     </div>
//   )
// }
// export default About
