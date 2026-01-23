import type { FC } from "react";
import { Button } from "../share/Button";
import { useNavigate } from "@tanstack/react-router";
import Mark from "../image/Mark.png";



const Header: FC = () => {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 bg-black h-20 p-4 flex  items-center justify-between">
        <img onClick={()=>navigate({to :"/"})}
          src={Mark}
          alt="My App"
          className="h-15 w-auto object-contain"
        />
        <div className="gap-2 flex">
          <Button onClick={()=>navigate({to :"/"})}>Main</Button>
          <Button onClick={()=>navigate({to :"/about"})}>About us</Button>
        </div>
    </header>
  );
};

export default Header;
