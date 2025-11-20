import { useState } from 'react'
import Button from './Button'

interface CopyButtonProps {
  text: string
  className?: string
}

export default function CopyButton({ text, className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <Button
      variant="secondary"
      size="md"
      onClick={handleCopy}
      className={className}
    >
      {copied ? '✓ Copied!' : 'Copy to Clipboard'}
    </Button>
  )
}
