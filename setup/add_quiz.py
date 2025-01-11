from urllib.parse import urljoin
from pathlib import Path
import argparse
import requests
import json

def safe(res, error, reflect=False):
    if not res.ok:
        print(error)
        if reflect:
            res_json = res.json()
            print(f"message: {res_json.get('message')}")
        exit(1)

parser = argparse.ArgumentParser(description='Add a quiz to the quizer database')

CONFIG_FILE = Path(__file__).parent / 'config.json'

parser.add_argument('--quiz-file', '-f', type=Path, help='quiz json file')
parser.add_argument('--username', '-u', type=str, help='username')
parser.add_argument('--password', '-p', type=str, help='password')
parser.add_argument('--host', '-H', type=str, help='host')

with open(CONFIG_FILE) as f:
    parser.set_defaults(**json.load(f))


def api(path):
    base = urljoin(args.host, '/api/')
    return urljoin(base, path)

args = parser.parse_args()

with open(args.quiz_file) as f:
    quiz = json.load(f)

ses = requests.session()
ses.headers['Accept'] = 'application/json'


print('Logging in...')
res = ses.post(api('login'), json={'username': args.username, 'password': args.password})
safe(res, 'Failed to login')

print('Creating quiz... Step 1')
res = ses.post(api('quizes'), json={'title': quiz['title']})
safe(res, 'Failed to create quiz', reflect=True)

quiz_id = res.json()['id']

print('Creating questions... Step 2')
res = ses.put(api(f'quizes/{quiz_id}'), json={
    'title': quiz['title'],
    'description': quiz['description'],
    'points': quiz['points'],
})

safe(res, 'Failed to create quiz', reflect=True)

print('Adding Questions...')

for i, question_json in enumerate(quiz['questions']):
    question = {
        "question": question_json['question'],
        "multiple_answers": question_json['multiple_answers'],
        "duration": question_json['duration'],
    }
    answers = question_json['answers']
    print(f"Adding question {i+1}...")
    res = ses.post(api(f'questions'), json={
        'quiz_id': quiz_id,
        'question': question,
        'answers': answers
    })
    safe(res, 'Failed to add question', reflect=True)

print('Quiz added successfully')
