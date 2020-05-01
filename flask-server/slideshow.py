from flask import Blueprint, send_file

slideshow = Blueprint('slideshow', __name__)

# Return initial image, TODO - add cookie initialization
@slideshow.route('/api/first-image')
def get_image():
    return send_file('./slideshow/DSC09558.jpg', mimetype='image/gif')


# Return next photo not yet viewed
@slideshow.route("/api/next")
def get_next():
    return send_file('./slideshow/DSC09653.jpg', mimetype='image/gif')

