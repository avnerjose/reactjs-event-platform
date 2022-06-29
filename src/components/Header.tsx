import { Logo } from "./Logo";
import { List, X } from "phosphor-react";
import { useSidebar } from "../contexts/SidebarContext";

export function Header() {
  const { handleToggleSidebar, isSidebarOpen } = useSidebar();
  return (
    <header className="w-full h-[75px] px-8 flex items-center justify-between lg:justify-center bg-gray-700 border-b border-gray-600 fixed top-0 left-0 right-0 z-50">
      <Logo />
      <button className="cursor-pointer block lg:hidden" onClick={() => handleToggleSidebar()}>
        {isSidebarOpen ? <X size={24} /> : <List size={24} />}
      </button>
    </header>
  );
}
