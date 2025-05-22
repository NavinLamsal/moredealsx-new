import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarNavProps {
    items: { title: string; component: React.ReactNode }[];
    activeTab: string;
    setActiveTab: (tab: string) => void;
  }
  
  export function SidebarNav({ items, activeTab, setActiveTab }: SidebarNavProps) {
    
    return (
      <nav className="flex space-x-2 ">
        {items.map((item) => (
          <button
            key={item.title}
            onClick={() => setActiveTab(item.title)}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              activeTab === item.title
                ? "bg-primary text-primary-foreground dark:bg-primary"
                : "bg-slate-50 bg-card  hover:bg-primary hover:underline hover:text-primary-foreground",
              "justify-start  text-center  px-4 py-2 "
            )}
          >
            {item.title}
          </button>
        ))}
      </nav>
    );
  }