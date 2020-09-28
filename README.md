[ATTENTION] this branch "spike exercise" is for badger_hive_management project

LOG:

[Sept 28]
added login and register html pages; main html pages are  `./badger_hive/*.html` , resources including css/js/fonts are in `./badger_hive/assets/`

TODO: add JS for the form and change flask router

------

Following is the original Readme:

# Centralized Smart Dashboard

Centralized Smart Dashboard developed for the rover of Wisconsin Robotics team. 

# Prerequisites
[Docker](https://docs.docker.com/get-started)

# Setup 
The image only needs to be built once, per each new change we make in the container. However, you need to run the image each time.
<ol>
<li> Build docker image: 

```
docker build -t flask-image:latest ./dockerfiles
```
Notice that you might need Admin access
<li> Run image at port 5000:

```
docker run -it -p 5000:5000 -v <path_to_source>:/root flask_image
```
Use a different port if 5000 is busy for you. Replace <path_to_source> to your path to the source of the project. Do not include the < > symbols.

</ol>

# Run app

To manually run the app, run ``` python3 app.py ``` inside your docker container. We might need to create an executable eventually. 
