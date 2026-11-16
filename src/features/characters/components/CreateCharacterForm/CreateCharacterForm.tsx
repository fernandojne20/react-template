import './CreateCharacterForm.css';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { Character } from '../../types/character';

type CreateCharacterFormProps = {
  onCreate: (character: Character) => void;
};

type FormValues = Omit<Character, 'id'>;

const INITIAL_VALUES: FormValues = {
  name: '',
  race: '',
  gender: '',
  ki: '',
  maxKi: '',
  affiliation: '',
  image: '',
  description: '',
};

export const CreateCharacterForm = ({ onCreate }: CreateCharacterFormProps) => {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);

  // Un solo handler para todos los inputs, usando el atributo name
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate({ ...values, id: Date.now() });
    setValues(INITIAL_VALUES);
  };

  return (
    <form className="create-character-form" onSubmit={handleSubmit}>
      <h2>New character</h2>

      <input
        name="name"
        placeholder="Name"
        value={values.name}
        onChange={handleChange}
        required
      />
      <input
        name="race"
        placeholder="Race"
        value={values.race}
        onChange={handleChange}
        required
      />
      <input
        name="gender"
        placeholder="Gender"
        value={values.gender}
        onChange={handleChange}
        required
      />
      <input
        name="ki"
        placeholder="Base Ki"
        value={values.ki}
        onChange={handleChange}
        required
      />
      <input
        name="maxKi"
        placeholder="Total Ki"
        value={values.maxKi}
        onChange={handleChange}
        required
      />
      <input
        name="affiliation"
        placeholder="Affiliation"
        value={values.affiliation}
        onChange={handleChange}
        required
      />
      <input
        name="image"
        type="url"
        placeholder="Image URL"
        value={values.image}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={values.description}
        onChange={handleChange}
      />

      <button type="submit">Add character</button>
    </form>
  );
};
