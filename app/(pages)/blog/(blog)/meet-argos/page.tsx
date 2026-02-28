import { Badge } from '@/app/components/badge'
import { Row } from '@/app/components/patterns/row'
import Link from 'next/link'

export default function BlogPost() {
  return (
    <section className="relative w-full pb-16 lg:pb-24 xl:pb-30">
      <header className="w-full flex flex-col p-6 max-w-6xl mx-auto xl:p-12">
        <Badge variant="neutral">BLOG POST</Badge>
        <h3 className="my-3 font-heading font-bold text-2xl/6 md:text-4xl/9 xl:text-[64px]/16">
          Meet Argos: The Eye That Never Sleeps
        </h3>

        <div className="flex items-center gap-4 mb-2 xl:mb-4">
          <time dateTime="December 29, 2025">December 29, 2025</time>
          <strong>// Tracehound Team</strong>
        </div>

        <nav className="flex items-center gap-4">
          <span className="text-xs font-mono text-(--border) bg-(--border-accent)/20 border border-dashed border-(--border-accent) px-2 py-1">
            #argos
          </span>
          <span className="text-xs font-mono text-(--border) bg-(--border-accent)/20 border border-dashed border-(--border-accent) px-2 py-1">
            #observability
          </span>
          <span className="text-xs font-mono text-(--border) bg-(--border-accent)/20 border border-dashed border-(--border-accent) px-2 py-1">
            #nodejs
          </span>
        </nav>
      </header>

      <Row />

      <article className="flex flex-col p-6 xl:p-12 gap-3 max-w-6xl mx-auto lg:gap-6 xl:gap-9">
        <h3 className="font-heading font-bold text-xl md:text-2xl xl:text-4xl">
          Argos: Solving the Node.js Observer Paradox
        </h3>
        <p className="font-sans md:text-lg xl:text-xl">
          Why your main-thread monitoring goes blind exactly when you need it most—and how we fixed
          it.
        </p>
        <p className="font-sans md:text-lg xl:text-xl">
          In the Node.js ecosystem, we have a fundamental vulnerability that we rarely discuss:{' '}
          <strong>The Observer Paradox.</strong>
        </p>

        <p className="font-sans md:text-lg xl:text-xl">
          Most security and APM agents run on the main thread. They share the same event loop as
          your application logic. This creates a dangerous blind spot:{' '}
          <strong>
            When the application is under a heavy DoS attack or experiencing a ReDoS (Regular
            Expression Denial of Service), the event loop freezes.
          </strong>
        </p>

        <p className="font-sans md:text-lg xl:text-xl">
          When the event loop freezes, your monitoring agent freezes too. It cannot send heartbeats.
          It cannot log errors. It cannot alert you. You are flying blind precisely at the moment of
          impact.
        </p>

        <p className="font-sans md:text-lg xl:text-xl">
          We built <strong>Argos</strong> to eliminate this blind spot.
        </p>

        <h3 className="font-heading font-bold text-xl md:text-2xl xl:text-4xl">What is Argos?</h3>

        <p className="font-sans md:text-lg xl:text-xl">
          Argos is a <strong>Runtime Behavioral Observer.</strong> Unlike traditional APM tools that
          focus on request latency or database queries, Argos focuses on the health and integrity of
          the runtime itself.
        </p>

        <p className="font-sans md:text-lg xl:text-xl">
          It is designed as a standalone product that answers one critical question:{' '}
          <i>Is the runtime behaving normally, even if it isn't responding?</i>
        </p>

        <h3 className="font-heading font-bold text-xl md:text-2xl xl:text-4xl">
          The Architecture: Escaping the Main Thread
        </h3>

        <p className="font-sans md:text-lg xl:text-xl">
          To solve the starvation problem, Argos utilizes a multi-layered architecture that
          decouples observation from execution.
        </p>

        <h4 className="font-heading font-bold text-base md:text-xl xl:text-2xl">
          Layer 1: The Worker Thread Observer
        </h4>

        <p className="font-sans md:text-lg xl:text-xl">
          This is the heart of Argos. Instead of relying on the main event loop, Argos spawns a
          dedicated Worker Thread with its own independent loop.
        </p>

        <ul className="pl-2 space-y-2 xl:list-disc xl:pl-6 text-lg">
          <li>
            <strong>Mechanism:</strong> The main thread and the worker thread share a{' '}
            <strong>`SharedArrayBuffer`</strong>. The main thread writes a timestamp (heartbeat) to
            this buffer.
          </li>
          <li>
            <strong>Starvation Detection:</strong> The worker thread reads this buffer
            independently. If the timestamp stops updating, the worker knows the main thread is
            starving—even if the main thread is too busy to say so itself.
          </li>
          <li>
            <strong>Result:</strong> Argos can detect and report event loop starvation within 3
            seconds, regardless of the main thread's state.
          </li>
        </ul>

        <h4 className="font-heading font-bold text-base md:text-xl xl:text-2xl">
          Layer 2: Adaptive Sampling
        </h4>

        <p className="font-sans md:text-lg xl:text-xl">
          Continuous high-resolution monitoring is expensive. Argos solves this with a dynamic
          “gear-shifting” mechanism:
        </p>

        <ul className="pl-2 space-y-2 xl:list-disc xl:pl-6 text-lg">
          <li>
            <strong>Baseline Mode:</strong> Runs at low frequency (~5000ms) with &lt;0.1% CPU
            overhead.
          </li>
          <li>
            <strong>Burst Mode:</strong> When an anomaly is detected, it instantly shifts to high
            frequency (100ms) to capture granular data during the attack window.
          </li>
          <li>
            <strong>Cooldown:</strong> Automatically returns to baseline when the threat subsides.
          </li>
        </ul>

        <h4 className="font-heading font-bold text-base md:text-xl xl:text-2xl">
          Layer 3: The Ring Buffer
        </h4>

        <p className="font-sans md:text-lg xl:text-xl">
          Attacks happen fast. By the time an alert is triggered, the evidence might be gone. Argos
          maintains a fixed-size <strong>Ring Buffer</strong> (circular buffer) that holds the last
          ~1000 behavioral signals. This allows for retroactive analysis (“What happened right
          before the crash?”) without unbounded memory growth.
        </p>

        <h3 className="font-heading font-bold text-xl md:text-2xl xl:text-4xl">
          What Does Argos See?
        </h3>

        <p className="font-sans md:text-lg xl:text-xl">
          Argos observes axes that standard request loggers miss:
        </p>

        <ul className="pl-2 space-y-2 xl:list-disc xl:pl-6 text-lg">
          <li>
            <strong>Event Loop &amp; Starvation:</strong> Latency drift and microtask queue
            exhaustion.
          </li>
          <li>
            <strong>Runtime Integrity:</strong> Changes to frozen intrinsics or flag anomalies.
          </li>
          <li>
            <strong>Worker/Child Anomalies:</strong> Unusual thread pool behavior or process
            spawning patterns.
          </li>
        </ul>

        <h3 className="font-heading font-bold text-xl md:text-2xl xl:text-4xl">
          Philosophy: Trust, but Verify
        </h3>

        <p className="font-sans md:text-lg xl:text-xl">
          Argos adheres to a strict "Non-Authoritative" trust model. It produces{' '}
          <strong>Behavioral Signals</strong> tagged with confidence levels{' '}
          <strong>(low, medium, high)</strong>. It does not block traffic or make security decisions
          on its own. It simply provides the irrefutable truth about the runtime's state to your
          decision engines (like Tracehound or a SIEM).
        </p>

        <h3 className="font-heading font-bold text-xl md:text-2xl xl:text-4xl">
          Part of the Tracehound Suite
        </h3>

        <p className="font-sans md:text-lg xl:text-xl">
          While Argos acts as the “All-Seeing Eyes” (Panoptes) of the Tracehound suite, it is
          engineered as a standalone product. You can deploy Argos to monitor your Node.js clusters
          today, gaining visibility into runtime behavior that was previously invisible.
        </p>

        <strong className="font-sans md:text-lg xl:text-xl">
          Don't let your monitoring die with your event loop. Watch the watcher with Argos.
        </strong>

        <Link
          href="/products"
          className="font-sans font-bold underline md:text-lg xl:text-xl hover:no-underline">
          Learn more about Argos
        </Link>
      </article>
    </section>
  )
}
