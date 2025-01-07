"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface LatencyChartProps {
    data: Array<{ timestamp: number; latency: number }>;
}

export function LatencyChart({ data }: LatencyChartProps) {
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
                        label={{ value: '延迟 (ms)', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip
                        labelFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
                        formatter={(value) => [`${value} ms`, '延迟']}
                    />
                    <Line
                        type="monotone"
                        dataKey="latency"
                        stroke="#F7931A"
                        dot={false}
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
