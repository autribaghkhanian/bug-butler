import { useState, useEffect, useRef, KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { sendChatMessage, generateBugReport, Message } from '../lib/openai'
import { WELCOME_MESSAGE } from '../lib/constants'
import Button from './ui/Button'
import LoadingSpinner from './ui/LoadingSpinner'

interface ChatInterfaceProps {
  apiKey: string
  onReportGenerated: (report: string) => void
  onBack: () => void
}

export default function ChatInterface({ apiKey, onReportGenerated, onBack }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [conversationComplete, setConversationComplete] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(scrollToBottom, [messages])

  useEffect(() => {
    // Start conversation with first bot message
    const welcomeMessage: Message = {
      role: 'assistant',
      content: WELCOME_MESSAGE,
    }
    setMessages([welcomeMessage])
  }, [])

  const handleSend = async () => {
    if (!input.trim() || isTyping) return

    const userMessage: Message = { role: 'user', content: input.trim() }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    try {
      const response = await sendChatMessage(
        apiKey,
        [...messages, userMessage],
        conversationComplete
      )

      setMessages((prev) => [...prev, { role: 'assistant' as const, content: response.message }])

      if (response.shouldEnd) {
        setConversationComplete(true)
      }
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant' as const,
          content: `❌ ${errorMessage}`,
        },
      ])
    } finally{
      setIsTyping(false)
    }
  }

  const handleGenerateReport = async () => {
    setIsProcessing(true)

    try {
      const report = await generateBugReport(apiKey, messages)
      onReportGenerated(report)
    } catch (error) {
      console.error('Report generation error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate report. Please try again.'
      alert(errorMessage)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="mb-4 sm:mb-6 flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-purple-dark">
            Bug Butler
          </h2>
          <Button variant="ghost" size="sm" onClick={onBack}>
            ← Back
          </Button>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px] sm:h-[600px]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((message, index) => (
                <MessageBubble key={index} message={message} />
              ))}
            </AnimatePresence>

            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            {conversationComplete ? (
              <div className="flex flex-col items-center gap-4 py-4">
                <p className="text-muted text-center">
                  Great! I have all the information I need.
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleGenerateReport}
                  disabled={isProcessing}
                  className="min-w-[200px]"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <LoadingSpinner size="sm" />
                      Generating Report...
                    </span>
                  ) : (
                    'Generate Bug Report →'
                  )}
                </Button>
              </div>
            ) : (
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your answer..."
                  disabled={isTyping}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple disabled:bg-gray-100"
                />
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                >
                  Send
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function MessageBubble({ message }: { message: Message }) {
  const isBot = message.role === 'assistant'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-5 py-3 ${
          isBot
            ? 'bg-gray-100 text-dark'
            : 'bg-purple text-white'
        }`}
      >
        <p className="text-sm md:text-base leading-relaxed">{message.content}</p>
      </div>
    </motion.div>
  )
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-start"
    >
      <div className="bg-gray-100 rounded-2xl px-5 py-3">
        <div className="flex gap-1">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
            className="w-2 h-2 bg-muted rounded-full"
          />
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
            className="w-2 h-2 bg-muted rounded-full"
          />
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
            className="w-2 h-2 bg-muted rounded-full"
          />
        </div>
      </div>
    </motion.div>
  )
}
