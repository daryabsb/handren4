import requests
import time

# Define the API endpoint
url = 'http://127.0.0.1:8000/clients/examinations/'


# Define the number of requests to make
num_requests = 129

# Define the delay between each request (in seconds)
delay = 1

# Define the authentication token
auth_token = '2d23bf96d42cbc35673e9831b748ec99088a96bb'

# Make the requests in a for loop with a time sleep between each request
for i in range(num_requests):
    # Define the payload data with the client value for this request
    payload = {
        "skeletal_class": "class1",
        "nasolabial_angle": "normal",
        "nasolabial_sulcus": "normal",
        "overjet": "Diskjet",
        "oral_hygiene": "good",
        "lip_competency": "competent",
        "face_form": "dolichocephalic",
        "habit": "Naughty",
        "treated_arch": "max",
        "molar_class_left": "class1",
        "molar_class_right": "class1",
        "tongue_size": "Long",
        "bracket_system": "class1",
        "midline_upper": "coincidence",
        "midline_lower": "coincidence",
        "slot": "normal",
        "extraction_upper": "class1",
        "extraction_lower": "class1",
        "anchorage_upper": "class1",
        "treatment_plan": "",
        "user": 1,
        "client": i+1
    }
    payload2 = {
        "heart_condition": "Normal",
        "blood_sugar": 80,
        "blood_pressure": "120/80",
        "weight": 70.0,
        "height": 180.0,
        "smoking_status": False,
        "alcohol_consumption": False,
        "physical_activity": "Moderate",
        "notes": "",
        "client": i
    }

    # Define the headers with the authentication token
    headers = {'Authorization': f'Token {auth_token}'}

    # Send the POST request with the payload data and headers
    response = requests.post(url, data=payload, headers=headers)

    # Try to parse the response data as JSON
    try:
        response_data = response.json()
        print(i, response_data)
    except ValueError:
        print("Response was not in valid JSON format")

    time.sleep(delay)
