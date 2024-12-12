# docke rrun

docker run --hostname=78409d203e72 --mac-address=02:42:ac:11:00:02 --env=MYSQL_ROOT_PASSWORD=password --env=PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin --env=GOSU_VERSION=1.17 --env=MYSQL_MAJOR=innovation --env=MYSQL_VERSION=9.0.1-1.el9 --env=MYSQL_SHELL_VERSION=9.0.1-1.el9 --volume=quizer-sql-vol:/var/lib/mysql --volume=/var/lib/mysql --network=bridge --workdir=/ -p 3306:3306 --restart=no --runtime=runc -d mysql

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
