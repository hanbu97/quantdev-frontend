export default function DocsPage() {
    return (
        <div className="py-8 space-y-6">
            <div>
                <h1 className="text-3xl font-bold">文档</h1>
                <p className="text-muted-foreground mt-2">
                    欢迎使用 Quantdev 文档。这里提供了详细的使用指南和 API 文档。
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="p-6 border rounded-lg space-y-2">
                    <h2 className="text-xl font-semibold">快速开始</h2>
                    <p className="text-sm text-muted-foreground">
                        了解如何快速开始使用 Quantdev 平台，包括基本配置和使用说明。
                    </p>
                </div>

                <div className="p-6 border rounded-lg space-y-2">
                    <h2 className="text-xl font-semibold">API 文档</h2>
                    <p className="text-sm text-muted-foreground">
                        查看详细的 API 文档，包括 WebSocket 接口和数据格式说明。
                    </p>
                </div>
            </div>
        </div>
    );
} 