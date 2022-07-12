import os
import c4d
from urllib import request

import json
from c4d import plugins, bitmaps
from c4d.documents import GetBatchRender
import threading


from datetime import datetime



symbols = type('', (), {
    'DLG_TELEGRAMBOT': 10001,
    'GRP_ALL': 10002,
    'GRP_TEXT': 10003,
    'PASSWORD': 10004,
    'BTN_ENTER': 10005,
    'GRP_CONTROL': 10006,
    'BTN_OPENBR': 10007,
    'BTN_SYNCH': 10008

})

batchrender = GetBatchRender()


PLUGIN_ID = 1057438



def render_count():
    job_count = batchrender.GetElementCount();
    return job_count

#функция записи

def write(data):
    data_json = [{'write_status': True, 'id': '{}'.format(data)}]

    with open('{}/res/user.json'.format(os.path.dirname(__file__)), 'w') as file:
        json.dump(data_json, file, indent = 4)

#функция запроса с id из input
def json_encode(data):
    return json.dumps(data)

def response(userid):

    data = {"type": "user_request", "user_token": userid}
    try:





        req = request.Request("http://127.0.0.1:9001/c4d/")
        req.add_header('Content-Type', 'application/json; charset=utf-8')
        jsondata = json_encode(data)
        jsondataasbytes = jsondata.encode('utf-8')  # needs to be bytes
        req.add_header('Content-Length', len(jsondataasbytes))
        response = request.urlopen(req, jsondataasbytes)
        page_readed = response.read().decode()

        response.close()

    except:
        print("user id check error")
        return False





    if page_readed == 'true':
        write(userid)
        return  True
    else:
        return False

#фнукция проверки статуса верификации








#функция получения id из записанного файла для установки его в EDITTEXT

def user_id_file():
    jsonfile = open('{}/res/user.json'.format(os.path.dirname(__file__)), 'r')

    jsondata = json.loads(jsonfile.read())
    user_id = jsondata[0].get('id')
    return user_id

#функция проверки была ли записана информация в файл json
def check_write_status():
    jsonfile = open('{}/res/user.json'.format(os.path.dirname(__file__)), 'r')

    jsondata = json.loads(jsonfile.read())
    write_status = jsondata[0].get('write_status')

    if not write_status:
        return False
    elif write_status and response(user_id_file()):
        return True

#функция открытия рендера

def open_batch_render():
    batchrender.Open()




#функция проверки идёт ли рендер
def check_job_status(job_num):
    jobstatus = batchrender.GetJsonJobs()


    jobstatusarr = jobstatus[job_num].get('status')
    return jobstatusarr

#цикл отправки на сервер информации
def send_to_server(msg):

    data = {"type": "render_status", "user_token": user_id_file(), "render_information": msg}

    try:

        req = request.Request("http://127.0.0.1:9001/c4d/")
        req.add_header('Content-Type', 'application/json; charset=utf-8')
        jsondata = json_encode(data)
        jsondataasbytes = jsondata.encode('utf-8')  # needs to be bytes
        req.add_header('Content-Length', len(jsondataasbytes))
        response = request.urlopen(req, jsondataasbytes)

        response.close()








    except:
        print("exeption send_to_server")
    #response = urllib2.urlopen("http://109.107.173.92:8081/c4d/?user_token={}&type=render_status&render_information={}".format(user_id_file(), msg), context=context)






def time_left(job_var):
    estimated_time = job_var.get('estimated_time')
    render_time = job_var.get('render_time')
    time = datetime.strptime(estimated_time[:-1], "%H:%M:%S") - datetime.strptime(render_time[:-1], "%H:%M:%S")

    return str(time)
#составляем рендер информацию

def send_render_info():

    render_progress = ''

    job_list = []
    job_dict = {}

    jobstatus = batchrender.GetJsonJobs()




    for i in batchrender.GetJsonJobs()[::-1]:


        if i.get('status') == 'In Progress':
            time = time_left(i)
        else:
            time = '00:00:00'




        dict = {"progress": i.get('progress'), "time": time, "file_name": i.get('filename'), "status": i.get('status')}
        job_dict[i.get('uuid')] = dict
        job_list.append(dict)













    if response(user_id_file()):

        send_to_server(job_dict)

    else:
        print('Wrong cde')



    jobstatus = None


def check_job_status_loop():

    if render_count() == 1:
        if check_job_status(0) == 'In Progress':
            return True
        else:
            return False
    elif render_count() > 1:
        check = True
        for i in range(render_count()):
            if check_job_status(i) == 'In Progress':
                check = True
                break

            else:
                check = False

        return check



def check_render_process():
    if check_job_status_loop():
        send_render_info()
        threading.Timer(1, check_render_process).start()


    else:
        send_render_info()
        return True








class ExampleDialog(c4d.gui.GeDialog):






    def CreateLayout(self):

        self.LoadDialogResource(symbols.DLG_TELEGRAMBOT)
        if not check_write_status():
            self.Enable(symbols.GRP_CONTROL, False)



        elif check_write_status():
            self.SetString(symbols.PASSWORD, user_id_file())
            self.SetString(symbols.GRP_TEXT, 'Your code is active ✓')


            self.Enable(symbols.GRP_CONTROL, True)
        else:
            self.Enable(symbols.GRP_CONTROL, False)

        return True





    def Command(self, messageId, bc):

        #self.SetString(symbols.PASSWORD, 'proverka')
        #print('1')
        """if messageId == symbols.PASSWORD:
            id = self.GetString(symbols.PASSWORD)
            write_status = check_write_status(1)
            if write_status == False:
                responce = response(id)

                vstatus = check_verify(responce)
                if vstatus == True:
                    write(responce)
                    self.SetString(symbols.PASSWORD, user_id_file(1))
                    print("Регистрация прошла успешно")
                    self.SetString(symbols.GRP_TEXT, 'Your code is active ✓')
                    self.Enable(symbols.PASSWORD, False)
                    self.Enable(symbols.BTN_OPENBR, False)
                elif vstatus == False:
                    self.SetString(symbols.GRP_TEXT, 'Wrong code ×')
                    print("Код не верен")
            elif write_status == True:
                self.SetString(symbols.PASSWORD, user_id_file(1))
                print("Регистрация прошла успешно")
                self.SetString(symbols.GRP_TEXT, 'Your code is active ✓')
                self.Enable(symbols.PASSWORD, False)
                self.Enable(symbols.BTN_OPENBR, False)



            return True
        """

        if messageId == symbols.BTN_ENTER:

            id = self.GetString(symbols.PASSWORD)

            responce = response(id)
            if responce == False:
                self.SetString(symbols.GRP_TEXT, 'Wrong code')
            elif responce == True:
                self.SetString(symbols.PASSWORD, user_id_file())

                self.SetString(symbols.GRP_TEXT, 'Your code is active ✓')

                self.Enable(symbols.GRP_CONTROL, True)

            else:
                self.SetString(symbols.GRP_TEXT, 'Wrong code')
            return True


        if messageId == symbols.BTN_OPENBR:
            open_batch_render()


            return True
        if messageId == symbols.BTN_SYNCH:
            if check_job_status_loop():
                check_render_process()
                return True
            else:
                c4d.gui.MessageDialog("render is not running")
                check_render_process()
                return True


            return True





        return True








class ExampleDialogCommand(c4d.plugins.CommandData):

    dialog = None

    def Execute(self, doc):

        if self.dialog is None:
            self.dialog = ExampleDialog()

        return self.dialog.Open(dlgtype=c4d.DLG_TYPE_ASYNC, pluginid=PLUGIN_ID, defaultw=0, defaulth=0)



    def RestoreLayout(self, sec_ref):

        if self.dialog is None:
            self.dialog = ExampleDialog()


        return self.dialog.Restore(pluginid=PLUGIN_ID, secret=sec_ref)
















if __name__ == "__main__":

        # if write_status == True:
        icon_absolute_path = os.path.join(os.path.dirname(__file__), 'res/icons', 'icon.png')
        plugin_icon = bitmaps.BaseBitmap()
        plugin_icon.InitWith(icon_absolute_path)



        plugins.RegisterCommandPlugin(id=PLUGIN_ID,
                                          str="Wierex",
                                          info=0,
                                          help="Wierex",
                                          dat=ExampleDialogCommand(),
                                          icon=plugin_icon)






#BITMAP_ICON_OK = c4d.bitmaps.BaseBitmap()
#BITMAP_ICON_OK.InitWith(options['icon-ok'])