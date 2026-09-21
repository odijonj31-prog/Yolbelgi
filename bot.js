// YoʻlBelgi Telegram boti (Vercel serverless funksiya). Fayl joylashuvi: api/bot.js
const crypto = require('crypto');

const QUESTIONS = [{"q":"Xavfsizlik kamarini kimlar taqishi shart?","o":["Faqat haydovchi","Haydovchi va old oʻrindiqdagi yoʻlovchi","Haydovchi va kamar bilan jihozlangan oʻrindiqlardagi yoʻlovchilar","Faqat shahar tashqarisida haydovchi"],"a":2,"e":"Kamar bor har bir oʻrindiqda uni taqish kerak. Kamar toʻqnashuvda jarohat xavfini sezilarli kamaytiradi."},{"q":"Svetofor ishorasi tartibga soluvchi (inspektor) ishorasiga zid boʻlsa, kimga boʻysunish kerak?","o":["Tartibga soluvchiga","Svetoforga","Yoʻl belgisiga","Oldingi haydovchiga"],"a":0,"e":"Tartibga soluvchining ishoralari svetofor va yoʻl belgilaridan ustun turadi."},{"q":"Harakatni 10 daqiqagacha toʻxtatish nima deyiladi?","o":["Toʻxtash","Toʻxtab turish","Tormozlash","Qayrilib olish"],"a":0,"e":"Toʻxtash: harakatni 10 daqiqagacha toʻxtatish. Atayin 10 daqiqadan koʻp toʻxtatish esa toʻxtab turish deyiladi."},{"q":"Quyidagilardan qaysi joyda toʻxtash taqiqlanadi?","o":["Temir yoʻl kesishmasida","Yoʻlning oʻng tomonidagi yoʻl yoqasida","Ruxsat etilgan toʻxtash joyida","Aholi punktidan tashqarida, yoʻl yoqasida"],"a":0,"e":"Temir yoʻl kesishmalarida, tunnellarda va piyodalar oʻtish joylarida toʻxtash taqiqlanadi."},{"q":"Turar joy dahalari va yondosh hududlarda (uylar orasidagi maydonda) tezlik qancha boʻlishi mumkin?","o":["Soatiga 20 km dan oshmasligi kerak","Soatiga 40 km dan oshmasligi kerak","Soatiga 50 km dan oshmasligi kerak","Soatiga 60 km dan oshmasligi kerak"],"a":0,"e":"2022-yil tahriridagi YHQ boʻyicha turar joy dahalari va yondosh hududlarda tezlik soatiga 20 km dan oshmasligi kerak."},{"q":"Kunduzi kuchli yogʻingarchilikda (yomgʻir, qor) qanday chiroqlarni yoqish kerak?","o":["Yaqinni yorituvchi fara","Faqat gabarit chiroqlari","Uzoqni yorituvchi fara","Hech qanday chiroq shart emas"],"a":0,"e":"Kuchli yogʻingarchilikda kunduzi ham yaqinni yorituvchi fara yoqilishi kerak."},{"q":"Texnik tavsifnomada koʻrsatilganidan ortiq yoʻlovchi tashish mumkinmi?","o":["Yoʻq, bu taqiqlanadi","Ha, qisqa masofaga","Ha, agar yoʻl boʻsh boʻlsa","Faqat shahar ichida"],"a":0,"e":"Transport vositasining texnik tavsifnomasida koʻrsatilgan miqdordan ortiq odam tashish taqiqlanadi."},{"q":"Spirtli ichimlik ichgan haydovchi transport vositasini boshqarishi mumkinmi?","o":["Yoʻq, mast qiluvchi taʼsirida boshqarish taqiqlanadi","Ha, oz miqdorda ichgan boʻlsa","Ha, faqat kechasi","Ha, agar yaxshi his qilsa"],"a":0,"e":"Spirtli ichimlik, giyohvand yoki mast qiluvchi moddalar taʼsirida rul boshqarish qat’iy taqiqlanadi."},{"q":"Qizil signal bilan birga yashil strelka yonsa nima qilinadi?","o":["Faqat strelka koʻrsatgan yoʻnalishda, boshqa yoʻnalishdagilarga yoʻl berib harakatlanish mumkin","Hamma yoʻnalishda oʻtish mumkin","Toʻxtash shart, strelka ahamiyatsiz","Faqat orqaga yurish mumkin"],"a":0,"e":"Yashil strelka faqat koʻrsatilgan yoʻnalishda harakatga ruxsat beradi."},{"q":"Quvib oʻtishni boshlashdan oldin nimaga ishonch hosil qilish kerak?","o":["Qarshi tasma boʻsh, orqadagi haydovchi quvib oʻtishni boshlamagan, xavfsiz masofa bor","Faqat orqada mashina yoʻqligiga","Faqat oldingi mashina sekin ketayotganiga","Hech narsaga, signal berish yetarli"],"a":0,"e":"Quvib oʻtish xavfsiz boʻlishi uchun qarshi tomon boʻsh boʻlishi va sizni hech kim quvib oʻtmayotgan boʻlishi kerak."},{"q":"Quyidagi joylardan qaysi birida quvib oʻtish taqiqlanadi?","o":["Piyodalar oʻtish joyida","Toʻgʻri va koʻrinish yaxshi yoʻl qismida","Aholi punktidan tashqarida, boʻsh yoʻlda","Uzuq-uzuq chiziqli joyda"],"a":0,"e":"Piyodalar oʻtish joylarida, temir yoʻl kesishmalarida va koʻrinish cheklangan joylarda quvib oʻtish taqiqlanadi."},{"q":"Sizni quvib oʻtayotgan haydovchi nima qilishi kerak?","o":["Tezlikni oshirmasligi va quvib oʻtishga xalaqit bermasligi kerak","Tezlikni oshirishi kerak","Chap tomonga siljishi kerak","Signal berib, oʻtkazib yubormasligi kerak"],"a":0,"e":"Quvib oʻtilayotgan haydovchi tezlikni oshirmaydi va oʻtayotganga xalaqit bermaydi."},{"q":"Quvib oʻtish odatda qaysi tomondan amalga oshiriladi?","o":["Chap tomondan","Oʻng tomondan","Istalgan tomondan","Faqat trotuar tomondan"],"a":0,"e":"Quvib oʻtish odatda chap tomondan bajariladi."},{"q":"Burilish ishorasini (koʻrsatkichni) qachon yoqish kerak?","o":["Manyovr boshlanishidan oldin, boshqalar sezib ulgurishi uchun","Manyovr paytida","Burilib boʻlgach","Ishora umuman shart emas"],"a":0,"e":"Ishora manyovrdan oldin beriladi va u tugagach oʻchiriladi."},{"q":"Chapga burilishdan oldin, bir yoʻnalishda bir necha tasma boʻlsa, qaysi tasmaga oʻtish kerak?","o":["Chap chekka tasmaga","Oʻng chekka tasmaga","Istalgan tasmaga","Oʻrtadagi tasmaga"],"a":0,"e":"Boshqacha belgi yoki chiziq boʻlmasa, chapga burilish chap chekka tasmadan boshlanadi."},{"q":"Orqaga yurish qayerda taqiqlanadi?","o":["Chorrahalarda va piyodalar oʻtish joylarida","Toʻxtab turish joyida","Ombor hovlisida","Yon yoʻlda, xavfsiz boʻlsa"],"a":0,"e":"Chorrahalarda va piyodalar oʻtish joylarida orqaga yurish taqiqlanadi."},{"q":"“Yoʻl berish” nimani anglatadi?","o":["Boshqa haydovchini yoʻnalishi yoki tezligini oʻzgartirishga majbur qilmaslik","Toʻxtab, signal berish","Tezlikni oshirish","Ustunlikdan foydalanish"],"a":0,"e":"Yoʻl bergan haydovchi boshqalarni yoʻnalishi yoki tezligini oʻzgartirishga majbur qilmaydi."},{"q":"Chorrahada tirbandlik boʻlsa nima qilinadi?","o":["Chiqish yoʻli boʻsh boʻlmaguncha chorrahaga kirmaslik kerak","Baribir kirib, chorrahada toʻxtab turiladi","Signal berib oʻtiladi","Qarama-qarshi tasmaga chiqiladi"],"a":0,"e":"Chorrahaga kirib, harakatga toʻsqinlik qilib toʻxtab qolish mumkin emas."},{"q":"Yondosh hududdan (hovli, avtoturargoh) yoʻlga chiqayotgan haydovchi kimga yoʻl beradi?","o":["Yoʻlda harakatlanayotgan barcha transport va piyodalarga","Faqat piyodalarga","Faqat oʻngdan kelayotganlarga","Hech kimga"],"a":0,"e":"Yondosh hududdan chiqish joyi chorraha hisoblanmaydi: yoʻlda ketayotganlarga yoʻl beriladi."},{"q":"Tartibga soluvchining qoʻli yuqoriga koʻtarilgan boʻlsa, bu nimani bildiradi?","o":["Barcha yoʻnalishlarda harakat taqiqlanadi","Barcha yoʻnalishlarda ruxsat","Faqat oʻngga ruxsat","Faqat piyodalarga taqiq"],"a":0,"e":"Yuqoriga koʻtarilgan qoʻl signali: barcha yoʻnalishlarda toʻxtash."},{"q":"Toʻxtash chizigʻi nimani bildiradi?","o":["Qizil signal yoki STOP belgisi oldida toʻxtash joyini","Piyodalar oʻtish joyini","Qatnov qismi chetini","Toʻxtab turish zonasini"],"a":0,"e":"Toʻxtash chizigʻi boʻlsa, qizil signal yoki STOP belgisi oldida aynan shu chiziq oldida toʻxtaladi."},{"q":"Tunnelda toʻxtash mumkinmi?","o":["Yoʻq, tunnellarda toʻxtash taqiqlanadi","Ha, yoʻl boʻsh boʻlsa","Ha, avariya signali bilan","Faqat tunda"],"a":0,"e":"YHQ tunnellarda toʻxtashni taqiqlaydi."},{"q":"Yoʻlning qaysi tomonida toʻxtash va toʻxtab turishga odatda ruxsat etiladi?","o":["Yoʻlning oʻng tomonida, yoʻl yoqasida","Yoʻlning chap tomonida, qarshi tasmada","Yoʻl oʻrtasida","Trotuarda, istalgan joyda"],"a":0,"e":"Odatda yoʻlning oʻng tomonida, yoʻl yoqasida toʻxtash mumkin."},{"q":"Haydash paytida telefonni qoʻlda ushlab gaplashish mumkinmi?","o":["Yoʻq, taqiqlanadi","Ha, yoʻl boʻsh boʻlsa","Ha, qisqa qoʻngʻiroqqa","Faqat shahar tashqarisida"],"a":0,"e":"Qoʻlda ushlab telefondan foydalanish diqqatni chalgʻitadi va taqiqlanadi."},{"q":"Yoʻlga chiqishdan oldin haydovchi nimani tekshirishi shart?","o":["Transport vositasining texnik holatini (tormoz, rul, chiroqlar)","Faqat yonilgʻi miqdorini","Faqat radioni","Hech narsani"],"a":0,"e":"Tormoz, rul boshqaruvi va yoritish asboblari nosoz boʻlsa, harakatlanish taqiqlanadi."},{"q":"Charchagan yoki uyqusirayotgan haydovchi nima qilishi kerak?","o":["Xavfsiz joyda toʻxtab dam olishi kerak","Derazani ochib, tezlikni oshirishi kerak","Musiqani balandroq qoʻyishi kerak","Haydashda davom etishi kerak"],"a":0,"e":"Charchoq javob reaksiyasini sekinlashtiradi. Xavfsiz joyda toʻxtab dam oling."},{"q":"Tezlik oshganda tormozlash yoʻli qanday oʻzgaradi?","o":["Uzayadi","Qisqaradi","Oʻzgarmaydi","Faqat yomgʻirda uzayadi"],"a":0,"e":"Tezlik qancha yuqori boʻlsa, toʻxtash uchun shuncha uzoq masofa kerak boʻladi."},{"q":"Oldingi transport bilan masofa qanday tanlanadi?","o":["Keskin tormozlansa ham toqnashmaydigan darajada","Imkon qadar yaqin","Faqat 1 metr","Masofa ahamiyatsiz"],"a":0,"e":"Masofa oldingi transport keskin toʻxtasa, toqnashmaslik imkonini berishi kerak."},{"q":"Avariya signalini qachon yoqish kerak?","o":["Yoʻl-transport hodisasida yoki majburiy toʻxtaganda, boshqalarni ogohlantirish uchun","Har doim, tirband yoʻlda ketayotganda","Faqat tunda","Faqat yomgʻirda"],"a":0,"e":"Avariya signali boshqa haydovchilarni xavf haqida ogohlantiradi."},{"q":"Bolalarni avtomobilda tashishda nima talab qilinadi?","o":["Yoshi va boʻyiga mos maxsus bolalar oʻrindigʻi yoki tayanchi","Kattalar quchogʻida oʻtirishi kifoya","Bolalar kamarsiz oʻtirishi mumkin","Old oynaga yaqin turishi"],"a":0,"e":"Bolalar xavfsizligi uchun ularning yoshi va boʻyiga mos maxsus qurilma ishlatiladi."},{"q":"Tunda qarshidan mashina kelsa, uzoqni yorituvchi farani nima qilish kerak?","o":["Yaqinni yorituvchiga almashtirish kerak","Yoqib turish kerak","Oʻchirib qoʻyish kerak","Avariya signalini yoqish kerak"],"a":0,"e":"Qarshi haydovchining koʻzi qamashmasligi uchun yaqin faraga oʻtiladi."},{"q":"Tumanda koʻrinish yomonlashsa nima qilish kerak?","o":["Tezlikni kamaytirib, yaqinni yorituvchi (yoki tumanga qarshi) chiroqlarni yoqish","Uzoqni yorituvchi farani yoqib, tezlikni oshirish","Faqat gabarit yoqish","Avariya signali bilan tez yurish"],"a":0,"e":"Koʻrinish yomon boʻlsa, tezlikni kamaytirib, yoritish asboblarini yoqing."},{"q":"Muzlagan (sirpanchiq) yoʻlda qanday harakatlanish kerak?","o":["Tezlikni kamaytirib, masofani oshirib, keskin tormozlamasdan","Odatdagidek, tezlikni oshirib","Keskin tormoz berib","Faqat tez yurib"],"a":0,"e":"Sirpanchiq yoʻlda ilashish kam: tekis, past tezlikda va katta masofa bilan yuring."},{"q":"Yomgʻirda tezlikni kamaytirish nega kerak?","o":["Gʻildiraklarning yoʻl bilan ilashishi yomonlashadi, tormozlash yoʻli uzayadi","Shina tezroq eskiradi","Ovoz baland chiqadi","Yonilgʻi kam sarflansin"],"a":0,"e":"Ho‘l yoʻlda ilashish kamayadi va toʻxtash masofasi uzayadi."},{"q":"Maxsus ovoz va miltillovchi chiroq bilan ketayotgan transportga nima qilish kerak?","o":["Yoʻl berish","Tezlikni oshirish","Orqasidan ergashish","Hech narsa"],"a":0,"e":"Maxsus signalli tez yordam, yongʻin va politsiya transportiga yoʻl bering."},{"q":"Mototsikl haydovchisi va yoʻlovchisi nima taqishi shart?","o":["Mototsikl dubulgʻasi (shlem)","Faqat koʻzoynak","Faqat qoʻlqop","Hech narsa"],"a":0,"e":"Dubulgʻa bosh jarohatidan himoya qiladi va taqish shart."},{"q":"Yoʻlda hayvonlar chiqib qolsa nima qilish kerak?","o":["Tezlikni kamaytirish, zarur boʻlsa toʻxtash","Signal berib tezlikni oshirish","Ustidan oʻtib ketish","Fara miltillatib oʻtish"],"a":0,"e":"Hayvonlarning harakatini oldindan aytib boʻlmaydi: tezlikni kamaytiring yoki toʻxtang."},{"q":"Temir yoʻl kesishmasida shlagbaum yopilayotgan yoki yopiq boʻlsa nima qilish kerak?","o":["Oʻtish taqiqlanadi, toʻxtab kutish kerak","Tez oʻtib olish kerak","Shlagbaum tagidan oʻtish mumkin","Faqat yengil avtomobil oʻtishi mumkin"],"a":0,"e":"Yopilayotgan yoki yopiq shlagbaum oldida toʻxtab, poyezd oʻtishini kuting."},{"q":"Temir yoʻl kesishmasidagi qizil miltillovchi signal nimani bildiradi?","o":["Poyezd yaqinlashmoqda, oʻtish taqiqlanadi","Oʻtishga ruxsat","Tezlikni oshirish kerak","Faqat piyodalarga ruxsat"],"a":0,"e":"Qizil miltillovchi signal yonganda kesishmadan oʻtish taqiqlanadi."},{"q":"Piyoda tunda yoʻlda yurganda nimadan foydalanishi kerak?","o":["Yorugʻlik qaytaruvchi elementlardan","Qora kiyimdan","Quloqchindan","Hech narsadan"],"a":0,"e":"Yorugʻlik qaytaruvchi element piyodani haydovchilarga uzoqdan koʻrsatadi."},{"q":"Piyoda yoʻlni qayerda kesib oʻtishi kerak?","o":["Piyodalar oʻtish joylarida","Istalgan joyda","Faqat chorraha oʻrtasida","Faqat tunda"],"a":0,"e":"Yoʻlni belgilangan piyodalar oʻtish joylaridan kesib oʻtish xavfsiz."},{"q":"Piyoda yoʻlga chiqishdan oldin nima qilishi kerak?","o":["Transport yaqinlashmayotganiga ishonch hosil qilishi","Yugurib oʻtishi","Qoʻl koʻtarib transportni toʻxtatishi","Telefonga qarab oʻtishi"],"a":0,"e":"Yoʻlga chiqishdan oldin transport kelayotganini tekshiring."},{"q":"YHQda “chorraha” deganda nima tushuniladi?","o":["Yoʻllarning bir sathda kesishadigan, tutashadigan va ayriladigan joyi","Faqat svetoforli joy","Faqat ikki yoʻl kesishgan joy","Yoʻlning burilish joyi"],"a":0,"e":"Chorraha: yoʻllar bir sathda kesishadigan, tutashadigan yoki ayriladigan joy. Yondosh hududdan chiqish joyi chorraha hisoblanmaydi."},{"q":"“Imtiyoz” (ustunlik) nima?","o":["Mo‘ljallangan yoʻnalishda boshqa qatnashchilarga nisbatan oldin harakatlanish huquqi","Tezlikni oshirish huquqi","Quvib oʻtish majburiyati","Toʻxtab turish huquqi"],"a":0,"e":"Imtiyoz boshqa yoʻl harakati qatnashchilariga nisbatan oldin harakatlanish huquqini beradi."},{"q":"Piyodalar yoʻlkasida (trotuarda) transport harakatlanishi mumkinmi?","o":["Yoʻq, piyodalar yoʻlkasida transport harakati taqiqlangan","Ha, agar yoʻl band boʻlsa","Ha, tunda","Ha, yengil avtomobillarga"],"a":0,"e":"Piyodalar yoʻlkasi piyodalar uchun moʻljallangan, transport vositalari harakati taqiqlangan qism."},{"q":"Yoʻl belgisi va svetofor ishorasi bir-biriga zid boʻlsa, qaysi biriga amal qilinadi?","o":["Svetofor ishorasiga","Yoʻl belgisiga","Yoʻl chizigʻiga","Qaysi biri qulay boʻlsa"],"a":0,"e":"Svetofor ishoralari yoʻl belgilaridan ustun turadi."},{"q":"Yoʻlning qaysi tomonida harakatlaniladi?","o":["Oʻng tomonida","Chap tomonida","Oʻrtasida","Istalgan tomonida"],"a":0,"e":"Oʻzbekistonda oʻng tomonlama harakat: transport yoʻlning oʻng tomonida yuradi."},{"q":"Old oʻrindiqdagi yoʻlovchi xavfsizlik kamarini taqishi kerakmi?","o":["Ha, shart","Yoʻq, faqat haydovchi","Faqat shahar tashqarisida","Faqat tunda"],"a":0,"e":"Kamar haydovchi va yoʻlovchilar uchun, jumladan old oʻrindiqdagi yoʻlovchi uchun ham majburiy."}];

const TOKEN = process.env.BOT_TOKEN;
const ADMIN = process.env.ADMIN_ID; // ixtiyoriy: murojaatlar shu ID ga yuboriladi
const secretOf = t => crypto.createHash('sha256').update(t).digest('hex').slice(0, 40);
const api = (method, body) =>
  fetch(`https://api.telegram.org/bot${TOKEN}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body || {})
  }).then(r => r.json());

const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

const BTN = { quiz: '🎲 Tasodifiy savol', signs: '🪧 Belgilar turlari', help: 'ℹ️ Yordam', contact: '✉️ Murojaat' };

const mainKeyboard = url => ({
  keyboard: [
    [{ text: '🚦 Ilovani ochish', web_app: { url } }],
    [{ text: BTN.quiz }, { text: BTN.signs }],
    [{ text: BTN.help }, { text: BTN.contact }]
  ],
  resize_keyboard: true,
  is_persistent: true
});

const say = (chat_id, text, extra) => api('sendMessage', Object.assign({ chat_id, text }, extra || {}));

async function sendQuiz(chat_id) {
  const q = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
  const order = shuffle([0, 1, 2, 3]);
  const r = await api('sendPoll', {
    chat_id,
    question: q.q,
    options: order.map(k => q.o[k]),
    type: 'quiz',
    correct_option_id: order.indexOf(q.a),
    explanation: q.e || undefined,
    is_anonymous: false
  });
  if (!r.ok) await say(chat_id, "Savolni yuborib boʻlmadi. Birozdan soʻng qayta urinib koʻring.");
}

async function onMessage(m, appUrl) {
  if (!m.chat || m.chat.type !== 'private') return;
  const chat = m.chat.id;
  const text = (m.text || '').trim();

  if (text.startsWith('/start')) {
    const name = (m.from && m.from.first_name) || 'doʻst';
    await say(chat,
      `Assalomu alaykum, ${name}! 🚦\n\nYoʻlBelgi bilan haydovchilik imtihoniga tayyorlaning:\n• 100 ta savol va yoʻl belgilari rasmlari\n• Mavzular boʻyicha mashq va imtihon\n• Xatolar daftari\n\nBoshlash uchun pastdagi tugmani bosing 👇`,
      { reply_markup: { inline_keyboard: [
        [{ text: '🚦 Ilovani ochish', web_app: { url: appUrl } }],
        [{ text: BTN.quiz, callback_data: 'quiz' }]
      ] } });
    return say(chat, 'Asosiy menyudasiz 👇', { reply_markup: mainKeyboard(appUrl) });
  }
  if (text.startsWith('/savol') || text === BTN.quiz) return sendQuiz(chat);
  if (text.startsWith('/belgilar') || text === BTN.signs) {
    return say(chat,
      '🪧 Yoʻl belgilari guruhlari\n\n🔺 Ogohlantiruvchi: qizil hoshiyali uchburchak\n⭕ Taqiqlovchi: qizil hoshiyali doira\n🔵 Buyuruvchi: koʻk doira\n🟦 Axborot-koʻrsatkich: koʻk toʻrtburchak\n🔶 Imtiyoz: chorrahada oʻtish navbatini belgilaydi\n\nBarcha belgilarni rasmlari bilan ilovada koʻring.',
      { reply_markup: { inline_keyboard: [[{ text: '🚦 Ilovani ochish', web_app: { url: appUrl } }]] } });
  }
  if (text.startsWith('/yordam') || text.startsWith('/help') || text === BTN.help) {
    return say(chat,
      'ℹ️ Yordam\n\n🚦 Ilovani ochish: savollar, imtihon, xatolar daftari\n🎲 Tasodifiy savol: chatning oʻzida test\n🪧 Belgilar turlari: qisqa maʼlumot\n✉️ Murojaat: savol yoki taklif yuborish\n\nBuyruqlar: /start /savol /belgilar /yordam');
  }
  if (text === BTN.contact) {
    return say(chat, ADMIN
      ? '✉️ Savol yoki taklifingizni shu yerga yozib yuboring. Xabaringiz adminga yetkaziladi.'
      : '✉️ Murojaat hozircha sozlanmagan.');
  }
  if (text && !text.startsWith('/') && ADMIN) {
    await api('forwardMessage', { chat_id: ADMIN, from_chat_id: chat, message_id: m.message_id });
    return say(chat, 'Qabul qilindi ✅ Tez orada javob beramiz.');
  }
  if (text) return say(chat, 'Pastdagi tugmalardan foydalaning yoki /yordam ni bosing.', { reply_markup: mainKeyboard(appUrl) });
}

async function onCallback(cb) {
  await api('answerCallbackQuery', { callback_query_id: cb.id });
  if (cb.data === 'quiz' && cb.message) return sendQuiz(cb.message.chat.id);
}

async function onPollAnswer(pa) {
  if (!pa.user) return;
  return say(pa.user.id, 'Yana bitta savol?', {
    reply_markup: { inline_keyboard: [[{ text: '🎲 Yana savol', callback_data: 'quiz' }]] }
  });
}

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  if (!TOKEN) return res.status(500).send('BOT_TOKEN topilmadi. Vercel > Settings > Environment Variables ga qoʻshing va Redeploy qiling.');

  const host = process.env.VERCEL_PROJECT_PRODUCTION_URL || req.headers['x-forwarded-host'] || req.headers.host;
  const appUrl = `https://${host}`;

  // Brauzerda ochilsa: botni bir marta sozlaydi
  if (req.method === 'GET') {
    const wh = await api('setWebhook', {
      url: `${appUrl}/api/bot`,
      secret_token: secretOf(TOKEN),
      allowed_updates: ['message', 'callback_query', 'poll_answer'],
      drop_pending_updates: true
    });
    await api('setMyCommands', { commands: [
      { command: 'start', description: 'Botni boshlash' },
      { command: 'savol', description: 'Tasodifiy savol' },
      { command: 'belgilar', description: 'Belgilar turlari' },
      { command: 'yordam', description: 'Yordam' }
    ] });
    await api('setChatMenuButton', { menu_button: { type: 'web_app', text: 'Ochish', web_app: { url: appUrl } } });
    return res.status(200).send(wh.ok
      ? `✅ Tayyor! Bot sozlandi.\nIlova manzili: ${appUrl}\nEndi botingizda /start ni bosing.`
      : `❌ Xato: ${wh.description || 'nomaʼlum'}`);
  }

  if (req.headers['x-telegram-bot-api-secret-token'] !== secretOf(TOKEN)) return res.status(401).send('no');
  try {
    let u = req.body;
    if (typeof u === 'string') u = JSON.parse(u);
    if (u.message) await onMessage(u.message, appUrl);
    else if (u.callback_query) await onCallback(u.callback_query);
    else if (u.poll_answer) await onPollAnswer(u.poll_answer);
  } catch (e) { console.error(e); }
  return res.status(200).send('ok');
};
