import React from "react";
import { Timeline } from "primereact/timeline";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ThreadItem from "./ThreadItem";

interface Props {
    threadId: string;
    depth?: number; // optional, for styling/indentation
}

const ThreadTimeline: React.FC<Props> = ({ threadId, depth = 0 }) => {
    const thread = useSelector((state: RootState) => state.threads.threadsById[threadId]);
    const messages = useSelector((state: RootState) =>
        thread?.messages.map((msgId) => state.threads.messagesById[msgId]) || []
    );

    if (!thread) return null;

    return (
        <div className={`ml-${depth * 4}` /* increase indentation for depth */}>
            <Timeline
                value={messages}
                align="left"
                className="custom-timeline"
                content={(msg) => (
                    <div>
                        <ThreadItem messageId={msg.id} />

                        {/* Recursively render child threads */}
                        {msg.metadata?.childrenThreads?.length > 0 &&
                            msg.metadata.childrenThreads.map((childThreadId: string) => (
                                <ThreadTimeline
                                    key={childThreadId}
                                    threadId={childThreadId}
                                    depth={depth + 1}
                                />
                            ))}
                    </div>
                )}
            />
        </div>
    );
};

export default ThreadTimeline;
