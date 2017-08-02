import * as React from 'react';

export interface IKeyMap {
  cancelNode: KeyCommands;
  saveNode: KeyCommands;
}

type KeyCommands = 'esc' | 'enter';

export type KeyHandler = Partial<{[key in keyof IKeyMap]: (event: React.KeyboardEvent<HTMLElement>) => void}>;
