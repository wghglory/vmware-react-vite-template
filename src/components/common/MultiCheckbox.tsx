import {CdsCheckbox, CdsCheckboxGroup} from '@cds/react/checkbox';
import {CdsControlMessage} from '@cds/react/forms';
import {useState} from 'react';

export default function MultiCheckbox({
  label,
  inputName,
  defaultCheckedValues,
  allValues,
  description,
  selectChange,
}: {
  label: string;
  inputName: string;
  defaultCheckedValues: string[];
  allValues: string[];
  description?: string;
  selectChange?: (items: string[]) => void;
}) {
  const [selectedValues, setSelectedValues] = useState([...defaultCheckedValues]);

  return (
    <CdsCheckboxGroup>
      <label>{label}</label>
      {allValues.map(item => (
        <CdsCheckbox key={item}>
          <label>{item}</label>
          <input
            type="checkbox"
            name={inputName}
            value={item}
            checked={selectedValues.includes(item)}
            onChange={e => {
              const value = e.target.value;
              if (e.target.checked) {
                const newState = [...selectedValues, value];
                setSelectedValues(newState);
                selectChange && selectChange(newState);
              } else {
                const newState = selectedValues.filter(v => v !== value);

                setSelectedValues(newState);
                selectChange && selectChange(newState);
              }
            }}
          />
        </CdsCheckbox>
      ))}
      {description && <CdsControlMessage>{description}</CdsControlMessage>}
    </CdsCheckboxGroup>
  );
}
