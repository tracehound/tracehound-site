'use client'

import { CheckIcon, CopyIcon } from '@phosphor-icons/react/dist/ssr'
import { useRef, useState } from 'react'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import ts from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript'
import { vs as styles } from 'react-syntax-highlighter/dist/esm/styles/hljs'

SyntaxHighlighter.registerLanguage('typescript', ts)

export function Code({ code, language }: { code: string; language?: string }) {
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
        className="size-8 absolute top-2 right-2 flex items-center justify-center bg-(--accent-primary) rounded-xs cursor-pointer transition-colors hover:bg-(--accent-primary-hover)"
        onClick={copyHandler}>
        {status ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
      </button>

      <SyntaxHighlighter
        language={language || 'typescript'}
        style={styles}
        customStyle={{
          padding: '1rem',
        }}
        showInlineLineNumbers
        useInlineStyles
        wrapLongLines>
        {code}
      </SyntaxHighlighter>
    </div>
  )
}
