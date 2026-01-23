import type { ButtonHTMLAttributes, FC } from "react";

type TButton = "default" | "border" | "dark";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  mode?: TButton;
}

export const Button: FC<Props> = ({
  mode = "default",
  className = "",
  children,
  ...rest
}) => {
  let base = "rounded-md py-2 font-semibold transition active:scale-95"
  let bg = "bg-blue-400 text-white"

  if (mode === "dark") {
    bg = "bg-slate-800 text-white hover:bg-slate-700"
  }

  if (mode === "border") {
    bg = "border border-gray-400 bg-white text-gray-800 hover:bg-gray-100 "
  }

  return (
    <button
      {...rest}
      className={`${base} ${bg} ${className} min-w-15`}
    >
      {children}
    </button>
  );
};
