"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getConfigPriceDiff } from "@/apis/config/price_diff";
import { updateConfigPriceDiff } from "@/apis/config/update_price_diff";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function SettingsPage() {
    const [priceDiff, setPriceDiff] = useState<string>('0');
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const { toast } = useToast();

    // 获取当前价差配置
    useEffect(() => {
        const fetchPriceDiff = async () => {
            try {
                const data = await getConfigPriceDiff();
                console.log('获取到的价差配置:', data);
                if (data !== undefined && data !== null) {
                    console.log('设置价差值:', data);
                    setPriceDiff(data.toString());
                } else {
                    console.log('未获取到有效的价差值');
                }
            } catch (error) {
                console.error("获取价差配置失败:", error);
                toast({
                    variant: "destructive",
                    title: "错误",
                    description: "获取价差配置失败",
                });
            }
        };

        fetchPriceDiff();
    }, [toast]);

    // 处理输入变化
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // 只允许输入数字和小数点，且小数点后最多一位
        if (value === '' || /^\d*\.?\d{0,1}$/.test(value)) {
            setPriceDiff(value);
        }
    };

    // 处理确认更新
    const handleConfirmUpdate = async () => {
        setIsLoading(true);
        try {
            await updateConfigPriceDiff(priceDiff);
            toast({
                title: "成功",
                description: "价差配置已更新",
            });
        } catch (error) {
            console.error("更新价差配置失败:", error);
            toast({
                variant: "destructive",
                title: "错误",
                description: "更新价差配置失败",
            });
        } finally {
            setIsLoading(false);
            setShowConfirmDialog(false);
        }
    };

    // 处理点击更新按钮
    const handleUpdateClick = () => {
        const numValue = parseFloat(priceDiff);
        if (isNaN(numValue) || numValue < 0) {
            toast({
                variant: "destructive",
                title: "错误",
                description: "请输入有效的价差值",
            });
            return;
        }
        setShowConfirmDialog(true);
    };

    return (
        <main className="flex-1 p-8">
            <div className="w-full max-w-2xl mx-auto space-y-6">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold">系统设置</h2>
                    <p className="text-sm text-muted-foreground">
                        配置系统参数
                    </p>
                </div>

                <Card>
                    <CardContent className="p-6 space-y-4">
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold">价差配置</h3>
                            <p className="text-sm text-muted-foreground">
                                设置交易所之间的价差阈值（支持小数）
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <Input
                                type="text"
                                inputMode="decimal"
                                value={priceDiff}
                                onChange={handleInputChange}
                                className="max-w-[200px] font-mono"
                                placeholder="0.00"
                            />
                            <Button
                                onClick={handleUpdateClick}
                                disabled={isLoading || priceDiff === ''}
                                className="bg-[#F7931A] hover:bg-[#F7931A]/90 text-white"
                            >
                                {isLoading ? "更新中..." : "更新配置"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>确认更新价差配置？</AlertDialogTitle>
                            <AlertDialogDescription>
                                您确定要将价差阈值更新为 {priceDiff} 吗？
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>取消</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleConfirmUpdate}
                                className="bg-[#F7931A] hover:bg-[#F7931A]/90 text-white"
                            >
                                确认更新
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </main>
    );
} 