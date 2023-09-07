import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useEffect, useState } from 'react';

export default function CheckboxesFilter({
  name,
  options,
  handleFilterChange,
}: {
  name: string;
  options: { label: string; value: string }[];
  handleFilterChange: (filter: string, checked: string[]) => void;
}) {
  const [checkedList, setCheckedList] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    let nextCheckedList: string[] = [];

    if (checked) {
      nextCheckedList = [...checkedList, value];
    } else {
      nextCheckedList = checkedList.filter((item) => item !== value);
    }
    setCheckedList(nextCheckedList);
  };

  useEffect(() => {
    handleFilterChange(name, checkedList);
  }, [name, handleFilterChange, checkedList]);

  return (
    <>
      <FormGroup>
        {options.map((option, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={checkedList.includes(option.value)}
                value={option.value}
                onChange={handleChange}
                size='small'
              />
            }
            label={option.label}
          />
        ))}
      </FormGroup>
    </>
  );
}
