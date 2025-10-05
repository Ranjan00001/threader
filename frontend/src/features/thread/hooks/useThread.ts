import { useContext } from "react";
import { ThreadContext } from "../context/ThreadProvider";
import { useSelector } from "react-redux";
import { ThreadsState } from "@/imports";

export const useThread = (threadId: string) => {
    const context = useContext(ThreadContext);
    if (!context) {
        throw new Error('useThread must be used within a ThreadProvider');
    }

    const thread = useSelector(
        (state: { threads: ThreadsState }) => state.threads.threadsById[threadId]
    );

    return {
        ...context,
        thread,
    };
};