import { createThreadWithMessage, ThreadsState } from "@/imports";
import apiClient from "@/imports/api";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";

// Types for clarity
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
}

interface ChatContextType {
    selectedText?: string;
    setSelectedText: (text?: string) => void;

    activeThreadId?: string;
    setActiveThreadId: (id?: string) => void;

    activeMessage?: Message;
    setActiveMessage: (msg?: Message) => void;

    messages: Record<string, Message[]>; // threadId -> list of messages
    addMessage: (threadId: string, msg: Message) => void;
    clearMessages: (threadId: string) => void;

    handleCreateThread: (
        query: string,
        id: string,
        context?: string,
        text?: string
    ) => Promise<string>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const dispatch = useDispatch();

    const [selectedText, setSelectedText] = useState<string>();
    const [activeThreadId, setActiveThreadId] = useState<string>();
    const [activeMessage, setActiveMessage] = useState<Message>();

    const [messages, setMessages] = useState<Record<string, Message[]>>({});

    const addMessage = (threadId: string, msg: Message) => {
        setMessages((prev) => ({
            ...prev,
            [threadId]: [...(prev[threadId] || []), msg],
        }));
    };

    const clearMessages = (threadId: string) => {
        setMessages((prev) => ({
            ...prev,
            [threadId]: [],
        }));
    };

    const createThread = async (
        parentThreadId: string,
        query: string,
        selectedText?: string,
        context?: string,
    ): Promise<CreateThreadResponse> => {
        const resp = await apiClient.post("/thread/create", {
            parentThreadId,
            query,
            context,
            selectedText,
        });
        return resp.data;
    };

    const handleCreateThread = async (
        query: string,
        id: string,
        text: string | undefined = selectedText,
        context: string | undefined = activeMessage?.text,
    ) => {
        console.log("Creating new thread from thread:", id);
        const response = await createThread(id, query, text, context);
        const newThreadId = response.thread_id;
        console.log("Created thread with ID:", newThreadId);
        dispatch(
            createThreadWithMessage({
                threadId: newThreadId,
                initialMessage: {
                    id: `${id}-${newThreadId}`,
                    threadId: newThreadId,
                    author: "assistant",
                    text: "Hi there! How can I help you today?",
                    createdAt: new Date().toISOString(),
                },
            })
        );
        return newThreadId;
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
                messages,
                addMessage,
                clearMessages,
                handleCreateThread,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

// Hook to consume context
export const useChat = () => {
    const ctx = useContext(ChatContext);
    if (!ctx) {
        throw new Error("useChat must be used inside a ChatProvider");
    }
    return ctx;
};
