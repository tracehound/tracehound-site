import Link from 'next/link'
import { Container } from '../container'
import { Logo } from '../header/logo'
import { Row } from '../patterns/row'

export function Footer() {
  return (
    <footer className="relative w-full pb-6 lg:pb-12 xl:pb-24 text-(--border)">
      <Container>
        <Row />

        <header className="w-full flex flex-col p-6 xl:p-12">
          <Logo className="mb-3 [&_path]:fill-(--border)!" />
          <h4 className="font-bold font-heading text-xl mb-2 md:text-2xl xl:text-4xl">
            Operational security controls with forensic guarantees.
          </h4>
          <p className="text-xl md:text-2xl">Built for Security Teams and MSSP environments</p>
          <div className="flex items-center gap-2 -ml-2 mt-2">
            <a
              href="https://github.com/tracehound/tracehound"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="size-5 group-hover:opacity-50 transition-opacity">
                <path
                  fill="currentColor"
                  d="M11.993.001h.09c2.188 0 4.234.613 5.987 1.68l-.053-.032a12.2 12.2 0 0 1 4.34 4.42l.03.058A12.4 12.4 0 0 1 24 12.291c0 5.403-3.398 9.995-8.123 11.652l-.085.026a.69.69 0 0 1-.626-.113l.002.001a.62.62 0 0 1-.203-.465v-.014l.008-1.225q.008-1.178.008-2.153a2.9 2.9 0 0 0-.158-1.23 2.85 2.85 0 0 0-.655-1.043 10.5 10.5 0 0 0 1.676-.305l-.074.017a6.3 6.3 0 0 0 1.5-.642l-.03.017c.48-.268.907-.627 1.26-1.057l.005-.007c.373-.49.65-1.048.82-1.644l.008-.035c.216-.74.324-1.508.321-2.28v-.136.007-.072a4.8 4.8 0 0 0-1.238-3.229l.003.003c.164-.44.259-.947.259-1.478 0-.627-.134-1.246-.394-1.813l.01.026a2 2 0 0 0-1.277.18l.011-.004A8.3 8.3 0 0 0 15.554 6l.037-.022-.594.384a10.8 10.8 0 0 0-3-.416c-1.067 0-2.1.152-3.08.436l.08-.02a14 14 0 0 0-.665-.433 9 9 0 0 0-1.24-.594l-.065-.022a2.07 2.07 0 0 0-1.34-.214l.014-.002a4.3 4.3 0 0 0-.384 1.787c0 .53.095 1.04.268 1.508l-.01-.029a4.78 4.78 0 0 0-1.233 3.302v-.004l-.001.13c0 .808.117 1.59.335 2.326l-.014-.057a5.2 5.2 0 0 0 .829 1.692l-.009-.013c.343.43.762.79 1.236 1.061l.021.011c.422.252.91.465 1.425.614l.044.011c.455.125 1 .227 1.556.284l.045.004c-.42.428-.7 1-.765 1.637v.012a3 3 0 0 1-.682.236l-.02.004c-.25.051-.536.08-.83.08h-.064.002a1.82 1.82 0 0 1-1.029-.348l.006.004a2.8 2.8 0 0 1-.86-.985l-.006-.015a2.6 2.6 0 0 0-.75-.827l-.008-.006a2.2 2.2 0 0 0-.757-.38l-.015-.004-.313-.048-.075-.003a1 1 0 0 0-.384.077l.007-.003q-.125.073-.078.184.056.128.141.225.09.107.2.189l.002.002.11.08c.275.148.503.354.675.603l.004.006c.187.237.35.505.482.791l.01.024.156.368c.132.402.37.738.683.98l.005.005c.292.234.645.402 1.03.478l.016.002c.322.064.697.104 1.08.111h.006q.068.004.146.003.383 0 .748-.062l-.026.004.36-.064q0 .608.007 1.417l.008.872v.014a.63.63 0 0 1-.203.466.7.7 0 0 1-.63.111l.005.001C3.395 22.277 0 17.685 0 12.281c0-2.267.597-4.392 1.64-6.217l-.031.058a12.2 12.2 0 0 1 4.313-4.447l.057-.03A11.4 11.4 0 0 1 11.902 0h.096zM4.541 17.66q.046-.113-.11-.192-.156-.048-.202.032-.048.112.109.192.14.096.203-.032m.485.545q.109-.08-.032-.256-.156-.144-.25-.048-.109.08.032.256.154.157.25.047m.468.72q.14-.112 0-.304-.125-.209-.266-.096-.14.08 0 .287.14.21.266.113m.655.672q.125-.127-.062-.304-.188-.192-.312-.048-.14.129.062.304.188.192.312.044zm.89.4q.048-.176-.202-.256-.234-.063-.297.112t.203.24q.234.098.297-.096m.985.08q0-.208-.265-.176-.25 0-.25.176 0 .208.265.176.25 0 .25-.176m.906-.16q-.03-.176-.28-.144-.25.048-.22.24.032.192.282.128.248-.064.218-.224"
                />
              </svg>
            </a>
            <a
              href="https://www.npmjs.com/org/tracehound"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 group">
              <svg viewBox="0 0 24 24" className="size-5 group-hover:opacity-50 transition-opacity">
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M22.237 0C23.211 0 24 .79 24 1.763v20.474c0 .974-.79 1.763-1.763 1.763H1.763C.789 24 0 23.21 0 22.237V1.763C0 .789.79 0 1.763 0zM5.112 19.17h6.928l.008-10.374h3.455l-.008 10.382h3.463l.009-13.837L5.13 5.323z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </header>

        <nav className="flex items-start flex-col xl:flex-row gap-8 lg:gap-24 xl:gap-48 px-6 pt-6 xl:px-12 xl:pt-12 [&_a]:hover:underline">
          <div className="flex flex-col gap-7.5">
            <h5 className="text-xl font-bold md:text-3xl font-heading">Packages</h5>
            <ul className="flex flex-col pl-5 list-disc gap-2">
              <li>
                <Link href="/packages#core">@tracehound/core</Link>
              </li>
              <li>
                <Link href="/packages#express">@tracehound/express</Link>
              </li>
              <li>
                <Link href="/packages#fastify">@tracehound/fastify</Link>
              </li>
              <li>
                <Link href="/packages#cli">@tracehound/cli</Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-7.5">
            <h5 className="text-xl font-bold md:text-3xl font-heading">Resources</h5>
            <ul className="flex flex-col pl-5 list-disc gap-2">
              <li>
                <Link href="/docs">Documentation</Link>
              </li>
              <li>
                <Link href="/services">Services</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
              <li>
                <Link href="/changelog">Changelog</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
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
                <Link href="/terms-of-services">Terms of Services</Link>
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
              href="https://cluster127.com"
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
