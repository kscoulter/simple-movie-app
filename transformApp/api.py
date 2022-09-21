import flask
from flask import jsonify
from flask_cors import CORS, cross_origin
import requests

app = flask.Flask(__name__)
app.config["DEBUG"] = True
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/movie/list/<string:page>', methods=['GET'])
@cross_origin()
def movie_list(page):
    r = requests.get('http://www.omdbapi.com/?apikey=6c687850&type=movie&page='+ page +'&s="the"&y=2022')

    return(r.text)

@app.route('/movie/detail/<string:movie_id>', methods=['GET'])
@cross_origin()
def movie_detail(movie_id):
    r = requests.get('http://www.omdbapi.com/?i='+ movie_id +'&apikey=6c687850')

    return(r.text)

app.run()