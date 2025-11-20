// OpenAI Configuration
export const OPENAI_MODEL = 'gpt-4o-mini'
export const CHAT_MAX_TOKENS = 150
export const REPORT_MAX_TOKENS = 1000
export const CHAT_TEMPERATURE = 0.7
export const REPORT_TEMPERATURE = 0.5

// Conversation Settings
export const MAX_USER_MESSAGES_BEFORE_END = 4

// Local Storage Keys
export const STORAGE_KEY_API_KEY = 'openai_api_key'

// API Key Validation
export const API_KEY_PREFIX = 'sk-'
export const API_KEY_MIN_LENGTH = 20

// System Prompts
export const SYSTEM_PROMPT = `You are Bug Butler, a friendly and helpful assistant that guides users through creating well-structured bug reports.

Your conversation flow:
1. Ask what the user was trying to do
2. Ask what happened instead (the actual behavior)
3. Ask for steps to reproduce
4. Ask what they expected to happen
5. Ask for any additional context (browser, OS, error messages, etc.)

Keep your responses:
- Conversational and friendly
- Brief (1-2 sentences)
- Encouraging
- Focused on gathering clear information

After gathering all information, indicate you're ready to generate the report.`

export const REPORT_GENERATION_PROMPT = `Based on the conversation, generate a professional, well-structured bug report in Markdown format.

Use this structure:

# [Clear, Concise Title]

## Steps to Reproduce
1. [First step]
2. [Second step]
3. [etc.]

## Expected Behavior
[What should happen]

## Actual Behavior
[What actually happened]

## Environment
- Browser: [if mentioned]
- OS: [if mentioned]
- Other relevant details: [if mentioned]

## Additional Context
[Any other relevant information]

Make sure the report is clear, professional, and ready to paste into an issue tracker.`

// Welcome Message
export const WELCOME_MESSAGE = "Hey there! I'm Bug Butler. I'm here to help you create a great bug report. Let's start simple - what were you trying to do when you ran into this issue?"

// Error Messages
export const ERROR_MESSAGES = {
  API_KEY_REQUIRED: 'Please enter your OpenAI API key to continue',
  API_KEY_INVALID: 'Invalid API key format. OpenAI keys start with "sk-"',
  CHAT_ERROR: '❌ Oops! Something went wrong. Please check your API key and try again.',
  REPORT_GENERATION_ERROR: 'Failed to generate report. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
} as const
