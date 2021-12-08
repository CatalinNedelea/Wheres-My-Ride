#python 3.7.3
#import _thread #googl?
import time
import serial #googl
import requests #googl
from micropyGPS import MicropyGPS #googl
import firebase_admin #GOOGL
import Adafruit_SSD1306 #GoOGL

import Adafruit_GPIO.SPI as SPI
from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont

print("program started")

#screen-related
RST = 24 #pini stuff
DC = 23
SPI_PORT = 0
SPI_DEVICE = 0
#disp = Adafruit_SSD1306.SSD1306_128_32(rst=RST, dc=DC, spi=SPI.SpiDev(SPI_PORT, SPI_DEVICE, max_speed_hz=800$
disp =Adafruit_SSD1306.SSD1306_128_32(rst=RST)
disp.begin()
disp.clear()
disp.display()

font = ImageFont.load_default()
image = Image.new("1",(disp.width,disp.height))
draw = ImageDraw.Draw(image)
draw.text((0, 0), "hello!",  font=font, fill=255)
disp.image(image)
disp.display()
#end screen-related


#gps-related
s=serial.Serial('/dev/ttyS0',9600)

dump = s.readline() #always reads gibberish when it starts

my_gps = MicropyGPS()
my_sentence = '$GPRMC,081836,A,3751.65,S,14507.36,E,000.0,360.0,130998,011.3,E*62' #should look like this

latitude = ''
longitude = ''
altitude = ''
speed = ''
satellites = ''
#end gps-related

time.sleep(10)

while True:
        try:
                c=s.readline().decode('utf-8')
                #print(c)
                time.sleep(1) #GPS refresh rate is about 1hz - avoiding unnecessary computations
                for x in c:
                        
                        my_gps.update(x)
                        
                        latitude = my_gps.latitude_string()
                        longitude = my_gps.longitude_string()
                        altitude = str(my_gps.altitude)
                        speed = my_gps.speed_string('kph')
                        satellites = str(my_gps.satellites_in_use)
                        speed2 = speed.replace(" km/h","")
                
                        #print(" lat:"+latitude+" lon:"+longitude+" alt:"+altitude+" spd:"+speed2+" sat:"+sat$
                
                spdalt = "spd:" + str(int(float(speed2))) + " alt:" + altitude 
                satstr = "satellites: " + satellites

                disp.clear()
                image1 = Image.new("1",(disp.width,disp.height))
                draw = ImageDraw.Draw(image1)
                #draw.text((0, 0), "test",  font=font, fill=255)
                draw.text((0, 0), longitude, font = font, fill=255)
                draw.text((0, 8), latitude, font = font, fill=255)
                draw.text((0, 16), spdalt, font = font, fill=255)
                draw.text((0,24), satstr, font = font, fill=255)
                disp.image(image1)
                disp.display()


        except:
                print("Error!")

