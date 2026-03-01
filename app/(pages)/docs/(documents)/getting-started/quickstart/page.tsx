import { Code } from '@/app/components/code'
import { DocsContent } from '@/app/components/docs-content'
import { DocsContentBlock } from '@/app/components/docs-content-block'
import { DocsHeader } from '@/app/components/docs-header'
import { DocsList } from '@/app/components/docs-list'
import { DocsNavigation } from '@/app/components/docs-navigation'
import { DocsPageLayout } from '@/app/components/docs-page-layout'
import { Separator } from '@/app/components/separator'
import type { Metadata } from 'next/types'
import {
  coldStorageExport,
  customRateLimiting,
  expressInstallCode,
  expressSetupCode,
  fastifyInstallCode,
  fastifySetupCode,
  instalCode,
  interceptRequestCode,
  quickStartCode,
  wafIntegrationCode,
} from './codes'

export const metadata: Metadata = {
  title: 'Quickstart',
  description: 'Get Tracehound running in your Node.js application in under 5 minutes.',
}

export default function Quickstart() {
  return (
    <DocsPageLayout>
      <DocsHeader
        label="GETTING STARTED"
        title="Quickstart"
        summary="Get Tracehound running in your Node.js application in under 5 minutes."
      />

      <DocsContent>
        <DocsContentBlock title="Prerequisites">
          <DocsList items={[<p>Node.js 18+</p>, <p>npm, pnpm, or yarn</p>]} />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Installation">
          <Code code={instalCode} />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Quick Start">
          <h4 className="font-heading font-bold text-lg md:text-xl xl:text-3xl">
            Step 1: Create Tracehound
          </h4>

          <Code code={quickStartCode} />

          <p className="font-sans md:text-lg xl:text-xl">
            That's it. You now have a working Tracehound instance.
          </p>

          <h4 className="font-heading font-bold text-lg md:text-xl xl:text-3xl">
            Step 2: Intercept Requests
          </h4>

          <Code code={interceptRequestCode} />

          <h4 className="font-heading font-bold text-lg md:text-xl xl:text-3xl">
            Step 3: Handle Results
          </h4>

          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="[&_tr]:border-b [&_tr]:border-(--border-accent)">
                  <th className="text-foreground h-10 px-4 text-left align-middle font-medium whitespace-nowrap">
                    Status
                  </th>
                  <th className="text-foreground h-10 px-4 text-left align-middle font-medium whitespace-nowrap">
                    Meaning
                  </th>
                  <th className="text-foreground h-10 px-4 text-left align-middle font-medium whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0 [&_tr]:border-(--border-accent)">
                <tr className="hover:bg-(--background) border-b transition-colors">
                  <td className="py-2 px-4 align-middle whitespace-nowrap">
                    <strong>`clean`</strong>
                  </td>
                  <td className="py-2 px-4 align-middle whitespace-nowrap">No threat detected</td>
                  <td className="py-2 px-4 align-middle whitespace-nowrap">Proceed normally</td>
                </tr>
                <tr className="hover:bg-(--background) border-b transition-colors">
                  <td className="py-2 px-4 align-middle whitespace-nowrap">
                    <strong>`quarantined`</strong>
                  </td>
                  <td className="py-2 px-4 align-middle whitespace-nowrap">Threat isolated</td>
                  <td className="py-2 px-4 align-middle whitespace-nowrap">
                    Block request, evidence preserved
                  </td>
                </tr>
                <tr className="hover:bg-(--background) border-b transition-colors">
                  <td className="py-2 px-4 align-middle whitespace-nowrap">
                    <strong>`rate_limited`</strong>
                  </td>
                  <td className="py-2 px-4 align-middle whitespace-nowrap">Too many requests</td>
                  <td className="py-2 px-4 align-middle whitespace-nowrap">
                    Return 429 with `<strong>retryAfter</strong>`
                  </td>
                </tr>
                <tr className="hover:bg-(--background) border-b transition-colors">
                  <td className="py-2 px-4 align-middle whitespace-nowrap">
                    <strong>`ignored`</strong>
                  </td>
                  <td className="py-2 px-4 align-middle whitespace-nowrap">Duplicate threat</td>
                  <td className="py-2 px-4 align-middle whitespace-nowrap">
                    Already quarantined, block
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Framework Adapters">
          <p className="font-sans md:text-lg xl:text-xl">
            Use the Express or Fastify adapters (separate packages):
          </p>

          <h4 className="font-heading font-bold text-lg md:text-xl xl:text-3xl">Express</h4>

          <Code code={expressInstallCode} />
          <Code code={expressSetupCode} />

          <h4 className="font-heading font-bold text-lg md:text-xl xl:text-3xl">Fastify</h4>
          <Code code={fastifyInstallCode} />
          <Code code={fastifySetupCode} />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Common Patterns">
          <h4 className="font-heading font-bold text-lg md:text-xl xl:text-3xl">
            Pattern 1: WAF Integration
          </h4>

          <p className="font-sans md:text-lg xl:text-xl">
            Connect your existing WAF (Cloudflare, AWS WAF) to Tracehound:
          </p>

          <Code code={wafIntegrationCode} />

          <h4 className="font-heading font-bold text-lg md:text-xl xl:text-3xl">
            Pattern 2: Custom Rate Limiting
          </h4>

          <p className="font-sans md:text-lg xl:text-xl">Add rate limiting per source IP:</p>

          <Code code={customRateLimiting} />

          <h4 className="font-heading font-bold text-lg md:text-xl xl:text-3xl">
            Pattern 3: Cold Storage Export
          </h4>

          <p className="font-sans md:text-lg xl:text-xl">
            Archive evidence to S3-compatible storage (AWS S3, Cloudflare R2, GCS, MinIO):
          </p>

          <Code code={coldStorageExport} />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Troubleshooting">
          <div className="flex flex-col gap-2">
            <h4 className="font-heading font-bold text-lg md:text-xl xl:text-3xl">
              "Quarantine is full" warnings
            </h4>

            <p className="font-sans md:text-lg xl:text-xl">
              Your quarantine has reached `<strong>maxCount</strong>`. Options:
            </p>

            <DocsList
              items={[
                <p>
                  <strong>Increase limit:</strong>{' '}
                  <strong>{`createTracehound({ quarantine: { maxCount: 5000 } })`}</strong>
                </p>,
                <p>
                  <strong>Enable cold storage:</strong> Use `<strong>createS3ColdStorage</strong>`
                  for archival
                </p>,
                <p>
                  <strong>Eviction:</strong> Default `<strong>priority</strong>` policy keeps
                  high-severity threats
                </p>,
              ]}
            />
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="font-heading font-bold text-lg md:text-xl xl:text-3xl">
              High memory usage
            </h4>

            <p className="font-sans md:text-lg xl:text-xl">
              Tracehound uses bounded memory by design. If you're seeing high usage:
            </p>

            <DocsList
              items={[
                <p>
                  Reduce <strong>`maxBytes`:</strong>{' '}
                  <strong>{`createTracehound({ quarantine: { maxBytes: 50_000_000 } })`}</strong>{' '}
                  (50MB)
                </p>,
                <p>Use async codec for cold storage I/O</p>,
                <p>
                  Check payload limits:{' '}
                  <strong>{`createTracehound({ maxPayloadSize: 100_000 })`}</strong>
                </p>,
              ]}
            />
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="font-heading font-bold text-lg md:text-xl xl:text-3xl">
              Requests are slow
            </h4>

            <p className="font-sans md:text-lg xl:text-xl">
              `<strong>agent.intercept()</strong>` is synchronous and should be &lt;1ms. If slow:
            </p>

            <DocsList
              items={[
                <p>Move heavy detection logic outside Tracehound</p>,
                <p>
                  Use `<strong>@tracehound/express</strong>` adapter (optimized)
                </p>,
                <p>Check if you’re doing async work inside the intercept call</p>,
              ]}
            />
          </div>
        </DocsContentBlock>
      </DocsContent>

      <DocsNavigation
        prev={{
          href: '/docs/getting-started/introduction',
          title: 'Introduction',
          summary: 'Introduction of core package',
        }}
        next={{
          href: '/docs/references/configuration',
          title: 'Configuration',
          summary: 'All configuration options',
        }}
      />
    </DocsPageLayout>
  )
}
