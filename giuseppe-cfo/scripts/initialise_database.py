from app.database import initialise_database

initialise_database(create_safety_backup=True)
print("Local database initialised.")
