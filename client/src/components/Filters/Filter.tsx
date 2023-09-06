import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useEffect, useState } from 'react';

export default function Filter({
  name,
  options,
  handleFilterChange,
}: {
  name: string;
  options: string[];
  handleFilterChange: (filter: string, checked: string[]) => void;
}) {
  const [checkedList, setCheckedList] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    let nextCheckedList: string[] = [];

    if (checked) {
      nextCheckedList = [...checkedList, value];
    } else {
      nextCheckedList = checkedList.filter((item) => item != value);
    }
    setCheckedList(nextCheckedList);
  };

  useEffect(() => {
    handleFilterChange(name, checkedList);
  }, [name, handleFilterChange, checkedList]);

  return (
    <>
      <FormGroup>
        {options.map((value, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={checkedList.includes(value)}
                value={value}
                onChange={handleChange}
                size='small'
              />
            }
            label={value}
          />
        ))}
      </FormGroup>
    </>
  );
}
