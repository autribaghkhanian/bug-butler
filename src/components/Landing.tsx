import { motion } from 'framer-motion'
import Button from './ui/Button'

interface LandingProps {
  onStart: () => void
}

export default function Landing({ onStart }: LandingProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-8 sm:py-0">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-4 sm:mb-6 text-purple-dark">
            Bug Butler
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted mb-8 sm:mb-12 font-light text-balance px-2">
            Your friendly AI assistant that transforms messy bug descriptions
            into crystal-clear, structured reports.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4 sm:space-y-6"
        >
          <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-xl max-w-2xl mx-auto">
            <h2 className="text-lg sm:text-xl font-sans font-semibold mb-3 sm:mb-4 text-dark">
              How it works
            </h2>
            <div className="space-y-4 text-left">
              <Step number="1" text="Chat with Bug Butler about the issue you found" />
              <Step number="2" text="Answer a few simple questions about what happened" />
              <Step number="3" text="Get a perfectly formatted bug report, ready to share" />
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={onStart}
            className="text-lg sm:text-xl w-full sm:w-auto"
          >
            Start Reporting →
          </Button>

          <p className="text-xs sm:text-sm text-muted mt-4 sm:mt-6 px-4">
            No signup required. Bring your own OpenAI API key.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

function Step({ number, text }: { number: string; text: string }) {
  return (
    <div className="flex items-start gap-3 sm:gap-4">
      <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-purple text-white flex items-center justify-center font-semibold text-sm sm:text-base">
        {number}
      </div>
      <p className="text-dark pt-0.5 sm:pt-1 text-sm sm:text-base">{text}</p>
    </div>
  )
}
