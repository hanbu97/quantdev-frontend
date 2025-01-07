"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSocketContext } from "@/contexts/SocketContext";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  const [secretKey, setSecretKey] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const { toast } = useToast();
  const { status, subscribe, connect } = useSocketContext();

  const handleConnect = () => {
    if (!secretKey.trim()) {
      toast({
        variant: "destructive",
        title: "错误",
        description: "请输入连接秘钥",
      });
      return;
    }

    const wsUrl = `ws://127.0.0.1:19731/apis/v0/data/ws?key=${secretKey}`;
    connect(wsUrl);

    toast({
      title: "连接成功",
      description: `已使用秘钥 ${secretKey} 连接`,
    });
  };

  // 监听 WebSocket 消息
  useEffect(() => {
    const unsubscribe = subscribe((data: any) => {
      setMessages(prev => [...prev, JSON.stringify(data)]);
    });

    return () => {
      unsubscribe();
    };
  }, [subscribe]);

  return (
    <main className="flex-1 flex flex-col items-center justify-center gap-8 p-8">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-center">WebSocket 连接</h2>
          <p className="text-sm text-muted-foreground text-center">
            当前状态: {status}
          </p>
        </div>

        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="请输入连接秘钥"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            className="flex-1"
          />
          <Button
            onClick={handleConnect}
            className="bg-[#F7931A] hover:bg-[#F7931A]/90 text-white"
          >
            确认
          </Button>
        </div>

        <Card className="mt-4">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium mb-2">接收到的消息:</h3>
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              <div className="space-y-2">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className="text-sm rounded-lg bg-muted p-3"
                  >
                    {msg}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}


