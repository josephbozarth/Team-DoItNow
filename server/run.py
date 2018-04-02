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


#FEATURE APIs
##CREATE
@app.route('/api/feature/create') #Input: user_id, name, description. Output: FeatureID
def create_feature():
	print "CreateFeature(",request.json,")"
	data = request.json
	sqlCursor.execute("INSERT INTO Feature_Request(user_id, name, description) VALUES(?,?,?)", (data.user_id, data.name, data.description))
	o = {}
	o["FeatureID"] = cursor.lastrowid
	return jsonify(o)
		
##READ
###ID
@app.route('/api/feature/read/featureid') #Input: Feature_ID. Output: Feature_ID, User_id, name, description 
def read_feature_by_id():
	print "ReadFeatureByID(",request.json,")"
	data = request.json
	sqlCursor.execute("SELECT * FROM Feature_Request WHERE feature_id = ?",(data.feature_id,))
	f = cursor.fetchone()
	o = {}
	o["Feature_id"] = f[0]
	o["User_id"] = f[1]
	o["Name"] = f[2]
	o["Description"] = f[3]
	return jsonify(o)

###USER
@app.route('/api/feature/read/userid') #Input: UserID. Output: [Feature_ID, User_id, name, description]
def read_feature_by_user():
	print "ReadFeatureByUser(",request.json,")"
	data = request.json
	sqlCursor.execute("SELECT * FROM Feature_Request WHERE user_id = ?",(data.user_id,))
	f = cursor.fetchall()
	outs = []
	for feature in f:
		o = {}
		o["Feature_id"] = f[0]
		o["User_id"] = f[1]
		o["Name"] = f[2]
		o["Description"] = f[3]
		outs.append(o)
	return jsonify(outs)

##UPDATE
@app.route('/api/feature/update') #This is effectively a replacement so all non-null columns need to be submitted. 
def update_feature():
	print "UpdateFeature(",request.json,")"
	data = request.json
	sqlCursor.execute("UPDATE Feature_Request SET user_id=?,SET name=?,SET description=?,WHERE feature_id=?",(data.user_id,data.name,data.description,data.feature_id))
	sqlCursor.execute("SELECT * FROM Feature_Request WHERE feature_id = ?",(data.feature_id,))
	f = cursor.fetchone()
	o = {}
	o["Feature_id"] = f[0]
	o["User_id"] = f[1]
	o["Name"] = f[2]
	o["Description"] = f[3]
	return jsonify(o)

##DELETE
@app.route('/api/feature/delete')
def delete_feature():
	print "UpdateFeature(",request.json,")"
	data = request.json
	sqlCursor.execute("DELETE FROM feature_request WHERE feature_id=?",(data.feature_id,))
	return "Done"


@app.route('/app/logout')
def logout():
	logout_user()
	return redirect('/')

@app.route('/app/user/create')
def create_user():
	print "Create(",request.json,")"
	for key, value in request.json.iteritems():
		print key, value
	data = request.json
	cursor = sqlCon.cursor()
	new_user = cursor.execute("INSERT into User (email, password_hash, role) values (?, ?, ?)", (data['email'], data['password'], data['role']))
	if new_user = None:
		print "User email is already taken"
		return abort(401)
	userData = {}
	userData['email'] = user.email	
	userData['role'] = user.role
	userData['name'] = 'user'
	return jsonify(token=user.token,user=userData)

@app.route('/app/user/update')
def create_user():
	print "Update(",request.json,")"
	for key, value in request.json.iteritems():
		print key, value
	data = request.json
	cursor = sqlCon.cursor()
	new_user = cursor.execute("UPDATE User set password_hash = ? where email = ?", (data['password'], data['email'])
	if new_user = None:
		print "User email was not found"
		return abort(401)
	userData = {}
	userData['email'] = user.email	
	userData['role'] = user.role
	userData['name'] = 'user'
	return jsonify(token=user.token,user=userData)


@app.route('/app')
def get_app_home():
	return send_from_directory("./","app.html")

@app.route('/app/<path:path>')
def get_app(path):
	return send_from_directory("./","app.html")