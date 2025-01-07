"use client";

import { createContext, useContext, ReactNode } from 'react';
import { useSocket } from '@/hooks/useSocket';

// 定义上下文类型
type SocketContextType = ReturnType<typeof useSocket>;

const SocketContext = createContext<SocketContextType | null>(null);

// Socket 提供者组件
export function SocketProvider({
    children,
    url = process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'ws://localhost:3001'
}: {
    children: ReactNode;
    url?: string;
}) {
    const socket = useSocket(url);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}

// 使用 Socket 的 Hook
export function useSocketContext() {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocketContext must be used within a SocketProvider');
    }
    return context;
} 