"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PriceDiffChartProps {
    data: Array<{ timestamp: number; diff: number }>;
}

export function PriceDiffChart({ data }: PriceDiffChartProps) {
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
                        formatter={(value) => [`${value.toFixed(2)} USDT`, '价差']}
                    />
                    <Line
                        name="价差"
                        type="linear"
                        dataKey="diff"
                        stroke="#82ca9d"
                        dot={false}
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
} 