# WebSocket API

## 连接

WebSocket 连接地址：`ws://127.0.0.1:19731/apis/v0/data/ws`

### 参数

- `key`: 连接密钥，必填

### 示例

```javascript
const ws = new WebSocket('ws://127.0.0.1:19731/apis/v0/data/ws?key=your_key');
```

## 数据格式

### 市场数据更新

```json
{
  "type": "update",
  "exchange": "okx",
  "data": [
    {
      "symbol": "BTC_USDT",
      "last_price": 100756.3,
      "bid_price": 100756.2,
      "bid_qty": 0.09354331,
      "ask_price": 100756.3,
      "ask_qty": 0.61427383,
      "price_change_percentage": 1.369382022471916,
      "ts": 1736257978916
    },
    {
      "latency": -261,
      "ts": 1736257978655
    }
  ]
} 