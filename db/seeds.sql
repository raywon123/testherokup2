-- insert these lines first to avoid foreign key violation
INSERT INTO roles (role) VALUES ("manager");
INSERT INTO roles (role) VALUES ("employee");
------
INSERT INTO users (username, first_name, last_name, picture, email, phone, permission_id) 
VALUES ("michael", "Michael", "Scott", "michael.png", "michael@dm.com", "570-123-0001", "1");
INSERT INTO users (username, first_name, last_name, picture, email, phone, permission_id) 
VALUES ("jim", "Jim", "Halpert", "jim.png", "jim@dm.com", "570-123-0002", "2");
INSERT INTO users (username, first_name, last_name, picture, email, phone, permission_id) 
VALUES ("dwight", "Dwight", "Schrute", "dwight.png", "dwight@dm.com", "570-123-0003", "2");
INSERT INTO users (username, first_name, last_name, picture, email, phone, permission_id) 
VALUES ("pam", "Pam", "Beasley", "pam.png", "pam@dm.com", "570-123-0004", "2");
INSERT INTO users (username, first_name, last_name, picture, email, phone, permission_id) 
VALUES ("standley", "Stanley", "Hudson", "standley.png", "standley@dm.com", "570-123-0005", "2");
INSERT INTO users (username, first_name, last_name, picture, email, phone, permission_id) 
VALUES ("phyllis", "Phyllis", "Lapin", "phyllis.png", "phylllis@dm.com", "570-123-0006", "2");
INSERT INTO users (username, first_name, last_name, picture, email, phone, permission_id) 
VALUES ("angela", "Angela", "Martin", "angela.png", "angela@dm.com", "570-123-0007", "2");
INSERT INTO users (username, first_name, last_name, picture, email, phone, permission_id) 
VALUES ("oscar", "Oscar", "Gutierrez", "oscar.png", "oscar@dm.com", "570-123-0008", "2");
INSERT INTO users (username, first_name, last_name, picture, email, phone, permission_id) 
VALUES ("kevin", "Kevin", "Malone", "kevin.png", "kevin@dm.com", "570-123-0009", "2");
INSERT INTO users (username, first_name, last_name, picture, email, phone, permission_id) 
VALUES ("creed", "Creed", "Bratton", "creed.png", "creed@dm.com", "570-123-0010", "2");
---------------
INSERT INTO quizzes (question, answer) 
VALUES ("If work hours end at 5:00 pm, how many hours after work should you stay to convince the people you are a real employee?", "2");
INSERT INTO quizzes (question, answer) 
VALUES ("How many times can you ask your coworkers to help you before they start to deliberately sabotage your efforts?", "3");
INSERT INTO quizzes (question, answer) 
VALUES ("Which co-worker will take any personal details you share and inform everyone about them?", "Sam");
INSERT INTO quizzes (question, answer) 
VALUES ("When your boss complains about your coworkers what is the correct response?", "Throw them under the bus");
INSERT INTO quizzes (question, answer) 
VALUES ("When deciding what to wear to work, which color does your supervisor detest above all others?", "Light Blue");
INSERT INTO quizzes (question, answer) 
VALUES ("What color is the carpet in Meeting Room D?", "There is no meeting room D");
-----
----- Michael
INSERT INTO results (user_id, quiz_id, user_answer, score)
VALUES (1, 1, "100", 0);
INSERT INTO results (user_id, quiz_id, user_answer, score)
VALUES (1, 2, "3", 1);
INSERT INTO results (user_id, quiz_id, user_answer, score)
VALUES (1, 3, "don't know", 0);
INSERT INTO results (user_id, quiz_id, user_answer, score)
VALUES (1, 4, "don't know", 0);
INSERT INTO results (user_id, quiz_id, user_answer, score)
VALUES (1, 5, "There is no room D", 1);
----- Jim
INSERT INTO results (user_id, quiz_id, user_answer, score)
VALUES (2, 1, "2", 1);
INSERT INTO results (user_id, quiz_id, user_answer, score)
VALUES (2, 2, "3", 1);
INSERT INTO results (user_id, quiz_id, user_answer, score)
VALUES (2, 3, "don't know", 0);
INSERT INTO results (user_id, quiz_id, user_answer, score)
VALUES (2, 4, "Throw them under the bus", 1);
INSERT INTO results (user_id, quiz_id, user_answer, score)
VALUES (2, 5, "There is no room D", 1);
----- Dwight
INSERT INTO results (user_id, quiz_id, user_answer, score)
VALUES (3, 1, "2", 1);
INSERT INTO results (user_id, quiz_id, user_answer, score)
VALUES (3, 2, "3", 1);
INSERT INTO results (user_id, quiz_id, user_answer, score)
VALUES (3, 3, "Sam", 1);
INSERT INTO results (user_id, quiz_id, user_answer, score)
VALUES (3, 4, "Throw them under the bus", 1);
INSERT INTO results (user_id, quiz_id, user_answer, score)
VALUES (3, 5, "There is no room D", 1);
----- Pam
INSERT INTO results (user_id, quiz_id, user_answer, score)
VALUES (4, 1, "2", 1);
INSERT INTO results (user_id, quiz_id, user_answer, score)
VALUES (4, 2, "3", 1);
INSERT INTO results (user_id, quiz_id, user_answer, score)
VALUES (4, 3, "don't know", 0);
INSERT INTO results (user_id, quiz_id, user_answer, score)
VALUES (4, 4, "Throw them under the bus", 1);
INSERT INTO results (user_id, quiz_id, user_answer, score)
VALUES (4, 5, "There is no room D", 1);
----- Stanley
INSERT INTO results (user_id, quiz_id, user_answer, score)
VALUES (5, 1, "2", 1);
INSERT INTO results (user_id, quiz_id, user_answer, score)
VALUES (5, 2, "3", 1);
INSERT INTO results (user_id, quiz_id, user_answer, score)
VALUES (5, 3, "don't know", 0);
INSERT INTO results (user_id, quiz_id, user_answer, score)
VALUES (5, 4, "don't know", 0);
INSERT INTO results (user_id, quiz_id, user_answer, score)
VALUES (5, 5, "There is no room D", 1);
----- Phyllis
INSERT INTO results (user_id, quiz_id, user_answer, score)
VALUES (6, 1, "0", 0);
INSERT INTO results (user_id, quiz_id, user_answer, score)
VALUES (6, 2, "3", 1);
INSERT INTO results (user_id, quiz_id, user_answer, score)
VALUES (6, 3, "don't know", 0);
INSERT INTO results (user_id, quiz_id, user_answer, score)
VALUES (6, 4, "Throw them under the bus", 1);
INSERT INTO results (user_id, quiz_id, user_answer, score)
VALUES (6, 5, "There is no room D", 1);
----- Oscar
INSERT INTO results (user_id, quiz_id, user_answer, score)
VALUES (8, 1, "2", 1);
INSERT INTO results (user_id, quiz_id, user_answer, score)
VALUES (8, 2, "3", 1);
INSERT INTO results (user_id, quiz_id, user_answer, score)
VALUES (8, 3, "Sam", 1);
INSERT INTO results (user_id, quiz_id, user_answer, score)
VALUES (8, 4, "Throw them under the bus", 1);
INSERT INTO results (user_id, quiz_id, user_answer, score)
VALUES (8, 5, "There is no room D", 1);