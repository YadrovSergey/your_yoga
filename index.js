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

const mainKeyboard = Markup.keyboard([["Меню"]]).resize();

const menu = Markup.inlineKeyboard([
  [Markup.button.url("Абонементы", "https://yyogasochi.ru/#subscription")],
]);

bot.start(async (ctx) => {
  await ctx.reply(greetingText, mainKeyboard);
});

bot.hears(/^хочу$/i, async (ctx) => {
  await ctx.reply(
    "Отлично, начинаем мягко и спокойно 🙌\n\nПробное занятие подойдет даже без опыта. С собой только удобная одежда, остальное есть в студии.",
    mainKeyboard
  );
});

bot.command("menu", async (ctx) => {
  await ctx.reply("Быстрый доступ к разделам:", menu);
});

bot.hears(/^меню$/i, async (ctx) => {
  await ctx.reply("Быстрый доступ к разделам:", menu);
});

bot.on("text", async (ctx) => {
  await ctx.reply("Я пока понимаю команды /start, /menu, кнопку «Меню» и слово «Хочу».", mainKeyboard);
});

bot.launch().then(() => {
  console.log("Yoga bot is running...");
});

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
