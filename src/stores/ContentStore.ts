import { makeAutoObservable } from 'mobx';

export type Project = {
  title: string;
  link: string;
  tags: string[];
  description: string;
};

export type Experience = {
  company: string;
  role: string;
  period: string;
};

export type SkillGroup = {
  group: string;
  skills: string[];
};

export type Service = {
  number: string;
  title: string;
  copy: string;
  tags: string[];
};

export class ContentStore {
  services: Service[] = [
    {
      number: '01',
      title: 'AI & LLM Engineering',
      copy: 'LLM pipelines, agentic workflows, conversational AI - built for production.',
      tags: ['OpenAI', 'Claude', 'Groq', 'LangChain', 'n8n', 'Vapi'],
    },
    {
      number: '02',
      title: 'Full-Stack Development',
      copy: 'End-to-end web and mobile platforms built to scale.',
      tags: ['Node.js', 'ReactJS', 'React Native', 'Python', 'TypeScript'],
    },
    {
      number: '03',
      title: 'IoT & Real-Time Systems',
      copy: 'Hardware-to-cloud pipelines, MQTT telemetry, edge analytics.',
      tags: ['MQTT', 'WebSockets', 'AWS', 'Docker', 'Kubernetes'],
    },
    {
      number: '04',
      title: 'Computer Vision',
      copy: 'OpenCV + YOLO pipelines for manufacturing, security, and spatial analytics.',
      tags: ['OpenCV', 'YOLO', 'TensorFlow', 'PyTorch', 'Keras'],
    },
    {
      number: '05',
      title: 'Cloud & Security',
      copy: 'Scalable microservices with ISO 27001-aligned security practices.',
      tags: ['AWS', 'Azure', 'GCP', 'OWASP', 'SIEM', 'PostgreSQL'],
    },
  ];

  projects: Project[] = [
    {
      title: 'AI-Driven Panel Design & Manufacturing Automation',
      link: 'https://github.com/clarkcruz07',
      tags: ['OpenCV', 'Python', 'Node.js', 'Factory Automation'],
      description:
        'Intelligent industrial automation using spatial computation algorithms to optimize electrical and structural panel layouts. Visual configs become structured telemetry, reducing design errors on the factory floor.',
    },
    {
      title: 'Real-Time Computer Vision & Edge Security Platform',
      link: 'https://github.com/clarkcruz07',
      tags: ['OpenCV', 'YOLO', 'Edge Computing', 'Cloud Dashboards'],
      description:
        'Edge-to-cloud video analytics for real-time object detection, spatial monitoring, and anomaly detection with event-driven alert streaming.',
    },
    {
      title: 'Conversational AI Customer Support Platform',
      link: 'https://github.com/clarkcruz07',
      tags: ['LLM APIs', 'Node.js', 'TTS', 'STT', 'WebRTC'],
      description:
        'LLM-powered support system with speech pipelines, high-concurrency backend, and third-party AI and voice integrations.',
    },
    {
      title: 'AI-Powered Real Estate Intelligence Platform',
      link: 'https://github.com/clarkcruz07',
      tags: ['LLM', 'Firebase', 'MongoDB', 'ZOHO', 'ReactJS'],
      description:
        'AI-driven real estate system for intelligent property recommendations, automated classification, and structured data workflows.',
    },
    {
      title: 'IoT Smart Locker Management System',
      link: 'https://github.com/clarkcruz07',
      tags: ['Node.js', 'IoT', 'MQTT', 'Cloud Sync'],
      description:
        'Secure IoT backend for real-time locker state monitoring, authentication, and remote cloud-based control.',
    },
    {
      title: 'Smart Vending Machine Telemetry Platform',
      link: 'https://github.com/clarkcruz07',
      tags: ['Real-Time Telemetry', 'Predictive Maintenance', 'Analytics'],
      description:
        'Live telemetry pipeline for inventory, machine health, and predictive maintenance with centralized cloud analytics.',
    },
  ];

  experience: Experience[] = [
    { company: 'Borg Shared Services', role: 'Senior Full-Stack Dev', period: 'Mar 2025 - May 2026' },
    { company: 'Freelancer / app.refindr.ai', role: 'Full-Stack & AI Engineer', period: 'Jul 2024 - Mar 2025' },
    { company: 'Aique Innovations Technology', role: 'Full-Stack IoT Engineer', period: 'Sep 2022 - May 2024' },
    { company: 'Outsourced Quality Service', role: 'Software Developer', period: 'Jun 2020 - Sep 2022' },
    { company: 'iAccess Vision Inc.', role: 'IT Operations Lead', period: 'Sep 2015 - Mar 2020' },
    { company: 'Asian Institute of Management', role: 'Enterprise Systems Developer', period: 'Feb 2012 - Aug 2015' },
  ];

  skills: SkillGroup[] = [
    { group: 'AI/ML', skills: ['OpenAI', 'Claude', 'Gemini', 'Groq', 'LangChain', 'OpenCV', 'YOLO', 'TensorFlow', 'PyTorch', 'Keras', 'ElevenLabs', 'Vapi'] },
    { group: 'Frontend', skills: ['ReactJS', 'VueJS', 'React Native', 'TypeScript', 'CSS Modules', 'Vite'] },
    { group: 'Backend', skills: ['Node.js', 'Python', 'PHP', '.NET', 'Microservices', 'REST APIs'] },
    { group: 'IoT/Cloud', skills: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'MQTT', 'WebSockets'] },
    { group: 'Security', skills: ['OWASP', 'SIEM', 'IAM', 'ISO 27001'] },
    { group: 'Databases', skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Firebase', 'Supabase', 'MSSQL'] },
  ];

  constructor() {
    makeAutoObservable(this);
  }
}
