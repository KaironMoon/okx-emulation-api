const express = require('express');
const app = express();
app.use(express.json());

const prices = {};

app.get('/api/v5/market/ticker', (req, res) => {
  const { instId } = req.query;
  const price = prices[instId] || '0';
  res.json({
    code: '0',
    msg: '',
    data: [
      {
        instId,
        last: price.toString()
      }
    ]
  });
});

app.post('/admin/set-price', (req, res) => {
  const { instId, price } = req.body;
  if (!instId || price === undefined) {
    return res.status(400).json({ error: 'instId and price required' });
  }
  prices[instId] = price;
  res.json({ instId, price });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`OKX emulator running on port ${port}`);
});
