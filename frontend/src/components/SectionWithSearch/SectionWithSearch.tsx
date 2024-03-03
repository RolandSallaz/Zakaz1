import { ReactNode } from 'react';
import './SectionWithSearch.scss';
import { Autocomplete, TextField } from '@mui/material';

interface props {
  children: ReactNode;
  options: string[];
}

export default function SectionWithSearch({ children, options }: props) {
  return (
    <section className="SectionWithSearch">
      <Autocomplete
        disablePortal
        options={options}
        renderInput={(params) => <TextField {...params} label="Игра" />}
      />
      <div className="SectionWithSearch__content">{children}</div>
    </section>
  );
}
