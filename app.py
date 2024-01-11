from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from PIL import Image
import os
import glob

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process-images', methods=['POST'])
def process_images():
    data = request.json
    main_directory = data['mainDirectory']
    destination_folder = data['destinationFolder']
    experiment_name = data['experimentName']
    selected_wells = data['selectedWells']

    os.makedirs(destination_folder, exist_ok=True)

    time_point_folders = sorted(glob.glob(os.path.join(main_directory, 'TimePoint_*'))) 
    time_points = len(time_point_folders)

    for time_point_folder in time_point_folders:
        # Extract time point number from the folder name
        time_point_number = extract_time_point_number(time_point_folder)

        for well in selected_wells:
            pattern = f"{experiment_name}_{well}_s1*.tif"
            for file_path in glob.glob(os.path.join(time_point_folder, pattern)):
                if '_thumb' not in file_path and 's2' not in file_path:
                    process_image(file_path, well, time_point_number, experiment_name, destination_folder)

    return jsonify({"message": f"Processed images for {time_points} time points successfully"})

def extract_time_point_number(folder_path):
    # Extract the time point number from the folder name
    # Assumes folder name format "TimePoint_X" where X is the number
    basename = os.path.basename(folder_path)
    number_str = basename.split('_')[1]
    try:
        return int(number_str)
    except ValueError:
        return None

def process_image(file_path, well, time_point, experiment_name, destination_folder):
    with Image.open(file_path) as img:
        new_filename = f"{well}_TimePoint_{time_point}_{experiment_name}_s1.TIF"
        new_file_path = os.path.join(destination_folder, new_filename)
        img.save(new_file_path)



if __name__ == '__main__':
    app.run(debug=True)