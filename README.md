# Classify
An app to classify images to perform time tracking with OrganoID in 384-wells (or less) plate 

<h1> step by step use</h1>

1) Download Visual studio code
3) On VScode go to File > Open Folder and select the main folder (normaly named "Classify")
4) On the left panel select "app.py"
5) run the code with the button on the top right (see picture)
6) the code is running and you can click on the link in the therminal (http://127.0.0.1:5000)
![At92-1 2](https://github.com/Djul0/Classify/assets/82659922/cf36e5a4-f937-4605-9ef7-e19cdc055f19)
7) The app is now oppen into a browser (google chrome is recommanded).
<img width="1137" alt="image" src="https://github.com/Djul0/Classify/assets/82659922/3c8a08ea-e96d-4fce-9f3f-8b28a41ce62d">

8) put the directory of your main tracking folder containing all time points subfolders.
   ```
      Main_Tracking_Folder
      │
      ├── timepoint1
      │   └── NameOfTheExperiment_WellName_S1RandomStuff.tif
      │
      └── timepoint2
          └── NameOfTheExperiment_WellName_S1RandomStuff.tif
   ```
10) Name of the brightfield images should be in this format:
   NameOfTheExperiment_WellName_S1RandomStuff.tif
   example: experiment1_B02_s15856CAB7-8F4D-4DE2-AEE3-B969B601B0F3.tif
   Normaly the brightfield images we use already named correctly the files. you should also see other files than the "S1" like the "S2" files (ex: conf_B02_s227862CAC-3244-47FB-B3C8-BBEE9A6F67AA.tif) or the S1_thumb, S2_thumb (ex: conf_B02_s2_thumbCDAF1977-FBB1-476B-A626-1973C689677C.tif). these files wont be used but you can keep them in the main tracking folder.
11) Put the output directory where the classify images will be transfered.
12) Put the Name of the experiment which should match with the one in image names (in our example "experiment1".
13) select the well you want to tracked . You can shift+click and drag to select multiple one.
14) press the "process" button.
15) Images should be correctly labelled in the ouput directory you put previously.

<h1> Troubleshooting</h1>
If no images are transfered this is maybe because of two possiblities:

1) the given experiment name doesnt match the experiment images name. Name of the given experiment name and image experiment name should be in one word without special characteres(-,/,_) and no space.
2) Image Name pattern is not right. pattern of the name should be as mentionned: NameOfTheExperiment_WellName_S1RandomStuff.tif
    
    a) If after the S1 you dont have random character/numbers (ex: experiment1_B02_s1.tif) this might also be a problem. 
    => To solve this change the line 32 of the app.py. and remove the asterix "*" after S1.
    >pattern = f"{experiment_name}_{well}_s1*.tif"
    
    replace by :
   
    >pattern = f"{experiment_name}_{well}_s1.tif"

3) You can check if some errors are display. on the web broweser app right click and choose "Inspect". Select the console panel. here are displayed all errors. It's normal of some "uncaught (in promise) error" are display. other indication here might help you.
