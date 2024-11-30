import classNames from "classnames";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className: string;
  rest: string;
}

function Panel({ children, className, ...rest }: Props) {
  const finalClassNames = classNames(
    "border rounded p-3 shadow bg-white w-full",
    className
  );

  return (
    <div {...rest} className={finalClassNames}>
      {children}
    </div>
  );
}

export default Panel;
