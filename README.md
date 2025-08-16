# okx-emulation-api

이 프로젝트는 OKX 거래소의 REST API를 간단히 에뮬레이션하여, 테스트 환경에서 코인 시세를 임의로 설정하고 조회할 수 있게 합니다.

## 사용법

### 설치
```
npm install
```

### 서버 실행
```
npm start
```

### 시세 설정
```
curl -X POST http://localhost:3000/admin/set-price \
  -H "Content-Type: application/json" \
  -d '{"instId":"BTC-USDT","price":30000}'
```

### 상세 티커 설정
```bash
curl -X POST http://localhost:3000/admin/set-ticker \
  -H "Content-Type: application/json" \
  -d '{"instId":"BTC-USDT","instType":"SPOT","last":30000,"askPx":30001,"bidPx":29999}'
```

### 시세 조회
```
curl "http://localhost:3000/api/v5/market/ticker?instId=BTC-USDT"
```

### 여러 상품의 티커 조회
```bash
curl "http://localhost:3000/api/v5/market/tickers?instType=SPOT"
```
