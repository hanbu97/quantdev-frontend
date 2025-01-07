import { useEffect, useRef, useState, useCallback } from "react";

export type SocketStatus = "connecting" | "connected" | "disconnected";

export function useSocket(initialUrl: string) {
  const [status, setStatus] = useState<SocketStatus>("disconnected");
  const socketRef = useRef<WebSocket | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const connect = useCallback((url: string) => {
    if (socketRef.current) {
      socketRef.current.close();
    }

    const ws = new WebSocket(url);
    socketRef.current = ws;

    ws.onopen = () => {
      setStatus("connected");
      setError(null);
    };

    ws.onclose = () => {
      setStatus("disconnected");
    };

    ws.onerror = (event: Event) => {
      setError(new Error("WebSocket connection failed"));
      setStatus("disconnected");
    };

    return ws;
  }, []);

  // 发送消息的方法
  const sendMessage = useCallback((data: any) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(data));
    }
  }, []);

  // 订阅消息的方法
  const subscribe = useCallback((callback: (data: any) => void) => {
    if (socketRef.current) {
      socketRef.current.onmessage = (event) => {
        console.log("WebSocket原始消息:", event.data);
        callback(event.data);
      };
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.onmessage = null;
      }
    };
  }, []);

  return {
    status,
    error,
    sendMessage,
    subscribe,
    socket: socketRef.current,
    connect,
  };
}
