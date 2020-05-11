from os.path import isfile, join
from os import listdir
from flask import Blueprint, send_file, Response
import sys
from flask.helpers import make_response, request
import random
from PIL import Image
from flask.json import jsonify

slideshow = Blueprint('slideshow', __name__)

SLIDESHOW_DIR = './slideshow-images/'
RESIZED_DIR = './slideshow-images/resized/'


# Exclude .gitignore
image_list = [f for f in listdir(
    SLIDESHOW_DIR) if isfile(join(SLIDESHOW_DIR, f)) and not f == '.gitignore']


USER_RESOLUTION = None

UUIDS = {}

# Initialize user and their randomized slideshow image viewing order
@slideshow.route('/api/login', methods=['GET', 'POST'])
def login():
    ret = request.get_json(force=True)
    uuid = ret['uuid']
    image_width = ret['resolution']["width"]
    print(image_width, file=sys.stderr)

    # delete this after threaded resizing
    global USER_RESOLUTION
    USER_RESOLUTION = image_width

    random_list = ""
    for i in random.sample(image_list, len(image_list)):
        random_list += str(i) + "/"

    print(random_list, file=sys.stderr)

    cookie = {
        "uuid": uuid,
        "image_width": image_width,
        "image_list": random_list,
        "index": 0,
    }

    # don't need this, just read cookie from browser on client side
    UUIDS[uuid] = cookie

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
    print(file, file=sys.stderr)
    return send_file(resize_image(file, USER_RESOLUTION), mimetype='image/gif')


@slideshow.route('/api/setup-cookie')
def setup_cookie():
    if (request.cookies.get('pid')):
        pid = int(request.cookies.get('pid'))
        next_pid = pid + 1
        resp = make_response("/api/setup-cookie increment")
        resp.set_cookie('pid', str(next_pid % (len(image_list))))
        return resp
    else:
        resp = make_response("/api/setup-cookie create")
        resp.set_cookie('pid', str(random.randint(0, len(image_list))))
        return resp



# TODO - USER_RESOLUTION isn't defined on the first call to this endpoint
@slideshow.route('/api/slideshow/first-image')
def get_first_image():
    return send_file(resize_image(random.choice(image_list), USER_RESOLUTION), mimetype='image/gif')

# TODO - Return next photo not yet viewed
@slideshow.route("/api/slideshow/next")
def get_next():
    return send_file(resize_image(random.choice(image_list), USER_RESOLUTION), mimetype='image/gif')
