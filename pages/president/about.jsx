import Link from 'next/link'

const About = () => {
  return (
    <div>
      <p className="description">This is about page</p>

      <Link href="/"><a>Back to Home</a></Link>
    </div>
  )
}

export default About
