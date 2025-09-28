# Contributing Guide

Thank you for contributing!
This project is designed to be **futuristic, maintainable, and contributor-friendly**.  
Please follow the conventions below to keep the repo clean and consistent.

---

## Project Structure

### Frontend
```

frontend/src/
pages/           # top-level screens (ChatPage, etc.)
features/        # self-contained features (thread, composer, message, toolbar)
entities/        # data models + redux slices (thread, message)
shared/          # reusable UI components and utilities
imports/         # centralized imports (ui, store, api, utils)

```

### Backend
```

backend/
app.py           # Flask entrypoint
routes/          # request handlers (chat, thread)
services/        # gemini_client, session_store, transport (SSE/WebSocket)
imports/         # centralized imports for Flask, Gemini, etc.
utils/           # config, logging, constants

````

---

## Imports

- **Frontend**: All external libraries must be imported via `src/imports`.  
  Example:
  ```tsx
  import { Card, Button } from "@/imports/ui";
  import { useSelector } from "@/imports/store";
````

* **Backend**: All libraries must be imported via `backend/imports`.
  Example:

  ```python
  from imports.flask_ext import Flask, request, jsonify
  ```

This ensures consistency and makes it easy to swap libraries later.

---

## Feature Guidelines

* Each **feature** gets its own folder inside `features/`.
* A feature folder may contain:

  ```
  components/   # UI pieces
  hooks/        # custom React hooks
  store/        # redux slice (if local to feature)
  utils/        # helpers
  index.ts      # re-export entry point
  ```
* Keep features self-contained.
* Reusable pieces should live in `shared/`.

---

## State Management

* Use **Redux Toolkit** for slices.
* All global slices belong in `src/slices/`.
* Keep state **normalized** (`byId`, `allIds` pattern).
* Use selectors for reading state (no direct traversal in components).

---

## Backend Guidelines

* One file per route inside `routes/`.
* One file per service inside `services/`.
* Do **not** put logic in routes — delegate to services.
* Keep Gemini API calls isolated in `services/gemini_client.py`.
* Session handling in `services/session_store.py`.
* If switching from SSE → WebSocket, only update `services/transport/`.

---

## Testing

* **Frontend**:

  * Use Jest + React Testing Library.
  * Test reducers, hooks, and components.

* **Backend**:

  * Use Pytest.
  * Mock external Gemini API calls.
  * Unit test services separately from routes.

---

## Code Style

* **Frontend**:

  * Use TypeScript (preferred).
  * Use functional components + hooks.
  * Follow ESLint + Prettier rules.

* **Backend**:

  * Use type hints in Python functions.
  * Keep functions small and single-purpose.
  * Follow PEP8.

---

## Git & Commit Rules

* Use **feature branches**:

  ```
  feature/thread-nesting
  fix/session-bug
  chore/update-deps
  ```
* Write clear commit messages:

  ```
  feat(thread): add recursive child-thread rendering
  fix(api): correct missing session_token check
  chore(ui): update PrimeReact to latest version
  ```
* PRs must include:

  * Description of changes.
  * Updates to README/CONTRIBUTING if needed.
  * Tests (if applicable).

---

## Development Workflow

1. Fork & clone the repo.
2. Setup environment:

   ```bash
   # Frontend
   cd frontend
   npm install
   npm start

   # Backend
   cd backend
   pip install -r requirements.txt
   flask run --reload
   ```
3. Work in feature branches.
4. Run tests before pushing:

   ```bash
   npm test    # frontend
   pytest      # backend
   ```
5. Open a PR

---

## Principles

* **Separation of concerns** — routes ≠ business logic.
* **Small files** — easier for new devs to onboard.
* **Centralized imports** — easy to swap dependencies.
* **Feature isolation** — each feature lives in its own folder.
* **Extensibility first** — design so future devs can fork & extend without rewriting.

---

Happy contributing! ✨

```