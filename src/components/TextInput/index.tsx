import { FC, useState, useEffect } from "react";
interface TextInputProps {
  value?: string,
  placeholder?: string,
  onChange: (text: string) => void
}
const TextInput: FC<TextInputProps> = ({ value = '', placeholder, onChange }) => {
  const [text, setText] = useState('');
  useEffect(() => {
    if (value.length > 0) {
      setText(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (evt: any) => {
    setText(evt.target.value);
    onChange(evt.target.value);
  }

  return (
    <input className="text-input" value={text} placeholder={placeholder} onChange={handleChange} />
  );
};

export default TextInput;