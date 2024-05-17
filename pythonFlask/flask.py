from app import Flask
import json
app = Flask(__name__)

@app.route("/test", methods=['POST'])

def test():
    lists = requests.