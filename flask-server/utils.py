from flask import Blueprint, send_file, Response
import sys

utils = Blueprint('utils', __name__)


@utils.route('/api/get-image/<path>')
def get_image(path):
    path = path.replace(",", "/")
    return send_file(path, mimetype='image/gif')
