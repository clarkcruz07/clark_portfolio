import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores/RootStore';

export const ThemeSync = observer(() => {
  const { uiStore } = useStore();

  useEffect(() => {
    document.documentElement.dataset.sectionTheme = uiStore.themeMode;
  }, [uiStore.themeMode]);

  return null;
});
