"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useSocketContext } from "@/contexts/SocketContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getExchangeInfo } from "@/apis/data/exchange";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

interface ExchangeInfo {
    num_of_symbols: number;
    symbols: Array<{
        min_qty: number;
        symbol: string;
    }>;
}

interface ExchangeData {
    exchange: string;
    symbol: string;
    lastPrice: number;
    bidPrice: number;
    bidQty: number;
    askPrice: number;
    askQty: number;
    priceChangePercentage: number;
    updateTime: string;
}

export default function ExchangesPage() {
    const [exchangeData, setExchangeData] = useState<{
        [key: string]: ExchangeData;
    }>({});
    const [exchangeInfo, setExchangeInfo] = useState<{
        [key: string]: ExchangeInfo;
    }>({});
    const [searchQuery, setSearchQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const { status, subscribe } = useSocketContext();

    // 获取交易所信息
    useEffect(() => {
        const fetchExchangeInfo = async () => {
            try {
                const data = await getExchangeInfo();
                if (data && Array.isArray(data)) {
                    const info = {
                        binance: data[0],
                        okx: data[1]
                    };
                    setExchangeInfo(info);
                }
            } catch (error) {
                console.error("获取交易所信息失败:", error);
            }
        };

        fetchExchangeInfo();
    }, []);

    // 处理搜索建议
    const suggestions = useMemo(() => {
        if (!searchQuery) return [];

        const query = searchQuery.toLowerCase();
        const symbolMap = new Map<string, Array<{
            exchange: string;
            min_qty: number;
        }>>();

        Object.entries(exchangeInfo).forEach(([exchange, info]) => {
            info.symbols
                .filter(s => s.symbol.toLowerCase().includes(query))
                .forEach(s => {
                    const existing = symbolMap.get(s.symbol) || [];
                    existing.push({
                        exchange,
                        min_qty: s.min_qty
                    });
                    symbolMap.set(s.symbol, existing);
                });
        });

        return Array.from(symbolMap.entries())
            .map(([symbol, exchanges]) => ({
                symbol,
                exchanges
            }))
            .sort((a, b) => a.symbol.localeCompare(b.symbol));
    }, [searchQuery, exchangeInfo]);

    // 处理搜索选择
    const handleSelect = (value: string) => {
        setSearchQuery(value);
        setShowSuggestions(false);
    };

    // 处理搜索框失焦
    const handleBlur = () => {
        // 延迟关闭建议列表，以便点击建议项能够触发
        setTimeout(() => {
            setShowSuggestions(false);
        }, 200);
    };

    // WebSocket数据处理
    useEffect(() => {
        if (status === 'connected') {
            const unsubscribe = subscribe((data: string) => {
                try {
                    const parsedData = JSON.parse(data);
                    if (parsedData.type === "update") {
                        const marketData = parsedData.data[0];
                        const key = `${parsedData.exchange}-${marketData.symbol}`;

                        setExchangeData(prev => ({
                            ...prev,
                            [key]: {
                                exchange: parsedData.exchange,
                                symbol: marketData.symbol,
                                lastPrice: marketData.last_price,
                                bidPrice: marketData.bid_price,
                                bidQty: marketData.bid_qty,
                                askPrice: marketData.ask_price,
                                askQty: marketData.ask_qty,
                                priceChangePercentage: marketData.price_change_percentage,
                                updateTime: new Date(marketData.ts).toLocaleTimeString(),
                            }
                        }));
                    }
                } catch (e) {
                    console.error('解析数据失败:', e);
                }
            });

            return () => {
                unsubscribe();
            };
        }
    }, [status, subscribe]);

    return (
        <main className="flex-1 p-8">
            <div className="w-full space-y-6">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold">交易所数据</h2>
                    <p className="text-sm text-muted-foreground">
                        连接状态: {status}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(exchangeInfo).map(([exchange, info]) => (
                        <Card key={exchange}>
                            <CardContent className="p-6">
                                <h3 className="text-lg font-semibold capitalize mb-2">{exchange}</h3>
                                <p className="text-sm text-muted-foreground">
                                    支持的交易对数量: {info.num_of_symbols}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="relative">
                    <Command className="rounded-lg border shadow-md">
                        <CommandInput
                            placeholder="搜索交易对..."
                            value={searchQuery}
                            onValueChange={setSearchQuery}
                        />
                        <CommandList>
                            <CommandEmpty>未找到匹配的交易对</CommandEmpty>
                            {suggestions.length > 0 && (
                                <CommandGroup heading="交易对">
                                    {suggestions.slice(0, 10).map((item) => (
                                        <CommandItem
                                            key={item.symbol}
                                            value={item.symbol}
                                            onSelect={handleSelect}
                                            className="cursor-pointer"
                                        >
                                            <span className="mr-2">{item.symbol}</span>
                                            <div className="flex gap-2">
                                                {item.exchanges.map(({ exchange, min_qty }) => (
                                                    <span
                                                        key={exchange}
                                                        className={`
                                                            px-2 py-0.5 text-xs rounded-full
                                                            ${exchange === 'binance'
                                                                ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                                                                : 'bg-blue-100 text-blue-800 border border-blue-200'
                                                            }
                                                        `}
                                                    >
                                                        {exchange} (最小数量: {min_qty})
                                                    </span>
                                                ))}
                                            </div>
                                        </CommandItem>
                                    ))}
                                    {suggestions.length > 10 && (
                                        <CommandItem value="" disabled>
                                            还有 {suggestions.length - 10} 个结果...
                                        </CommandItem>
                                    )}
                                </CommandGroup>
                            )}
                        </CommandList>
                    </Command>
                </div>

                <Card>
                    <CardContent className="p-6">
                        <ScrollArea className="h-[600px] w-full">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>交易所</TableHead>
                                        <TableHead>交易对</TableHead>
                                        <TableHead className="text-right">最新价格</TableHead>
                                        <TableHead className="text-right">买一价</TableHead>
                                        <TableHead className="text-right">买一量</TableHead>
                                        <TableHead className="text-right">卖一价</TableHead>
                                        <TableHead className="text-right">卖一量</TableHead>
                                        <TableHead className="text-right">24h涨跌幅</TableHead>
                                        <TableHead className="text-right">更新时间</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {Object.values(exchangeData)
                                        .filter(data => !searchQuery || data.symbol.toLowerCase().includes(searchQuery.toLowerCase()))
                                        .map((data) => (
                                            <TableRow key={`${data.exchange}-${data.symbol}`}>
                                                <TableCell className="capitalize">{data.exchange}</TableCell>
                                                <TableCell>{data.symbol}</TableCell>
                                                <TableCell className="text-right font-mono">
                                                    {data.lastPrice.toFixed(2)}
                                                </TableCell>
                                                <TableCell className="text-right font-mono">
                                                    {data.bidPrice.toFixed(2)}
                                                </TableCell>
                                                <TableCell className="text-right font-mono">
                                                    {data.bidQty.toFixed(4)}
                                                </TableCell>
                                                <TableCell className="text-right font-mono">
                                                    {data.askPrice.toFixed(2)}
                                                </TableCell>
                                                <TableCell className="text-right font-mono">
                                                    {data.askQty.toFixed(4)}
                                                </TableCell>
                                                <TableCell className={`text-right font-mono ${data.priceChangePercentage >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                    {data.priceChangePercentage.toFixed(2)}%
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {data.updateTime}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
} 