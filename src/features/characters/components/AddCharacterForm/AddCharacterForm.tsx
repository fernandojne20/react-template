import { useState, type ChangeEvent, type SubmitEvent } from 'react';
import type { Character } from '../../types/character';

type AddCharacterFormProps = {
  onCreate: (item: Character) => void;
};

const INITIAL_VALUE: Character = {
  id: 0,
  name: '',
  ki: '',
  maxKi: '',
  race: '',
  gender: '',
  description: '',
  affiliation: '',
  image: '',
};
export const AddCharacterForm = ({ onCreate }: AddCharacterFormProps) => {
  const [newCharacter, setNewCharacter] = useState<Character>(INITIAL_VALUE);
  const [showForm, setShowForm] = useState<boolean>(false);

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    setNewCharacter((prev) => ({ ...prev, [fieldName]: fieldValue }));
  };

  const onsubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    onCreate({ ...newCharacter, id: new Date().getMilliseconds() });
    setNewCharacter(INITIAL_VALUE);
    setShowForm(false);
  };
  return (
    <div className="add-caracter-form-container">
      <button type="button" onClick={() => setShowForm(true)}>
        + Add Character
      </button>

      {showForm && (
        <form onSubmit={onsubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={newCharacter.name}
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor="ki">Ki</label>
            <input
              type="text"
              name="ki"
              value={newCharacter.ki}
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor="maxKi">Max Ki</label>
            <input
              type="text"
              name="maxKi"
              value={newCharacter.maxKi}
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor="race">Race</label>
            <input
              type="text"
              name="race"
              value={newCharacter.race}
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor="gender">Gender</label>
            <input
              type="text"
              name="gender"
              value={newCharacter.gender}
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              value={newCharacter.description}
              onChange={onChange}
            ></textarea>
          </div>
          <div>
            <label htmlFor="affiliation">Affiliation</label>
            <input
              type="text"
              name="affiliation"
              value={newCharacter.affiliation}
              onChange={onChange}
            />
          </div>
          <div>
            <button type="submit">Save</button>
          </div>
        </form>
      )}
    </div>
  );
};
