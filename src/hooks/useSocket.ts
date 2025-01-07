import { useEffect, useRef, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";

export type SocketStatus = "connecting" | "connected" | "disconnected";

export function useSocket(url: string) {
  const [status, setStatus] = useState<SocketStatus>("disconnected");
  const socketRef = useRef<Socket | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // 创建 socket 实例
    const socket = io(url, {
      reconnection: true, // 启用自动重连
      reconnectionAttempts: 5, // 最大重连次数
      reconnectionDelay: 1000, // 重连延迟时间（毫秒）
    });

    // 保存 socket 实例
    socketRef.current = socket;

    // 连接事件处理
    socket.on("connect", () => {
      setStatus("connected");
      setError(null);
    });

    socket.on("disconnect", () => {
      setStatus("disconnected");
    });

    socket.on("connect_error", (err) => {
      setError(err);
      setStatus("disconnected");
    });

    // 组件卸载时清理
    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [url]);

  // 发送消息的方法
  const sendMessage = useCallback((event: string, data: any) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit(event, data);
    }
  }, []);

  // 订阅消息的方法
  const subscribe = useCallback(
    (event: string, callback: (data: any) => void) => {
      if (socketRef.current) {
        socketRef.current.on(event, callback);
      }

      // 返回取消订阅的函数
      return () => {
        if (socketRef.current) {
          socketRef.current.off(event, callback);
        }
      };
    },
    []
  );

  return {
    status,
    error,
    sendMessage,
    subscribe,
    socket: socketRef.current,
  };
}
