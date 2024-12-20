# docke run

> create a new container

docker run --env=MYSQL_ROOT_PASSWORD=password --name quizer-mysql -v quizer-sql-vol:/var/lib/mysql -p 3306:3306 -d mysql

# Questions Table

id serial
question text

extend database to hold answers

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

# Resturcture databse.js , questions.js and quizes.js

# BUGS

- unwanted behaviour in /question ✅ fixed using layout groups
- await res.json() might fail if your did not send a valid json object
