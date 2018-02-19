DROP TABLE IF EXISTS entries;
CREATE TABLE entries (
  id integer PRIMARY KEY AUTOINCREMENT,
  title text NOT NULL,
  'text' text NOT NULL
);

DROP TABLE IF EXISTS User;
CREATE TABLE User (
  user_id INTEGER PRIMARY KEY NOT NULL,
  email text NOT NULL, 
  password_hash text NOT NULL, 
  role text NOT NULL
);

DROP TABLE IF EXISTS Feature_Request;
CREATE TABLE Feature_Request (
  feature_id INTEGER PRIMARY KEY NOT NULL, 
  user_id INTEGER NOT NULL, 
  name text NOT NULL, 
  description text NOT NULL, 
  FOREIGN KEY (user_id) REFERENCES User(user_id)
);

DROP TABLE IF EXISTS Sprint;
CREATE TABLE Sprint (
  sprint_id INTEGER PRIMARY KEY NOT NULL, 
  name text NOT NULL
);

DROP TABLE IF EXISTS Story;
CREATE TABLE Story (
  story_id INTEGER PRIMARY KEY NOT NULL, 
  feature_id INTEGER NOT NULL, 
  user_id INTEGER NOT NULL, 
  sprint_id INTEGER NOT NULL, 
  name text NOT NULL, 
  description text NOT NULL, 
  FOREIGN KEY (feature_id) REFERENCES Feature_Request(feature_id), 
  FOREIGN KEY (user_id) REFERENCES User(user_id), 
  FOREIGN KEY (sprint_id) REFERENCES Sprint(sprint_id)
);

