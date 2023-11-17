from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from search import search_word_in_documents 
from pydantic import BaseModel

app = FastAPI()

origins = [
    'http://localhost:3000'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

class item(BaseModel):
    word: str

@app.post('/search')
def searchFiles(item : item):
    
    result = search_word_in_documents(item.word)
    # print(result)
    
    return result

@app.get('/try')
def findFiles():
    return 'here'