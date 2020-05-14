from os.path import isfile, join
from os import listdir
from flask import Blueprint, send_file, Response
import sys
from flask.helpers import make_response, request
import random
from PIL import Image
from flask.json import jsonify

albums = Blueprint('albums', __name__)

ALBUMS_DIR = 'albums/'
COVER_FILE = '/cover.jpg'


# Exclude .gitignore
album_list = [f for f in listdir(
    ALBUMS_DIR) if not f == '.gitignore']


@albums.route('/api/albums/list')
def list_albums():
    for album in album_list:
        pass
    return jsonify(album_list)


@albums.route('/api/albums/cover/<album>')
def get_cover(album):
    return send_file(ALBUMS_DIR + album + COVER_FILE, mimetype='image/gif')
