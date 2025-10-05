import { useState } from "react";
import { useDispatch } from "react-redux";
import { addMessage, createThreadWithMessage } from "@/slices/threadsSlice";
import { generateId } from "@/imports";
import { useApi } from "@/entities/useApi";
import { API_ENDPOINTS } from "@/imports/constants/endpoints";
import { CHAT_STARTED, ERROR_MESSAGE } from "@/shared/utils/constant";
import { useToast } from "@/entities/useToast";

export interface StartChatResponse {
  session_id: string;
}

export interface SendMessageResponse {
  response: string;
}

export const useComposer = (threadId: string = "") => {
  const [text, setText] = useState("");

  const { loading, post } = useApi();
  const toast = useToast();
  const dispatch = useDispatch();

  const startChat = async (): Promise<StartChatResponse> => {
    try {
      const resp = await post<StartChatResponse>(API_ENDPOINTS.CHAT.START);
      toast?.success(CHAT_STARTED);
      return resp;
    } catch (error) {
      toast?.error(ERROR_MESSAGE);
      console.error(error);
    }
    return { session_id: "" };
  };

  const sendMessage = async (
    sessionId: string,
    message: string
  ): Promise<SendMessageResponse> => {
    try {
      const resp = await post<SendMessageResponse>(`/chat/send/${sessionId}`, { message });
      return resp;
    } catch (error) {
      toast?.error(ERROR_MESSAGE);
      console.error(error);
    }
    return { response: ERROR_MESSAGE };
  };

  const reset = () => setText("");

  const handleChange = (value: string) => {
    setText(value);
  };

  const handleSend = async (sessionId: string, text: string) => {
    if (!text.trim()) return;

    dispatch(
      addMessage({
        id: generateId(),
        threadId,
        author: "user",
        text,
        createdAt: new Date().toISOString(),
      })
    );

    // Add backend call here
    const response = await sendMessage(sessionId, text);
    //     const response = {
    //     "response": "Artificial Intelligence (AI) is a broad term encompassing the development of computer systems capable of performing tasks that typically require human intelligence.  Instead of just following instructions, AI can learn, reason, problem-solve, perceive, and even create.\n\nHere's a breakdown of key aspects:\n\n*   **Definition:**  AI is the theory and development of computer systems able to perform tasks that normally require human intelligence, such as visual perception, speech recognition, decision-making, and translation between languages.\n\n*   **Core Abilities:**  The key abilities AI tries to replicate are:\n\n    *   **Learning:**  The ability to learn from data, identify patterns, and improve performance over time without being explicitly programmed.  This includes things like:\n        *   **Supervised Learning:** Learning from labeled data (e.g., \"this is a cat,\" \"this is a dog\").\n        *   **Unsupervised Learning:**  Finding patterns in unlabeled data (e.g., clustering customers based on their purchase history).\n        *   **Reinforcement Learning:** Learning through trial and error, receiving rewards or penalties for actions (e.g., training a robot to walk).\n    *   **Reasoning:**  The ability to use logic and knowledge to draw conclusions and make inferences.\n    *   **Problem-solving:**  The ability to analyze a problem, identify potential solutions, and choose the best course of action.\n    *   **Perception:** The ability to interpret sensory input from the environment, such as images, sounds, and text.\n    *   **Natural Language Processing (NLP):** The ability to understand, interpret, and generate human language.\n    *   **Computer Vision:** The ability to \"see\" and interpret images and videos.\n    *   **Robotics:** The design, construction, operation, and application of robots, often incorporating AI for intelligent control.\n\n*   **Levels/Types of AI (Different classifications exist, but here are some common ones):**\n\n    *   **Narrow or Weak AI:**  Designed for a specific task (e.g., spam filters, chess-playing programs, recommendation systems). This is the type of AI we mostly have today.  It excels at its specific task but cannot generalize to other areas.\n    *   **General or Strong AI (AGI):**  Possesses human-level intelligence; can understand, learn, and apply knowledge across a wide range of tasks. This is still largely theoretical.\n    *   **Super AI:**  Exceeds human intelligence in all aspects, including creativity, problem-solving, and general wisdom. This is highly speculative and potentially poses existential risks if ever achieved.  Many experts debate whether it's even possible.\n\n*   **Techniques/Approaches:**  AI uses a variety of techniques, including:\n\n    *   **Machine Learning (ML):**  A subset of AI where systems learn from data without being explicitly programmed.  Algorithms are trained on datasets to make predictions or decisions.\n    *   **Deep Learning (DL):**  A subset of ML that uses artificial neural networks with multiple layers (hence \"deep\") to analyze data in a more complex and nuanced way.  This is often used for image recognition, NLP, and other complex tasks.\n    *   **Rule-Based Systems:**  AI systems that use a set of rules defined by human experts to make decisions.\n    *   **Expert Systems:**  AI systems that mimic the reasoning abilities of human experts in a specific domain.\n    *   **Natural Language Processing (NLP):**  Focuses on enabling computers to understand, interpret, and generate human language.\n\n*   **Applications:**  AI is used in countless applications across various industries, including:\n\n    *   **Healthcare:** Diagnosis, drug discovery, personalized medicine.\n    *   **Finance:** Fraud detection, algorithmic trading, risk assessment.\n    *   **Transportation:** Self-driving cars, traffic management.\n    *   **Manufacturing:** Automation, quality control.\n    *   **Retail:** Recommendation systems, chatbots, inventory management.\n    *   **Education:** Personalized learning, automated grading.\n    *   **Entertainment:** Game playing, content creation.\n    *   **Customer Service:** Chatbots, virtual assistants.\n\n*   **Important Considerations:**\n\n    *   **Ethics:**  AI raises ethical concerns related to bias, fairness, transparency, and accountability.  It's important to develop and use AI responsibly.\n    *   **Bias:** AI algorithms can perpetuate and amplify existing biases in the data they are trained on, leading to unfair or discriminatory outcomes.\n    *   **Job Displacement:**  The automation potential of AI raises concerns about job displacement.\n    *   **Security:** AI systems can be vulnerable to attacks and misuse.\n    *   **Regulation:**  Governments and organizations are grappling with how to regulate AI to ensure its safe and beneficial use.\n\nIn summary, AI is about creating machines that can \"think\" and act intelligently. It's a rapidly evolving field with enormous potential to transform our world, but it also raises important ethical and societal considerations that must be addressed.\n"
    // }
    console.log(response);
    dispatch(
      addMessage({
        id: generateId(),
        threadId,
        author: "assistant",
        text: response.response,
        createdAt: new Date().toISOString(),
      })
    );
  };

  const getSessionId = async () => {
    const response = await startChat();
    const {session_id = ''} = response;
    dispatch(
      createThreadWithMessage({ threadId: session_id, initialMessage: {
        id: '000',
        threadId: session_id,
        author: "assistant",
        text: "Hi there! How can I help you today?",
        createdAt: new Date().toISOString(),
      }
    }));
  };

  return {
    loading,
    text,
    reset,
    startChat,
    handleSend,
    handleChange,
    getSessionId,
  };
};
