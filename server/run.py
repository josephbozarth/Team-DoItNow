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

@app.route('/api/user/session', methods=['DELETE'])
def logout():
	#doLogout() # NOTE: This needs an instance of User to work. There is a serialize() but no deserialize() so not sure how to get this object back after the last request dies.
	return redirect('/')

#FEATURE APIs
##CREATE
@app.route('/api/feature', methods=['POST']) #Input: userId, name, description. Output: id
def create_feature():
	print "CreateFeature(",request.json,")"
	data = request.json
	sqlCursor.execute("INSERT INTO Feature_Request(user_id, name, description) VALUES(?,?,?)", (data['userId'], data['name'], data['description']))
	data['id'] = sqlCursor.lastrowid
	return jsonify(data)

##READ
@app.route('/api/feature') #Output: [id, userId, name, description]
def read_features():
	print "ReadFeatures(",request.json,")"
	sqlCursor.execute("""
 	 SELECT 
	   fr.feature_id,
	   fr.user_id,
	   u.email as user_email,
	   fr.name,
	   fr.description,
	   count(DISTINCT s.story_id) as storyCount,
	   sum(CASE WHEN s.story_status_id = 'A' THEN 1 ELSE 0 END) as acceptedStories,
	   sum(CASE WHEN s.story_status_id = 'C' THEN 1 ELSE 0 END) as completedStories,
	   sum(CASE WHEN s.story_status_id = 'I' THEN 1 ELSE 0 END) as inWorkStories,
	   sum(CASE WHEN s.story_status_id = 'P' THEN 1 ELSE 0 END) as pendingStories
	 FROM Feature_Request fr
	    inner join User u on fr.user_id = u.user_id
		left outer join Story s on fr.feature_id = s.feature_id
		group by fr.feature_id, fr.user_id, fr.name, fr.description
	 """)
	f = sqlCursor.fetchall()
	outs = []
	for feature in f:
		o = {}
		o["id"] = feature[0]
		o["userId"] = feature[1]
		o["userEmail"] = feature[2]
		o["name"] = feature[3]
		o["description"] = feature[4]
		o["storyCount"] = feature[5]
		o["acceptedStories"] = feature[6]
		o["completedStories"] = feature[7]
		o["inWorkStories"] = feature[8]
		o["pendingStories"] = feature[9]
		outs.append(o)
	return jsonify(outs)
		
##READ
###ID
@app.route('/api/feature/<id>') #Input: Feature_ID. Output: Feature_ID, User_id, name, description 
def read_feature_by_id(id):
	print "ReadFeatureByID(",id,")"
	sqlCursor.execute("SELECT * FROM Feature_Request WHERE feature_id = ?",(id))
	f = sqlCursor.fetchone()
	o = {}
	o["Feature_id"] = f[0]
	o["User_id"] = f[1]
	o["Name"] = f[2]
	o["Description"] = f[3]
	return jsonify(o)

###USER
@app.route('/api/user/<userId>/feature') #Input: UserID. Output: [Feature_ID, User_id, name, description]
def read_feature_by_user(userId):
	print "ReadFeatureByUser(",userId,")"
	sqlCursor.execute("SELECT * FROM Feature_Request WHERE user_id = ?",(userId))
	f = sqlCursor.fetchall()
	outs = []
	for feature in f:
		o = {}
		o["id"] = feature[0]
		o["userId"] = feature[1]
		o["name"] = feature[2]
		o["description"] = feature[3]
		outs.append(o)
	return json.dumps(outs)

##UPDATE
@app.route('/api/feature', methods=['PUT']) #This is effectively a replacement so all non-null columns need to be submitted. 
def update_feature():
	print "UpdateFeature(",request.json,")"
	data = request.json
	sqlCursor.execute("UPDATE Feature_Request SET user_id=?,name=?,description=? WHERE feature_id=?",(data['userId'], data['name'], data['description'], data['id']))
	return jsonify(data)

##DELETE
@app.route('/api/feature/<id>', methods=['DELETE'])
def delete_feature(id):
	print "DeleteFeature(",id,")"
	sqlCursor.execute("DELETE FROM feature_request WHERE feature_id=?",(id,))
	return jsonify({})

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
	f = sqlCursor.fetchone()
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
	f = sqlCursor.fetchone()
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
	f = sqlCursor.fetchone()
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
	f = sqlCursor.fetchone()
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
	f = sqlCursor.fetchone()
	o = {}
	o["name"] = f[0]
	return jsonify(o)

##READ
@app.route('/api/sprint') #Output: [id, userId, name, description]
def read_sprints():
	print "ReadSprints(",request.json,")"
	sqlCursor.execute("""
 	 SELECT 
	   sp.sprint_id,
	   sp.name,
	   count(DISTINCT s.story_id) as storyCount,
	   sum(CASE WHEN s.story_status_id = 'A' THEN 1 ELSE 0 END) as acceptedStories,
	   sum(CASE WHEN s.story_status_id = 'C' THEN 1 ELSE 0 END) as completedStories,
	   sum(CASE WHEN s.story_status_id = 'I' THEN 1 ELSE 0 END) as inWorkStories,
	   sum(CASE WHEN s.story_status_id = 'P' THEN 1 ELSE 0 END) as pendingStories
	 FROM Sprint sp
		left outer join Story s on sp.sprint_id = s.sprint_id
	    group by sp.sprint_id, sp.name
	""")
	f = sqlCursor.fetchall()
	outs = []
	for feature in f:
		o = {}
		o["id"] = feature[0]
		o["name"] = feature[1]
		o["storyCount"] = feature[2]
		o["acceptedStories"] = feature[3]
		o["completedStories"] = feature[4]
		o["inWorkStories"] = feature[5]
		o["pendingStories"] = feature[6]
		outs.append(o)
	return jsonify(outs)
		
@app.route('/api/sprint/update')
def update_sprint():
	print "UpdateSprint(",request.json,")"
	data = request.json
	#unsure of the actual programming architecture, so think of this statement as pseudo-code for now
	sqlCursor.execute("UPDATE Sprint SET name=? WHERE name=?",(data.new_name,data.old_name))
	sqlCursor.execute("SELECT * FROM Sprint WHERE name=?", (data.new_name,))
	f = sqlCursor.fetchone()
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
	f = sqlCursor.fetchone()
	o = {}
	o["name"] = f[0]
	return jsonify(o)

##STORY APIs
@app.route('/api/story', methods=['POST'])
def create_story():
	print "CreateStory(",request.json,")"
	data = request.json
	sqlCursor.execute("INSERT INTO Story (feature_id, user_id, sprint_id, name, description, story_status_id) VALUES (?,?,?,?,?,?)", (data['featureId'],data['userId'],data['sprintId'],data['name'],data['description'],data['storyStatusId']))
	data['id'] = sqlCursor.lastrowid
	return jsonify(data)

##READ
@app.route('/api/story') #Output: [id, userId, name, description]
def read_stories():
	print "ReadStories(",request.json,")"
	sqlCursor.execute("""
 	 SELECT 
	   s.story_id,
	   s.feature_id,
	   s.user_id,
	   u.email as user_email,
	   s.sprint_id,
	   s.name,
	   s.description,
	   s.story_status_id
	 FROM Story s
	    inner join User u on s.user_id = u.user_id
	 """)
	f = sqlCursor.fetchall()
	outs = []
	for feature in f:
		o = {}
		o["id"] = feature[0]
		o["featureId"] = feature[1]
		o["userId"] = feature[2]
		o["userEmail"] = feature[3]
		o["sprintId"] = feature[4]
		o["name"] = feature[5]
		o["description"] = feature[6]
		o["storyStatusId"] = feature[7]
		outs.append(o)
	return jsonify(outs)

@app.route('/api/story', methods=['PUT'])
def update_story():
	print "UpdateStory(",request.json,")"
	data = request.json
	sqlCursor.execute("UPDATE Story SET feature_id=?, user_id=?, sprint_id=?, name=?, description=? WHERE story_id=?",(data.featureid,data.userId,data.sprintid,data.name,data.description,data.storyid))
	sqlCursor.execute("SELECT * FROM Story WHERE story_id = ?",(data.storyid,))
	f = sqlCursor.fetchone()
	o = {}
	o["name"] = f[0]
	o["user_id"] = f[1]
	o["sprint_id"] = f[2]
	o["name"] = f[3]
	o["description"] = f[4]
	return jsonify(o)

@app.route('/api/story/delete')
def delete_story():
	print "DeleteStory(",request.json,")"
	data = request.json
	new_user = sqlCursor.execute("DELETE FROM Story WHERE story_id = ?", (data.storyid,))
	#Checks the return, if it was anything but 0, there was an error
	if new_user != 0:
		return "Something went wrong"
	f = sqlCursor.fetchone()
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
