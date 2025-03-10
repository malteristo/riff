# **Product Requirements Document (PRD) for RIFF**

## **1. Product Overview**

**RIFF** is a collaborative ideation platform that blends the freedom of creative improvisation with the clarity of actionable structure. Unlike static whiteboards or isolated AI tools, RIFF delivers an infinite zoomable canvas where users can riff—freely brainstorm, connect, and explore ideas with real-time AI assistance—then transform them into polished, structured outputs alongside teammates. Tailored for professionals in dynamic, idea-driven settings—such as advertising agencies, startups, and research teams—RIFF uniquely bridges rapid, chaotic creativity with tangible, professional results. The MVP prioritizes a lean, intuitive core to validate this vision and set the foundation for future growth.

---

## **2. Goals & Objectives**

- **Primary Goal**: Empower teams to brainstorm collaboratively and produce structured deliverables in a single, fluid environment.
- **Objectives**:
  - Deliver a real-time, spatial canvas for freeform idea exploration and organization.
  - Embed AI as a supportive tool for generating, refining, and summarizing content.
  - Enable users to convert raw ideas into usable outputs like documents or summaries.
  - Create an intuitive, engaging experience that balances creativity and productivity.

---

## **3. Key Features**

The MVP will launch with these essential features:

### **3.1 Infinite Zoomable Canvas**
- A boundless workspace for adding, dragging, and grouping text, images, and chat instances.
- Smooth zoom and pan controls for navigation.
- Real-time updates for all collaborators (cursor tracking deferred to post-MVP).

### **3.2 Basic Riffing Tools**
- **Text Input**: Add and edit text boxes anywhere on the canvas.
- **Image Upload**: Drag-and-drop images or PDFs (rendered as images) for visual inspiration.
- **Chat Instances**: AI-powered nodes on the canvas for idea generation, visually tied to other elements via placement or lines.
- **Branching**: Branch new chat instances from an existing instances.
- **Injecting**: Inject chat instances into other instances.

### **3.3 Real-Time Collaboration**
- Multi-user sessions with instant syncing of all changes (e.g., element moves, text edits).
- Simple invite system to join active sessions.

### **3.4 AI Integration**
- Per-chat-instance model selection (e.g., OpenAI, Claude) via a bottom panel.
- AI supports idea generation, content summarization, and output structuring.
- Passive invocation only—no unsolicited AI suggestions in the MVP.

### **3.5 Frameworks**
- Pre-built prompt sets (e.g., "Marketing Campaign Brainstorm") to jumpstart sessions.
- Auto-populates the canvas with initial elements; non-editable in MVP.

### **3.6 Templates**
- Predefined structures (e.g., PRD, meeting recap) for organizing session outputs.
- AI maps canvas content to templates, highlighting gaps for refinement.
- Non-customizable in MVP.

### **3.7 Export Options**
- Export templates as PDF or plain text.
- Shareable links for canvas access (view/edit permissions).

### **3.8 Universal Memory**
- Stores user preferences (e.g., default AI model) and context (e.g., job role) for personalized AI responses.
- Auto-appended to chat instances.

---

## **4. User Experience**

### **4.1 Starting a Session**
- Users launch a blank canvas or pick a framework to auto-populate starter elements.

### **4.2 Riffing on the Canvas**
- Add text, images, or chat instances via a minimalist toolbar.
- Drag elements freely, draw lines to connect ideas, and zoom to focus or overview.

### **4.3 Collaborating in Real Time**
- Team members join via link, seeing and editing the canvas as updates sync instantly.
- A sidebar lists all elements, clickable to jump to their locations.

### **4.4 Extracting Value**
- Select a template, and AI organizes canvas content into it, flagging gaps.
- Export the result or riff more to fill gaps.

### **4.5 AI Assistance**
- Open a chat instance, pick a model, and type to get ideas, summaries, or suggestions.
- Universal memory tailors responses without extra input.

---

## **5. Success Metrics**

We’ll gauge RIFF’s success with these original metrics, plus the new AI Impact addition:
- **User Engagement**: Average session duration, elements added per session, repeat usage.
- **Collaboration**: Percentage of sessions with multiple users, average team size.
- **Output Creation**: Number of templates applied and exported per user.
- **AI Impact**: Percentage of users reporting AI outputs as helpful (via post-session survey).

---

## **6. Constraints & Assumptions**

### **Constraints**
- No freeform drawing in MVP—use imported images instead.
- Exports limited to PDF/text; no third-party integrations (e.g., Slack) until post-MVP.
- AI restricted to text-based models (e.g., OpenAI, Claude).
- No hallucination checks beyond user-selected model behavior.

### **Assumptions**
- Users supply their own AI model API keys.
- Supports teams of up to 10 concurrent users per session.
- Browsers can handle canvases with up to 100 elements without lag.