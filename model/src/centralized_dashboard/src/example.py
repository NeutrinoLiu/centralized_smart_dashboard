'''
Example of ROS usage subscription

Use something like this inside your flask call, the test functions here
can be used to update the fields of your objects or variables for them to be
up to date whenever a call is made
'''


from ui_nodes import *

def test(data):
    print('###################')
    print(data)

def test2(data):
    print('$$$$$$$$$$$$$$$$$$$')
    print(data)

sub = Subscriber(test, test2)

# This is needed for rus to keep running so we get a constant live stream of data
rospy.spin()
