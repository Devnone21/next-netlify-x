import Head from 'next/head'
import Link from 'next/link'

import Header from '@components/Header'
import Footer from '@components/Footer'

const About = () => {
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

export default About
