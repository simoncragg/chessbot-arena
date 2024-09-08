import { useState, useRef, useEffect, ReactNode } from "react";
import { IoChevronDownOutline } from "react-icons/io5";

interface OptionSelectorProps<T> {
	prompt: string;
	options: T[];
	renderOption: (option: T) => ReactNode;
  selectedOption?: T;
	onOptionSelected: (option: T) => void; 
}

const OptionSelector = <T,>({ prompt, options, renderOption, selectedOption, onOptionSelected }: OptionSelectorProps<T>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<T | undefined>(selectedOption);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    const target = event?.target as Node;
    if (dropdownRef.current && !dropdownRef.current.contains(target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

	const optionSelected = (option: T) => {
		setSelected(option); 
		setIsOpen(false);
		onOptionSelected(option);
	};

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex gap-2 w-full justify-center rounded-md border border-white bg-neutral-800 px-4 py-2 text-sm font-medium text-gray-200 shadow-sm ring-1 ring-gray-600 hover:bg-neutral-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        id="menu-button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected ? (
          renderOption(selected)
        ) : (
          <span>{prompt}</span>
        )}
        <IoChevronDownOutline className={`w-5 h-5 ${isOpen ? "rotate-180": ""}`}/>
      </button>

      {isOpen && (
        <div
          className="absolute left-0 z-10 mt-2 w-full border border-neutral-500 rounded-md bg-neutral-900 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          style={{ left: '50%', transform: 'translateX(-50%)' }}
        >
          <div className="p-1">
            {options.map((option, index) => (
              <button
                type="button"
                key={index}
                className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-neutral-700 focus:outline-none"
                role="menuitem"
                onClick={() => optionSelected(option)}
              >
                {renderOption(option)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OptionSelector;
