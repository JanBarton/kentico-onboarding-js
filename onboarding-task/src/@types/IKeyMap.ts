export interface IKeyMap {
  cancelNode: KeyCommands;
  saveNode: KeyCommands;
  deleteNode: KeyCommands;
}

type KeyCommands = 'esc' | 'enter' | 'ctrl+del';
