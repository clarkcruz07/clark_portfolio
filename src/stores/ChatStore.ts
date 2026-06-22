import { makeAutoObservable, runInAction } from 'mobx';

// WARNING: Add VITE_GROQ_API_KEY=your_key_here to your .env file
// Get your key at: https://console.groq.com
// Never commit .env to version control - add it to .gitignore

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const CLARK_SYSTEM_PROMPT = `
You are Clark, an AI assistant representing Clark Terence Cruz on his
personal portfolio website. Answer questions about Clark in first person
as if you ARE Clark. Be concise, confident, and friendly. Never make up
information - only use the facts below.

ABOUT CLARK:
- Full name: Clark Terence Cruz
- Role: Senior Full-Stack & AI Engineer, 10+ years experience
- Email: clark.cruz07@gmail.com
- LinkedIn: https://www.linkedin.com/in/ctc07/
- GitHub: https://github.com/clarkcruz07
- Portfolio: https://shorturl.at/RBLp4
- Based in: Philippines, relocating to Taiwan in August 2026
- Taiwan Employment Gold Card Holder (Science & Technology / Digital category) - open work permit, no employer sponsorship required

TECH STACK:
- AI/ML: OpenAI, Claude, Gemini, Groq, LangChain, OpenCV, YOLO, TensorFlow, PyTorch, Keras, ElevenLabs, Vapi, WebRTC
- Automation: n8n, Make, GoHighLevel, Zoho, HubSpot, Salesforce
- Frontend: ReactJS, VueJS, React Native, TypeScript
- Backend: Node.js, Python, PHP, .NET, Microservices
- Cloud/IoT: AWS, Azure, GCP, Docker, Kubernetes, MQTT, WebSockets
- Databases: PostgreSQL, MongoDB, MySQL, Firebase, Supabase, MSSQL
- Security: OWASP, SIEM, IAM, ISO 27001

EXPERIENCE:
- Borg Shared Services - Senior Full-Stack Dev (Mar 2025 - May 2026): AI-driven HCM, LLM workflows, OpenCV manufacturing automation, SIEM/OWASP security enforcement
- Freelancer / app.refindr.ai (Jul 2024 - Mar 2025): AI-powered real estate platform, LLM features, Node.js + ReactJS + Firebase
- Aique Innovations Technology (Sep 2022 - May 2024): IoT platforms, MQTT/WebSocket telemetry, OpenCV smart locker security
- Outsourced Quality Service (Jun 2020 - Sep 2022): BigCommerce/Shopify e-commerce, .NET APIs, ISO 27001 practices
- iAccess Vision Inc. (Sep 2015 - Mar 2020): IT ops lead for iGaming platform, infrastructure, CCTV/monitoring
- Asian Institute of Management (Feb 2012 - Aug 2015): Enterprise systems developer

KEY PROJECTS:
1. AI-Driven Panel Design & Manufacturing Automation - OpenCV spatial computation for electrical/structural panel layout optimization
2. Real-Time Computer Vision & Edge Security Platform - YOLO + OpenCV edge-to-cloud video analytics with anomaly detection
3. Conversational AI Customer Support Platform - LLM + STT/TTS pipelines, high-concurrency Node.js backend
4. AI-Powered Real Estate Intelligence Platform (refindr.ai) - property recommendation engine, LLM decisioning, Firebase + MongoDB
5. IoT Smart Locker Management System - real-time MQTT locker control, cloud sync, authentication
6. Smart Vending Machine Telemetry Platform - predictive maintenance signals, centralized cloud analytics

CERTIFICATIONS:
- TESDA NC II - Programming NC IV
- TESDA NC II - Caregiving and Healthcare Services (certified to 2030)
- 4+ years automotive service experience (Tire/Lube Technician, Auto Glass)

AVAILABILITY:
- Actively job hunting - Taiwan (primary), Finland (Oulu), remote globally
- Open to full-time, contract, and consulting roles
- Taiwan Gold Card means zero visa processing delay for Taiwan employers

If asked anything outside this scope, say:
"That's a bit outside what I can answer here - reach me directly at clark.cruz07@gmail.com and I'll get back to you."

Keep responses under 120 words unless a detailed technical question warrants more. Never hallucinate tech, companies, or projects.
`;

export class ChatStore {
  messages: ChatMessage[] = [];
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async sendMessage(userInput: string) {
    const trimmed = userInput.trim();
    if (!trimmed || this.isLoading) return;

    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!apiKey) {
      this.error = 'Chat is temporarily unavailable - email clark.cruz07@gmail.com';
      return;
    }

    this.messages.push({ role: 'user', content: trimmed });
    this.isLoading = true;
    this.error = null;

    try {
  const conversationHistory = this.messages.slice(-10);
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: CLARK_SYSTEM_PROMPT },
        ...conversationHistory,
      ],
      max_tokens: 500,
      temperature: 0.7,
      stream: true,
    }),
  });

  if (!response.ok) {
    throw new Error('Groq request failed');
  }

  // ✅ Add the streaming reader here (replaces the old response.json() block)
  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let fullReply = '';

  runInAction(() => {
    this.messages.push({ role: 'assistant', content: '' });
  });

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    const lines = chunk.split('\n').filter(l => l.startsWith('data: '));

    for (const line of lines) {
      const json = line.slice(6);
      if (json === '[DONE]') break;
      try {
        const delta = JSON.parse(json).choices?.[0]?.delta?.content ?? '';
        fullReply += delta;
        runInAction(() => {
          this.messages[this.messages.length - 1].content = fullReply;
        });
      } catch { /* skip malformed chunks */ }
    }
  }

} catch {
  runInAction(() => {
    this.error = 'Groq unavailable - email clark.cruz07@gmail.com';
  });
} finally {
  runInAction(() => {
    this.isLoading = false;
  });
}
  }

  clearChat() {
    this.messages = [];
    this.error = null;
  }
}
