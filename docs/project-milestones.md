# **High-Level Plan**

## **Milestone 1: Project Setup**
- **Sub-Tasks**:
  1. Set up the development environment (Node.js, npm, etc.).
  2. Initialize a Next.js project with TypeScript.
  3. Configure Supabase for authentication and database management.
- **Purpose**: Lay the groundwork for the app, including the memory system.

## **Milestone 2: Build the Canvas**
- **Sub-Tasks**:
  1. Integrate Konva.js for canvas rendering.
  2. Add support for text and image elements.
  3. Enable connecting elements with lines
  4. Enable dragging and grouping of elements.
- **Purpose**: Create the infinite canvas with basic functionality and connections.

## **Milestone 3: Real-Time Collaboration**
- **Sub-Tasks**:
  1. Set up WebSockets using Supabase Realtime.
  2. Synchronize canvas updates across multiple users.
  3. Implement conflict resolution (e.g., last-write-wins).
- **Purpose**: Enable multi-user editing in real time.

## **Milestone 4: AI Integration**
- **Sub-Tasks**:
  1. Deploy an AI proxy service on Railway.
  2. Integrate AI chat instances into the canvas.
  3. Allow users to manage API keys securely.
  4. Implement conversation injection
- **Purpose**: Add LLM-powered chats with simplified branching via injection.

## **Milestone 5: Templates & Export**
- **Sub-Tasks**:
  1. Build a template selection UI.
  2. Implement AI-driven content mapping.
  3. Add export functionality for PDF and text.
- **Purpose**: Finalize the MVP with templating and export features.