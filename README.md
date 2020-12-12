# Centralized Smart Dashboard
Centralized Smart Dashboard developed for the rover of Wisconsin Robotics team. 
Iteration number 2 for COMPSCI 506: Software Engineer. 
Code cutoff date: Friday, November 13, 2020

# Prerequisites
[Docker](https://docs.docker.com/get-started)
Notice that currently is only set to work for a unix-based OS. This is fine in our case, since our client's rover runs in a Unix-based OS

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
docker run -it -p 5000:5000 -v <path_to_source>:/root flask-image
```
Use a different port if 5000 is busy for you. Replace <path_to_source> to your path to the source of the project. Do not include the < > symbols.

</ol>

# Run app

To manually run the app, run ``` python3 app.py ``` inside your docker container. We might need to create an executable eventually. 

# Ros Setup

Inside your docker container: 

<ol>
<li>

```
source /opt/ros/noetic/setup.bash
```

```
cd model
```
  
```
catkin_make
```
If this command does not work, run ```rosdep update``` and try again.
<li> 

```
source devel/setup.bash
```

<li>
To start the model server, we need to run roscore you can run it in the background using:

```
roscore &
```
</ol>

# Running the backend tests

For the flask tests go to the ```unitTest``` folder and run:

```
pytest --cov=routes
```

Now, to test the code that connects our application with the rover. First, we need to run our mock rover:

```
python3 model/src/centralized_dashboard/src/mock_ros_nodes.py &
```

Then, we can find the rover tests inside the ```tests/``` folder, and run them as in:
```
touch testipfile.txt
```
```
pytest --cov=rover
```

For this iteration, we have achieved an 88% code coverage. 
</li>


  
# Running the frontend tests
From inside the project folder, install angular on your local drive using the following command
```
npm install angular

```
Then, install the angular mocks with this command
```
npm install angular-mocks

```
For frontend automated tests, we are using Karma as a platform. Use the following command to install Karma.
```
npm install karma --save-dev

```
Install the dependendencies for Karma. The chrome launcher dependencies is as our client will be using Chrome as a default browser.
```
npm install karma-jasmine karma-chrome-launcher --save-dev

```
Use the following command for ease of running through command line. This allows you to not have to define the path every time you run a test. Instead, you can just use "karma"
```
npm install -g karma-cli

```
Install the code coverage dependency for Karma. A file with the code coverage of the tests will be generated each time the tests are run.
```
npm install karma-coverage --save-dev

```
Now that you've installed the necessary programs and dependencies, you don't need to do this again.


Use the following command to run the automated front end tests.
```
npm test
```

For this iteration, we achieved a <?> code coverage. We considered this an acceptable value due to the dynamic nature of the GUI as well as a majority of the HTML front-end tests are visual acceptance tests, i.e. map testing, range sliders and zoom in AINavigation and Maintenance.

</li>

</ol>
