# Backend Structure for RIFF

## 1. Overview

The backend for RIFF is the backbone of the platform, enabling real-time collaboration, AI-powered content generation, and structured data handling. It’s built to be simple yet scalable, leveraging **Supabase** for database management, authentication, and real-time features, and **Railway** for AI-related tasks. This structure ensures a seamless experience for users riffing together on canvases, integrating AI, and extracting structured outcomes.

---

## 2. Core Components

### 2.1 Database (PostgreSQL via Supabase)
- **Purpose**: Stores all essential data for RIFF, from user profiles to canvas elements.
- **Key Tables**:
  - **`users`**: Stores user profiles (e.g., email, preferences, role).
  - **`sessions`**: Tracks riffing sessions (e.g., session ID, owner, participants).
  - **`canvas_elements`**: Saves canvas content (e.g., text, images, chat instances) with positions and connections.
  - **`chat_histories`**: Logs messages for each AI chat instance on the canvas.
  - **`frameworks`** and **`templates`**: Holds pre-built and user-created frameworks/templates for session setup and output structuring.
- **Real-Time**: Supabase Realtime syncs changes to `canvas_elements` and `chat_histories` instantly across users.

### 2.2 Real-Time Collaboration
- **Technology**: Supabase Realtime with WebSockets.
- **How It Works**:
  - Users in a session subscribe to a WebSocket channel.
  - Changes (e.g., moving an element, sending a chat message) are broadcast to all participants in real-time.
- **Implementation**: When a user edits the canvas, the update is saved to the database and pushed to subscribers, ensuring everyone sees the same state.

### 2.3 AI Integration
- **Purpose**: Powers features like idea generation and template filling using AI models (e.g., OpenAI, Claude).
- **Approach**:
  - Users provide their own API keys, which the backend securely manages via Railway.
  - The backend proxies AI requests: the frontend sends a request, the backend uses the user’s key to call the AI model, and returns the result.
- **Security**: API keys are encrypted and stored temporarily, never exposed to the frontend.

### 2.4 Authentication & Authorization
- **Technology**: Supabase Auth.
- **Features**:
  - Supports email/password or OAuth (e.g., Google) login.
  - Issues JWT tokens for secure API access.
  - Ensures users only access their own or shared sessions.

### 2.5 API Design
- **Style**: RESTful APIs, supplemented by WebSockets for real-time updates.
- **Key Endpoints**:
  - **`POST /api/sessions`**: Starts a new session.
  - **`GET /api/sessions/{id}`**: Fetches session details.
  - **`POST /api/canvas/save`**: Saves the canvas state.
  - **`GET /api/canvas/load/{sessionId}`**: Loads a canvas.
  - **`POST /api/ai/generate`**: Handles AI requests.
  - **`POST /api/templates/apply`**: Applies a template to the canvas for structured output.
- **Implementation**: Built with Next.js API Routes, with Railway offloading AI tasks.

---

## 3. How It All Works Together

### 3.1 Starting a Session
- **Action**: User creates a session via the frontend.
- **Backend**: Adds a new `sessions` entry and returns the session ID. The frontend subscribes to the session’s real-time channel.

### 3.2 Riffing on the Canvas
- **Action**: Users add or edit elements (e.g., text, chat instances).
- **Backend**: Saves updates to `canvas_elements`, broadcasts them via WebSockets, and logs chat messages in `chat_histories`.

### 3.3 Structuring Output
- **Action**: User applies a template to organize canvas content.
- **Backend**: Pulls relevant data, processes it with AI if needed, and returns a structured result.

### 3.4 Exporting
- **Action**: User exports the canvas or template.
- **Backend**: Generates a file (e.g., PDF), stores it in Supabase Storage, and provides a download link.

---

## 4. Performance & Scalability

- **Database**: Indexes on key fields (e.g., `session_id`) ensure fast queries. The MVP supports up to 100 elements per canvas.
- **Real-Time**: Updates are batched to reduce WebSocket traffic, using a simple last-write-wins approach for conflicts.
- **AI**: Requests are processed asynchronously with rate limits to manage load and costs.

---

## 5. Security

- **API Keys**: Encrypted and stored temporarily, only used for the session duration.
- **Authentication**: JWT tokens secure all API calls, with Supabase’s row-level security (RLS) restricting data access.
- **Privacy**: Minimal data collection, with options for users to export or delete their data.

---

## 6. Architecture Diagram

Here’s how the components connect:

```plaintext
+-------------------+         +-------------------+
|    Frontend       |<------->|    Backend        |
|    (Next.js)      | REST    |    (Supabase)     |
+-------------------+         +-------------------+
          |                             |
          | WebSockets                  |
          v                             v
+-------------------+         +-------------------+
|    Canvas         |         |    Database       |
|    (Konva.js)     |         |    (PostgreSQL)   |
+-------------------+         +-------------------+
          |
          | API
          v
+-------------------+
|    AI Proxy       |
|    (Railway)      |
+-------------------+
```

- **Frontend**: Calls APIs and subscribes to WebSockets.
- **Backend**: Manages data, auth, and real-time sync.
- **AI Proxy**: Securely handles AI requests.