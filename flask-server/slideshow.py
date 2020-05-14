from os.path import isfile, join
from os import listdir
from flask import Blueprint, send_file, Response
import sys
from flask.helpers import make_response, request
import random
from PIL import Image
from flask.json import jsonify

slideshow = Blueprint('slideshow', __name__)

SLIDESHOW_DIR = './media/slideshow-images/'
RESIZED_DIR = './media/slideshow-images/resized/'


# Exclude .gitignore
image_list = [f for f in listdir(
    SLIDESHOW_DIR) if isfile(join(SLIDESHOW_DIR, f)) and not f == '.gitignore']

# Initialize user and their randomized slideshow image viewing order
@slideshow.route('/api/login', methods=['GET', 'POST'])
def login():
    ret = request.get_json(force=True)
    uuid = ret['uuid']
    image_width = ret['resolution']["width"]

    random_list = ""
    for i in random.sample(image_list, len(image_list)):
        random_list += str(i) + "/"

    cookie = {
        "uuid": uuid,
        "image_width": image_width,
        "image_list": random_list,
        "index": 0,
    }

    resp = make_response(f"/api/login for uuid {uuid}")
    for key, val in cookie.items():
        resp.set_cookie(key, str(val))
    return resp


def resize_image(image, width):
    img = Image.open(SLIDESHOW_DIR + image)
    copy = img.copy()
    copy.thumbnail((width, width))
    copy.save(RESIZED_DIR + image, format="jpeg")
    return RESIZED_DIR + image


@slideshow.route('/api/images/<file>')
def get_image(file):
    image_width = int(request.cookies.get('image_width'))
    return send_file(resize_image(file, image_width), mimetype='image/gif')


@slideshow.route('/api/slideshow/first-image')
def get_first_image():
    image_width = int(request.cookies.get('image_width'))
    return send_file(resize_image(random.choice(image_list), image_width), mimetype='image/gif')