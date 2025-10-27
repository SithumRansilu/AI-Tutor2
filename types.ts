export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

// Fix: Add 'pastpapers' to AppMode to support the new feature.
export type AppMode = 'chatbot' | 'image' | 'complex' | 'formula' | 'pastpapers';