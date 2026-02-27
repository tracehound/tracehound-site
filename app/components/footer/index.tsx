import Link from 'next/link'
import { Container } from '../container'
import { Logo } from '../header/logo'
import { Row } from '../patterns/row'

export function Footer() {
  return (
    <footer className="relative w-full py-16 lg:py-24 xl:py-40 text-(--border)">
      <Container>
        <Row />

        <header className="w-full flex flex-col p-6 xl:p-12">
          <Logo className="mb-3 [&_path]:fill-(--border)!" />
          <h4 className="font-bold font-heading text-xl mb-2 md:text-2xl xl:text-5xl">
            Runtime security buffer
          </h4>
          <p className="text-xl md:text-2xl">
            Trusted by leading Security Teams and MSSP environments
          </p>
        </header>

        <nav className="flex items-start flex-col xl:flex-row gap-8 lg:gap-24 xl:gap-48 px-6 pt-6 xl:px-12 xl:pt-12 [&_a]:hover:underline">
          <div className="flex flex-col gap-7.5">
            <h5 className="text-xl font-bold md:text-3xl font-heading">Products</h5>
            <ul className="flex flex-col pl-5 list-disc gap-2">
              <li>
                <Link href="/platform/overview">Overview</Link>
              </li>
              <li>
                <Link href="/platform/how-it-works">How it works?</Link>
              </li>
              <li>
                <Link href="/platform/partnership">Partnership</Link>
              </li>
              <li>
                <Link href="/platform/security">Security</Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-7.5">
            <h5 className="text-xl font-bold md:text-3xl font-heading">Resources</h5>
            <ul className="flex flex-col pl-5 list-disc gap-2">
              <li>
                <Link href="/services">Services</Link>
              </li>
              <li>
                <Link href="/docs">Documentation</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/changelog">Changelog</Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-7.5">
            <h5 className="text-xl font-bold md:text-3xl font-heading">Legal</h5>
            <ul className="flex flex-col pl-5 list-disc gap-2">
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms-of-services">Teams of Services</Link>
              </li>
              <li>
                <Link href="/cookie-policy">Cookie Policy</Link>
              </li>
              <li>
                <Link href="/acceptable-use-policy">Acceptable Use Policy</Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="flex items-center justify-between px-6 mt-6 gap-4 flex-col lg:mt-12 xl:flex-row xl:gap-0 xl:px-12 xl:mt-24">
          <p>&copy; 2026 Tracehound. All rights reserved.</p>
          <p>
            Tracehound is a product of{' '}
            <a
              href="http://cluster127.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline hover:no-underline">
              Cluster 127
            </a>
          </p>
        </div>
      </Container>
    </footer>
  )
}
