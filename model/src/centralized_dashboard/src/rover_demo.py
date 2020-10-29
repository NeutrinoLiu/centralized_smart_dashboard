from rover import *

mrRover = Rover("mr.Rover")
while True:
    readin = input("read rover status? (y/n)")
    if readin == "n":
        break
    print("mrRover is at lat %f , long %f , it is heading to %d" %(mrRover.gps_lati, mrRover.gps_longt, mrRover.ori))
    print("current route is:", mrRover.route_state)
    print("current speed is:", mrRover.speed)

    readin = input("want new speed? (y/n)")
    if readin == "y":
        readin = input("type in new speeds (six number splitted with space): ")
        speed = list(map(int, readin.split()))
        if len(speed) == 6:
            mrRover.send_cmd(Cmd(new_speed = speed))
        else:
            print("wrong input!")
    
    readin = input("want new route? (y/n)")
    if readin == "y":
        route = []
        readin = input("type in new routes (in the format of \'(x1, y1),(x2,y2)\'): ")
        raw_point = readin.split(',')
        for point in raw_point:
            lati = point.replace("(", "").replace(")", "")
            longt = point.replace("(", "").replace(")", "")
            route.append(GPSPoint(float(lati), float(longt)))
        mrRover.send_cmd(Cmd(new_route = route))





