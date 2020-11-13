import pytest
import sys
sys.path.append('../model/src/centralized_dashboard/src') # change dir to src dir
import rover

@pytest.fixture(scope = "module")
def roverFixture():
    testNode = rover("testNode")
    print(">>> test node is running >>>")
    yield testNode
    testNode.shutdown()
    print("<<< test node shuts down <<<")

