import { useMemo, useState } from 'react'

export function CodeBlock({ language = 'text', code }) {
  const [copied, setCopied] = useState(false)

  const display = useMemo(() => {
    return typeof code === 'string' ? code.trimEnd() : ''
  }, [code])

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(display)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1200)
    } catch {
      // ignore
    }
  }

  return (
    <div className="codeblock">
      <div className="codeblock__top">
        <span className="codeblock__lang">{language}</span>
        <button type="button" className="btn btn--small" onClick={onCopy}>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="codeblock__pre">
        <code>{display}</code>
      </pre>
    </div>
  )
}
