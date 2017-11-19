import numpy as np
from flask import Flask, request

app = Flask(__name__)

def process_json(x):
    arr = []
    for y in x:
        subarr = []
        for z in range(len(y)):
            subarr.append(y[z])
        arr.append(subarr)
    return arr

def json_to_ndarr(json_obj):
    day_attributes = ['open', 'high', 'low', 'close', 'volume']
    day_history = np.array(process_json(json_obj))[:2]
    return day_history.astype(float)
def get_previous_mean(history):
    return np.mean(history[:, :, 4])
def get_previous_high(history):
    return np.mean(history[:, :, 1])
def calculateFraction(amount, previous_mean):
    return amount/(previous_mean + amount)
def amount_to_buy(fraction, volume):
    return fraction * volume

@app.route('/', methods=['GET', 'POST'])
def calculate_volume_and_limit():
    if request.method == 'POST':
        data = request.data
        tradeable_amount = data.tradeable_amount
        history = json_to_ndarr(data.market)
        previous_mean = get_previous_mean(history)
        fraction = calculateFraction(tradeable_amount, previous_mean)
        amount = amount_to_buy(fraction, tradeable_amount)
        limit = get_previous_high(history)
        return (amount, limit)

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
