CREATE DATABASE memory_lane_db;
USE memory_lane_db;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    date_of_birth DATE,
    gender VARCHAR(6) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(100) NOT NULL,
    profile_picture LONGBLOB
);

select * from timelines;

CREATE TABLE timelines (
    timeline_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(20) NOT NULL,
    is_private BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_edit_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	text_font VARCHAR(50) DEFAULT 'Arial',
    bg_color VARCHAR(20),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE memories (
    memory_id INT AUTO_INCREMENT PRIMARY KEY,
    timeline_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_edit_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    memory_description VARCHAR(255),
    FOREIGN KEY (timeline_id) REFERENCES timelines(timeline_id)
);

CREATE TABLE memories_pictures (
	picture_id INT AUTO_INCREMENT PRIMARY KEY,
    memory_id INT,
    picture LONGBLOB,
    FOREIGN KEY (memory_id) REFERENCES memories (memory_id)
);

CREATE TABLE timeline_visits (
    visit_id INT AUTO_INCREMENT PRIMARY KEY,
    timeline_id INT,
    visitor_id INT,
    FOREIGN KEY (timeline_id) REFERENCES timelines(timeline_id),
    FOREIGN KEY (visitor_id) REFERENCES users(user_id)
);
