import json

def save_response_to_file(response_json, filename="tests/output.json"):
    with open(filename, "r+") as f:
        data = json.load(f)
        data.append(response_json)
        f.seek(0)
        json.dump(data, f, indent=2)

'''
backend/tests/output.json
'''