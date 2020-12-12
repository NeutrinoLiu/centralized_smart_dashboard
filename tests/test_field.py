import pytest
import random

import sys
sys.path.append('../model/src/centralized_dashboard/src') # change dir to rover.py dir
from rover import Rover

############## FIXTURE WITHOUT INIT ROS ##############

@pytest.fixture(scope="module", autouse=True)   # one new test node for a new module
def testNode():
    testNode = Rover("testNode", auto_init=False, ip_file_path = None)
    print(">>> test node is running >>>")

    yield testNode
    print("<<< test node shuts down <<<")

@pytest.fixture(scope="function")
def r():
    return (random.uniform(-180, 180), random.uniform(-90, 90)) 

################# CLASS FIELD TEST ####################

def test_gps(r, testNode):
    assert testNode.gps_longt == 0.0
    assert testNode.gps_lati == 0.0
    testNode.gps_longt = r[0]
    testNode.gps_lati = r[1]
    assert testNode.gps_longt == r[0]
    assert testNode.gps_lati == r[1]

def test_target(r, testNode):
    assert testNode.buffer_longt == 0.0
    assert testNode.buffer_lati == 0.0
    testNode.buffer_longt = r[0]
    testNode.buffer_lati = r[1]
    assert testNode.buffer_longt == r[0]
    assert testNode.buffer_lati == r[1]

def test_orientation(r, testNode):
    assert testNode.ori == 0.0
    testNode.ori = r[0]
    assert testNode.ori == r[0]

def test_speed_route(testNode):
    assert testNode.speed == []
    assert testNode.route_state == []
    # no specific io test for speed or route

def test_remark(testNode):
    assert testNode.remark == ''
    testNode.remark = 'test remark content'
    assert testNode.remark == 'test remark content'

def test_name(testNode):
    assert testNode.name == "testNode"

def test_ips(testNode):
    assert testNode.ips == []
