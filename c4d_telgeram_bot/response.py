import requests
import hashlib
import secrets
import mysql
import json




def register_user(telegram_id):
    """

    userdata = {"type": 'registration', "telegram_id": telegram_id, "user_token": user_token}
    resp = requests.post('http://php:80/telegram/', data=userdata)
    load_json = json.loads(resp.text)
    """
    user_token = secrets.token_urlsafe(8)
    registration_result = mysql.registration(telegram_id, user_token, mysql.connection)
    if registration_result[0]:
        return "You alredy regisred, your token: `{}`".format(registration_result[1])
    elif registration_result[0] == False:
        return "Successfully registred, your token: `{}`".format(user_token)
    else:
        return "Registration failed"



def checkrender_status_loop(telegram_id):
    data = mysql.get_render_data(telegram_id, mysql.connection)

    check = True
    for i in data:
        if data[i].get('status') == 'InProgress':
            check = True
            break
        else:
            check = False
    return check

def render_status_get(telegram_id):
    data = mysql.get_render_data(telegram_id, mysql.connection)

    message = ""



    for key in data:

        if data[key]['status'] == 'In Progress':

            float_int = float(data[key][('progress')])
            float_int = str(int(float_int * 100)) + '%'

            message += 'Job: ' + data[key][('file_name')] + ' Progress: ' + float_int + ' Time left: ' + data[key][('time')] + "\r\n"

        elif data[key]['status'] == 'Stopped':
            message += 'Job: ' + data[key][('file_name')] + ' is stopped \r\n'
        elif data[key]['status'] == 'Finished':
            message += 'Job: ' + data[key][('file_name')] + ' is finished \r\n'

        elif data[key]['status'] == 'In Queue':
            message += 'Job: ' + data[key][('file_name')] + ' In queue \r\n'
        else:
            float_int = float(data[key][('progress')])
            float_int = str(int(float_int * 100)) + '%'

            message += 'Job: ' + data[key][('file_name')] + ' Progress: ' + float_int + ' Time left: ' + data[key][('time')] + "\r\n"



    return checkrender_status_loop(telegram_id), message











