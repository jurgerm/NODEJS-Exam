create table if not exists exam_accounts(
  id INT AUTO_INCREMENT PRIMARY KEY,
  group_id INT NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (group_id) REFERENCES exam_groups (id),
  FOREIGN KEY (user_id) REFERENCES exam_users (id)
);

--accounts (id, group_id, user_id)