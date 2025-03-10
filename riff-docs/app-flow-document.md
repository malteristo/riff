# **App Flow for RIFF**

RIFF offers an infinite zoomable canvas where you can brainstorm, sketch, and organize ideas, powered by AI tools and real-time collaboration. Here’s how it works, step by step.

---

## **1. Starting a Session**

### **What You Do**
- **Blank Canvas**:  
  Click "Start New Session" and choose "Blank Canvas" to jump into a freeform space ready for your ideas.
- **Framework**:  
  Select "Start New Session" and pick a framework (like "SaaS Product Ideation"). The canvas auto-populates with starter elements (e.g., "Target Audience" or "Key Features") to guide your brainstorming.

### **What RIFF Does**
- Creates a new session with a unique ID.
- If you chose a framework, it arranges predefined prompts or elements on the canvas for you.

### **Key Features**
- **Framework Selection**: Pick from a dropdown or card-based menu.
- **Fast Start**: The canvas loads instantly, so you’re ready to riff without delay.

---

## **2. Riffing on the Canvas**

### **What You Do**
- **Add Stuff**:  
  Use the toolbar to drop in text, upload images, or create AI chat instances. For chats, pick an AI model (e.g., OpenAI) and type a prompt to get ideas flowing.
- **Organize**:  
  Drag elements around, group related items, or draw lines to connect thoughts.
- **Collaborate**:  
  Invite teammates with a shareable link—they jump in and edit or add to the canvas in real time.

### **What RIFF Does**
- **Instant Updates**: Text, images, and AI responses appear on the canvas as you add them.
- **Real-Time Sync**: Everyone sees changes as they happen.
- **AI Help**: The AI spits out ideas, answers questions, or suggests links based on your prompts.

### **Key Features**
- **Toolbar**: A sleek, floating menu for quick element additions.
- **Chat UI**: Each chat instance has a compact bottom panel for typing and tweaking settings.
- **Collaboration**: Smooth updates via WebSockets (no cursor tracking in the first version).

---

## **3. Structuring & Consolidating**

### **What You Do**
- **Apply a Template**:  
  Hit "Apply Template," choose one (e.g., "PRD"), and decide if you want the whole canvas or just specific parts included.
- **Check the Output**:  
  Look over the AI-filled template and spot any gaps it flags (like missing sections).

### **What RIFF Does**
- **Smart Mapping**: The AI analyzes your canvas and slots content into the template’s sections.
- **Gap Alerts**: If something’s missing (e.g., "Success Metrics" in a PRD), it highlights those spots for you.

### **Key Features**
- **Template Picker**: A modal or sidebar to select and tweak templates.
- **AI Magic**: Content flows into structured formats, with visual cues for anything incomplete.

---

## **4. Reviewing & Exporting**

### **What You Do**
- **Fill Gaps**:  
  If the template’s missing pieces, riff more (e.g., start a new chat) to flesh it out.
- **Export**:  
  Click "Export" and grab your work as a PDF or text file.
- **Share**:  
  Copy a link to let others view or edit your session.

### **What RIFF Does**
- **File Creation**: Turns your template into a downloadable file.
- **Link Generation**: Makes a unique link with view or edit options.

### **Key Features**
- **Export Choices**: Pick your format from a dropdown.
- **Share Interface**: A clean modal for copying links.

---

## **Edge Cases & Extras**

### **When Things Go Wrong**
- **Bad Uploads**: Try an unsupported file? You’ll get a clear error (e.g., “Only images and PDFs allowed”).
- **AI Hiccups**: If the AI stalls (like hitting a rate limit), you’ll see a retry button or fallback message.

### **Big or Busy Sessions**
- **Huge Canvases**: Handles up to 100 elements without slowing down.
- **Team Chaos**: Real-time updates sort out conflicts (last edit wins).

### **Smooth Performance**
- **Lazy Loading**: Elements load as you scroll to them, keeping things snappy.
- **Lightweight UI**: The system stays responsive, even with lots going on.