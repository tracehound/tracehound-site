/* eslint-disable react/no-unescaped-entities */
import { Code } from '@/app/components/code'
import { DocsContent } from '@/app/components/docs-content'
import { DocsContentBlock } from '@/app/components/docs-content-block'
import { DocsContentParagraph } from '@/app/components/docs-content-paragraph'
import { DocsHeader } from '@/app/components/docs-header'
import { DocsList } from '@/app/components/docs-list'
import { DocsNavigation } from '@/app/components/docs-navigation'
import { DocsPageLayout } from '@/app/components/docs-page-layout'
import { Separator } from '@/app/components/separator'
import { Table } from '@/app/components/table'
import type { Metadata } from 'next/types'
import { antiPatternCode, failSafeUsageCode, interceptHandlingCode } from './codes'

export const metadata: Metadata = {
  title: 'Fail-Open Behaviour',
  description:
    'How Tracehound handles internal failures without becoming a denial-of-service vector.',
}

export default function FailOpenBehaviour() {
  return (
    <DocsPageLayout>
      <DocsHeader
        label="GUIDES"
        title="Fail-Open Behaviour"
        summary="How Tracehound handles internal failures without becoming a denial-of-service vector."
      />

      <DocsContent>
        <DocsContentBlock title="Core Invariant">
          <DocsContentParagraph>
            Fail-open in Tracehound means internal subsystem failures are surfaced as typed outcomes{' '}
            <strong>(status: 'error')</strong> instead of crashing the host request path.
          </DocsContentParagraph>
          <DocsContentParagraph>
            The security subsystem should degrade visibly, not become an availability kill-switch.
          </DocsContentParagraph>
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="What Fail-Open Means in Practice">
          <Table
            head={['Situation', 'Expected behavior']}
            body={[
              {
                row: [
                  'Agent internal exception',
                  <>
                    Returns <strong>`InterceptResult`</strong> with `status: error`
                  </>,
                ],
              },
              {
                row: [
                  'Rate abuse detected',
                  <>
                    Returns <strong>`rate_limited`</strong> (intentional policy behavior, not
                    failure)
                  </>,
                ],
              },
              {
                row: [
                  'Payload exceeds bounds',
                  <>
                    Returns <strong>`payload_too_large`</strong> with explicit limit
                  </>,
                ],
              },
              {
                row: [
                  'Async worker stress',
                  <>Timeout/error signals emitted via watcher/notifications</>,
                ],
              },
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Recommended Integration Pattern">
          <DocsContentParagraph>
            Handle all statuses explicitly and treat <strong>`error`</strong> as an observable
            fail-open outcome.
          </DocsContentParagraph>
          <Code code={interceptHandlingCode} />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Anti-Pattern to Avoid">
          <DocsContentParagraph>
            If you convert Tracehound internal errors into hard request blocks, you can turn your
            security layer into a self-inflicted DoS trigger.
          </DocsContentParagraph>
          <Code code={antiPatternCode} />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="FailSafe Threshold Hooks">
          <DocsContentParagraph>
            <strong>`createFailSafe`</strong> provides warning/critical/emergency hooks for pressure
            signals (memory, quarantine, error-rate).
          </DocsContentParagraph>
          <Code code={failSafeUsageCode} />
          <DocsList
            items={[
              <p key="f1">Callbacks are non-blocking and should never become hot-path work.</p>,
              <p key="f2">Use callbacks to alert and initiate controlled operational responses.</p>,
              <p key="f3">
                Keep emergency actions explicit and tested in staging before production use.
              </p>,
            ]}
          />
        </DocsContentBlock>

        <Separator />

        <DocsContentBlock title="Operational Notes">
          <DocsList
            items={[
              <p key="o1">
                <strong>Fail-open does not mean "always allow everything"</strong>; policy outcomes
                like rate limiting still apply.
              </p>,
              <p key="o2">
                Monitor <strong>`system.panic`</strong> notifications and watcher alerts to detect
                degraded states.
              </p>,
              <p key="o3">
                Keep upstream input limits and detector quality high to reduce pressure scenarios.
              </p>,
            ]}
          />
        </DocsContentBlock>
      </DocsContent>

      <DocsNavigation
        prev={{
          href: '/docs/guides/cold-storage-security',
          title: 'Cold Storage Security',
          summary: 'Long-term archival layer for evidence',
        }}
        next={{
          href: '/docs/guides/local-state-semantics',
          title: 'Local State Semantics',
          summary: 'General behaviour of the instances',
        }}
      />
    </DocsPageLayout>
  )
}
