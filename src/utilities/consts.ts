export const API_V1 = "/api/V1"

export const MONGO = {
    COLLECTIONS:{
        VISITS : "visits"
    }
} as const

export const API_PARAMS = {
    OFFSET: "offset",
    LIMIT: "limit",
    DEFAULTS:{
        OFFSET: 0,
        LIMIT: 100,
    }
} as const

export const TOKEN_ORG_ID_KEY = 'custom:organization_id';

export const LLM_WHITELIST = ["chatgpt", "openai", "claude", "sonnet", "gemini", "LLM", "AI", "chatbot"];
