import * as React from 'react';
import CheckboxTrue from '../icons/CheckboxTrue';
import CheckboxFalse from '../icons/CheckboxFalse';

interface RadioButtonProps {
  label: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const RadioButton = ({ label, value, checked, onChange }: RadioButtonProps) => (
  <label className="radio-button">
    <input
      type="radio"
      value={value}
      checked={checked}
      onChange={onChange}
      style={{ display: 'none' }}
    />
    {checked ? <CheckboxTrue /> : <CheckboxFalse />}
    <span>{label}</span>
  </label>
);

export default RadioButton;
