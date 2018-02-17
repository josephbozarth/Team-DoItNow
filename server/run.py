#!/usr/bin/python2

from flask import Flask,send_from_directory,json,jsonify,request
import os
import sqlite3

app = Flask(__name__)

@app.route('/<path:path>')
def get_file(path):
	return send_from_directory("./",path)

@app.route('/')
def get_login():
	return send_from_directory("./","login.html")

@app.route('/app')
def get_app_home():
	return send_from_directory("./","app.html")

@app.route('/app/<path:path>')
def get_app(path):
	return send_from_directory("./","app.html")


@app.route('/api/test')
def api_test():
	test = request.args.get('testdata')
	if test is not None:
		return jsonify(hello="World",abc=123,floats=0.0001,requestdata=test)
	return "<h1>Send an argument named testdata</h1>"
