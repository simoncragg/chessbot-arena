import { useState, useRef, useEffect, ReactNode } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";

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
  const selectorRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    const target = event?.target as Node;
    if (selectorRef.current && !selectorRef.current.contains(target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    setSelected(selectedOption);
  }, [selectedOption]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const optionSelected = (option: T) => {
    setSelected(option); 
    setIsOpen(false);
    onOptionSelected(option);
  };

  const renderOptions = (options: T[]) => {
    return (
      <div className="p-1 divide-y divide-neutral-800">
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
    );
  };

  return (

    <div className="relative inline-block text-left" ref={selectorRef}>
      <button
        type="button"
        className="inline-flex gap-2 w-full items-center justify-between rounded-md border border-white bg-neutral-700 px-3 py-2 text-sm font-medium text-gray-200 min-h-[46px] shadow-sm ring-1 ring-gray-600 hover:bg-neutral-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        id="menu-button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected ? (
          renderOption(selected)
        ) : (
          <span className="text-base font-semibold">{prompt}</span>
        )}
        <IoChevronDownOutline className={`w-5 h-5 ${isOpen ? "rotate-180": ""}`}/>
      </button>

      {/* Mobile Bottom Drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 w-full p-4 backdrop-blur-xl bg-neutral-950/50 border-t border-neutral-500 overflow-y-auto md:hidden transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "delay-100 translate-y-full"
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-base font-semibold">{prompt}</h5>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center"
            onClick={() => setIsOpen(false)}
          >
            <MdClose className="w-6 h-6" />
            <span className="sr-only">Close menu</span>
          </button>
        </div>
        {renderOptions(options)}
      </div>

      {/* Desktop Dropdown */}
      {isOpen && (
        <div
          className="absolute left-0 z-10 mt-2 w-full border border-neutral-500 rounded-md bg-neutral-900 focus:outline-none h-[208px] overflow-y-auto md:block hidden"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          style={{ left: '50%', transform: 'translateX(-50%)' }}
        >
          {renderOptions(options)}
        </div>
      )}
    </div>
  );
};

export default OptionSelector;
