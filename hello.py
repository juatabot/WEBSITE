from flask import Flask
from routes import index
app = Flask(__name__)

import routes

app.register_blueprint(index)

