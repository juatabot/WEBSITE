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

@app.route("/service-worker.js")
def service_worker():
    return send_from_directory('../react-app/build', 'service-worker.js')

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