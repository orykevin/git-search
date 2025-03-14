import { GithubUserDetails } from "@/lib/types";
import moment from "moment";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ArrowRight, Delete } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Tooltip, TooltipProvider } from "./ui/tooltip";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";

type Props = {
  users: GithubUserDetails[] | null;
  setUsers: React.Dispatch<React.SetStateAction<GithubUserDetails[] | null>>;
  isDrawer?: boolean;
};

type History = {
  history: GithubUserDetails[];
  date: Date;
  id: number;
};

const HistoryComponent = ({ users, setUsers, isDrawer }: Props) => {
  const [history, setHistory] = useState<History[] | null>(
    JSON.parse(localStorage.getItem("history") || "[]") || []
  );
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  useEffect(() => {
    setHistory(JSON.parse(localStorage.getItem("history") || "[]") || []);
  }, [users]);

  const handleClickSeeHistory = (users: GithubUserDetails[]) => {
    setUsers(users);
  };

  const handleClearAllHistory = () => {
    localStorage.removeItem("history");
    setHistory([]);
    setIsOpenDialog(false);
  };

  const handleDeleteHistory = (id: number) => {
    const newHistory = history?.filter((data) => data.id !== id);
    if (newHistory) {
      localStorage.setItem("history", JSON.stringify(newHistory));
      setHistory(newHistory);
    }
  };

  return (
    <>
      <div className="flex px-1 items-center justify-between">
        Recent Searches
        <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              variant="outline"
              className={history?.length ? "" : "hidden"}
            >
              Clear All
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Clear All History</DialogTitle>
            <p>
              This action cannot be undone. Are you sure you want to proceed?
            </p>
            <div className="grid grid-cols-2 gap-2 justify-end">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsOpenDialog(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="w-full"
                onClick={handleClearAllHistory}
              >
                Clear History
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <ScrollArea
        className={cn(
          "h-[calc(100vh-200px)] mt-4 space-y-2",
          isDrawer && "h-[calc(100vh-80px)]"
        )}
      >
        {history?.length === 0 && (
          <div className="flex items-center justify-center h-full mt-3">
            <p className="text-muted-foreground">No Search History</p>
          </div>
        )}
        {history?.map((data) => {
          return (
            <div className="flex flex-col border border-muted p-1 pt-2 rounded-md my-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-1 ml-3">
                  {data.history.map((user) => (
                    <TooltipProvider delayDuration={0} key={user.login}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            href={user.html_url}
                            target="_blank"
                            className="flex size-10 shrink-0 items-center justify-center rounded-full border-[3px] overflow-hidden -ml-3"
                            aria-hidden="true"
                          >
                            <img src={user.avatar_url}></img>
                          </a>
                        </TooltipTrigger>
                        <TooltipContent className="bg-card text-muted-foreground text-xs p-1 border border-muted rounded-md transition-all">
                          @{user.login}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-max text-muted-foreground gap-0.5 !px-0.5 cursor-pointer"
                  onClick={() => handleDeleteHistory(data.id)}
                >
                  <Delete />
                </Button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-center text text-xs text-muted-foreground">
                  {moment(data.date).fromNow()}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-max text-muted-foreground gap-0.5 !px-0.5 cursor-pointer"
                  onClick={() => handleClickSeeHistory(data.history)}
                >
                  <p className="text-xs">See history</p>
                  <ArrowRight size={10} />
                </Button>
              </div>
            </div>
          );
        })}
      </ScrollArea>
    </>
  );
};

export default HistoryComponent;
