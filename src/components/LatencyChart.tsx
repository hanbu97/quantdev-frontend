"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface LatencyChartProps {
    data: Array<{ timestamp: number; latency: number; exchange: string }>;
}

export function LatencyChart({ data }: LatencyChartProps) {
    // 分离不同交易所的数据
    const okxData = data.filter(d => d.exchange === 'okx');
    const binanceData = data.filter(d => d.exchange === 'binance');

    // 合并数据并按时间戳排序
    const combinedData = [...okxData, ...binanceData].sort((a, b) => a.timestamp - b.timestamp);

    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <LineChart data={combinedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="timestamp"
                        tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
                    />
                    <YAxis
                        label={{ value: '延迟 (ms)', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip
                        labelFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
                        formatter={(value, name) => [`${value} ms`, name === 'okx_latency' ? 'OKX延迟' : 'Binance延迟']}
                    />
                    <Legend />
                    <Line
                        name="OKX延迟"
                        type="linear"
                        dataKey={(item) => item.exchange === 'okx' ? item.latency : null}
                        stroke="#F7931A"
                        dot={false}
                        strokeWidth={2}
                        connectNulls
                    />
                    <Line
                        name="Binance延迟"
                        type="linear"
                        dataKey={(item) => item.exchange === 'binance' ? item.latency : null}
                        stroke="#2196F3"
                        dot={false}
                        strokeWidth={2}
                        connectNulls
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
