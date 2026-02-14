'use client';

interface ViewModeProps {
  state: boolean;
  onChange?: (value: boolean) => void;
}

export const ViewMode = ({ state = true, onChange }: ViewModeProps) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        id="docType"
        className="peer a11y-hidden"
        checked={!state}
        onChange={() => onChange?.(!state)}
      />
      <label
        htmlFor="docType"
        className="relative w-[6.2rem] h-[2.8rem] rounded-full border border-[var(--color-gray-15)] flex justify-center items-center gap-[1.1rem] text-[var(--color-secondary-70)] text-[1.3rem] peer-checked:[&>.peer-2]:text-[var(--color-gray-0)] peer-checked:[&>.peer-2]:font-bold peer-checked:[&>.peer-1]:text-[var(--color-gray-50)] peer-checked:[&>.peer-1]:text-normal peer-checked:[&>b]:left-[2.9rem] cursor-pointer select-none"
      >
        <span className="peer-1 block relative z-1 text-[1.1rem] text-[var(--color-gray-0)] font-bold tracking-[-0.13rem]">
          간편
        </span>
        <span className="peer-2 block relative z-1 text-[1.1rem] text-[var(--color-gray-50)] tracking-[-0.13rem]">
          상세
        </span>
        <b className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-full bg-gradient-to-r from-[#ff5c2e] to-[#ffb800] shadow-[0rem_.2rem_.4rem_0rem_rgba(0,0,0,0.08)] absolute z-0 w-[3rem] h-[2.4rem] left-[.1rem] transition-left duration-300"></b>
      </label>
    </div>
  );
};
