import type { FC, HtmlHTMLAttributes } from "react";
import { Button } from "../share/Button";
import { useNavigate } from "@tanstack/react-router";
import Mark from "../image/Mark.png";



const Header: FC<HtmlHTMLAttributes<HTMLDivElement>> = ({children}) => {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 bg-black h-20 p-4 flex  items-center justify-between">
        <img onClick={()=>navigate({to :"/"})}
          src={Mark}
          alt="My App"
          className="h-15 w-auto object-contain"
        />
        {children}
        <div className="gap-2 flex">
          <Button onClick={()=>navigate({to :"/"})}>Main</Button>
          <Button onClick={()=>navigate({to :"/notes_list"})}>Notes</Button>
          <Button onClick={()=>navigate({to :"/about"})}>About us</Button>
        </div>
    </header>
  );
};

export default Header;
