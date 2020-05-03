from os.path import isfile, join
from os import listdir
from flask import Blueprint, send_file, Response
import sys
from flask.helpers import make_response, request
import random

slideshow = Blueprint('slideshow', __name__)

SLIDESHOW_DIR = './slideshow-images'

image_list = [f for f in listdir(
    SLIDESHOW_DIR) if isfile(join(SLIDESHOW_DIR, f))]
print(image_list, file=sys.stderr)


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


@slideshow.route('/api/get-resolution', methods=['GET', 'POST'])
def get_resolution():
    ret = request.get_json(force=True)
    print(ret, file=sys.stderr)
    resp = make_response("/api/get-resolution")
    return resp

# Return initial image, TODO - add cookie initialization
@slideshow.route('/api/slideshow/first-image')
def get_image():
    return send_file(f'./slideshow-images/{random.choice(image_list)}', mimetype='image/gif')

# Return next photo not yet viewed
@slideshow.route("/api/slideshow/next")
def get_next():
    return send_file(f'./slideshow-images/{random.choice(image_list)}', mimetype='image/gif')
