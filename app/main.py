import yfinance as yf
from pypfopt import EfficientFrontier, risk_models, expected_returns
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PortfolioRequest(BaseModel):
    tickers: str 
    start_date: str  
    end_date: str 

def fetch_financial_data(tickers, start_date, end_date):
    try:
        stocks_df = yf.download(tickers, start=start_date, end=end_date)['Adj Close']
        stocks_df = stocks_df.ffill().bfill()  
        return stocks_df
    except KeyError:
        return None

def optimize_portfolio(stocks_df):
    if stocks_df is None or stocks_df.empty:
        return None, None, None, None

    mu = expected_returns.mean_historical_return(stocks_df)
    S = risk_models.sample_cov(stocks_df)
    S = (S + S.T) / 2  

    ef = EfficientFrontier(mu, S)
    ef.max_sharpe(risk_free_rate=0.02)
    weights = ef.clean_weights()

    expected_annual_return, annual_volatility, sharpe_ratio = ef.portfolio_performance()
    expected_annual_return = float(expected_annual_return)

    return weights, expected_annual_return, annual_volatility, sharpe_ratio

@app.get("/")
async def root():
    return {"message": "Welcome to the Neurobagel Query Tool AI API"}

@app.post("/optimize-portfolio/")
async def optimize_portfolio_endpoint(request: PortfolioRequest):
    tickers = [ticker.strip() for ticker in request.tickers.split(',')]
    
    try:
        start_date = datetime.strptime(request.start_date, '%Y/%m/%d').strftime('%Y-%m-%d')
        end_date = datetime.strptime(request.end_date, '%Y/%m/%d').strftime('%Y-%m-%d')
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Please use YYYY/MM/DD.")
    
    # Fetch financial data
    stocks_df = fetch_financial_data(tickers, start_date, end_date)
    
    if stocks_df is None or stocks_df.empty:
        raise HTTPException(status_code=404, detail="No data available for the specified tickers and date range.")
    
    # Optimize portfolio
    weights, expected_annual_return, annual_volatility, sharpe_ratio = optimize_portfolio(stocks_df)

    if weights is None:
        raise HTTPException(status_code=500, detail="Error in optimizing portfolio. Check the data and try again.")

    return {
        "weights": {ticker: f"{weight:.2%}" for ticker, weight in weights.items()},
        "expected_annual_return": f"{expected_annual_return:.2%}",
        "annual_volatility": f"{annual_volatility:.2%}",
        "sharpe_ratio": f"{sharpe_ratio:.2f}"
    }

if __name__ == '__main__':
    uvicorn.run(app, host="127.0.0.1", port=8080)
