"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default function Navigation() {
    const pathname = usePathname();

    const navItems = [
        { name: "首页", href: "/" },
        { name: "设置", href: "/settings" },
    ];

    return (
        <nav className="border-b border-orange-100 w-full">
            <div className="max-w-4xl mx-auto px-8 py-4">
                <NavigationMenu className="py-0.5">
                    <NavigationMenuList className="gap-3">
                        {navItems.map((item) => (
                            <NavigationMenuItem key={item.href}>
                                <Link href={item.href}>
                                    <span
                                        className={cn(
                                            "px-10 py-2.5 mx rounded-lg font-medium text-base tracking-wide transition-all duration-200",
                                            pathname === item.href
                                                ? "bg-[#F7931A] text-white shadow-sm"
                                                : "text-[#F7931A] hover:bg-orange-50 hover:text-[#F7931A]/90"
                                        )}
                                    >
                                        {item.name}
                                    </span>
                                </Link>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </nav>
    );
} 