import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function Settings() {
    return (
        <main className="flex-1 flex flex-col items-center p-8">
            <div className="w-full max-w-2xl">
                <Card>
                    <CardHeader>
                        <h2 className="text-2xl font-semibold">通用设置</h2>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between space-x-2">
                            <Label htmlFor="dark-mode">深色模式</Label>
                            <Switch id="dark-mode" />
                        </div>
                        <div className="flex items-center justify-between space-x-2">
                            <Label htmlFor="notifications">通知提醒</Label>
                            <Switch id="notifications" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
} 