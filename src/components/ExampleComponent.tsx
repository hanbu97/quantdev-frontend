"use client";

import { useEffect, useState } from 'react';
import { useSocketContext } from '@/contexts/SocketContext';

export function ExampleComponent() {
    const { status, sendMessage, subscribe } = useSocketContext();
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        // 订阅消息
        const unsubscribe = subscribe('chat_message', (message: string) => {
            setMessages(prev => [...prev, message]);
        });

        // 清理订阅
        return () => {
            unsubscribe();
        };
    }, [subscribe]);

    const handleSendMessage = () => {
        sendMessage('chat_message', 'Hello, WebSocket!');
    };

    return (
        <div>
            <div>连接状态: {status}</div>
            <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-[#F7931A] text-white rounded-lg"
            >
                发送消息
            </button>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
        </div>
    );
} 