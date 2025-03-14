import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, Loader2, SearchIcon } from "lucide-react";
import { FieldError } from "react-hook-form";

type Props = {
  inputProps: React.ComponentProps<"input">;
  errorState: FieldError | undefined;
  isLoading: boolean;
  placeholder?: string;
  className?: string;
};

export default function SearchInput({
  inputProps,
  errorState,
  isLoading,
  placeholder,
  className,
}: Props) {
  return (
    <div className="*:not-first:mt-2">
      <div className={cn("relative", className)}>
        <Input
          className={cn(
            "peer ps-9 pe-9",
            errorState && "!border-red-600 !ring-red-400/25"
          )}
          placeholder={errorState?.message || placeholder || "Search..."}
          type="search"
          disabled={isLoading}
          {...inputProps}
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          <SearchIcon size={16} />
        </div>
        <button
          className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Submit search"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={16} aria-hidden="true" />
          ) : (
            <ArrowRightIcon size={16} aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}
