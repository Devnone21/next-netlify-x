import Link from 'next/link'

const About = () => {
  return (
    <div className="container">
      <Head>
        <title>Control Center X</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
      <p className="description">This is about page</p>

      <Link href="/"><a>Back to Home</a></Link>
      </main>
      <Footer />
    </div>
  )
}

export default About
