import pytest
import random
import time

import sys
sys.path.append('../model/src/centralized_dashboard/src') # change dir to rover.py dir
from rover import Rover, GPSPoint
from userErr import * 

############## FIXTURE WITHOUT INIT ROS ##############

@pytest.fixture(scope="module", autouse=True)   
def testNode():
    testNode = Rover("testNode", auto_init=True)
    print(">>> test node is running >>>")
    yield testNode
    testNode.shut_down()
    del testNode
    print("<<< test node shuts down <<<")

################# CLASS FIELD TEST ####################

def test_clear_noti(testNode):
    testNode.remark = ''.join(random.sample('abcdefghijklmnopqrstuvwxyz', random.randrange(1,26)))
    testNode.clear_noti_buffer()
    assert testNode.remark == ''

def test_get_noti(testNode):
    testNode.remark = ''.join(random.sample('abcdefghijklmnopqrstuvwxyz', random.randrange(1,26)))
    remark = testNode.remark
    assert testNode.get_notification() == remark
    assert testNode.remark == ''

def test_topic(testNode):
    time.sleep(1)
    print("current GPS: (%f, %f)" % (testNode.gps_longt, testNode.gps_lati))
    print("target GPS: (%f, %f)" % (testNode.buffer_longt, testNode.buffer_lati))
    assert True 

def test_get_speed(testNode):
    time.sleep(1)
    assert len(testNode.speed) == 6
    # we dont know what the rover will send to use
    # but as long as it is a 6 element list, it is a valid speed

def test_set_speed(testNode):
    speed = [   random.randrange(0,10),
                random.randrange(0,10),
                random.randrange(0,10),
                random.randrange(0,10),
                random.randrange(0,10),
                random.randrange(0,10)]
    testNode.set_new_speed(speed)
    time.sleep(1) # wait for a while for sending out speed changing cmd
    assert testNode.speed == speed # we do not change speed field directly, it is updated by callback func atutomaticlly

def test_set_speed_illegal1(testNode):
    speed = [   - random.randrange(0,10),   # illegal minus speed
                random.randrange(0,10),
                - random.randrange(0,10),
                random.randrange(0,10),
                - random.randrange(0,10),
                random.randrange(0,10)]
    try:
        testNode.set_new_speed(speed)
    except InvalidSpeed as e:
        assert e.msg == "[InvalidSpeed] negative speed"
    else:
        assert False

def test_set_speed_illegal2(testNode):
    speed = [   random.randrange(0,10),   # incorrect number of speed
                random.randrange(0,10),
                random.randrange(0,10)]
    try:
        testNode.set_new_speed(speed)
    except InvalidSpeed as e:
        assert e.msg == "[InvalidSpeed] incorrect num of speed"
    else:
        assert False

def test_set_target(testNode):
    target = GPSPoint(random.uniform(-10, 10), random.uniform(-10, 10))
    testNode.set_new_target(target)
    time.sleep(1)
    assert (testNode.buffer_lati == target.lati) and (testNode.buffer_longt == target.longt)

def test_set_target_illegal(testNode):
    try:
        testNode.set_new_target(random.uniform(-180, 180))
    except InvalidTarget as e:
        assert e.msg == "[InvalidTarget] non GPS format input"
    else:
        assert False

def almostEqual(a, b, error = 0.1):
    return abs(a-b) <= error

def test_mock_car_moving(testNode):
    target = GPSPoint(random.uniform(-5, 5), random.uniform(-5, 5))
    testNode.set_new_target(target)
    time.sleep(5) # sleep for a long time to let it arrive
    assert almostEqual(testNode.gps_lati, target.lati) and almostEqual(testNode.gps_lati, target.lati)