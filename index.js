require("dotenv").config();
const { Telegraf, Markup } = require("telegraf");

const token = process.env.BOT_TOKEN;

if (!token) {
  throw new Error("BOT_TOKEN is missing. Add it to .env file.");
}

const bot = new Telegraf(token);

const greetingText = `🌿 Привет-привет! Ты зашёл(ла) по ссылке из нашего мира — значит, что-то внутри уже откликнулось.
Я — бот студии «Твоя йога».
Здесь нет сложных слов и «надо быть гибким с рождения». Здесь вообще ничего не надо. Но если хочется — можно начать.
Я помогу:
• разобраться, с чего вообще начать новичку
• выбрать первую мягкую практику
• и ничего не сломать в голове и теле 😌

📌 Если ты никогда не занимался(лась) йогой — это место для тебя.
Напиши в ответ «Хочу» — и я расскажу, как выглядит самое спокойное первое занятие без глупостей.`;

const trialText = `Пробное занятие:
• С собой нужна только удобная одежда.
• Всё остальное у нас есть в студии.

Если хочешь, могу сразу отправить расписание для записи.`;

const faqText = `Ответы на частые вопросы:
• Нужна ли специальная подготовка? — Нет, можно с нуля.
• Что взять с собой? — Удобную одежду, всё остальное есть.
• Если есть ограничения по здоровью? — Напиши тренеру перед занятием, подберем мягкий формат.`;

const menu = Markup.inlineKeyboard([
  [Markup.button.url("Абонементы", "https://yyogasochi.ru/#subscription")],
  [Markup.button.callback("Пробное занятие", "trial")],
  [Markup.button.url("Расписание", "https://yyogasochi.ru/schedule")],
  [Markup.button.url("Записаться", "https://yyogasochi.ru/schedule")],
  [Markup.button.callback("Ответы на вопросы", "faq")],
]);

bot.start(async (ctx) => {
  await ctx.reply(greetingText, menu);
});

bot.hears(/^хочу$/i, async (ctx) => {
  await ctx.reply(
    "Отлично, начинаем мягко и спокойно 🙌\n\nПробное занятие подойдет даже без опыта. С собой только удобная одежда, остальное есть в студии.",
    menu
  );
});

bot.command("menu", async (ctx) => {
  await ctx.reply("Быстрый доступ к разделам:", menu);
});

bot.action("trial", async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply(trialText, menu);
});

bot.action("faq", async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply(faqText, menu);
});

bot.on("text", async (ctx) => {
  await ctx.reply("Я пока понимаю команды /start, /menu и слово «Хочу».", menu);
});

bot.launch().then(() => {
  console.log("Yoga bot is running...");
});

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
