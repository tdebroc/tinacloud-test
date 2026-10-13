import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const POSTS_DIR = path.join(process.cwd(), 'content/posts')

export async function generateStaticParams() {
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'))
  return files.map(f => ({ filename: f.replace(/\.md$/, '') }))
}

export async function generateMetadata({ params }) {
  const raw = fs.readFileSync(path.join(POSTS_DIR, `${params.filename}.md`), 'utf8')
  const { data } = matter(raw)
  return { title: data.title || params.filename }
}

export default function BlogPost({ params }) {
  const raw = fs.readFileSync(path.join(POSTS_DIR, `${params.filename}.md`), 'utf8')
  const { data, content } = matter(raw)
  const html = marked(content)

  return (
    <>
      <Header />
      <main className="blog-post">
        <div className="blog-post-inner">
          <h1 className="blog-post-title">{data.title}</h1>
          <div className="blog-post-body" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </main>
      <Footer />
    </>
  )
}
