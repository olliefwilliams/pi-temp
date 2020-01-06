# pi-temperature-logger

`pi-temperature-logger` is a collection of scripts used to turn a raspberry pi into a LAN accessible temperature logger. This is a very hacked-together proof-of-concept and should not be confused with a "proper" project.

## Table of contents

  - [Hardware](#hardware)
  - [Set-up](#set-up)
    * [Initial (headless) pi setup](#initial--headless--pi-setup)
      + [1. Allow SSH Access](#1-allow-ssh-access)
      + [2. Configure WiFi Networks](#2-configure-wifi-networks)
    * [Connecting](#connecting)
    * [Updates](#updates)
    * [Third party libraries](#third-party-libraries)
    * [Web server](#web-server)
  - [Testing](#testing)        
  - [Installation](#installation)
    * [HTML](#html)
    * [Python](#python)
    * [Cron](#cron)
  - [Finishing up](#finishing-up)

## Hardware

You will need:

- Raspberry pi (any recent model)
- 8GB or larger Micro SD card burned with the OS of your choice (Raspbian recommended)
- Adafruit MCP9808 I2C module. [Product page](https://www.adafruit.com/product/1782)
- Wires to connect the two
- (optional) Headers for both the pi and the module to make connecting easier

## Set-up

The following guide is for the Raspberry Pi Zero-W, but should be more or less the same for other models.

### Initial (headless) pi setup

First write the operating system image of your choice on the micro SD card to be used with the raspberry pi.

Before putting that card into the slot and booting it you will need to do 2 things:

#### 1. Allow SSH Access

Connect the SD card to another computer, a `boot` drive should be mounted.

In the root of this drive, create a blank file called `ssh`.

```
touch /volumes/boot ssh
```
This simply tells the Raspberry Pi operating system to allow incoming SSH connections

#### 2. Configure WiFi Networks

On the same `boot` partition you will need to create a file called `wpa_supplicant.conf`

```
touch /volumes/boot wpa_supplicant.conf
```

The content of this file will tell the raspberry pi which network(s) to connect to. There are a number of different options to include in this file, but it is recommended that you use the one included in this repo as it can be very finicky to get working correctly.

### Connecting

You should now be able to connect to the pi with SSH over WiFi, but first you will have to find it! Either log in to your router, look at the connected devices or use the handy `Fing` app for android phones to scan your network for connected devices.

Once you know the IP address, write it/save it/commit it to memory then SSH in with the usual command:

```
ssh pi@xxx.xxx.xx.xx
```

>If you are using a mac, or have the `bonjour service` installed on your computer, you should be able to use `HOSTNAME.local` instead of the IP (where HOSTNAME is the actual name assigned to your pi).

The password will be `raspberry`. You should change this using the `passwd` command.

### Updates

Run the update and upgrade commands to...update and upgrade everything:

```
sudo apt update
```
then:
```
sudo apt full-upgrade
```
Using `full-upgrade` ensures that `apt` will bring in all dependencies.

### Physically connect the electronics

Before we install the necessary libraries, connect the following togther either by soldering or by using headers and jumper wire:

| Sensor Pin Name | Pi Pin Name | Pi Pin Number |
|-----------------|-------------|---------------|
|Vdd              | 3v3         | 1             |
|Gnd              | Gnd         | 9 (or 6)      |
|SCL              | SCL         | 5             |
|SDA              | SDA         | 3             |

### Third party libraries

This project relies on libraries from the ever-helpful Adafruit company — specifically the `circuitpython` and `circuitpython-mcp9808` libraries.

It's probably easiest to follow their guides:

[circuitpython installation guide](https://learn.adafruit.com/circuitpython-on-raspberrypi-linux/installing-circuitpython-on-raspberry-pi)

[mcp9808 installation guide](https://learn.adafruit.com/adafruit-mcp9808-precision-i2c-temperature-sensor-guide/python-circuitpython)

### Web server

To make the information accessible in-browser from any device on the same network as the pi, we're going to turn it into a webserver.

All we need to do is install Apache and PHP 7:

```
sudo apt install apache2
```
```
sudo apt install php libapache2-mod-php
```

Test this by putting a php file in `/var/www/html` and using a browser on another device to go to your pi's IP address.

## Testing

Assuming everything has installed properly, (and you haven't already tested everything as in the guides above) it's time to test everything.

First, place all python files in a folder called `python` your home directory, then:

##### Run `blinkatest.py`:

```
python3 ~/Documents/python/blinkatest.py
```

You should get some positive stuff in the terminal.

##### Run `mcp9808-test.py`:

```
python3 ~/Documents/python/mcp9808-test.py 
```

The terminal will print the temperature once a second.

## Installation

Now it's time to actually "install" the code and get it working.

### HTML

Get all the files from the `html` directory and put them in `/var/www/html`.

In `html/raw` you will see two files: `temp_current.txt` and `temp_log_1.csv`. these are used to store data generated by the temperature sensor before it's read by the web interface. They should both be blank, unless you are migrating over old data.

This project uses the open source `dygraphs.js` library to display a graph of the data. Please visit [the Dygraphs homepage](http://dygraphs.com/download.html) for more information about this great project.

### Python

Simply place the `temp-log-single.py` file in the `~/Documents/python` directory.

Run this file once using

```
python3 ~/Documents/python/temp-log-single.py 
```

You will not get any visual feedback but if you navigate to `/var/www/html/raw` and open the `temp_log_1.csv` file you should see a (new) line with the current temperature and a timestamp of the time that you ran the command above.


### Cron

This is what actually ensures that the pi will log the temperature at a regular interval. We need to set a cron job.

In the terminal type:

```
crontab -e
```

The window will now show a lot of lines of commented instructions. At then end of these instructions add a new line:

```
*/5 * * * * /home/pi/Documents/python/temp-log-single.py
```

Check the path used. If you've changed the hostname of your pi, you will need to reflect that change here.

The line above tells the OS to run the python file once every 5 minutes, you can of course edit this to be more or less frequent.

## Finishing up

Everything should now be installed and running. Even if the pi reboots, the cron task will ensure that the pi still logs the temperature.

To view the current temperature, ensure your device is connected to the same network and simply point your browser to the pi. You will see the current temperature and a graph of previous measurements.

Please be aware that if you have literally just installed everything there may be no data yet to display.