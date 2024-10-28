from flask import Flask, render_template, request
import yfinance as yf
from pypfopt.discrete_allocation import DiscreteAllocation, get_latest_prices
from pypfopt import EfficientFrontier, risk_models, expected_returns
import pandas as pd
import plotly.express as px
from datetime import datetime

app = Flask(__name__)

def fetch_financial_data(tickers, start_date, end_date):
    try:
        stocks_df = yf.download(tickers, start=start_date, end=end_date)['Adj Close']
        return stocks_df
    except KeyError:
        return None

def optimize_portfolio(stocks_df):
    if stocks_df is None or stocks_df.empty:
        return None, None, None, None

    mu = expected_returns.mean_historical_return(stocks_df)
    S = risk_models.sample_cov(stocks_df)

    ef = EfficientFrontier(mu, S)
    ef.max_sharpe(risk_free_rate=0.02)
    weights = ef.clean_weights()

    expected_annual_return, annual_volatility, sharpe_ratio = ef.portfolio_performance()

    # Ensure that expected_annual_return is a numeric type
    expected_annual_return = float(expected_annual_return)

    return weights, expected_annual_return, annual_volatility, sharpe_ratio


def plot_cumulative_returns(data, title):
    daily_cum_returns = (1 + data).cumprod()*100
    fig = px.line(daily_cum_returns, title=title)
    return fig


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        tickers = request.form.get('tickers').split(',')
        start_date_str = request.form.get('start_date')
        end_date_str = request.form.get('end_date')
        
        # Convert input dates to 'YYYY-MM-DD' format
        try:
            start_date = datetime.strptime(start_date_str, '%Y/%m/%d').strftime('%Y-%m-%d')
            end_date = datetime.strptime(end_date_str, '%Y/%m/%d').strftime('%Y-%m-%d')
        except ValueError:
            return render_template('index.html', error_message='Invalid date format. Please use MM/DD/YYYY.')

        stocks_df = fetch_financial_data(tickers, start_date, end_date)

        if stocks_df is None or stocks_df.empty:
            return render_template('index.html', error_message='No data available for the specified tickers and date range.')

        weights, expected_annual_return, annual_volatility, sharpe_ratio = optimize_portfolio(stocks_df)
        print(f"weights: {weights}")
        print(f"expected_annual_return: {expected_annual_return}")
        print(f"annual_volatility: {annual_volatility}")
        print(f"sharpe_ratio: {sharpe_ratio}")

        if weights is None:
            print("Error in optimizing portfolio. Check the data and try again.")
         
         
        if weights is None:
            return render_template('index.html', error_message='Error in optimizing portfolio. Check the data and try again.')
        stocks_df['Optimized Portfolio'] = 0

        for ticker, weight in weights.items():
            stocks_df['Optimized Portfolio'] += stocks_df[ticker] * weight

        fig_cum_returns_optimized = plot_cumulative_returns(stocks_df['Optimized Portfolio'], 'Cumulative Returns of Optimized Portfolio Starting with $100')

        # Extract optimized weights for each ticker
        optimized_weights_table = pd.DataFrame(list(weights.items()), columns=['Tickers', 'Weights'])

        # Format expected annual return, annual volatility, and Sharpe ratio as percentage
        expected_annual_return = "{:.2%}".format(float(expected_annual_return) / 100)
        annual_volatility = "{:.2%}".format(float(annual_volatility) / 100)
        sharpe_ratio = "{:.2f}".format(float(sharpe_ratio))

        return render_template('index.html',
                               plot=fig_cum_returns_optimized.to_html(),
                               expected_annual_return=expected_annual_return,
                               annual_volatility=annual_volatility,
                               sharpe_ratio=sharpe_ratio,
                               optimized_weights_table=optimized_weights_table.to_html(index=False)
                               )

    return render_template('form.html')

# ... (remaining code)


if __name__ == '__main__':
    app.run(debug=True)
