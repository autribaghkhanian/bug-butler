import { useState } from 'react'
import Landing from './components/Landing'
import ChatInterface from './components/ChatInterface'
import BugReport from './components/BugReport'
import ApiKeyInput from './components/ApiKeyInput'
import { STORAGE_KEY_API_KEY, ERROR_MESSAGES } from './lib/constants'

type Screen = 'landing' | 'chat' | 'report'

function App() {
  const [screen, setScreen] = useState<Screen>('landing')
  const [apiKey, setApiKey] = useState(() => localStorage.getItem(STORAGE_KEY_API_KEY) || '')
  const [bugReport, setBugReport] = useState<string | null>(null)

  const handleStart = () => {
    // Check if user has API key set
    if (!apiKey) {
      const key = prompt(ERROR_MESSAGES.API_KEY_REQUIRED)
      if (key) {
        setApiKey(key)
        localStorage.setItem(STORAGE_KEY_API_KEY, key)
        setScreen('chat')
      }
    } else {
      setScreen('chat')
    }
  }

  const handleReportGenerated = (report: string) => {
    setBugReport(report)
    setScreen('report')
  }

  const handleStartOver = () => {
    setBugReport(null)
    setScreen('landing')
  }

  const handleApiKeyChange = (newKey: string) => {
    setApiKey(newKey)
    if (newKey) {
      localStorage.setItem(STORAGE_KEY_API_KEY, newKey)
    } else {
      localStorage.removeItem(STORAGE_KEY_API_KEY)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-teal rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000" />
      </div>

      {/* API Key Settings */}
      <div className="absolute top-4 right-4 z-50">
        <ApiKeyInput apiKey={apiKey} onApiKeyChange={handleApiKeyChange} />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {screen === 'landing' && <Landing onStart={handleStart} />}
        {screen === 'chat' && (
          <ChatInterface
            apiKey={apiKey}
            onReportGenerated={handleReportGenerated}
            onBack={() => setScreen('landing')}
          />
        )}
        {screen === 'report' && bugReport && (
          <BugReport
            report={bugReport}
            onStartOver={handleStartOver}
          />
        )}
      </div>
    </div>
  )
}

export default App
