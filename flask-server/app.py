import os
from flask import Flask, send_from_directory, render_template, jsonify, send_file, Blueprint

from slideshow import slideshow
from albums import albums
from utils import utils

app = Flask(__name__, static_folder="../react-app/build/static",
            template_folder="../react-app/build")

app.register_blueprint(slideshow)
app.register_blueprint(albums)
app.register_blueprint(utils)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    return render_template('index.html')

# Add no-cache headers so static files at API endpoints are not cached (and not updated on click)
@app.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    return r
