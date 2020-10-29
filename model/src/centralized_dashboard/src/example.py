from rover import *

mrRover = Rover("mrRover")
while True:
    readin = input("read rover status? (y/n)")
    if readin == "n":
        break
    #get the rover status
    print("mrRover is at (%f,%f) , it is heading to (%f,%f)" %(mrRover.gps_lati, mrRover.gps_longt, mrRover.buffer_lati, mrRover.buffer_longt))
    print("current route is:", mrRover.route_state)
    print("current speed is:", mrRover.speed)

    readin = input("want new speed? (y/n)")
    if readin == "y":
        readin = input("type in new speeds (six number splitted with space): ")
        speed = list(map(int, readin.split()))
        if len(speed) == 6:
        # set the speed
            mrRover.send_cmd(Cmd(new_speed = speed))
        else:
            print("wrong input!")
    
    readin = input("want new route? (y/n)")
    if readin == "y":
        route = []
        readin = input("type in new routes (in the format of \'(x1, y1),(x2,y2)\'): ")
        raw_point = readin.split('),')
        for point in raw_point:
            cord = list(point.split(','))
            lati = cord[0].replace("(", "").replace(")", "")
            longt = cord[1].replace("(", "").replace(")", "")
            route.append(GPSPoint(float(lati), float(longt)))
        print('we have new targets:' + route.__repr__())
        #set new route
        mrRover.send_cmd(Cmd(new_route = route))





