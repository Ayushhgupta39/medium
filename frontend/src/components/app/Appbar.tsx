import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Appbar = () => {
  return (
    <nav className="w-full flex items-center justify-between p-4 border-b border-slate-200">
      <div>
        <p>Medium</p>
      </div>
      <div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};

export default Appbar;
