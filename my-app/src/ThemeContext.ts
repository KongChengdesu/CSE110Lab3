import React from 'react';

export const themes = {
 light: {
   foreground: '#000000',
   background: '#eeeeee',
   note_item: {
      background: '#f9f9f9',
      color: '#000000',
   },
 },
 dark: {
   foreground: '#ffffff',
   background: '#222222',
    note_item: {
        background: '#333333',
        color: '#ffffff',
    },
 },
};

export const ThemeContext = React.createContext(themes.light);
