import { ReactNode } from 'react';
import './SectionWithSearch.scss';
import { Autocomplete, TextField } from '@mui/material';

interface props {
  children: ReactNode;
  options: string[];
  onSelectSearch: (arg: string) => void;
}

export default function SectionWithSearch({ children, options, onSelectSearch }: props) {
  return (
    <section className="SectionWithSearch">
      <Autocomplete
        onChange={(_event: any, newValue: string | null) => {
          onSelectSearch(newValue || '');
        }}
        disablePortal
        options={options}
        renderInput={(params) => <TextField {...params} label="Игра" />}
      />
      <div className="SectionWithSearch__content">{children}</div>
    </section>
  );
}
