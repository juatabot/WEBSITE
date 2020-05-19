from flask import Blueprint, send_file, Response
import sys
from PIL import Image


utils = Blueprint('utils', __name__)

#int(request.cookies.get('image_width'))
# def resize_image(image, width):
#     img = Image.open(image)
#     copy = img.copy()
#     copy.thumbnail((width, width))
#     copy.save(RESIZED_DIR + image, format="jpeg")
#     return RESIZED_DIR + image


@utils.route('/api/get-image/<path>')
def get_image(path):
    path = path.replace(",", "/")
    return send_file(path, mimetype='image/gif')
