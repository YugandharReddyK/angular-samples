# Day 6: @Input & @Output - Sample App

## 🎯 What You'll Learn

**Parent-Child Component Communication:**
- **@Input()** - Pass data FROM parent TO child
- **@Output()** - Send data FROM child TO parent  
- **EventEmitter** - How children notify parents

## 📚 Simple Explanation

Think of it like a conversation:
- **Parent talks to child** → Uses **@Input()** → "Here's some data for you"
- **Child talks to parent** → Uses **@Output()** → "Hey parent, something happened!"

## 🚀 How to Run

```bash
npm install
ng serve
# Open http://localhost:4200
```

## 🎮 What You'll See

### 1. **Basic Child Component**
- Parent sends: message, name, age → Child displays them
- Child has a button → Sends message back to parent
- **Try:** Click "Send Message to Parent" button

### 2. **Product Cards** 
- Parent has products array → Passes each product to child cards
- Each card has "Add to Cart" button → Notifies parent
- **Try:** Click "Add to Cart" and watch cart summary appear

### 3. **Star Rating**
- Parent sets initial rating → Child displays stars
- Click stars → Child sends new rating back to parent
- **Try:** Click different stars, see rating update

## 💡 Code Examples

### @Input (Parent → Child)

**Child Component:**
```typescript
@Input() message: string = '';  // Receives data
```

**Parent Template:**
```html
<app-child [message]="parentMessage"></app-child>
```

### @Output (Child → Parent)

**Child Component:**
```typescript
@Output() messageSent = new EventEmitter<string>();

sendMessage() {
  this.messageSent.emit('Hello!');  // Send to parent
}
```

**Parent Template:**
```html
<app-child (messageSent)="handleMessage($event)"></app-child>
```

**Parent Component:**
```typescript
handleMessage(msg: string) {
  console.log(msg);  // Receives: "Hello!"
}
```

## 📝 Key Files

- **`src/app/app.ts`** - Parent component (sends/receives data)
- **`src/app/child/`** - Basic @Input/@Output example
- **`src/app/product-card/`** - Real-world example
- **`src/app/rating/`** - Interactive example

## ⚠️ Common Mistakes

1. **Forgetting square brackets** → `[message]` not `message`
2. **Forgetting parentheses** → `(messageSent)` not `messageSent`
3. **Forgetting to emit** → Must call `.emit()` to send data
4. **Wrong EventEmitter type** → `EventEmitter<string>` for string data

## 🎓 Practice Exercises

1. Create a counter child component:
   - Parent sets initial count via @Input
   - Child has +/- buttons
   - Sends new count to parent via @Output

2. Create a name input child:
   - Child has input field
   - Sends typed name to parent on every keystroke

3. Create a color picker child:
   - Parent passes current color via @Input
   - Child has color buttons
   - Sends selected color to parent via @Output

## 📖 Related Document

See: **`day-06-input-output_Version2.md`**

## 🔗 What's Next?

**Day 7:** Services & Dependency Injection!
