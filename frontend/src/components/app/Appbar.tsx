import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";

const Appbar = () => {
  const location = useLocation();

  return (
    <nav className="w-full flex items-center justify-between p-4 border-b border-slate-200">
      <Link to="/blogs">
        <div>
          <p>Medium</p>
        </div>
      </Link>
      <div className="flex items-center gap-4">
        {location.pathname !== "/publish" && (
          <div>
            <Link to="/publish">
              <Button className="rounded-full bg-green-600 hover:bg-green-700">
                Start writing
              </Button>
            </Link>
          </div>
        )}
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};

export default Appbar;
