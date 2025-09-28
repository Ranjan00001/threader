/**
 * Message utility functions
 */

export const formatMessageAuthor = (author: string): string => {
    switch (author) {
      case "user":
        return "You";
      case "assistant":
        return "AI";
      default:
        return author;
    }
  };
  