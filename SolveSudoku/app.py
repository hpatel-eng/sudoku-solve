import io
import cv2
import base64
import numpy as np
from imageio import imread
from flask_cors import CORS, cross_origin
from flask import Flask, escape, request, jsonify
from SudokuExtractor import extract_sudoku
from keras.models import model_from_json
import tensorflow as tf

from PIL import Image

from PIL import ImageFile
ImageFile.LOAD_TRUNCATED_IMAGES = True

class TestClass:
    def __init__(self):
        self.graph=tf.get_default_graph()
        json_file = open('model.json', 'r')
        self.loaded_model_json = json_file.read()
        json_file.close()
        self.loaded_model = model_from_json(self.loaded_model_json)
        self.loaded_model.load_weights("model.h5")
        print("Loaded saved model from disk.")
    
    def identify_number(self, image):
        with self.graph.as_default():
            image_resize = cv2.resize(image, (28,28))
            image_resize_2 = image_resize.reshape(1,1,28,28)
            loaded_model_pred = self.loaded_model.predict_classes(image_resize_2 , verbose = 0)
            return loaded_model_pred[0]

    def extract_number(self, sudoku):
        sudoku = cv2.resize(sudoku, (450,450))
        grid = np.zeros([9,9])
        for i in range(9):
            for j in range(9):
                image = sudoku[i*50:(i+1)*50,j*50:(j+1)*50]
                if image.sum() > 25000:
                    grid[i][j] = self.identify_number(image)
                else:
                    grid[i][j] = 0
        return grid.astype(int)

class MyServer(Flask):
    def __init__(self, *args, **kwargs):
            super(MyServer, self).__init__(*args, **kwargs)
            self.testClass=TestClass()
app = MyServer(__name__)
CORS(app)

@app.route('/', methods=['POST'])
def hello():
    image = request.get_json()['image'][23:]
    print(image)
    image = imread(io.BytesIO(base64.b64decode(image)))
    image = Image.fromarray(image)
    image.save("sudoku.jpg")
    img = extract_sudoku('sudoku.jpg')
    grid = app.testClass.extract_number(img)
    grid_out = []
    for i in range(grid.shape[0]):
        row = []
        for j in range(grid[0].shape[0]):
            if grid[i][j] == 0:
                row.append('')
            else:
                row.append(str(grid[i][j]))
        grid_out.append(row)
    return jsonify({'grid':grid_out})

if __name__ == "__main__":
    app.run()

