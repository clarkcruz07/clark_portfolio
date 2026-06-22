import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Chatbot } from './components/Chatbot/Chatbot';
import { Experience } from './components/Experience/Experience';
import { Footer } from './components/Footer/Footer';
import { Hero } from './components/Hero/Hero';
import { Loader } from './components/Loader/Loader';
import { Nav } from './components/Nav/Nav';
import { Projects } from './components/Projects/Projects';
import { ScrollHint } from './components/ScrollHint/ScrollHint';
import { Skills } from './components/Skills/Skills';
import { WhatIDo } from './components/WhatIDo/WhatIDo';
import { ThemeSync } from './hooks/useThemeSync';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useStore } from './stores/RootStore';

export const App = observer(() => {
  const { uiStore } = useStore();
  const progress = useScrollProgress();

  useEffect(() => {
    uiStore.setScrollProgress(progress);
  }, [progress, uiStore]);

  return (
    <div className="app">
      <ThemeSync />
      <Loader />
      <Nav />
      <main>
        <Hero />
        <WhatIDo />
        <Projects />
        <Experience />
        <Skills />
        <Footer />
      </main>
      <ScrollHint />
      <Chatbot />
    </div>
  );
});
