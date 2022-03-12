import requests
import json
import os
import sys
from pprint import pprint

def format_prepped_request(prepped, encoding=None):
    # prepped has .method, .path_url, .headers and .body attribute to view the request
    encoding = encoding or requests.utils.get_encoding_from_headers(prepped.headers)
    body = prepped.body.decode(encoding) if encoding else '<binary data>' 
    headers = '\n'.join(['{}: {}'.format(*hv) for hv in prepped.headers.items()])
    return f"""\
{prepped.method} {prepped.path_url} HTTP/1.1
{headers}

{body}"""


API_KEY = "2b10189SmpQJ3XHmESgf2Hz9k"	# Your API_KEY here
api_endpoint = f"https://my-api.plantnet.org/v2/identify/all?api-key={API_KEY}"

# original_stdout = sys.stdout
base_path = "B:/dev/school/SYDE-461/FYDP/garden-react-app/src/assets/plant_images/identifications"
with open(base_path + '/output.txt', 'wt', encoding="utf-8") as out:
    # sys.stdout = out
    for file in os.listdir(base_path):
        image_path_1 = base_path + "/" + file
        image_data_1 = open(image_path_1, 'rb')

        # image_path_2 = "C:/Users/maxrink/Downloads/leaves.jpeg"
        # image_data_2 = open(image_path_2, 'rb')

        data = {
            'organs': ['flower', 
            # 'leaf'
            ]
        }

        files = [
            ('images', (image_path_1, image_data_1)),
            # ('images', (image_path_2, image_data_2))
        ]

        req = requests.Request('POST', url=api_endpoint, files=files, data=data)
        prepared = req.prepare()

        # print(format_prepped_request(prepared))

        s = requests.Session()
        response = s.send(prepared)
        json_result = json.loads(response.text)

        out.write('\n\n\n')
        out.write(file)
        pprint(response.status_code, stream=out)
        pprint(json_result, stream=out)

# sys.stdout = original_stdout
