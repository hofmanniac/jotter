import json
from flask import Flask, jsonify
import os
import markdown

app = Flask(__name__)

def get_settings():
    with open("backend/settings.json", "r") as f:
        settings = json.load(f)
        return settings
    
@app.route('/api/hello', methods=['GET'])
def hello():
    response = {'message': 'Hello from the backend!'}
    return jsonify(response)

@app.route('/api/posts', methods=['GET'])
def get_content():
    settings = get_settings()
    data_folder = settings.get("data", None)
    data_folder += "/posts"
    items = []
    for filename in os.listdir(data_folder):
        if os.path.isfile(os.path.join(data_folder, filename)):
            item_name = filename.removesuffix(".md")
            items.append(item_name)
    return items

@app.route("/api/post/<name>", methods=["GET"])
def get_post(name: str):
    settings = get_settings()
    data_folder = settings.get("data", None)
    data_folder += "/posts"
    post_file = data_folder + "/" + name + ".md"
    with open(post_file, "r") as f:
        text = f.read()
        html = markdown.markdown(text)
        return html
    
if __name__ == '__main__':
    app.run()
