export {}; // 👈 Add this line

// 1. Memento: Stores the saved data
class EditorMemento {
  private readonly content: string;

  constructor(content: string) {
    this.content = content; // Private data copy
  }

  public getContent(): string {
    return this.content;
  }
}

// 2. Originator: The object that creates and restores snapshots
class TextEditor {
  private content: string;

  constructor() {
    this.content = "";
  }

  public type(text: string): void {
    this.content += text;
  }

  public getContent(): string {
    return this.content;
  }

  // Save the current state
  public save(): EditorMemento {
    return new EditorMemento(this.content);
  }

  // Restore a previous state
  public restore(memento: EditorMemento | null | undefined): void {
    if (memento) {
      this.content = memento.getContent();
    }
  }
}

// 3. Caretaker: Holds the stack and manages Ctrl+Z
class HistoryManager {
  private historyStack: EditorMemento[];

  constructor() {
    this.historyStack = [];
  }

  public push(memento: EditorMemento): void {
    this.historyStack.push(memento);
  }

  public pop(): EditorMemento | null {
    if (this.historyStack.length === 0) return null;
    return this.historyStack.pop() ?? null;
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

editor.type("This is TypeScript.");
console.log("Current Text:", editor.getContent()); 
// Output: "Hello World! This is TypeScript."

// First Undo (Ctrl + Z)
editor.restore(history.pop());
console.log("After 1st Undo:", editor.getContent()); 
// Output: "Hello World! "

// Second Undo (Ctrl + Z)
editor.restore(history.pop());
console.log("After 2nd Undo:", editor.getContent()); 
// Output: "Hello "
