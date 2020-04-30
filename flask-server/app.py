# from flask import Flask
# app = Flask(__name__)

# from index import index

# app.register_blueprint(index)

import os
from flask import Flask, send_from_directory, render_template, jsonify, send_file

app = Flask(__name__, static_folder="../react-app/build/static", template_folder="../react-app/build")

# Serve React App
@app.route('/')
def serve():
    # send_from_directory(app.static_folder, 'index.html')
    return render_template('index.html')

@app.route("/manifest.json")
def manifest():
    return send_from_directory('../react-app/build', 'manifest.json')

@app.route('/DSC00533.jpg')
def get_image():
    return send_file('./slideshow/DSC00533.jpg', mimetype='image/gif')


@app.route("/api/next")
def get_next():
    return send_file('./slideshow/DSC09653.jpg', mimetype='image/gif')


