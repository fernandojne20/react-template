import './CharacterCard.css';
import type { Character } from '../../types/character';

type CharacterCardProps = {
  character: Character;
};
export const CharacterCard = ({ character }: CharacterCardProps) => {
  return (
    <article className="character-card-container">
      <picture>
        <source srcSet={character.image} type="image/webp" />
        <img src={character.image} alt="" />
      </picture>

      <h2>{character.name}</h2>
      <span>
        {character.race} - {character.gender}
      </span>
      <div>
        <span>Base Ki: </span>
        <span>{character.ki}</span>
      </div>
      <div>
        <span>Total Ki: </span>
        <span>{character.maxKi}</span>
      </div>
      <div>
        <span>Affiliation: </span>
        <span>{character.affiliation}</span>
      </div>
    </article>
  );
};
