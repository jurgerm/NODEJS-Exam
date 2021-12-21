create table if not exists exam_users(
  id INTEGER AUTO_INCREMENT NOT NULL,
  full_name VARCHAR (50) NOT NULL,
  email VARCHAR (50) NOT NULL,
  password CHAR (60) NOT NULL,
  reg_timestamp INTEGER,
  PRIMARY KEY (id),
  UNIQUE (email)
);

--users (id, full_name, email, password, reg_timestamp);