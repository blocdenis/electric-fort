import React from 'react';

import CheckboxTrue from '../icons/CheckboxTrue';
import CheckboxFalse from '../icons/CheckboxFalse';

interface CustomCheckboxProps {
  checked: boolean;
  onChange: () => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
}) => {
  return (
    <div onClick={onChange}>
      {checked ? <CheckboxTrue /> : <CheckboxFalse />}
    </div>
  );
};

export default CustomCheckbox;
