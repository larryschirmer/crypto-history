import React, { useState, useEffect, useRef, FC, ChangeEvent } from 'react';
import { distance } from 'fastest-levenshtein';

import styles from './Typeahead.module.scss';

const { typeahead: typeaheadStyles, error: errorClass, dropdown: dropdownClass } = styles;

type Props = {
  label: string;
  name: string;
  placeholder: string;
  onChange: (val: string) => void;
  value: string;
  error: string;
  touched: boolean;
  list: string[];
};

const Typeahead: FC<Props> = (props: Props) => {
  const {
    label = '',
    name = '',
    placeholder = '',
    onChange = () => undefined,
    value = '',
    error = '',
    touched = false,
    list = [],
  } = props;

  const componentRef = useRef<HTMLDivElement>();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    onChange(value);
    setSelectedValue('');
  };

  const handleSelect = (selectedItem: string) => {
    onChange(selectedItem);
    setSelectedValue(selectedItem);
  };

  // sync selected value on load in edit mode
  useEffect(() => {
    setSelectedValue(value);
  }, [])

  // setup input event listeners
  useEffect(() => {
    componentRef.current.onblur = () => {
      setSuggestions([]);
      setSelectedValue('');
    };
  }, []);

  // update suggestions based on value
  useEffect(() => {
    if (value === '' || !!selectedValue) {
      setSuggestions([]);
    } else {
      const ratedSuggestions = list
        .map((item) => ({
          name: item,
          rating: distance(item, value),
        }))
        .filter(({ rating }) => rating < 3)
        .map(({ name }) => name)
        .sort((a, b) => {
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        })
        .slice(0, 20);

      setSuggestions(ratedSuggestions);
    }
  }, [list, selectedValue, value]);

  return (
    <div ref={componentRef} className={typeaheadStyles}>
      <label htmlFor="name">{label}</label>
      <input {...{ name, placeholder, value }} type="text" onChange={handleChange} autoComplete="off" />
      {error && touched && <div className={errorClass}>{error}</div>}
      {!!suggestions.length && !selectedValue && (
        <div className={dropdownClass}>
          <ul>
            {suggestions.map((item) => (
              <li key={item} onClick={() => handleSelect(item)}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Typeahead;
