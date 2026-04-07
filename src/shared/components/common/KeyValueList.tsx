import { Grow, Typo } from '@atoms';

interface KeyValueItem {
  key: React.ReactNode;
  value: React.ReactNode;
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

interface KeyValueItemProps {
  label: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export const KeyValueItem = ({ label, children, className }: KeyValueItemProps) => {
  return (
    <Grow gap="1" className={className}>
      <Typo tag="div">{label}</Typo>
      <div>{children}</div>
    </Grow>
  );
};
