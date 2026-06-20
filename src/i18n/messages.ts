import { hy } from './hy';
import { ru } from './ru';

export const messages = {
  ru,
  hy,
} as const;

export type Messages = typeof messages;
export type MessageCatalog = (typeof messages)[keyof typeof messages];
