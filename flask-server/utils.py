from flask import Blueprint, send_file, Response, request
import sys
from PIL import Image

utils = Blueprint('utils', __name__)


def resize_image(image_path, width):
    img = Image.open(image_path)
    copy = img.copy()
    copy.thumbnail((width, width))
    resized_path = image_path.split('.')[0] + '-resized.jpg'
    copy.save(resized_path, format="jpeg")
    return resized_path


@utils.route('/api/get-resized-image/<path>', methods=['GET', 'POST'])
def get_resized_image(path):
    ret = request.get_json(force=True)
    image_width = ret['width']
    path = path.replace(",", "/")
    return send_file(resize_image(path, image_width), mimetype='image/gif')


@utils.route('/api/get-image/<path>')
def get_image(path):
    path = path.replace(",", "/")
    return send_file(path, mimetype='image/gif')
