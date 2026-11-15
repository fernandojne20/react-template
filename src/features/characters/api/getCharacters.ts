import { BASE_URL } from '../../../lib/api';
import type { CharacterResponse } from '../types/characterResponse';

const LIMIT = 10;

export async function getCharacters(
  page: number,
  abortSignal: AbortSignal,
): Promise<CharacterResponse> {
  const res = await fetch(
    `${BASE_URL}/characters?page=${page}&limit=${LIMIT}`,
    {
      signal: abortSignal,
    },
  );

  const charactersRes: CharacterResponse = await res.json();

  return charactersRes;
}
