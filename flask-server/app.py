import os
from flask import Flask, send_from_directory, render_template, jsonify, send_file, Blueprint

from slideshow import slideshow

app = Flask(__name__, static_folder="../react-app/build/static",
            template_folder="../react-app/build")

app.register_blueprint(slideshow)

# Serve React App
@app.route('/')
def serve():
    # send_from_directory(app.static_folder, 'index.html')
    return render_template('index.html')


@app.route("/manifest.json")
def manifest():
    return send_from_directory('../react-app/build', 'manifest.json')

