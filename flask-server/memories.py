from os.path import isfile, join
from os import listdir
from flask import Blueprint, send_file, Response
import sys
from flask.helpers import make_response, request
import random
from PIL import Image
from flask.json import jsonify

memories = Blueprint('memories', __name__)

MEMORIES_DIR = './memories/'


# Exclude .gitignore
image_list = [f for f in listdir(
    MEMORIES_DIR) if not f == '.gitignore']

@memories.route('/api/memories/list')
def list_memories():
    return jsonify(image_list)
