import logging
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, BotCommand
from telegram.ext import Application, CommandHandler, ContextTypes, CallbackQueryHandler

# НАСТРОЙКИ - ЗАМЕНИ НА СВОИ
BOT_TOKEN = "8709027085:AAEBcFrF9720mtNVBI-SvRWbeyEaj63hdR8"
FRONTEND_URL = "https://hunanuki.github.io/bot_pervye/frontend"

# Включаем логирование
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Отправляет приветственное сообщение с главным меню"""
    user = update.effective_user

    keyboard = [
        [InlineKeyboardButton("🎮 ОТКРЫТЬ ПРИЛОЖЕНИЕ", web_app={"url": FRONTEND_URL})],
        [InlineKeyboardButton("❓ FAQ", callback_data="faq")],
        [InlineKeyboardButton("💬 ТЕМАТИЧЕСКИЕ ЧАТЫ", callback_data="chats")],
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)

    welcome_text = (
        f"👋 Привет, {user.first_name}!\n\n"
        f"Мы рады видеть тебя в рядах Киберспортсменов Первых!\n\n"
        f"В этом боте ты сможешь найти:\n"
        f"👾 Рейтинг команд и участников\n"
        f"(жми \"ОТКРЫТЬ ПРИЛОЖЕНИЕ\")\n"
        f"👾 Ответы на все интересующие тебя вопросы\n"
        f"(жми \"FAQ\")\n"
        f"👾 Профильные чаты по дисциплинам, где ты сможешь найти игроков в команду\n"
        f"(жми \"ТЕМАТИЧЕСКИЕ ЧАТЫ\")\n\n"
        f"Дерзай, увидимся на Турнире 💥"
    )

    await update.message.reply_text(
        welcome_text,
        reply_markup=reply_markup
    )

async def handle_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обрабатывает нажатия на кнопки"""
    query = update.callback_query
    await query.answer()

    if query.data == "faq":
        faq_text = (
            "❓ **Часто задаваемые вопросы:**\n\n"
            "✅ **Кто организатор?**\n"
            "Региональное отделение «Движения Первых» Пермского края.\n\n"
            "✅ **Кто может участвовать?**\n"
            "Если ты школьник, студент колледжа или университета. Главное, чтобы твой возраст соответствовал регламенту турнира:\n"
            "− Minecraft (от 12 лет);\n"
            "− DOTA 2 (от 16 лет);\n"
            "− UFC (от 18 лет);\n"
            "− автосимулятор Assetto Corsa (от 12 лет);\n"
            "− FIFA (от 12 лет);\n"
            "− арена виртуальной реальности «ВАРПОИНТ» (от 12 лет).\n\n"
            "✅ **Обязательно ли наличие наставника?**\n"
            "Да, команды создаются наставником (педагог старше 18 лет). Отсутствие наставника влечет дисквалификацию команды.\n\n"
            "✅ **Можно ли участвовать одному?**\n"
            "Да, в зависимости от дисциплины. Наставник, как и в командных дисциплинах, создает отдельную команду под тебя (в названии можешь указать свой ник).\n\n"
            "✅ **Можно ли участвовать, если я не из Пермского края?**\n"
            "Да, ты можешь принять участие в межрегиональных играх. Для получения более подробной информации о включении в список участников обратись в свое региональное отделение «Движения Первых».\n\n"
            "✅ **Как зарегистрироваться?**\n"
            "1️⃣ Наставнику необходимо выбрать соответствующую дисциплину на странице проекта и создать команду на сайте проекта. Название команды должно быть сформулировано на русском языке, написано кириллицей и не носить оскорбительный характер.\n"
            "2️⃣ Наставник команды направляет из личного кабинета ссылку-приглашение участникам для вступления в команду.\n"
            "3️⃣ Участники присоединяются к команде по ссылке-приглашению от наставника.\n\n"
            "✅ **Что значит система рейтинга?**\n"
            "При прохождении каждого этапа турнира в дисциплине ты будешь получать баллы. Отслеживать их можно прямо в этом боте.\n"
            "Результаты победителей и призеров по итогам 5 сезона являются промежуточными и переносятся в 6 сезон.\n"
            "Соответственно, если ты участвуешь и в 5, и в 6 сезоне, у тебя больше шансов на победу! Если у тебя что-то не получилось в 5 сезоне — не расстраивайся и участвуй в 6 сезоне, шанс на победу всегда есть!\n\n"
            "✅ **Какие призовые?**\n"
            "В этом году для победителей 6 сезона мы подготовили действительно крутой призовой фонд: клавиатуры, кубки, подарочные сертификаты в магазины техники, наушники и др.\n"
            "Полный список смотри в Положении.\n"
            "Для победителей 5 сезона также предусмотрены приятные бонусы (для участников из Пермского края).\n\n"
            "✅ **Участие бесплатное?**\n"
            "Абсолютно! Тебе ничего не нужно платить.\n\n"
            "✅ **Где публикуется информация?**\n"
            "Открывай вкладку «Социальные сети» в приложении этого бота — там публикуются все обновления.\n\n"
            "✅ **Не нашел ответ на свой вопрос?**\n"
            "Напиши куратору проекта — Савелию Александровичу. Уверены, что сможем найти ответы на все интересующие тебя вопросы!"
        )
        await query.edit_message_text(
            faq_text,
            parse_mode="Markdown",
            reply_markup=InlineKeyboardMarkup([[
                InlineKeyboardButton("🔙 Назад", callback_data="back_to_main")
            ]])
        )

    elif query.data == "chats":
        keyboard = [
            [InlineKeyboardButton("🎮 DOTA 2", url="https://t.me/+mA_eyYzFiAA0MzMy")],
            [InlineKeyboardButton("⚽ FIFA", url="https://t.me/+6m6QRcszaNw0NGMy")],
            [InlineKeyboardButton("🕶️ ВАРПОИНТ", url="https://t.me/+TfS_gNWuZQZkY2Vi")],
            [InlineKeyboardButton("🔙 Назад", callback_data="back_to_main")],
        ]
        await query.edit_message_text(
            "Выберите чат по дисциплине:",
            reply_markup=InlineKeyboardMarkup(keyboard)
        )

    elif query.data == "back_to_main":
        keyboard = [
            [InlineKeyboardButton("🎮 ОТКРЫТЬ ПРИЛОЖЕНИЕ", web_app={"url": FRONTEND_URL})],
            [InlineKeyboardButton("❓ FAQ", callback_data="faq")],
            [InlineKeyboardButton("💬 ТЕМАТИЧЕСКИЕ ЧАТЫ", callback_data="chats")],
        ]
        await query.edit_message_text(
            "Главное меню:",
            reply_markup=InlineKeyboardMarkup(keyboard)
        )

async def set_commands(application: Application):
    """Устанавливает кнопку меню в Telegram (только /start)"""
    commands = [
        BotCommand("start", "🎮 Открыть мини-приложение"),
    ]
    await application.bot.set_my_commands(commands)
    print("✅ Команды обновлены: удалена /help")

def main():
    """Запуск бота"""
    application = Application.builder().token(BOT_TOKEN).build()

    # Добавляем обработчики
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CallbackQueryHandler(handle_callback))

    # Устанавливаем кнопку меню в Telegram
    application.job_queue.run_once(set_commands, 0, data=application)

    print("✅ Бот запущен с поддержкой Web Apps!")
    print("📱 Кнопка меню появится в поле ввода сообщения")
    print("🔗 URL приложения:", FRONTEND_URL)
    application.run_polling()

if __name__ == "__main__":
    main()