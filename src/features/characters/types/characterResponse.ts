import type { Character } from './character';

type MetaEnvelope = {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
};

type LinksEvelope = {
  first: string;
  previous: string;
  next: string;
  last: string;
};
type ResponseEvelope<T> = {
  items: T;
  meta: MetaEnvelope;
  links: LinksEvelope;
};
export type CharacterResponse = ResponseEvelope<Character[]>;
