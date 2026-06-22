import { makeAutoObservable } from 'mobx';

export type ThemeMode = 'black' | 'white';

export class UIStore {
  currentSection = 'hero';
  scrollProgress = 0;
  themeMode: ThemeMode = 'black';
  loaderComplete = false;
  chatOpen = false;

  constructor() {
    makeAutoObservable(this);
  }

  setSection(section: string) {
    this.currentSection = section;
  }

  setScrollProgress(progress: number) {
    this.scrollProgress = progress;
  }

  setTheme(theme: ThemeMode) {
    this.themeMode = theme;
  }

  completeLoader() {
    this.loaderComplete = true;
  }

  toggleChat(force?: boolean) {
    this.chatOpen = typeof force === 'boolean' ? force : !this.chatOpen;
  }
}
