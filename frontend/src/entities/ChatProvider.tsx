import React, { createContext, useContext, useState, ReactNode } from "react";
import { useDispatch } from "react-redux";
import { createThreadWithMessage, addMessage, generateId } from "@/imports";
import apiClient from "@/imports/api";

// ----------------- Types -----------------
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
    response: string; // assistant reply for new thread
    parentThreadId: string;
    query: string;
}

interface ChatContextType {
    selectedText?: string;
    setSelectedText: (text?: string) => void;

    activeThreadId?: string;
    setActiveThreadId: (id?: string) => void;

    activeMessage?: Message;
    setActiveMessage: (msg?: Message) => void;

    handleCreateThread: (
        query: string,
        parentThreadId: string,
        text?: string,
        context?: string
    ) => Promise<string>;
}

// ----------------- Context -----------------
const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const dispatch = useDispatch();

    const [selectedText, setSelectedText] = useState<string>();
    const [activeThreadId, setActiveThreadId] = useState<string>();
    const [activeMessage, setActiveMessage] = useState<Message>();

    // ----------------- API call -----------------
    const createThread = async (
        parentThreadId: string,
        query: string,
        selectedText?: string,
        context?: string
    ): Promise<CreateThreadResponse> => {
        const resp = await apiClient.post("/thread/create", {
            parentThreadId,
            query,
            context,
            selectedText,
        });
        return resp.data;
    };

    // ----------------- Handler -----------------
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
        const resp = await createThread(parentThreadId, query, text, context);
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
                parentMessageId: activeMessage?.id, // attach as child to selected message
                parentThreadId, // optional, original thread
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

    return (
        <ChatContext.Provider
            value={{
                selectedText,
                setSelectedText,
                activeThreadId,
                setActiveThreadId,
                activeMessage,
                setActiveMessage,
                handleCreateThread,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

// ----------------- Hook -----------------
export const useChat = () => {
    const ctx = useContext(ChatContext);
    if (!ctx) {
        throw new Error("useChat must be used inside a ChatProvider");
    }
    return ctx;
};
