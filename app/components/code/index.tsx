'use client'

import { CheckIcon, CopyIcon } from '@phosphor-icons/react/dist/ssr'
import { useRef, useState } from 'react'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import ts from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript'
import { xcode } from 'react-syntax-highlighter/dist/esm/styles/hljs'

SyntaxHighlighter.registerLanguage('typescript', ts)

export function Code({ code }: { code: string }) {
  const timeout = useRef<NodeJS.Timeout | number | undefined>(undefined)
  const [status, setStatus] = useState(false)

  const copyHandler = async () => {
    await navigator.clipboard.writeText(code)

    setStatus(true)

    clearTimeout(timeout.current)
    timeout.current = setTimeout(() => {
      setStatus(false)
    }, 1000)
  }

  return (
    <div className="relative border border-dashed border-(--border-accent)">
      <button
        className="size-10 absolute top-0 right-0 flex items-center justify-center bg-(--accent-primary) cursor-pointer transition-colors hover:bg-(--accent-primary-hover)"
        onClick={copyHandler}>
        {status ? <CheckIcon size={20} /> : <CopyIcon size={20} />}
      </button>

      <SyntaxHighlighter language="typescript" style={xcode} showInlineLineNumbers wrapLongLines>
        {code}
      </SyntaxHighlighter>
    </div>
  )
}
