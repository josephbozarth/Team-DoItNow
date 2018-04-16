DROP TABLE IF EXISTS User;
CREATE TABLE User (
  user_id INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT,
  email text NOT NULL,
  password_hash text NOT NULL,
  role text NOT NULL,
  CONSTRAINT user_email_unique UNIQUE (email)
);

DROP TABLE IF EXISTS Feature_Request;
CREATE TABLE Feature_Request (
  feature_id INTEGER   NOT NULL PRIMARY KEY AUTOINCREMENT , 
  user_id INTEGER NOT NULL, 
  name text NOT NULL, 
  description text NOT NULL, 
  FOREIGN KEY (user_id) REFERENCES User(user_id)
);

DROP TABLE IF EXISTS Sprint;
CREATE TABLE Sprint (
  sprint_id INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT , 
  name text NOT NULL
);

DROP TABLE IF EXISTS Story_Status;
CREATE TABLE Story_Status (
  story_status_id TEXT NOT NULL PRIMARY KEY,
  next_story_status_id TEXT,
  name TEXT NOT NULL,
  FOREIGN KEY (next_story_status_id) REFERENCES Story_Status(story_status_id)
);

insert into Story_Status (story_status_id, name, next_story_status_id) values ('A', 'Accepted', null);
insert into Story_Status (story_status_id, name, next_story_status_id) values ('C', 'Completed', 'A');
insert into Story_Status (story_status_id, name, next_story_status_id) values ('I', 'In Work', 'I');
insert into Story_Status (story_status_id, name, next_story_status_id) values ('P', 'Pending', 'I');

DROP TABLE IF EXISTS Story;
CREATE TABLE Story (
  story_id INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT , 
  feature_id INTEGER, 
  user_id INTEGER NOT NULL, 
  sprint_id INTEGER, 
  story_status_id TEXT DEFAULT 'P',
  name text NOT NULL, 
  description text, 
  FOREIGN KEY (feature_id) REFERENCES Feature_Request(feature_id), 
  FOREIGN KEY (user_id) REFERENCES User(user_id), 
  FOREIGN KEY (sprint_id) REFERENCES Sprint(sprint_id),
  FOREIGN KEY (story_status_id) REFERENCES Story_Status(story_status_id)
);
