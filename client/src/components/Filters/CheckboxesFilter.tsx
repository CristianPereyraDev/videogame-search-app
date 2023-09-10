import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import useCallbackState from '../../hooks/useCallbackState';

export default function CheckboxesFilter({
  name,
  options,
  handleFilterChange,
}: {
  name: string;
  options: { label: string; value: string }[];
  handleFilterChange: (filter: string, checked: string[]) => void;
}) {
  // Custom hook that implement callback call after update state.
  const [checkedList, setCheckedList] = useCallbackState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    if (checked) {
      setCheckedList([...checkedList, value], (state) =>
        handleFilterChange(name, state)
      );
    } else {
      setCheckedList(
        checkedList.filter((item) => item !== value),
        (state) => handleFilterChange(name, state)
      );
    }
  };

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
