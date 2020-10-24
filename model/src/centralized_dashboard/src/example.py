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
