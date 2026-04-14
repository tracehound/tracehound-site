/* eslint-disable react/jsx-no-comment-textnodes */
import { Row } from '@/app/components/patterns/row'
import Link from 'next/link'

type Post = {
  id: string
  title: string
  description: string
  date: string
  author: string
  tags: string[]
  href: string
}

const posts: Post[] = [
  {
    id: 'tracehound-introduction',
    title: 'Introducing Tracehound: Deterministic Security Buffer for Node.js',
    description:
      'Why we built Tracehound, and how deterministic containment and tamper-evident evidence fit modern Node.js security operations.',
    date: 'December 28, 2025',
    author: 'Tracehound Team',
    tags: ['release', 'security', 'node.js'],
    href: '/blog/tracehound-launch',
  },
  {
    id: 'from-v1-6-to-v1-8',
    title: 'From v1.6 to v1.8: Operational Truth and Runtime Hardening',
    description:
      'Practical recap of the last major Tracehound wave: signed snapshots, evidence lifecycle hardening, TLS source signals, and anti-bypass rate limiting.',
    date: 'March 9, 2026',
    author: 'Tracehound Team',
    tags: ['release', 'hardening', 'forensics'],
    href: '/blog/runtime-hardening-spring-2026',
  },
  {
    id: 'hello-world-tracehound-is-live',
    title: 'Hello, world. Tracehound is Live.',
    description:
      'Launch-day note on what Tracehound already does, why we built it, and where we want to take deterministic runtime security next.',
    date: 'March 16, 2026',
    author: 'Tracehound Team',
    tags: ['launch', 'oss', 'runtime-security'],
    href: '/blog/launch-day-hello-world',
  },
  {
    id: 'forensic-readiness-strategic-discipline',
    title: 'Forensic Readiness Is Becoming a Strategic Security Discipline',
    description:
      'The transition from a niche practice of DFIR to the discipline of risk management and incident preparedness',
    date: 'March 24, 2026',
    author: 'Tracehound Team',
    tags: ['forensic-readiness', 'incident-preparedness', 'risk-management'],
    href: '/blog/forensic-readiness-is-becoming-a-strategic-security-discipline',
  },
  {
    id: 'the-72-hour-reality',
    title:
      'The 72-Hour Reality: How Regulation Is Turning Forensic Readiness into an Enterprise Requirement',
    description:
      'Incident disclosure regimes are changing what cyber preparedness means. Detection is still necessary, but under compressed reporting timelines, evidence quality becomes the deciding factor.',
    date: 'March 30, 2026',
    author: 'Tracehound Team',
    tags: ['forensic-readiness', 'incident-preparedness', 'enterprise-requirements'],
    href: '/blog/how-regulation-is-turning-forensic-readiness-into-an-enterprise-requirement',
  },
  {
    id: 'having-a-siem-does-not-mean-you-have-forensic-readiness',
    title: 'Having a SIEM Does Not Mean You Have Forensic Readiness',
    description:
      'A mature SIEM improves visibility and investigations, but it does not automatically create forensic readiness. Here is where detection-centric security ends and evidence readiness begins.',
    date: 'April 7, 2026',
    author: 'Tracehound Team',
    tags: ['SIEM', 'forensic-readiness', 'evidence-readiness'],
    href: '/blog/siem-does-not-mean-forensic-readiness',
  },
  {
    id: 'what-enterprises-actually-buy-forensic-readiness',
    title: 'The Forensic Readiness Market Is Fragmented: What Enterprises Really Purchase',
    description:
      'The forensic readiness market is real, but fragmented. Here is what enterprises actually purchase across SIEM, DFIR tooling, evidence handling, and incident response services.',
    date: 'April 14, 2026',
    author: 'Tracehound Team',
    tags: ['DFIR', 'forensic-readiness', 'enterprise-security'],
    href: '/blog/what-enterprises-actually-buy-forensic-readiness',
  },
].reverse()

export default function Blog() {
  return (
    <section className="relative flex flex-col gap-6 xl:gap-0">
      <header className="w-full flex flex-col p-6 xl:p-12">
        <h3 className="my-3 font-heading font-bold text-2xl/6 md:text-4xl/9 xl:text-[64px]/16">
          Blog
        </h3>
        <p className="font-sans font-light text-base md:text-xl xl:text-2xl">
          Updates, engineering deep dives, and security insights.
        </p>
      </header>

      <Row />

      <article className="grid grid-cols-1 xl:grid-cols-2">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex flex-col p-6 xl:p-12 border-b border-dashed border-(--border-accent) xl:border-r">
            <div className="flex items-center gap-4">
              <time dateTime={post.date}>{post.date}</time>
              <strong>// {post.author}</strong>
            </div>

            <Link href={post.href} className="group">
              <h3 className="mb-3 font-heading font-bold text-xl md:text-2xl xl:text-4xl group-hover:pl-2.5 group-hover:bg-(--accent-primary)/50 transition-all">
                {post.title}
              </h3>
              <p className="font-sans md:text-lg xl:text-xl mb-3 lg:mb-6 xl:mb-9">
                {post.description}
              </p>
            </Link>

            <nav className="flex items-center gap-4">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs font-mono text-(--border) bg-(--border-accent)/20 border border-dashed border-(--border-accent) px-2 py-1">
                  #{tag}
                </span>
              ))}
            </nav>
          </div>
        ))}
      </article>
    </section>
  )
}
