import type { FC } from "react";

interface Props {
  title: string;
  description: string;
  time: string;
}

export const Note:FC<Props> = ({title, description, time}) => {
  return (
    <div className="flex justify-between w-full max-w-xl min-w-xs bg-black h-30 border border-gray-400 rounded-xl p-4">
      <div className="min-w-0">
        <h1 className="text-4xl font-bold text-white mb-3 truncate">
          {title}
        </h1>
        <p className="text-white truncate">
          {description}
        </p>
      </div>

      <div className="shrink-0 ml-4">
        <p className="text-white text-xs whitespace-nowrap">{time}</p>
      </div>
    </div>
  );
};
