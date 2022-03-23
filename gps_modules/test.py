import requests

r = requests.put(
    'http://localhost:5000/api/vehicles/621688f6a8f22bb12e59d5dd', json={
        "currentLocation": {
            "latitude": "45° 20.6028' N",
            "longitude": "21° 50.12084' E",
            "speed": "75",
            "altitude": "205.0",
            "datetimev": "23/10/2022 (14:19:25)"}
    })
