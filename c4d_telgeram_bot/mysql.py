import pymysql
import json

host = "db"
user = "root"
password = ""
db_name = "test"




def connection():
    try:
    #connect to db
        connection = pymysql.connect(
            host= host,
            user= user,

            password = password,
            database = db_name,
            cursorclass=pymysql.cursors.DictCursor

        )
        return connection


    except:
        print("connection error")
connection()
#checking if user exists
def registration(user_id, user_token, conection_cur):
    conn = conection_cur()
    with conn.cursor() as cursor:
        select_by_telegram_id = "SELECT `user_token` FROM `users` WHERE `telegram_id` = '{}'".format(user_id)
        write_new_user = "INSERT INTO `users` (`id`, `user_token`, `telegram_id`, `render_status`) VALUES (NULL, '{}', '{}', NULL)".format(user_token, user_id)
        cursor.execute(select_by_telegram_id)
        data = cursor.fetchall()

        if len(data) > 0:
            conn.close()
            return True, data[0].get('user_token')
        else:
            cursor.execute(write_new_user)
            conn.commit()
            conn.close()
            return [False]




def get_render_data(user_id, conection_cur):
    conn = conection_cur()
    with conn.cursor() as cursor:
        select_by_telegram_id = "SELECT `render_status` FROM `users` WHERE `telegram_id` = '{}'".format(user_id)
        cursor.execute(select_by_telegram_id)
        data = cursor.fetchone()
        conn.close()

        return json.loads(data.get("render_status"))






