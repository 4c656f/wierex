import telebot
from telebot import types
import threading
import response




bot = telebot.TeleBot('')


def change_text(chat_id, message_id, user_id):

        if response.checkrender_status_loop(user_id):

            try:
                bot.edit_message_text(response.render_status_get(user_id)[1] , chat_id, message_id)
            except:
                print('message was the same')

            t = threading.Timer(1, change_text, args=(chat_id, message_id, user_id))
            t.start()
        else:

            try:
                bot.edit_message_text(response.render_status_get(user_id)[1] , chat_id, message_id)
            except:
                print('message was the same')



bot.set_my_commands([
    telebot.types.BotCommand("/generate_token", "Generate token"),
    telebot.types.BotCommand("/get_render", "get render info"),
])


@bot.message_handler(content_types = ['text'])
def get_text(message):
    if message.text.lower() == '/start':
        bot.send_message(message.chat.id, 'Hi! My comands: \n /generate_token  \n /get_render')


    if message.text.lower() == '/generate_token':

        bot.send_message(message.chat.id, response.register_user(message.from_user.username) ,parse_mode= 'MarkdownV2')



    elif message.text.lower() == '/get_render':

        sendet = bot.send_message(message.chat.id, '1')


        #bot.edit_message_text('Edit test', message.chat.id, sendet.message_id)
        change_text(message.chat.id, sendet.message_id, message.from_user.username)
        #photo = bot.send_photo(message.chat.id, img)

        #photo

        #change_image()

        #bot.edit_message_media(types.InputMedia(type='photo', media=img), message.chat.id, photo.message_id)







bot.polling(none_stop = True, interval = 0)