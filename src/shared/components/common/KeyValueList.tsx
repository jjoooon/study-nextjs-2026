interface KeyValueItem {
  key: string;
  className?: string;
  value: string | number;
}

interface KeyValueListProps {
  data: KeyValueItem[];
  className?: string;
}

export const KeyValueList = ({ data, className }: KeyValueListProps) => {
  return (
    <ul className={`flex gap-1 justify-start items-center flex-1 overflow-x-auto ${className}`}>
      {data.map((item, index) => (
        <li
          key={index}
          className="flex flex-row items-center gap-1 after:content-['|'] after:mx-3 after:text-gray-400 last:after:hidden"
        >
          <span className="text-[1.4rem] whitespace-nowrap">{item.key}</span>
          <b className="text-[1.8rem] font-bold whitespace-nowrap">{item.value}</b>
        </li>
      ))}
    </ul>
  );
};
