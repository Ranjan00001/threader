import React, { useRef } from "react";
import ReactMarkdown from "react-markdown";

interface SelectionInfo {
    text: string;
    x: number;
    y: number;
}

interface SelectableMarkdownProps {
    content: string;
    onSelect?: (selection: SelectionInfo | null) => void;
    className?: string;
    style?: React.CSSProperties;
}

const SelectableMarkdown: React.FC<SelectableMarkdownProps> = ({
    content,
    onSelect,
    className,
    style,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseUp = () => {
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed) {
            onSelect?.(null);
            return;
        }

        const selectedText = selection.toString().trim();
        if (!selectedText) {
            onSelect?.(null);
            return;
        }

        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        console.log(selection, range, rect);
        onSelect?.({
            text: selectedText,
            x: rect.left + rect.width / 2,
            y: rect.top - 40, // TO adjust the toolbar height
        })
    };

    return (
        <div
            ref={containerRef}
            onMouseUp={handleMouseUp}
            className={className}
            style={style}
        >
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    );
};

export default SelectableMarkdown;
