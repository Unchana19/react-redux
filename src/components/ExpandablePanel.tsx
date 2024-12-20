import { useState, type ReactNode } from "react";
import { GoChevronDown, GoChevronLeft } from "react-icons/go";

interface Props {
  header: ReactNode;
  children: ReactNode;
}

function ExpandablePanel({ header, children }: Props) {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="mb-2 border rounded">
      <div className="flex p-2 justify-between items-center">
        <div className="flex items-center justify-between gap-3">{header}</div>
        <button className="cursor-pointer" type="button" onClick={handleClick}>
          {expanded ? <GoChevronDown /> : <GoChevronLeft />}
        </button>
      </div>
      {expanded && <div className="p-2 border-t">{children}</div>}
    </div>
  );
}

export default ExpandablePanel;
