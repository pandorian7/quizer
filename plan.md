# docke run

> create a new container

docker run --env=MYSQL_ROOT_PASSWORD=password --name quizer-mysql -v quizer-sql-vol:/var/lib/mysql -p 3306:3306 -d mysql

# Questions Table

id serial
question text

extend database to hold answers

```sql
CREATE TABLE QUESTIONS (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  multiple_answers BOOLEAN NOT NULL
)
```

# answers table

id serial
answer text
iscorrent bool
question forign delete on question delete

```sql
CREATE TABLE ANSWERS (
    id SERIAL PRIMARY KEY,
    question_id BIGINT UNSIGNED NOT NULL,
    answer TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL,
    FOREIGN KEY (question_id) REFERENCES QUESTIONS(id) ON DELETE CASCADE
);
```

changing question table id data type to `INT UNSIGNED`

```sql
CREATE TABLE ANSWERS (
id SERIAL PRIMARY KEY,
question_id INT UNSIGNED NOT NULL,
answer TEXT NOT NULL,
is_correct BOOLEAN NOT NULL,
FOREIGN KEY (question_id) REFERENCES QUESTIONS(id) ON DELETE CASCADE
);
```

add multiple answers column to the questions table

```sql
ALTER TABLE QUESTIONS ADD multiple_answers BOOLEAN NOT NULL DEFAULT 0;
```

# Improve Request handling Plan

- POST /api/questions should handle

  - empty question ✅
  - empty answers ✅
  - multiple correct answers if multiple answers is false ✅
  - no answers ✅
  - no answer is selected ✅

- Delete /api/questions/{id}

  - non existing id ✅

- Get /api/questions/{id}

  - non existing id ✅

- PUT /api/questions/{id}

  - non existing id ✅
  - things in POST /api/questions ✅

- show errors to the user depending on return error ✅

# Actual Quizes

- create quizes table

  - id serial
  - quiz title

- create quize qustions table

  - id serial (this field might not be necessary)
  - quiz id foreign
  - question id foreign

```sql
CREATE TABLE  QUIZES (id SERIAL, title TEXT, PRIMARY KEY (id))
```

```sql
CREATE TABLE QUIZ_QUESTIONS (id SERIAL, quiz_id BIGINT UNSIGNED, question_id BIGINT UNSIGNED, PRIMARY KEY (id), FOREIGN KEY (quiz_id) REFERENCES QUIZES(id) ON DELETE CASCADE, FOREIGN KEY (question_id) REFERENCES QUESTIONS(id) ON DELETE CASCADE)
```

# Quiz API End point

> POST /api/quizes ✅
> GET /api/quizes ✅
> POST /api/quizes/{id} ✅

# Resturcture databse.js , questions.js and quizes.js ✅

> PUT /api/quizes/{id} ✅
> Delete /api/quizes/{id} ✅

- decided to change most of the things in the api
  i'm only implementing /api/quizes endpoint

change of plans

- there's no option to create individual questions - this is much simpler quiestions are created under quizes

# New Field duration to questions table not null defaults to 30

```sql
ALTER TABLE QUESTIONS ADD duration UNSIGNED INT NOT NULL DEFAULT 30;
```

# New FIelds description(nullable), points, not null default 100 to quizes table

```sql
ALTER TABLE QUIZES ADD description TEXT, ADD points INT UNSIGNED NOT NULL DEFAULT 100;
```

# This is how answers are being evaluated

- every selected correct answer gives +1 block score
- every selected wrong answer gives -1 block score
- block score of a question is the max(0, sum of block scores of answers)
- for each question time multiplier is calculated by (1 - time_taken/question_duration)
- timed blcok score for the question is blockscore\*(1+time multiplier)
- block score of the quiz is the sum(timed block score of all questions)
- maximum block score of a question is (n_correct_answers\*2)
- maximun quiz block score is sum(maximum block score for each question)
- final score is the (quiz block score/maximum quiz block score)\*quiz total score

- database will save the block score of the quiz (not the final score) to counter the editing the quiz score invalidating previous attempts

# implementing users and sesstions

- create users table and sesstions table

```sql
CREATE TABLE USERS (
    id SERIAl PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE SESSIONS (
    id SERIAL PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    token VARCHAR(36) NOT NULL UNIQUE,
    foreign KEY (user_id) REFERENCES USERS(id) ON DELETE CASCADE
);
```

- write databse quieries to interact with db

# BUGS

- unwanted behaviour in /question ✅ fixed using layout groups
- await res.json() might fail if user did not send a valid json object
