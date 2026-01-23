import type { FC, HTMLAttributes } from "react";

type CardsProps = HTMLAttributes<HTMLDivElement>
export const Cards:FC<CardsProps> = ({ children, className, ...props })=>{
    return <div className="bg-blue-400 w-3xs h-28 mx-auto mt-4 rounded-lg ">
     <div
      {...props}
      className={`bg-blue-400 w-80 h-28 mx-auto mt-4 rounded-lg p-4 text-white ${className ?? ""}`}
    >
      {children}
    </div>


    </div>
}