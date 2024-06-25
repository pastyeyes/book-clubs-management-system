set schema 'public';

-- book table
CREATE TABLE IF NOT EXISTS book (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255),
  -- genre should be a table with genre names and ids, but for simplicity we'll use a string
  genre VARCHAR(100)
);

-- persona table
CREATE TABLE IF NOT EXISTS persona (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL
);

-- book_club table
CREATE TABLE IF NOT EXISTS book_club (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT
);

-- junction table for book club and member relationship
CREATE TABLE IF NOT EXISTS book_club_member (
  book_club_id INT NOT NULL,
  persona_id INT NOT NULL,
  PRIMARY KEY (book_club_id, persona_id),
  FOREIGN KEY (book_club_id) REFERENCES book_club(id),
  FOREIGN KEY (persona_id) REFERENCES persona(id)
);

-- reading_list table
CREATE TABLE IF NOT EXISTS reading_list (
  id SERIAL PRIMARY KEY,
  persona_id INT NOT NULL,
  book_id INT NOT NULL,
  -- status should be a table with status names and ids, but for simplicity we'll use a string
  status VARCHAR(50) NOT NULL,
  FOREIGN KEY (persona_id) REFERENCES persona(id),
  FOREIGN KEY (book_id) REFERENCES book(id)
);

-- discussion_thread table
CREATE TABLE IF NOT EXISTS discussion_thread (
  id SERIAL PRIMARY KEY,
  book_club_id INT NOT NULL,
  book_id INT NOT NULL,
  title VARCHAR(255) NOT NULL, -- discussion thread title
  description TEXT NOT NULL,
  author_id INT NOT NULL, -- persona who created the thread
  FOREIGN KEY (book_club_id) REFERENCES book_club(id),
  FOREIGN KEY (book_id) REFERENCES book(id),
  FOREIGN KEY (author_id) REFERENCES persona(id)
);

-- discussion_post table
CREATE TABLE IF NOT EXISTS discussion_posts (
  id SERIAL PRIMARY KEY,
  discussion_thread_id INT NOT NULL,
  persona_id INT NOT NULL,
  content TEXT NOT NULL,
  FOREIGN KEY (discussion_thread_id) REFERENCES discussion_thread(id),
  FOREIGN KEY (persona_id) REFERENCES persona(id)
);
