#!/usr/bin/python

import time
import board
import busio
import adafruit_mcp9808
from time import sleep, strftime
 

i2c_bus = busio.I2C(board.SCL, board.SDA)
mcp = adafruit_mcp9808.MCP9808(i2c_bus)

   
tempC = mcp.temperature
log = open("/var/www/html/raw/temp_log_1.csv", "a")
log.write("{0},{1}\r\n".format(strftime("%Y-%m-%d %H:%M:%S"),str(tempC)))
#print("{0},{1}\n".format(strftime("%Y-%m-%d %H:%M:%S"),str(tempC)))
log.close()
currentTemp = open ("/var/www/html/raw/temp_current.txt", "w")
currentTemp.write("{0}".format(str(tempC)))
currentTemp.close()