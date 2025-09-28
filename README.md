# Conversational Threads App

A futuristic, maintainable conversational UI that supports **nested threads** (Reddit-style), powered by **Gemini API**.  
Frontend is built with **React + Redux + PrimeReact/PrimeFlex**, backend with **Flask**, and designed for easy extension.  

---

## ✨ Features
- **Nested threads** — any thread can spawn sub-threads, recursively.  
- **Interactive UI** — powered by PrimeReact + PrimeFlex.  
- **Streaming** — handled in frontend for responsiveness.  
- **No persistence** — all chat sessions are ephemeral.  
- **Maintainable structure** — small tasks in separate files, feature-sliced frontend.  
- **Microfrontend-ready** — Webpack Module Federation for future scalability.  
- **Centralized imports** — all imports go through `/imports` barrel files for consistency.  

---

## Architecture

### Frontend
- **Framework**: React + Redux Toolkit  
- **UI**: PrimeReact + PrimeFlex  
- **Structure**:
```

frontend/src/
pages/           # top-level screens (ChatPage, etc.)
features/        # thread, composer, message, toolbar (self-contained)
entities/        # data models + slices (thread, message)
shared/          # reusable ui + utils
imports/         # centralized imports (ui, store, api, utils)

```
- **Thread rendering**: Recursive (Reddit-style nesting).  
- **Streaming**: UI manages incremental updates.  
- **Microfrontend**: Webpack Module Federation for independent features.  

### Backend
- **Framework**: Flask  
- **Endpoints**:
- `POST /threads/create` → create thread (main or child).  
- `POST /message` → send user message, proxy Gemini response.  
- **Structure**:
```

backend/
app.py
routes/          # Flask routes
services/        # gemini_client, session_store, transport
imports/         # centralized imports for Flask, Gemini, etc.
utils/           # config, logging

````
- **Session Handling**: In-memory `SESSION_MAP` per thread → Gemini session token.  
- **Transport**: Abstracted (easy swap SSE ↔ WebSocket).  
- **No persistence**: All ephemeral.  

---

## 📦 Data Model

### Thread
```ts
Thread {
id: string
parentThreadId?: string
originMessageId?: string
messages: Message[]
children: string[]   // nested threads
}
````

### Message

```ts
Message {
  id: string
  threadId: string
  parentId?: string
  author: "user" | "assistant" | "system"
  text: string
  createdAt: ISO8601
  metadata?: {
    termSelection?: { start: number, end: number }
  }
}
```

### Redux Store

```ts
{
  threads: {
    byId: { [id]: Thread },
    allIds: string[]
  },
  ui: {
    openThreadId: string,
    streaming: { threadId: string, messageId: string, progress: number }
  },
  gemini: {
    sessionMap: { [threadId]: sessionToken }
  }
}
```

---

## Development

### Prerequisites

* Node.js + npm/yarn/pnpm
* Python 3.11+
* Gemini API key

### Run Frontend

```bash
cd frontend
npm install
npm start
```

### Run Backend

```bash
cd backend
pip install -r requirements.txt
flask run --reload
```

---

## Contributing

* Each functionality lives in its own folder (small, maintainable).
* Use `/imports` for all external library imports.
* Keep routes, services, and utils separated in backend.
* Use feature-sliced approach in frontend.
* PRs should update README and include tests.

---

## 🧭 Roadmap

* [ ] Export chats as JSON/Markdown
* [ ] Presence + multi-user support (WebSockets)
* [ ] Persistent storage layer (optional)
* [ ] Authentication (optional)

---

## 📝 License

MIT
---

Would you like me to also generate a **CONTRIBUTING.md** with coding guidelines (folder naming, imports pattern, commit style), or keep README.md as the main source of truth?
```
