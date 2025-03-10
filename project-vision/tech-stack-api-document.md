# **Tech Stack & API Docs for RIFF**

## **1. Overview**

The technology stack for RIFF’s MVP is designed to support its core features—like the infinite canvas, real-time collaboration, and AI integration—while keeping development fast and the architecture simple. This setup ensures we can prototype quickly, collaborate seamlessly, and scale as needed in the future.

---

## **2. Tech Stack**

### **2.1 Frontend**
- **Framework**: Next.js (React-based)  
  - **Role**: Drives the user interface, including the infinite canvas, riffing tools, and real-time updates.  

- **Canvas Library**: Konva.js  
  - **Role**: Manages the infinite canvas, enabling drag-and-drop functionality and connections between elements like text, images, and chat instances.  

- **State Management**: Zustand  
  - **Role**: Handles local state for the canvas, chat instances, and user preferences.  

- **Styling**: TailwindCSS  
  - **Role**: Delivers a clean, professional UI with minimal custom CSS.  

### **2.2 Backend**
- **Platform**: Supabase  
  - **Role**: Manages user authentication, session data, and real-time collaboration using WebSockets.  

- **Database**: PostgreSQL (via Supabase)  
  - **Role**: Stores user profiles, canvas states, frameworks, templates, and chat histories.  

- **File Storage**: Supabase Storage  
  - **Role**: Stores user-uploaded images and PDFs for use in the canvas.  

### **2.3 AI Integration**
- **AI Models**: OpenAI, Claude (via user-provided API keys)  
  - **Role**: Drives AI-powered chat instances and template extraction features.  

- **Backend for AI Tasks**: Railway  
  - **Role**: Acts as a proxy to manage AI requests, keeping user API keys safe from frontend exposure.  

### **2.4 Deployment**
- **Frontend Hosting**: Vercel  
  - **Role**: Hosts the frontend application.  

- **Backend Hosting**: Supabase (for auth, DB, storage) + Railway (for AI tasks)  
  - **Role**: Ensures a reliable, scalable infrastructure for both data and AI processing.  

---

## **3. API Documentation**

### **3.1 Supabase APIs**
- **Authentication**: Supabase Auth for user management.  
  - **Endpoints**:  
    - `POST /auth/v1/signup`: Registers a new user.  
    - `POST /auth/v1/token`: Logs in a user and returns a session token.  
    - `POST /auth/v1/logout`: Ends a user session.  

- **Database**: PostgreSQL via Supabase client.  
  - **Tables**:  
    - `users`: Stores user profiles and universal memory.  
    - `sessions`: Tracks active riffing sessions.  
    - `canvas_elements`: Manages elements on the canvas (e.g., text, images, chat instances).  
    - `chat_histories`: Saves conversation data for AI chat instances.  
  - **Real-Time**: Supabase Realtime enables live updates for canvas changes.  

- **Storage**: Supabase Storage for file uploads.  
  - **Buckets**:  
    - `images`: Holds uploaded images and PDFs.  

### **3.2 AI APIs**
- **OpenAI API**: For text generation and summarization.  
  - **Endpoint**: `POST https://api.openai.com/v1/chat/completions`  
  - **Usage**: Called via Railway to generate ideas or summarize content.  

- **Claude API**: Alternative text generation model.  
  - **Endpoint**: `POST https://api.anthropic.com/v1/completions`  
  - **Usage**: Similar to OpenAI, selectable per chat instance.  

### **3.3 Internal APIs (via Next.js API Routes)**
- **Canvas Management**:  
  - `POST /api/canvas/save`: Saves the current canvas state.  
  - `GET /api/canvas/load`: Retrieves a canvas by session ID.  

- **AI Proxy**:  
  - `POST /api/ai/generate`: Proxies AI requests to OpenAI or Claude, securely using user-provided keys.  

---

## **4. Architecture Diagram**

Here’s a high-level view of how the components connect:

```plaintext
+-------------------+         +-------------------+
|                   |         |                   |
|    Frontend       |         |    Backend        |
|    (Next.js)      |         |    (Supabase)     |
|                   |         |                   |
+---------+---------+         +---------+---------+
          |                             |
          | WebSockets (Real-Time)      |
          |                             |
+---------v---------+         +---------v---------+
|                   |         |                   |
|    Canvas         |         |    Database       |
|    (Konva.js)     |         |    (PostgreSQL)   |
|                   |         |                   |
+-------------------+         +-------------------+
          |
          | API Calls
          |
+---------v---------+
|                   |
|    AI Services    |
|    (Railway)      |
|                   |
+-------------------+
```

- **Frontend**: Next.js and Konva.js power the UI and canvas.  
- **Backend**: Supabase handles auth, data, and real-time sync.  
- **AI Services**: Railway proxies requests to external AI models.  

---

## **5. Key Considerations**

- **Security**: User API keys for AI models are processed securely via Railway, never exposed on the frontend.  
- **Performance**: Zustand keeps canvas interactions fast and responsive.  
- **Scalability**: Vercel and Supabase scale automatically, while Railway handles AI compute needs.  
- **Future-Proofing**: The modular design allows easy updates, like adding new AI models, without major changes.