import { useState, useRef, useEffect } from 'react';
import { useFormStore } from '../store/useFormStore';
import './CountryDropdown.css';

interface CountryDropdownProps {
  value?: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function CountryDropdown({
  value = '',
  onChange,
  error,
}: CountryDropdownProps) {
  const countries = useFormStore((state) => state.countries);
  const [inputValue, setInputValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [filtered, setFiltered] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputValue) {
      setFiltered(
        countries.filter((item) =>
          item.toLowerCase().startsWith(inputValue.toLowerCase())
        )
      );
    } else {
      setFiltered(countries);
    }
  }, [inputValue, countries]);

  useEffect(() => {
    function handleOuterClick(evt: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(evt.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOuterClick);
    return () => document.removeEventListener('mousedown', handleOuterClick);
  }, []);

  function handleInputChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(evt.target.value);
    onChange(evt.target.value);
    setIsOpen(true);
  }

  function handleSelect(country: string) {
    setInputValue(country);
    onChange(country);
    setIsOpen(false);
  }

  return (
    <div ref={wrapperRef} className="autocomplete">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        placeholder="Country"
      />
      {error && <p className="error">{error}</p>}
      {isOpen && filtered.length > 0 && (
        <ul className="autocomplete-list">
          {filtered.map((item) => (
            <li key={item} onClick={() => handleSelect(item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
