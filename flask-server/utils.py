from flask import Blueprint, send_file, Response, request
import sys
from multiprocessing import Manager, Queue, Process, Semaphore, BoundedSemaphore, cpu_count, Value
import datetime
from PIL import Image
import time
import pdb

utils = Blueprint('utils', __name__)


def resize_image(image_path, width):
    img = Image.open(image_path)
    copy = img.copy()
    copy.thumbnail((width, width))
    split = image_path.rsplit('/', 1)
    resized_path = split[0] + '/resized/' + split[1]
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
