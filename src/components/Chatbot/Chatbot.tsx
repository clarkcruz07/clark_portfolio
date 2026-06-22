import { MessageCircle, Send, Trash2, X } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useStore } from '../../stores/RootStore';
import styles from './Chatbot.module.css';

const quickReplies = [
  "What's your stack?",
  'Are you available?',
  'Tell me about your Gold Card',
  'What have you built?',
  'How to contact you?',
];

export const Chatbot = observer(() => {
  const { chatStore, uiStore } = useStore();
  const [input, setInput] = useState('');
  const listRef = useRef<HTMLDivElement>(null);
  const showQuickReplies = chatStore.messages.length === 0 && !chatStore.isLoading;

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [chatStore.messages.length, chatStore.isLoading]);

  const send = (value: string) => {
    chatStore.sendMessage(value);
    setInput('');
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    send(input);
  };

  return (
    <>
      <section className={`${styles.panel} ${uiStore.chatOpen ? styles.open : ''}`} aria-label="Ask Clark chatbot">
        <header className={styles.header}>
          <strong>Ask Clark</strong>
          <div>
            <button className={styles.iconBtn} onClick={() => chatStore.clearChat()} aria-label="Clear chat" title="Clear chat">
              <Trash2 size={16} />
            </button>
            <button className={styles.iconBtn} onClick={() => uiStore.toggleChat(false)} aria-label="Close chat" title="Close chat">
              <X size={16} />
            </button>
          </div>
        </header>
        <div className={styles.messages} ref={listRef}>
          {chatStore.messages.map((message, index) => (
            <div className={`${styles.bubble} ${styles[message.role]}`} key={`${message.role}-${index}`}>
              {message.content}
            </div>
          ))}
          {chatStore.isLoading && (
            <div className={`${styles.bubble} ${styles.assistant}`} aria-label="Clark is typing">
              <span className={styles.dots}>
                <span />
                <span />
                <span />
              </span>
            </div>
          )}
        </div>
        {showQuickReplies && (
          <div className={styles.quick}>
            {quickReplies.map((reply) => (
              <button className={styles.chip} key={reply} onClick={() => send(reply)}>
                {reply}
              </button>
            ))}
          </div>
        )}
        {chatStore.error && <p className={styles.error}>{chatStore.error}</p>}
        <form className={styles.form} onSubmit={submit}>
          <input
            className={styles.input}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about Clark"
            aria-label="Message"
          />
          <button className={styles.send} type="submit" aria-label="Send message" disabled={chatStore.isLoading}>
            <Send size={18} />
          </button>
        </form>
      </section>
      <button className={styles.toggle} onClick={() => uiStore.toggleChat()} aria-label="Toggle Ask Clark" title="Ask Clark">
        <MessageCircle size={26} />
      </button>
    </>
  );
});
