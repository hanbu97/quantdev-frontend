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
    if (status === 'connected') {
      const unsubscribe = subscribe((data: string) => {
        try {
          const parsedData = JSON.parse(data);
          if (parsedData.type === "update") {
            const marketData = parsedData.data[0];
            const formattedMsg = `
${parsedData.exchange} - ${marketData.symbol}
价格: ${marketData.last_price}
买一: ${marketData.bid_price} (${marketData.bid_qty})
卖一: ${marketData.ask_price} (${marketData.ask_qty})
24h涨跌: ${marketData.price_change_percentage.toFixed(2)}%
时间: ${new Date(marketData.ts).toLocaleTimeString()}
            `.trim();

            setMessages(prev => [...prev, formattedMsg]);
          }
        } catch (e) {
          setMessages(prev => [...prev, data]);
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [status, subscribe]);

  return (
    <main className="flex-1 flex flex-col items-center justify-center gap-8 p-8">
      <div className="w-full space-y-6">
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
            <ScrollArea className="h-[500px] w-full rounded-md border p-4">
              <div className="space-y-2">
                {messages.length === 0 ? (
                  <div className="text-center text-muted-foreground">
                    暂无消息
                  </div>
                ) : (
                  messages.map((msg, index) => (
                    <div
                      key={index}
                      className="text-xs rounded-lg bg-muted p-2 whitespace-pre font-mono border"
                    >
                      {msg}
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}


