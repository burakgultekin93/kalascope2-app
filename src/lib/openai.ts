import OpenAI from 'openai'

const apiKey = import.meta.env.VITE_OPENAI_API_KEY

if (!apiKey) {
    console.warn('⚠️ OpenAI API Key is missing. Vision features will not work.')
}

export const openai = new OpenAI({
    apiKey: apiKey || '',
    dangerouslyAllowBrowser: true // Client side integration for PWA
})
