import { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Header from '@components/Header'
import Footer from '@components/Footer'
import netlifyAuth from '../../netlifyAuth.js'

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

export default function About() {
  const loggedIn = netlifyAuth.isAuthenticated;
  if (loggedIn) {
    useEffect(() => {
      const script = document.createElement('script');
      script.src = "js/scripts.js";
      script.async = true;
    
      document.body.appendChild(script);
    
      return () => {
        document.body.removeChild(script);
      }
    }, []);
  }

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
