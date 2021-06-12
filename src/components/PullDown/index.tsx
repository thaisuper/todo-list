import { FC, useEffect, useState } from "react";

const PullDown: FC<PullDownProps> = ({options, onChange, initValue}) => {
  const [value, setValue] = useState(initValue);

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  const handleChange = (evt: any) => {
    setValue(evt.target.value);
    onChange(evt.target.value);
  }

  return (
    <select value={value} onChange={handleChange} className="pull-down">
      {options.length > 0 && options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
};

export default PullDown;