import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { GithubUserDetails } from "@/lib/types";
import { useState } from "react";
import SearchInput from "./search-input";
import { searchUser } from "@/services/github/search";
import AccordionIcon from "./accordion-user";
import { ScrollArea } from "./ui/scroll-area";
import { Loader2 } from "lucide-react";
import { cn, setHistoryLocalStorage } from "@/lib/utils";

type Props = {
  users: GithubUserDetails[] | null;
  setUsers: React.Dispatch<React.SetStateAction<GithubUserDetails[] | null>>;
};

const formSchema = z.object({
  query: z.string().min(1, "Please enter a username to search..."),
});

const SearchComponent = ({ users, setUsers }: Props) => {
  const [isFetching, setIsFetching] = useState(false);

  const form = useForm({
    defaultValues: {
      query: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmitForm = async (val: z.infer<typeof formSchema>) => {
    setIsFetching(true);
    setUsers([]);
    searchUser(val.query)
      .then((res) => {
        if (!res) return;
        setUsers(res);
        setIsFetching(false);
        if (res.length > 0) setHistoryLocalStorage(res);
      })
      .catch(() => {
        setIsFetching(false);
      });
  };

  return (
    <div>
      <form
        onSubmit={form.handleSubmit(onSubmitForm)}
        {...form}
        className={cn("px-3 mt-[calc(25vh)] transition-all", users && "mt-0")}
      >
        {!users && (
          <>
            <p className="text-center text-xl font-semibold my-1">
              Who are you looking for?
            </p>
            <p className="text-center text-sm text-muted-foreground mb-6">
              Type a GitHub username and discover their profile.
            </p>
          </>
        )}
        <SearchInput
          inputProps={form.register("query")}
          errorState={form.formState.errors.query}
          isLoading={isFetching}
          placeholder="Search github users ..."
          className={cn(
            "max-w-[480px] lg:max-w-[600px] mx-auto",
            users && "mr-auto ml-0"
          )}
        />
      </form>
      <ScrollArea
        className={cn(
          "h-[calc(100vh-160px)] md:h-[calc(100vh-186px)]  py-2 pl-2 pr-3 mt-2",
          !users && "!h-[0px]"
        )}
      >
        {users &&
          users.map((user) => (
            <AccordionIcon userData={user} key={user.login} />
          ))}
        {isFetching && (
          <div className="flex flex-col gap-1 items-center mt-4">
            <Loader2 className="animate-spin" />
            <p>Searching...</p>
          </div>
        )}
        {!isFetching && users?.length === 0 && (
          <div className="flex flex-col gap-1 items-center mt-4">
            <p>User not found</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default SearchComponent;
