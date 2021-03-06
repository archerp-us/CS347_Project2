DROP TABLE IF EXISTS history;
CREATE TABLE history (
 id SERIAL PRIMARY KEY,
 year INT,
 month INT,
 day INT,
 message TEXT,
 user TEXT,
 chatroom TEXT,
 is_deleted INT DEFAULT 0,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);