import OpenAI from 'openai'
import {
  OPENAI_MODEL,
  CHAT_MAX_TOKENS,
  REPORT_MAX_TOKENS,
  CHAT_TEMPERATURE,
  REPORT_TEMPERATURE,
  MAX_USER_MESSAGES_BEFORE_END,
  SYSTEM_PROMPT,
  REPORT_GENERATION_PROMPT,
  ERROR_MESSAGES,
} from './constants'

export interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

interface ChatResponse {
  message: string
  shouldEnd: boolean
}

export async function sendChatMessage(
  apiKey: string,
  messages: Message[],
  _shouldEnd: boolean
): Promise<ChatResponse> {
  try {
    const openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true, // Client-side usage
    })

    const userMessageCount = messages.filter((m) => m.role === 'user').length

    const response = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      temperature: CHAT_TEMPERATURE,
      max_tokens: CHAT_MAX_TOKENS,
    })

    const assistantMessage = response.choices[0].message.content || ''

    // Check if we should end (after ~4-5 user responses)
    const shouldEndConversation = userMessageCount >= MAX_USER_MESSAGES_BEFORE_END

    return {
      message: assistantMessage,
      shouldEnd: shouldEndConversation,
    }
  } catch (error) {
    // Handle specific OpenAI errors
    if (error instanceof Error) {
      if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        throw new Error(ERROR_MESSAGES.API_KEY_INVALID)
      }
      if (error.message.includes('network') || error.message.includes('fetch')) {
        throw new Error(ERROR_MESSAGES.NETWORK_ERROR)
      }
    }
    throw new Error(ERROR_MESSAGES.CHAT_ERROR)
  }
}

export async function generateBugReport(
  apiKey: string,
  conversationMessages: Message[]
): Promise<string> {
  try {
    const openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true,
    })

    // Create a prompt with the full conversation
    const conversationText = conversationMessages
      .map((m) => `${m.role === 'user' ? 'User' : 'Bug Butler'}: ${m.content}`)
      .join('\n\n')

    const response = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [
        {
          role: 'system',
          content: REPORT_GENERATION_PROMPT,
        },
        {
          role: 'user',
          content: `Here is the conversation with the user about their bug:\n\n${conversationText}\n\nPlease generate a structured bug report based on this conversation.`,
        },
      ],
      temperature: REPORT_TEMPERATURE,
      max_tokens: REPORT_MAX_TOKENS,
    })

    return response.choices[0].message.content || ''
  } catch (error) {
    // Handle specific OpenAI errors
    if (error instanceof Error) {
      if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        throw new Error(ERROR_MESSAGES.API_KEY_INVALID)
      }
      if (error.message.includes('network') || error.message.includes('fetch')) {
        throw new Error(ERROR_MESSAGES.NETWORK_ERROR)
      }
    }
    throw new Error(ERROR_MESSAGES.REPORT_GENERATION_ERROR)
  }
}
