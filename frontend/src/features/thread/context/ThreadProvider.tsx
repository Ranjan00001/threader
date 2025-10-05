import React, { createContext, useContext, ReactNode } from 'react';
import { useSelector, useDispatch } from "@/imports";
import { ThreadsState } from "@/slices/threadsSlice";
import { useApi } from "@/entities/useApi";
import { API_ENDPOINTS } from "@/imports/constants/endpoints";
import { useToast } from "@/entities/useToast";
import { useChat } from '@/entities/ChatProvider';
import { createThreadWithMessage, addMessage, generateId } from "@/imports";

interface Message {
    id: string;
    threadId: string;
    parentId?: string;
    author: "user" | "assistant" | "system";
    text: string;
    createdAt: string;
    metadata?: any;
}

interface CreateThreadResponse {
    thread_id: string;
    response: string;
    parentThreadId: string;
    query: string;
}

interface ThreadContextType {
    loading: boolean;
    createThread: (parentThreadId: string, query: string, selectedText?: string, context?: string) => Promise<CreateThreadResponse>;
    getThread: (threadId: string) => Promise<any>;
    handleCopy: (text: string) => void;
    handleCreateThread: (query: string, parentThreadId: string, text?: string, context?: string) => Promise<string>;
}

export const ThreadContext = createContext<ThreadContextType | null>(null);

export const ThreadProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { get, post, loading } = useApi();
    const toast = useToast();
    const dispatch = useDispatch();
    const { selectedText, setSelectedText, activeMessage } = useChat();

    const createThread = async (
        parentThreadId: string,
        query: string,
        selectedText?: string,
        context?: string
    ): Promise<CreateThreadResponse> => {
        try {
            const resp = await post<CreateThreadResponse>(
                API_ENDPOINTS.THREAD.CREATE,
                {
                    parentThreadId,
                    query,
                    context,
                    selectedText,
                }
            );
            return resp;
        } catch (error) {
            toast?.error("Failed to create thread. Please try again.");
            console.error("Error creating thread:", error);
            throw error;
        }
    };

    const getThread = async (threadId: string) => {
        try {
            const resp = await get(API_ENDPOINTS.THREAD.GET_BY_ID(threadId));
            return resp;
        } catch (error) {
            toast?.error("Failed to fetch thread. Please try again.");
            console.error("Error fetching thread:", error);
            throw error;
        }
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text).catch(console.error);
    };

    const handleCreateThread = async (
        query: string,
        parentThreadId: string,
        text: string | undefined = selectedText,
        context: string | undefined = activeMessage?.text
    ): Promise<string> => {
        if (!text) {
            throw new Error("No text selected to create a thread from.");
        }

        // Call backend to create thread
        const resp = await createThread(parentThreadId, query, selectedText, context);
        const { thread_id, response } = resp;

        // Dispatch new thread with initial user message
        const userMessageId = generateId();
        dispatch(
            createThreadWithMessage({
                threadId: thread_id,
                initialMessage: {
                    id: userMessageId,
                    threadId: thread_id,
                    author: "user",
                    text: `"${text}" - ${query}`,
                    createdAt: new Date().toISOString(),
                },
                parentMessageId: activeMessage?.id,
                parentThreadId,
            })
        );

        // Dispatch assistant's reply to the new thread
        const assistantMessageId = generateId();
        dispatch(
            addMessage({
                id: assistantMessageId,
                threadId: thread_id,
                author: "assistant",
                text: response,
                createdAt: new Date().toISOString(),
            })
        );

        // Clear selected text
        setSelectedText(undefined);

        return thread_id;
    };

    const value = {
        loading,
        createThread,
        getThread,
        handleCopy,
        handleCreateThread
    };

    return (
        <ThreadContext.Provider value={value}>
            {children}
        </ThreadContext.Provider>
    );
};
