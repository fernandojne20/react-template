import type { ChangeEvent } from 'react';

type SearchBoxProps = {
  value: string;
  onChange: (value: ChangeEvent<HTMLInputElement, HTMLInputElement>) => void;
};
export const SearchBox = ({ value, onChange }: SearchBoxProps) => {
  return (
    <div className="search-box">
      <input
        type="search"
        placeholder="Search..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
