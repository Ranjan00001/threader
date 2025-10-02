import React from "react";
import { Timeline } from "primereact/timeline";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ThreadItem from "./ThreadItem";

interface Props {
    threadId: string;
}

const ThreadTimeline: React.FC<Props> = ({ threadId }) => {
    const thread = useSelector((state: RootState) => state.threads.threadsById[threadId]);
    const messages = useSelector((state: RootState) =>
        thread?.messages.map((msgId) => state.threads.messagesById[msgId]) || []
    );

    if (!thread) return null;

    return (
        <Timeline
            value={messages}
            align="left"
            className="custom-timeline"
            content={(msg) => <ThreadItem messageId={msg.id} />}
        />
    );
};

export default ThreadTimeline;
