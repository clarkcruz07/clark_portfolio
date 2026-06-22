import React from 'react';
import { ChatStore } from './ChatStore';
import { ContentStore } from './ContentStore';
import { UIStore } from './UIStore';

export const RootStore = {
  uiStore: new UIStore(),
  contentStore: new ContentStore(),
  chatStore: new ChatStore(),
};

export const StoreContext = React.createContext(RootStore);
export const useStore = () => React.useContext(StoreContext);
