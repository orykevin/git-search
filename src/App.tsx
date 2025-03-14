import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toogle";
import { Card, CardContent, CardTitle } from "./components/ui/card";
import HistoryComponent from "./components/history-component";
import SearchComponent from "./components/search-component";
import { Button } from "./components/ui/button";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { GithubUserDetails } from "./lib/types";
import { Drawer, DrawerContent, DrawerTrigger } from "./components/ui/drawer";

function App() {
  const [users, setUsers] = useState<GithubUserDetails[] | null>(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    if (openDrawer) setOpenDrawer(false);
  }, [users]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col p-3 md:p-4 h-screen space-y-2 md:space-y-3">
        <Card className="flex flex-row justify-between items-center w-full h-16 py-2 md:py-4 px-3 md:px-4">
          <Drawer
            direction="left"
            open={openDrawer}
            onOpenChange={setOpenDrawer}
          >
            <DrawerTrigger>
              <Button size="icon" variant="outline" className="md:hidden">
                <Menu />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="pt-6 px-3">
              <HistoryComponent
                users={users}
                setUsers={setUsers}
                isDrawer={true}
              />
            </DrawerContent>
          </Drawer>
          <h1 className="text-lg font-semibold md:absolute">GitSearch</h1>
          <div>
            <ModeToggle />
          </div>
        </Card>
        <div className="flex gap-3 h-full">
          <Card className="min-w-[260px] hidden md:block">
            <CardContent className="px-2 md:px-4">
              <HistoryComponent users={users} setUsers={setUsers} />
            </CardContent>
          </Card>
          <Card className="w-full py-4 px-0 md:px-3">
            <CardContent className="px-0 ">
              <SearchComponent users={users} setUsers={setUsers} />
            </CardContent>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
