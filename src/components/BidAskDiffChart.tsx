"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface BidAskDiffChartProps {
    data: Array<{
        timestamp: number;
        bidDiff: number;
        askDiff: number;
    }>;
}

export function BidAskDiffChart({ data }: BidAskDiffChartProps) {
    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="timestamp"
                        tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
                    />
                    <YAxis
                        label={{ value: '价差 (USDT)', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip
                        labelFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
                        formatter={(value, name) => [
                            `${Number(value).toFixed(2)} USDT`,
                            name === 'bidDiff' ? '买价差' : '卖价差'
                        ]}
                    />
                    <Legend />
                    <Line
                        name="买价差"
                        type="linear"
                        dataKey="bidDiff"
                        stroke="#f5222d"
                        dot={false}
                        strokeWidth={2}
                    />
                    <Line
                        name="卖价差"
                        type="linear"
                        dataKey="askDiff"
                        stroke="#52c41a"
                        dot={false}
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
} 