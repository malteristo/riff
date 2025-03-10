# **Frontend Guidelines for RIFF**

## **1. UI/UX Principles**

RIFF’s frontend is built on core principles that reflect its mission of playful yet structured creativity:

- **Simplicity**: A clean, uncluttered interface so users can focus on ideation rather than navigation.
- **Responsiveness**: Real-time interactions, especially for collaboration, feel seamless and instantaneous.
- **Consistency**: A uniform design language ensures a cohesive experience across all features.
- **Accessibility**: Adheres to WCAG 2.1 standards (e.g., sufficient color contrast, keyboard navigation) to make RIFF inclusive.
- **Delight**: Subtle animations and micro-interactions (e.g., element snapping, hover effects) enhance usability without overwhelming users.

---

## **2. Component Library**

The component library defines reusable UI elements to maintain consistency and streamline development. Here’s a breakdown:

### **2.1 Buttons**
- **Primary**: Bold, filled buttons for key actions (e.g., "Start Session," "Apply Template").  
  - *Style*: Rounded corners, hover effect (lightens color), active state (darkens color).
- **Secondary**: Outlined buttons for secondary actions (e.g., "Cancel," "Settings").  
  - *Style*: Matches primary button shape but with no fill.

### **2.2 Modals**
- Used for tasks like selecting templates or frameworks.  
  - *Behavior*: Fade-in animation, closes when clicking the overlay.  
  - *Content*: Includes a title, description, and action buttons (e.g., "Select," "Cancel").

### **2.3 Toolbars**
- **Floating Toolbar**: A draggable, compact bar for adding elements (text, images, chat instances).  
  - *Behavior*: Snaps to canvas edges, auto-hides when idle.  
  - *Icons*: Simple and intuitive (e.g., "+" for add, "T" for text).

### **2.4 Color Palette**
- **Primary**: `#4A90E2` (calming blue for trust and focus).  
- **Accent**: `#F5A623` (warm orange for creativity and energy).  
- **Background**: `#F9F9F9` (light gray for a neutral canvas).  
- **Text**: `#333333` (dark gray for readability).

### **2.5 Typography**
- **Font Family**: `Inter` (modern, clean, and highly legible).  
- **Sizes**:  
  - *Headings*: 24px (H1), 18px (H2).  
  - *Body*: 14px.  
  - *Captions*: 12px.

### **2.6 Spacing**
- Use multiples of 8px for padding and margins to create a consistent, grid-based layout.

---

## **3. Canvas-Specific Guidelines**

The infinite canvas is RIFF’s central feature, designed to feel fluid and intuitive for ideation and collaboration.

### **3.1 Element Interactions**
- **Dragging**: Elements (text, images, chat instances) can be freely moved.  
  - *Behavior*: Smooth motion with a slight shadow during dragging.  
- **Grouping**: Select multiple elements and group them via a "Group" button.  
  - *Visual*: Grouped elements are enclosed in a dashed border.  
- **Connecting**: Draw lines between elements to indicate relationships.  
  - *Behavior*: Lines snap to element edges; double-click to remove.

### **3.2 Zooming & Panning**
- **Zoom**: Controlled via mouse wheel or pinch-to-zoom on touch devices.  
  - *Range*: 10% to 500%.  
- **Pan**: Click and drag the background to navigate the canvas.  
  - *Behavior*: Smooth with inertia for a natural scrolling feel.

### **3.3 Real-Time Collaboration**
- **Synced Updates**: Changes (e.g., moving elements, editing text) sync instantly across users.  
  - *Visual*: A brief highlight or pulse shows updates made by others.  
- **User Presence**: Display collaborators’ initials or avatars in a corner (cursor tracking excluded in MVP).

---

## **4. AI Integration in the UI**

AI enhances RIFF’s functionality and should integrate seamlessly into the canvas experience.

### **4.1 Chat Instances**
- **Presentation**: Compact, resizable windows on the canvas with an input bar at the bottom.  
  - *Behavior*: Draggable, resizable, and minimizable.  
- **Input Bar**: Features a text field, model selector (dropdown), and toggles (e.g., web search).  
  - *Style*: Minimalist design with a send button (paper plane icon).

### **4.2 AI-Generated Content**
- **Visual Cues**: AI responses are marked with a subtle "AI" badge to differentiate them from user content.  
- **Gap Detection**: In templates, missing sections are highlighted in yellow with a "Riff More" button to encourage further input.

---

## **5. Responsive Design**

RIFF prioritizes desktop for the MVP but must adapt to other devices over time:

- **Desktop**: Full canvas with toolbar and optional sidebars.  
- **Tablet**: Simplified toolbar; non-essential elements hidden.  
- **Mobile**: Not supported in MVP (displays a "Use desktop" message).

---

## **6. Edge Cases & Error Handling**

The frontend must gracefully manage errors and edge cases to maintain a smooth experience.

### **6.1 Failed Uploads**
- **Error Message**: "Upload failed—only images and PDFs allowed."  
- **Behavior**: Red toast notification with a retry button.

### **6.2 AI Errors**
- **Error Message**: "AI response failed—try again or check your API key."  
- **Behavior**: Inline error within the chat instance, with a retry option.

### **6.3 Loading States**
- **Canvas Loading**: A spinner with "Loading your session..."  
- **AI Responses**: Typing indicator in chat instances during processing.

### **6.4 Performance**
- **Lazy Loading**: Elements load as they enter the viewport to optimize speed.  
- **State Management**: Use Zustand to reduce re-renders and keep the canvas responsive.