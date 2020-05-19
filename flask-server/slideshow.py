from os.path import isfile, join
from os import listdir
from flask import Blueprint, send_file, Response
import sys
from flask.helpers import make_response, request
import random
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