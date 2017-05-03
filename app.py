# import required modules
from flask import Flask, render_template

# create the Flask app object
app = Flask(__name__,static_folder='./',static_url_path='')

@app.route('/')
def index():
    return app.send_static_file('index.html')

if __name__ == "__main__":
    app.run()
