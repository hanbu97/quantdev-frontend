"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSocketContext } from "@/contexts/SocketContext";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [secretKey, setSecretKey] = useState("");
  const { toast } = useToast();
  const { status } = useSocketContext();

  const handleConnect = () => {
    if (!secretKey.trim()) {
      toast({
        variant: "destructive",
        title: "错误",
        description: "请输入连接秘钥",
      });
      return;
    }

    toast({
      title: "连接成功",
      description: `已使用秘钥 ${secretKey} 连接`,
    });
    // 这里可以调用 socket 相关的连接逻辑
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center gap-8 p-8">
      <div className="w-full max-w-md space-y-4">
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
      </div>
    </main>
  );
}
