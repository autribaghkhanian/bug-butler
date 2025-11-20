import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import Button from './ui/Button'
import CopyButton from './ui/CopyButton'
import Card from './ui/Card'

interface BugReportProps {
  report: string
  onStartOver: () => void
}

export default function BugReport({ report, onStartOver }: BugReportProps) {
  return (
    <div className="min-h-screen px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-purple-dark mb-3 sm:mb-4">
            Your Bug Report
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted px-4">
            All set! Here's your polished, structured bug report.
          </p>
        </motion.div>

        {/* Report Card */}
        <Card className="mb-4 sm:mb-6">
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => (
                  <h1 className="text-3xl font-serif font-bold text-purple-dark mb-4" {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="text-2xl font-serif font-bold text-dark mt-6 mb-3" {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className="text-xl font-serif font-bold text-dark mt-4 mb-2" {...props} />
                ),
                p: ({ node, ...props }) => (
                  <p className="text-dark mb-4 leading-relaxed" {...props} />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="list-disc list-inside mb-4 space-y-2" {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />
                ),
                li: ({ node, ...props }) => (
                  <li className="text-dark" {...props} />
                ),
                code: ({ node, ...props }: any) => {
                  const inline = !props.className
                  return inline ? (
                    <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm" {...props} />
                  ) : (
                    <code className="block bg-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto" {...props} />
                  )
                },
              }}
            >
              {report}
            </ReactMarkdown>
          </div>
        </Card>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center"
        >
          <CopyButton text={report} />
          <Button variant="secondary" size="md" onClick={onStartOver}>
            ← Start Over
          </Button>
        </motion.div>

        {/* Footer hint */}
        <p className="text-center text-muted text-xs sm:text-sm mt-6 sm:mt-8 px-4">
          Paste this into your issue tracker, share with your team, or save for later!
        </p>
      </div>
    </div>
  )
}
