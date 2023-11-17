import os
import nltk
from nltk.tokenize import word_tokenize
from nltk.probability import FreqDist

directory_path = "/home/aleksa/UNIVER/eya/texts"

# Загрузка текста из всех файлов в директории
def load_documents(directory):
    documents = {}
    for filename in os.listdir(directory):
        if filename.endswith(".txt"):
            with open(os.path.join(directory, filename), 'r') as file:
                documents[filename] = file.read()
    return documents


# def search_file_in_directory(file_name, directory):
#     found_files = []
#     for root, dirs, files in os.walk(directory):
#         if file_name in files:
#             found_files.append(os.path.join(root, file_name))
#     return found_files

# file_name = "example.txt"
# directory_path = "path/to/directory"
# found_files = search_file_in_directory(file_name, directory_path)
# print(f"The file '{file_name}' was found in the following locations: {found_files}")


# Поиск файла по переданному слову
def search_word_in_documents(searchedWord):
    documents = load_documents(directory_path)
    word_probabilities = {}
    filesInfo = []
    word = searchedWord.lower()
    
    for filename, text in documents.items():
        tokens = word_tokenize(text)
        lowerTokens = []

        for token in tokens:
            lowerTokens.append(token.lower())

        fdist = FreqDist(lowerTokens)

        if fdist.freq(word) > 0:
            word_probabilities[filename] = fdist.freq(word)
            wordsArr = []
            wordsArr.append(word)
            if word in text:
                text = str(text).replace(word, f'<mark>{word}</mark>')
                print('HERE', text)
            fileInfo = {
                'name': filename,
                'text':text,
                'words':wordsArr
            }
            filesInfo.append(fileInfo)
    
    sorted_files = sorted(word_probabilities, key=word_probabilities.get, reverse=True)
    # print(filesInfo)
    return filesInfo

# search_word = "кофе"

# num_results = 3
# most_probable_files = search_word_in_documents(search_word, directory_path, num_results)
# print(f"The most probable files containing the word '{search_word}' are: {most_probable_files}")