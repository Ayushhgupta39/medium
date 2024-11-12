import { ChangeEvent } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface FormInputType {
  label: string;
  type: string;
  placeholder?: string;
  id: string;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = ({
  label,
  type = "text",
  placeholder,
  id,
  className,
  onChange,
}: FormInputType) => {
  return (
    <div>
      <Label className="block text-sm font-medium mb-1" htmlFor="username">
        {label}
      </Label>
      <Input
        type={type}
        id={id}
        className={`${className}`}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default FormInput;
