def get_database():
    from pymongo import MongoClient
    import pymongo

    client = MongoClient(
        "mongodb+srv://Admin:kMjzU6BuqDhjrMt@cluster0.elyd8.mongodb.net/Coordinates?retryWrites=true&w=majority")
    db = client.test

    # Create the database for our example (we will use the same database throughout the tutorial
    return client['Coordinates']


# This is added so that many files can reuse the function get_database()
if __name__ == "__main__":

    # Get the database
    dbname = get_database()

    # creating the coords cluster
collection_name = dbname["coords"]

item_1 = {
    "latitude": "45° 20.6028' N",
    "longitude": "21° 50.12084' E",
    "speed": "67",
    "altitude": "205.0",
    "datetimev": "21/11/2021 (14:19:25)"
}

item_2 = {
    "latitude": "45° 20.6028' N",
    "longitude": "21° 50.12084' E",
    "speed": "67",
    "altitude": "205.0",
    "datetimev": "21/11/2021 (14:19:26)"
}

item_3 = {
    "latitude": "46° 20.6028' N",
    "longitude": "21° 50.12084' E",
    "speed": "67",
    "altitude": "205.0",
    "datetimev": "21/11/2021 (14:19:33)"
}
item_4 = {
    "latitude": "47° 20.6028' N",
    "longitude": "21° 50.12084' E",
    "speed": "67",
    "altitude": "205.0",
    "datetimev": "21/11/2021 (14:19:44)"
}
collection_name.insert_many([item_1, item_2, item_3, item_4])
