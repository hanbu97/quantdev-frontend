"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface DocLink {
    title: string;
    href: string;
    items?: DocLink[];
}

const docs: DocLink[] = [
    {
        title: "指南",
        href: "/docs/guide",
        items: [
            {
                title: "快速开始",
                href: "/docs/guide/getting-started",
                items: [
                    {
                        title: "介绍",
                        href: "/docs/guide/getting-started/introduction",
                    },
                    {
                        title: "配置说明",
                        href: "/docs/guide/getting-started/configuration",
                    },
                ],
            },
        ],
    },
    {
        title: "API",
        href: "/docs/api",
        items: [
            {
                title: "WebSocket API",
                href: "/docs/api/websocket",
            },
        ],
    },
];

function DocsSidebarNav({ className }: { className?: string }) {
    const pathname = usePathname();

    const renderNavItems = (items: DocLink[]) => {
        return items.map((item) => (
            <div key={item.href} className="space-y-1">
                <Link href={item.href}>
                    <span
                        className={cn(
                            "block py-1 text-sm font-medium hover:text-[#F7931A]",
                            pathname === item.href ? "text-[#F7931A]" : "text-muted-foreground"
                        )}
                    >
                        {item.title}
                    </span>
                </Link>
                {item.items?.length ? (
                    <div className="pl-4 space-y-1">
                        {renderNavItems(item.items)}
                    </div>
                ) : null}
            </div>
        ));
    };

    return (
        <ScrollArea className={cn("flex-shrink-0 w-64 h-[calc(100vh-4rem)]", className)}>
            <div className="p-4 space-y-4">
                {renderNavItems(docs)}
            </div>
        </ScrollArea>
    );
}

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen">
            <aside className="hidden md:block border-r">
                <DocsSidebarNav />
            </aside>
            <main className="flex-1 md:max-w-3xl xl:max-w-4xl mx-auto px-4 md:px-8">
                {children}
            </main>
        </div>
    );
} 