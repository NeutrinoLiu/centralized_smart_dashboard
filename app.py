import os, time
from flask import Flask

app = Flask(__name__)

#TODO: remove after routing file exists
@app.route('/')
def hello_world_page():
    return 'CS506, hello world page!'

if __name__ == "__main__":
    # TODO: add route initializations here, both for templates and backend
    app.run(debug=True, host='0.0.0.0')
