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
  name TEXT NOT NULL,
  order_index INTEGER NOT NULL
);

insert into Story_Status (story_status_id, name, order_index) values ('P', 'Pending', 1);
insert into Story_Status (story_status_id, name, order_index) values ('I', 'In Work', 2);
insert into Story_Status (story_status_id, name, order_index) values ('C', 'Completed', 3);
insert into Story_Status (story_status_id, name, order_index) values ('A', 'Accepted', 4);

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
