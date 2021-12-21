create table if not exists exam_bills(
  id INT AUTO_INCREMENT PRIMARY KEY,
  group_id INT NOT NULL,
  amount  DECIMAL(5, 2) NOT NULL,
  description TEXT NOT NULL,
  FOREIGN KEY (group_id) REFERENCES exam_groups (id)
);

-- bills (id, group_id, amount, description);

