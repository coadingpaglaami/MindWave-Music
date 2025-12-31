"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sidbaarLinks } from "@/lib/sidebaarData";
import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, ChevronRightIcon, User2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const SideBaar = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const pathname = usePathname();
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);

  const toggleDropdown = (label: string) => {
    if (openDropdowns.includes(label)) {
      setOpenDropdowns(openDropdowns.filter((l) => l !== label));
    } else {
      setOpenDropdowns([...openDropdowns, label]);
    }
  };

  const dropDownData: {
    label: string;
    href?: string;
    onChange?: () => void;
  }[] = [
    { label: "Profile", href: "/profile" },
    { label: "Log Out", onChange: () => console.log("Logging out...") },
  ];

  return (
    <div className="flex flex-col gap-3.5 h-full bg-[#3E2723] ">
      <div className="flex flex-col gap-0.5 py-5">
        <span className="text-xl text-[#D4AF37] px-2 lg:px-4 font-semibold">
          Zenzi Wellness
        </span>
        <p className="px-2 lg:px-4 text-[#FAF8F599]">Admin Dashboard</p>
      </div>
      <div className="border-b border-[#4e342e]" />
      <div className="flex-1 px-2 lg:px-4 overflow-y-auto ">
        {sidbaarLinks.map((link) => {
          const isActive =
            link.href === "/settings"
              ? pathname === link.href || pathname.startsWith(`${link.href}/`)
              : pathname === link.href;
          if (link.dropdown) {
            const isOpen = openDropdowns.includes(link.label);
            return (
              <div key={link.label} className="flex flex-col">
                {/* Dropdown Trigger */}
                <div
                  onClick={() => toggleDropdown(link.label)}
                  className={clsx(
                    "flex items-center  p-2 rounded-md cursor-pointer select-none ",
                    isActive ? "bg-[#D4915D] text-white" : "text-[#FAF8F5CC]"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <link.icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </div>
                  <ChevronRightIcon
                    className={clsx(
                      "ml-auto transition-transform ",
                      isOpen ? "rotate-90" : ""
                    )}
                  />
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="accordion"
                      className="flex flex-col ml-6 mt-1 gap-1 overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      {link.dropdown.map((sublink) => {
                        const isSublinkActive = pathname === sublink.href;
                        return (
                          <Link
                            key={sublink.label}
                            href={sublink.href}
                            className={clsx(
                              "flex items-center gap-2 p-2 rounded-md text-sm",
                              isSublinkActive
                                ? "bg-[#D4915D] text-white"
                                : "text-[#FAF8F5CC]"
                            )}
                          >
                            <sublink.icon className="w-4 h-4" />
                            {sublink.label}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          }

          return (
            <Link
              key={link.label}
              href={link.href}
              className={clsx(
                "flex items-center gap-2 p-2 rounded-md cursor-pointer dark:text-gray-300 text-[#4A5565]",
                isActive ? "bg-[#D4915D] text-white " : "text-[#FAF8F5CC]"
              )}
            >
              <link.icon className="w-5 h-5" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>
      <div className="flex justify-between gap-2 lg:px-4 px-2 py-1.5 rounded-lg bg-[#623C35]">
        <div className="flex items-center gap-2.5 text-white ">
          <User2 className="" />
          <span>Admin Profile</span>
        </div>
        <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
          <DropdownMenuTrigger asChild>
            <button>
              <ChevronRight
                className={`transition-transform  text-white ${
                  openDropdown ? "-rotate-90" : ""
                }`}
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {dropDownData.map(
              (item: {
                label: string;
                href?: string;
                onChange?: () => void;
              }) => (
                <DropdownMenuItem key={item.label} onSelect={item.onChange}>
                  {item.href ? (
                    <Link href={item.href}>{item.label}</Link>
                  ) : (
                    item.label
                  )}
                </DropdownMenuItem>
              )
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="p-3.5 text-[#FAF8F580] text-sm border-t border-[#4e342e]">
        © 2025 Zenzi Wellness
      </div>
    </div>
  );
};
