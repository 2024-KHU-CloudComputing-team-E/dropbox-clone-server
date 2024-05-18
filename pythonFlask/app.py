from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/test', methods=["POST"])
def test():
    lists = request.args['file_name']