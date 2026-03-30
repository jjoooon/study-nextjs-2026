
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@uiux/Accordion";
import { cn } from '@/shared/lib/shadcn/utils';

type TableFoldProps = {
  children?: React.ReactNode;
};

interface TableFoldHeadProps {
  title?: string;
  className?: string;
  children?: React.ReactNode;
}


export const TableFold = ({ children }: TableFoldProps) => {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="shipping"
      className="w-full"
      variant={"tableHead"}
    >
      <AccordionItem value="shipping">
        {children}
      </AccordionItem>
    </Accordion>
  );
};


export const TableFoldHead = ({ children, title, className }: TableFoldHeadProps) => {
  return (
    <AccordionTrigger title={title} className={cn('justify-between w-full', className)}>
      {children}
    </AccordionTrigger>
  );
};

export const TableFoldBody = ({ children }: TableFoldHeadProps) => {
  return (
    <AccordionContent className={cn('justify-between w-full')}>
      {children}
    </AccordionContent>
  );
};