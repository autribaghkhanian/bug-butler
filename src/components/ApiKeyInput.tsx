import { useState, useEffect, useRef, KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from './ui/Button'
import { API_KEY_PREFIX, API_KEY_MIN_LENGTH } from '../lib/constants'

interface ApiKeyInputProps {
  apiKey: string
  onApiKeyChange: (key: string) => void
}

export default function ApiKeyInput({ apiKey, onApiKeyChange }: ApiKeyInputProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [tempKey, setTempKey] = useState(apiKey)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Sync tempKey with apiKey when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setTempKey(apiKey)
      setError('')
      // Auto-focus input when dropdown opens
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen, apiKey])

  // Keyboard shortcuts: ESC to close
  useEffect(() => {
    const handleEscape = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  const validateApiKey = (key: string): boolean => {
    // Allow empty string to clear the key
    if (key === '') return true

    // Check if key starts with correct prefix and has minimum length
    if (!key.startsWith(API_KEY_PREFIX)) {
      setError(`API key must start with "${API_KEY_PREFIX}"`)
      return false
    }

    if (key.length < API_KEY_MIN_LENGTH) {
      setError(`API key seems too short`)
      return false
    }

    setError('')
    return true
  }

  const handleSave = () => {
    if (validateApiKey(tempKey)) {
      onApiKeyChange(tempKey)
      setIsOpen(false)
    }
  }

  const handleClear = () => {
    setTempKey('')
    setError('')
    onApiKeyChange('')
    setIsOpen(false)
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSave()
    }
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="text-muted hover:text-dark"
        aria-label={apiKey ? 'Manage API Key' : 'Set API Key'}
        aria-expanded={isOpen}
      >
        {apiKey ? '🔑 API Key Set' : '🔑 Set API Key'}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-12 w-[calc(100vw-2rem)] max-w-[320px] sm:w-80 bg-white rounded-xl shadow-2xl p-4 sm:p-6 border border-gray-200 z-50"
            role="dialog"
            aria-label="API Key Settings"
          >
            <h3 className="font-semibold text-dark mb-2">OpenAI API Key</h3>
            <p className="text-sm text-muted mb-4">
              Your key is stored locally in your browser.
            </p>

            <div className="mb-4">
              <input
                ref={inputRef}
                type="password"
                value={tempKey}
                onChange={(e) => {
                  setTempKey(e.target.value)
                  setError('') // Clear error on change
                }}
                onKeyPress={handleKeyPress}
                placeholder="sk-..."
                className={`w-full px-4 py-2 border rounded-lg font-mono text-sm focus:outline-none focus:ring-2 ${
                  error
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-purple'
                }`}
                aria-label="OpenAI API Key"
                aria-invalid={!!error}
                aria-describedby={error ? 'api-key-error' : undefined}
              />
              {error && (
                <p id="api-key-error" className="text-red-500 text-xs mt-2" role="alert">
                  {error}
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={handleSave}
                className="flex-1"
                aria-label="Save API Key"
              >
                Save
              </Button>
              {apiKey && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleClear}
                  aria-label="Clear API Key"
                >
                  Clear
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                aria-label="Cancel"
              >
                Cancel
              </Button>
            </div>

            <p className="text-xs text-muted mt-4 hidden sm:block">
              Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Enter</kbd> to save,
              <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs ml-1">Esc</kbd> to close
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
