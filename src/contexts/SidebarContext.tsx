import { createContext, ReactNode, useContext, useState } from "react";

type SidebarContextProps = {
  isSidebarOpen: boolean;
  handleToggleSidebar: () => void;
};

type SidebarProviderProps = {
  children: ReactNode;
};

const SidebarContext = createContext<SidebarContextProps>(
  {} as SidebarContextProps
);

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, handleToggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => useContext(SidebarContext);
