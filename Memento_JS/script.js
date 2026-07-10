// 1. Memento: Stores the saved data
class EditorMemento {
  constructor(content) {
    this.content = content; // Private data copy
  }
  
  getContent() {
    return this.content;
  }
}

// 2. Originator: The object that creates and restores snapshots
class TextEditor {
  constructor() {
    this.content = "";
  }

  type(text) {
    this.content += text;
  }

  getContent() {
    return this.content;
  }

  // Save the current state
  save() {
    return new EditorMemento(this.content);
  }

  // Restore a previous state
  restore(memento) {
    if (memento) {
      this.content = memento.getContent();
    }
  }
}

// 3. Caretaker: Holds the stack and manages Ctrl+Z
class HistoryManager {
  constructor() {
    this.historyStack = [];
  }

  push(memento) {
    this.historyStack.push(memento);
  }

  pop() {
    if (this.historyStack.length === 0) return null;
    return this.historyStack.pop();
  }
}

// --- Usage Example ---

const editor = new TextEditor();
const history = new HistoryManager();

// Type text and save states
editor.type("Hello ");
history.push(editor.save()); // Saved state 1

editor.type("World! ");
history.push(editor.save()); // Saved state 2

editor.type("This is JavaScript.");
console.log("Current Text:", editor.getContent()); 
// Output: "Hello World! This is JavaScript."

// First Undo (Ctrl + Z)
editor.restore(history.pop());
console.log("After 1st Undo:", editor.getContent()); 
// Output: "Hello World! "

// Second Undo (Ctrl + Z)
editor.restore(history.pop());
console.log("After 2nd Undo:", editor.getContent()); 
// Output: "Hello "

