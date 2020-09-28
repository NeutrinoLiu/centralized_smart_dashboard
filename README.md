# Hive Management System

Spike excercise for CS 506, Fall 2020. A hive management system that serves as an introductory project

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
