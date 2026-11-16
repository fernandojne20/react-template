type CharacterSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export const CharacterSearch = ({ value, onChange }: CharacterSearchProps) => {
  return (
    <input
      type="search"
      className="character-search"
      placeholder="Search by name..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
