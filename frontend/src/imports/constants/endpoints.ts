/**
 * API Endpoints
 * Centralized location for all API endpoints used in the application
 */

export const API_ENDPOINTS = {
    // Chat endpoints
    CHAT: {
        SEND_MESSAGE: '/chat/message',
        CREATE_THREAD: '/chat/thread',
        START: '/chat/start',
    },
    // Thread endpoints
    THREAD: {
        GET_ALL: '/threads',
        GET_BY_ID: (id: string) => `/thread/${id}`,
        CREATE: '/thread/create',
        CREATE_WITH_CONTEXT: '/thread/create',
        DELETE: (id: string) => `/thread/${id}`,
    },
    // User endpoints
    USER: {
        PROFILE: '/user/profile',
        SETTINGS: '/user/settings',
    },
} as const;