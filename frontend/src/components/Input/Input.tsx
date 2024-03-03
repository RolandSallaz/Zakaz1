import { ChangeEvent, HTMLInputTypeAttribute } from 'react';
import './Input.scss';

interface props {
  name: string;
  type?: HTMLInputTypeAttribute;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  required?: boolean;
  additionalClass?: string;
  placeholder?: string;
  isTextArea?: boolean;
  countRow?: boolean;
}

export default function Input({
  name,
  type = 'text',
  value,
  onChange,
  required,
  additionalClass,
  label,
  isTextArea,
  countRow
}: props) {
  return (
    <div className={`input-box `}>
      <label className="input-box__label">{label || name}</label>
      {isTextArea ? (
        <textarea
          name={name}
          className={`input-box__input ${additionalClass}`}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={label}
        />
      ) : (
        <input
          name={name}
          className={`input-box__input ${additionalClass}`}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={label}
        />
      )}
      {countRow && typeof value == 'string' && (
        <label className="input-box__label input-box__label_row-count">{`Количество строк ${value.split('\n').length}`}</label>
      )}
    </div>
  );
}
