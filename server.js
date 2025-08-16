const express = require('express');
const app = express();
app.use(express.json());

// 티커 정보를 저장하기 위한 메모리 객체
const tickers = {};

// 개별 상품의 티커 정보 조회
app.get('/api/v5/market/ticker', (req, res) => {
  const { instId } = req.query;
  const ticker = tickers[instId] || {};
  const data = {
    instType: ticker.instType || '',
    instId,
    last: (ticker.last ?? 0).toString(),
    lastSz: (ticker.lastSz ?? 0).toString(),
    askPx: (ticker.askPx ?? 0).toString(),
    askSz: (ticker.askSz ?? 0).toString(),
    bidPx: (ticker.bidPx ?? 0).toString(),
    bidSz: (ticker.bidSz ?? 0).toString(),
    open24h: (ticker.open24h ?? 0).toString(),
    high24h: (ticker.high24h ?? 0).toString(),
    low24h: (ticker.low24h ?? 0).toString(),
    volCcy24h: (ticker.volCcy24h ?? 0).toString(),
    vol24h: (ticker.vol24h ?? 0).toString(),
    ts: (ticker.ts ?? Date.now()).toString()
  };
  res.json({ code: '0', msg: '', data: [data] });
});

// 다수 상품의 티커 정보 조회
app.get('/api/v5/market/tickers', (req, res) => {
  const { instType } = req.query;
  const data = Object.values(tickers)
    .filter(t => !instType || t.instType === instType)
    .map(t => ({
      instType: t.instType || '',
      instId: t.instId,
      last: (t.last ?? 0).toString(),
      lastSz: (t.lastSz ?? 0).toString(),
      askPx: (t.askPx ?? 0).toString(),
      askSz: (t.askSz ?? 0).toString(),
      bidPx: (t.bidPx ?? 0).toString(),
      bidSz: (t.bidSz ?? 0).toString(),
      open24h: (t.open24h ?? 0).toString(),
      high24h: (t.high24h ?? 0).toString(),
      low24h: (t.low24h ?? 0).toString(),
      volCcy24h: (t.volCcy24h ?? 0).toString(),
      vol24h: (t.vol24h ?? 0).toString(),
      ts: (t.ts ?? Date.now()).toString()
    }));
  res.json({ code: '0', msg: '', data });
});

// 간단한 가격 설정 (last 값만 변경)
app.post('/admin/set-price', (req, res) => {
  const { instId, price } = req.body;
  if (!instId || price === undefined) {
    return res.status(400).json({ error: 'instId and price required' });
  }
  const ticker = tickers[instId] || { instId };
  ticker.last = price;
  tickers[instId] = ticker;
  res.json({ instId, price });
});

// 상세 티커 정보 설정
app.post('/admin/set-ticker', (req, res) => {
  const { instId } = req.body;
  if (!instId) {
    return res.status(400).json({ error: 'instId required' });
  }
  const ticker = tickers[instId] || { instId };
  Object.assign(ticker, req.body);
  tickers[instId] = ticker;
  res.json(ticker);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`OKX emulator running on port ${port}`);
});
