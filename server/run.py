#!/usr/bin/python2

from flask import Flask,send_from_directory,json,jsonify,request,abort,redirect
import os
import sqlite3
import bcrypt, md5
import random
import simplejson as json


SECRET_KEY = 0x14FD61F7510F

user_table = []

class User():
	id = -1
	email = ""
	role = ""
	token = ""
	loggedIn = False
	
	def __init__(self, user_id):
		global sqlCon
		cursor = sqlCon.cursor()
		cursor.execute("SELECT user_id, email, role FROM User WHERE user_id=?", (user_id,))
		u = cursor.fetchone()
		self.id = u[0]
		self.email = u[1]
		self.role = u[2]
		self.makeToken(random.randint(1,0xFFFFFFFF))
	
	def makeToken(self,nonce):
		m = md5.new()
		m.update(str(nonce))
		m.update(self.email)
		self.token = m.digest().encode('hex')

	def serialize(self):
		ob = {}
		ob["id"] = self.id
		ob["email"] = self.email
		ob["role"] = self.role
		ob["token"] = self.token
		return jsonify(ob)

def doLogin(user):
	user.loggedIn = True
	if user not in user_table:
		user_table.append(user)

def isLoggedIn(token):
	for u in user_table:
		if u.token == token:
			return u
	return None

def doLogout(user):
	user.loggedIn = False
	user_table.remove(user)

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
		return None

app = Flask(__name__,static_folder='../client')
app.config['SECRET_KEY'] = "Super secrey key"
sqlCon = sqlite3.connect('../agility.db')
sqlCursor = sqlCon.cursor()

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
	print user
	if user is None:
		return abort(401)
	doLogin(user)
	return user.serialize()
	# userData = {}
	# userData['email'] = user.email	
	# userData['role'] = user.role
	# userData['name'] = 'user'
	# return jsonify(token=user.token,user=userData)
		
@app.route('/app/logout')
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