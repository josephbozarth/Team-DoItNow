#!/usr/bin/python2

from flask import Flask,send_from_directory,json,jsonify,request,abort,redirect
import os
import sqlite3
import bcrypt, md5
import random
import simplejson as json

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
	sqlCursor.execute("UPDATE Feature_Request SET user_id=?,name=?,description=? WHERE feature_id=?",(data.user_id,data.name,data.description,data.feature_id))
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

@app.route('/api/logout')
def logout():
	logout_user()
	return redirect('/')

##USER APIs
@app.route('/api/user/create')
def create_user():
	print "Create(",request.json,")"
	data = request.json
	password_hash = bcrypt.hashpw(data.password, bcrypt.gensalt())
	new_user = sqlCursor.execute("INSERT INTO User (email, password_hash, role) VALUES (?,?,?)", (data.email, password_hash, data.role))
	#Checks the return, if it was anything but 0, there was an error
	if new_user != 0:
		return "Something went wrong"
	f = cursor.fetchone()
	o = {}
	o["email"] = f[0]
	o["password"] = f[1]
	o["role"] = f[2]
	return jsonify(o)

@app.route('/api/user/read')
def read_user():
	print "ReadUser(",request.json,")"
	data = request.json
	new_user = sqlCursor.execute("SELECT * FROM User WHERE email = ?", (data.email,))
	#Checks the return, if it was anything but 0, there was an error
	if new_user != 0:
		return "Something went wrong"
	f = cursor.fetchone()
	o = {}
	o["email"] = f[0]
	o["password"] = f[1]
	o["role"] = f[2]
	return jsonify(o)

@app.route('/api/user/update')
def update_user():
	print "Update(",request.json,")"
	data = request.json
	#Unclear as to what info should be changed with update, but for now the changes are only applying to password and role
	password_hash = bcrypt.hashpw(data.password, bcrypt.gensalt())
	sqlCursor.execute("UPDATE USER SET password_hash=?, role=?,WHERE email=?",(password_hash,data.role,data.email))
	sqlCursor.execute("SELECT * FROM User WHERE email=?", (data.email,))
	f = cursor.fetchone()
	o = {}
	o["email"] = f[0]
	o["password"] = f[1]
	o["role"] = f[2]
	return jsonify(o)

@app.route('/api/user/delete')
def delete_user():
	print "DeleteUser(",request.json,")"
	data = request.json
	new_user = sqlCursor.execute("DELETE FROM User WHERE email = ?", (data.email,))
	#Checks the return, if it was anything but 0, there was an error
	if new_user != 0:
		return "Something went wrong"
	f = cursor.fetchone()
	o = {}
	o["email"] = f[0]
	o["password"] = f[1]
	o["role"] = f[2]
	return jsonify(o)

##SPRINT APIs
@app.route('/api/sprint/create')
def create_sprint():
	print "CreateSprint(",request.json,")"
	data = request.json
	new_user = sqlCursor.execute("INSERT INTO Sprint (name) VALUES (?)", (data.name,))
	#Checks the return, if it was anything but 0, there was an error
	if new_user != 0:
		return "Something went wrong"
	f = cursor.fetchone()
	o = {}
	o["name"] = f[0]
	return jsonify(o)

@app.route('/api/sprint/read')
def read_sprint():
	print "ReadSprint(",request.json,")"
	data = request.json
	new_user = sqlCursor.execute("SELECT * FROM Sprint WHERE name = ?", (data.name,))
	#Checks the return, if it was anything but 0, there was an error
	if new_user != 0:
		return "Something went wrong"
	f = cursor.fetchone()
	o = {}
	o["name"] = f[0]
	return jsonify(o)

@app.route('/api/sprint/update')
def update_sprint():
	print "UpdateSprint(",request.json,")"
	data = request.json
	#unsure of the actual programming architecture, so think of this statement as pseudo-code for now
	sqlCursor.execute("UPDATE Sprint SET name=? WHERE name=?",(data.new_name,data.old_name))
	sqlCursor.execute("SELECT * FROM Sprint WHERE name=?", (data.new_name,))
	f = cursor.fetchone()
	o = {}
	o["name"] = f[0]
	return jsonify(o)

@app.route('/api/sprint/delete')
def delete_sprint():
	print "DeleteSprint(",request.json,")"
	data = request.json
	new_user = sqlCursor.execute("DELETE FROM Sprint WHERE name = ?", (data.name,))
	#Checks the return, if it was anything but 0, there was an error
	if new_user != 0:
		return "Something went wrong"
	f = cursor.fetchone()
	o = {}
	o["name"] = f[0]
	return jsonify(o)

##STORY APIs
@app.route('/api/story/create')
def create_story():
	print "CreateStory(",request.json,")"
	data = request.json
	new_user = sqlCursor.execute("INSERT INTO Story (feature_id, user_id, sprint_id, name, description) VALUES (?,?,?,?,?)", (data.featureid,data.userid,data.sprintid,data.name, data.description))
	#Checks the return, if it was anything but 0, there was an error
	if new_user != 0:
		return "Something went wrong"
	f = cursor.fetchone()
	o = {}
	o["name"] = f[0]
	o["user_id"] = f[1]
	o["sprint_id"] = f[2]
	o["name"] = f[3]
	o["description"] = f[4]
	return jsonify(o)

@app.route('/api/story/update')
def update_story():
	print "UpdateStory(",request.json,")"
	data = request.json
	sqlCursor.execute("UPDATE Story SET feature_id=?, user_id=?, sprint_id=?, name=?, description=? WHERE story_id=?",(data.featureid,data.userid,data.sprintid,data.name,data.description,data.storyid))
	sqlCursor.execute("SELECT * FROM Story WHERE story_id = ?",(data.storyid,))
	f = cursor.fetchone()
	o = {}
	o["name"] = f[0]
	o["user_id"] = f[1]
	o["sprint_id"] = f[2]
	o["name"] = f[3]
	o["description"] = f[4]
	return jsonify(o)

@app.route('/api/story/delete')
def delete_sprint():
	print "DeleteStory(",request.json,")"
	data = request.json
	new_user = sqlCursor.execute("DELETE FROM Story WHERE story_id = ?", (data.storyid,))
	#Checks the return, if it was anything but 0, there was an error
	if new_user != 0:
		return "Something went wrong"
	f = cursor.fetchone()
	o = {}
	o["name"] = f[0]
	o["user_id"] = f[1]
	o["sprint_id"] = f[2]
	o["name"] = f[3]
	o["description"] = f[4]
	return jsonify(o)

@app.route('/app')
def get_app_home():
	return send_from_directory("./","app.html")

@app.route('/app/<path:path>')
def get_app(path):
	return send_from_directory("./","app.html")