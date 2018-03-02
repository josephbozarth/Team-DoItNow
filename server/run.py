#!/usr/bin/python2

from flask import Flask,send_from_directory,json,jsonify,request,abort,redirect
import os
import sqlite3
import bcrypt
from flask_login import LoginManager,UserMixin, logout_user, login_user, login_required
import random
import simplejson as json


class User(UserMixin):
	id = -1
	email = ""
	role = ""
	token = ""
	
	def __init__(self, user_id):
		global sqlCon
		cursor = sqlCon.cursor()
		cursor.execute("SELECT user_id, email, role FROM User WHERE user_id=?", (user_id,))
		u = cursor.fetchone()
		self.id = u[0]
		self.email = u[1]
		self.role = u[2]

def checkPass(email,passwd):
	global sqlCon
	print "CheckPass(",email,', ',passwd,")"
	cursor = sqlCon.cursor()
	cursor.execute("SELECT user_id, password_hash FROM User WHERE email=?", (email,))
	u = cursor.fetchone()
	if u is None:
		return -1
	if bcrypt.checkpw(passwd.encode('UTF-8'),u[1].encode('UTF-8')):
		print "User found: ",u
		return User(u[0])
	else:
		return -1


loginMan = LoginManager()
app = Flask(__name__,static_folder='../client')
app.config['SECRET_KEY'] = "Super secrey key"
loginMan.init_app(app)
sqlCon = sqlite3.connect('../agility.db')
sqlCursor = sqlCon.cursor()


@loginMan.user_loader
def load_user(user_id):
	return User(user_id)

@app.route('/<path:path>')
def get_file(path):
	return send_from_directory("./",path)

@app.route('/')
def get_login():
	return send_from_directory("./","login.html")

@app.route('/api/user/session', methods=['POST'])
def login():
	print "Login(",request.json,")"
	for key, value in request.json.iteritems():
		print key, value
	data = request.json
	user = checkPass(data['email'],data['password'])
	if user == -1:
		return abort(401)
	login_user(user)
	return jsonify(token=user.id)
		
@app.route('/app/logout')
@login_required
def logout():
	logout_user()
	return redirect('/')



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