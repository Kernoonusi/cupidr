import type { AutocompleteOption } from "@skeletonlabs/skeleton";

const cities = [
  "Абаза",
  "Абакан",
  "Абдулино",
  "Абзаково",
  "Абинск",
  "Абрау-Дюрсо",
  "Авдеевка",
  "Агидель",
  "Агрыз",
  "Адлер",
  "Адыгейск",
  "Азнакаево",
  "Азов",
  "Ак-Довурак",
  "Аксай",
  "Алагир",
  "Алапаевск",
  "Алатырь",
  "Алдан",
  "Алейск",
  "Александров",
  "Александровск",
  "Александровск",
  "Александровск-Сахалинский",
  "Алексеевка",
  "Алексин",
  "Алзамай",
  "Алупка",
  "Алушта",
  "Алчевск",
  "Альметьевск",
  "Алёшки(Цюрупинск)",
  "Амвросиевка",
  "Амурск",
  "Анадырь",
  "Анапа",
  "Ангарск",
  "Андреаполь",
  "Анжеро-Судженск",
  "Анива",
  "Антрацит",
  "Апатиты",
  "Апрелевка",
  "Апшеронск",
  "Арамиль",
  "Аргун",
  "Ардатов",
  "Ардон",
  "Арзамас",
  "Аркадак",
  "Армавир",
  "Армянск",
  "Арсеньев",
  "Арск",
  "Артём",
  "Артёмово(город)",
  "Артёмовск",
  "Артёмовск",
  "Артёмовск",
  "Артёмовский",
  "Архангельск",
  "Архипо-Осиповка",
  "Архыз",
  "Асбест",
  "Асино",
  "Астрахань",
  "Аткарск",
  "Ахтубинск",
  "Ачинск",
  "Аша",
  "Бабаево",
  "Бабушкин",
  "Бавлы",
  "Багратионовск",
  "Байкальск",
  "Баймак",
  "Бакал",
  "Баксан",
  "Балабаново",
  "Балаково",
  "Балахна",
  "Балашиха",
  "Балашов",
  "Балей",
  "Балтийск",
  "Барабинск",
  "Барнаул",
  "Барыш",
  "Батайск",
  "Бахчисарай",
  "Бежецк",
  "БелаяКалитва",
  "БелаяХолуница",
  "Белгород",
  "Белебей",
  "Белинский",
  "Белицкое",
  "Белово",
  "Белогорск",
  "Белозерск",
  "Белозёрское(город)",
  "Белокуриха",
  "Беломорск",
  "Белоозёрский",
  "Белорецк",
  "Белореченск",
  "Белоусово",
  "Белоярский",
  "Белый",
  "Белёв",
  "Бердск",
  "Бердянск",
  "Береговое",
  "Березники",
  "Берислав",
  "Берёзовский",
  "Беслан",
  "Бийск",
  "Бикин",
  "Билибино",
  "Биробиджан",
  "Бирск",
  "Бирюсинск",
  "Бирюч",
  "Благовещенск",
  "Благовещенская",
  "Благодарный",
  "Бобров",
  "Богданович",
  "Богородицк",
  "Богородск",
  "Боготол",
  "Богучар",
  "Бодайбо",
  "Бокситогорск",
  "Болгар",
  "Бологое",
  "Болотное",
  "Болохово",
  "Болхов",
  "БольшойКамень",
  "БольшойУтриш",
  "Бор",
  "Борзя",
  "Борисоглебск",
  "Боровичи",
  "Боровск",
  "Бородино",
  "Братск",
  "Бронницы",
  "Брянка",
  "Брянск",
  "Бугульма",
  "Бугуруслан",
  "Будённовск",
  "Бузулук",
  "Буинск",
  "Буй",
  "Буйнакск",
  "Бутурлиновка",
  "Валдай",
  "Валуйки",
  "Васильевка",
  "Вахрушево",
  "Велиж",
  "ВеликиеЛуки",
  "ВеликийНовгород",
  "ВеликийУстюг",
  "Вельск",
  "Венёв",
  "Верещагино",
  "Верея",
  "Верхнеуральск",
  "ВерхнийТагил",
  "ВерхнийУфалей",
  "ВерхняяПышма",
  "ВерхняяСалда",
  "ВерхняяТура",
  "Верхотурье",
  "Верхоянск",
  "Веселовка",
  "Весьегонск",
  "Ветлуга",
  "Видное",
  "Вилюйск",
  "Вилючинск",
  "Витязево",
  "Вихоревка",
  "Вичуга",
  "Владивосток",
  "Владикавказ",
  "Владимир",
  "Волгоград",
  "Волгодонск",
  "Волгореченск",
  "Волжск",
  "Волжский",
  "Волноваха",
  "Вологда",
  "Володарск",
  "Волоколамск",
  "Волосово",
  "Волхов",
  "Волчанск",
  "Вольнянск",
  "Вольск",
  "Воркута",
  "Воронеж",
  "Ворсма",
  "Воскресенск",
  "Воткинск",
  "Всеволожск",
  "Вуктыл",
  "Выборг",
  "Выкса",
  "Высоковск",
  "Высоцк",
  "Вытегра",
  "ВышнийВолочёк",
  "Вяземский",
  "Вязники",
  "Вязьма",
  "ВятскиеПоляны",
  "ГавриловПосад",
  "Гаврилов-Ям",
  "Гагарин",
  "Гаджиево",
  "Гай",
  "Галич",
  "Гаспра",
  "Гатчина",
  "Гвардейск",
  "Гдов",
  "Геленджик",
  "Геническ",
  "Георгиевск",
  "Глазов",
  "ГолаяПристань",
  "Голицыно",
  "Голубицкая",
  "Горбатов",
  "Горловка",
  "Горно-Алтайск",
  "Горнозаводск",
  "Горняк",
  "Городец",
  "Городище",
  "Городовиковск",
  "Гороховец",
  "Горское",
  "ГорячийКлюч",
  "Грайворон",
  "Гремячинск",
  "Грозный",
  "Грязи",
  "Грязовец",
  "Губаха",
  "Губкин",
  "Губкинский",
  "Гудермес",
  "Гуково",
  "Гулькевичи",
  "Гуляйполе",
  "Гурзуф",
  "Гурьевск",
  "Гусев",
  "Гусиноозёрск",
  "Гусь-Хрустальный",
  "Давлеканово",
  "ДагестанскиеОгни",
  "Дагомыс",
  "Далматово",
  "Дальнегорск",
  "Дальнереченск",
  "Данилов",
  "Данков",
  "Дебальцево",
  "Дегтярск",
  "Дедовск",
  "Демидов",
  "Дербент",
  "Десногорск",
  "Джанкой",
  "Джемете",
  "Джубга",
  "Дзержинск",
  "Дзержинский",
  "Дивеево",
  "Дивногорск",
  "Дивноморское",
  "Дигора",
  "Димитров(город)",
  "Димитровград",
  "Дмитриев",
  "Дмитров",
  "Дмитровск",
  "Днепрорудное",
  "Дно",
  "Доброполье",
  "Добрянка",
  "Докучаевск",
  "Долгопрудный",
  "Должанская",
  "Долинск",
  "Домбай",
  "Домодедово",
  "Донецк",
  "Донецк",
  "Донской",
  "Дорогобуж",
  "Дрезна",
  "Дружковка",
  "Дубна",
  "Дубовка",
  "Дудинка",
  "Духовщина",
  "Дюртюли",
  "Дятьково",
  "Евпатория",
  "Егорьевск",
  "Ейск",
  "Екатеринбург",
  "Елабуга",
  "Елец",
  "Елизово",
  "Ельня",
  "Еманжелинск",
  "Емва",
  "Енакиево",
  "Енисейск",
  "Ермолино",
  "Ершов",
  "Ессентуки",
  "Ефремов",
  "Ждановка",
  "Железноводск",
  "Железногорск",
  "Железногорск-Илимский",
  "Жердевка",
  "Жигулёвск",
  "Жиздра",
  "Жирновск",
  "Жуков",
  "Жуковка",
  "Жуковский",
  "Завитинск",
  "Заводоуковск",
  "Заволжск",
  "Заволжье",
  "Задонск",
  "Заинск",
  "Закаменск",
  "Заозёрный",
  "Заозёрск",
  "ЗападнаяДвина",
  "Заполярный",
  "Запорожье",
  "Зарайск",
  "Заречный",
  "Заринск",
  "Звенигово",
  "Звенигород",
  "Зверево",
  "Зеленогорск",
  "Зеленоградск",
  "Зеленодольск",
  "Зеленокумск",
  "Зерноград",
  "Зея",
  "Зима",
  "Зимогорье",
  "Златоуст",
  "Злынка",
  "Змеиногорск",
  "Знаменск",
  "Золотое",
  "Зоринск",
  "Зубцов",
  "Зугрэс",
  "Зуевка",
  "Ивангород",
  "Иваново",
  "Ивантеевка",
  "Ивдель",
  "Игарка",
  "Ижевск",
  "Избербаш",
  "Изобильный",
  "Иланский",
  "Иловайск",
  "Инза",
  "Иннополис",
  "Инсар",
  "Инта",
  "Ипатово",
  "Ирбит",
  "Иркутск",
  "Ирмино",
  "Исилькуль",
  "Искитим",
  "Истра",
  "Ишим",
  "Ишимбай",
  "Йошкар-Ола",
  "Кабардинка",
  "Кадников",
  "Казань",
  "Калач",
  "Калач-на-Дону",
  "Калачинск",
  "Калининград",
  "Калининск",
  "Калтан",
  "Калуга",
  "Калязин",
  "Камбарка",
  "Каменка",
  "Каменка-Днепровская",
  "Каменногорск",
  "Каменск-Уральский",
  "Каменск-Шахтинский",
  "Камень-на-Оби",
  "Камешково",
  "Камызяк",
  "Камышин",
  "Камышлов",
  "Канаш",
  "Кандалакша",
  "Канск",
  "Карабаново",
  "Карабаш",
  "Карабулак",
  "Карасук",
  "Карачаевск",
  "Карачев",
  "Каргат",
  "Каргополь",
  "Карпинск",
  "Карталы",
  "Касимов",
  "Касли",
  "Каспийск",
  "Катав-Ивановск",
  "Катайск",
  "Каховка",
  "Качканар",
  "Кашин",
  "Кашира",
  "Каякент",
  "Кедровый",
  "Кемерово",
  "Кемь",
  "Керчь",
  "Кизел",
  "Кизилюрт",
  "Кизляр",
  "Кимовск",
  "Кимры",
  "Кингисепп",
  "Кинель",
  "Кинешма",
  "Киреевск",
  "Киренск",
  "Киржач",
  "Кириллов",
  "Кириши",
  "Киров",
  "Кировград",
  "Кирово-Чепецк",
  "Кировск",
  "Кировск",
  "Кировское",
  "Кирс",
  "Кирсанов",
  "Киселёвск",
  "Кисловодск",
  "Клин",
  "Клинцы",
  "Княгинино",
  "Ковдор",
  "Ковров",
  "Ковылкино",
  "Когалым",
  "Кодинск",
  "Козельск",
  "Козловка",
  "Козьмодемьянск",
  "Коктебель",
  "Кола",
  "Кологрив",
  "Коломна",
  "Колпашево",
  "Кольчугино",
  "Коммунар",
  "Комсомольск",
  "Комсомольск-на-Амуре",
  "Комсомольское(Кальмиусское)",
  "Конаково",
  "Кондопога",
  "Кондрово",
  "Константиновка(город)",
  "Константиновск",
  "Копейск",
  "Кораблино",
  "Кореновск",
  "Коркино",
  "Королёв",
  "Короча",
  "Корсаков",
  "Коряжма",
  "Костерёво",
  "Костомукша",
  "Кострома",
  "Котельники",
  "Котельниково",
  "Котельнич",
  "Котлас",
  "Котово",
  "Котовск",
  "Кохма",
  "Краматорск",
  "Красавино",
  "КраснаяПоляна",
  "Красноармейск",
  "Красноармейск(Покровск)",
  "Красновишерск",
  "Красногоровка(город)",
  "Красногорск",
  "Краснодар",
  "Краснодон",
  "Краснозаводск",
  "Краснознаменск",
  "Краснокаменск",
  "Краснокамск",
  "Красноперекопск",
  "Краснослободск",
  "Краснотурьинск",
  "Красноуральск",
  "Красноуфимск",
  "Красноярск",
  "КрасныйКут",
  "КрасныйЛиман",
  "КрасныйЛуч",
  "КрасныйСулин",
  "КрасныйХолм",
  "Кременная",
  "Кремёнки",
  "Кронштадт",
  "Кропоткин",
  "Крымск",
  "Кстово",
  "Кубинка",
  "Кувандык",
  "Кувшиново",
  "Кудрово",
  "Кудымкар",
  "Кузнецк",
  "Куйбышев",
  "Кукмор",
  "Кулебаки",
  "Кумертау",
  "Кунгур",
  "Купино",
  "Курахово",
  "Курган",
  "Курганинск",
  "Курильск",
  "Курлово",
  "Куровское",
  "Курск",
  "Куртамыш",
  "Курчалой",
  "Курчатов",
  "Куса",
  "Кучугуры",
  "Кушва",
  "Кызыл",
  "Кыштым",
  "Кяхта",
  "Лабинск",
  "Лабытнанги",
  "Лагань",
  "Ладушкин",
  "Лазаревское",
  "Лаишево",
  "Лакинск",
  "Лангепас",
  "Лахденпохья",
  "Лебедянь",
  "Лениногорск",
  "Ленинск",
  "Ленинск-Кузнецкий",
  "Ленск",
  "Лермонтов",
  "Лермонтово",
  "Лесной",
  "Лесозаводск",
  "Лесосибирск",
  "Ливны",
  "Ликино-Дулёво",
  "Липецк",
  "Липки",
  "Лисичанск",
  "Лиски",
  "Лихославль",
  "Лобня",
  "ЛодейноеПоле",
  "Лоо",
  "Лосино-Петровский",
  "Луга",
  "Луганск",
  "Луза",
  "Лукоянов",
  "Лутугино",
  "Луховицы",
  "Лысково",
  "Лысьва",
  "Лыткарино",
  "Льгов",
  "Любань",
  "Люберцы",
  "Любим",
  "Людиново",
  "Лянтор",
  "Магадан",
  "Магас",
  "Магнитогорск",
  "Майкоп",
  "Майский",
  "Макаров",
  "Макарьев",
  "Макеевка",
  "Макушино",
  "МалаяВишера",
  "Малгобек",
  "Малмыж",
  "Малоархангельск",
  "Малоярославец",
  "Мамадыш",
  "Мамоново",
  "Манжерок",
  "Мантурово",
  "Мариинск",
  "МариинскийПосад",
  "Мариуполь",
  "Маркс",
  "Марьинка(город)",
  "Махачкала",
  "Мацеста",
  "Мглин",
  "Мегион",
  "Медвежьегорск",
  "Медногорск",
  "Медынь",
  "Межводное",
  "Межгорье",
  "Междуреченск",
  "Мезень",
  "Мезмай",
  "Меленки",
  "Мелеуз",
  "Мелитополь",
  "Менделеевск",
  "Мензелинск",
  "Мещовск",
  "Миасс",
  "Микунь",
  "Миллерово",
  "МинеральныеВоды",
  "Минусинск",
  "Миньяр",
  "Мирный",
  "Мисхор",
  "Миусинск",
  "Михайлов",
  "Михайловка",
  "Михайловск",
  "Мичуринск",
  "Могоча",
  "Можайск",
  "Можга",
  "Моздок",
  "Молодогвардейск",
  "Молочанск",
  "Мончегорск",
  "Морозовск",
  "Морское",
  "Моршанск",
  "Мосальск",
  "Москва",
  "Моспино",
  "Муравленко",
  "Мураши",
  "Мурино",
  "Мурманск",
  "Муром",
  "Мценск",
  "Мыски",
  "Мысовое",
  "Мытищи",
  "Мышкин",
  "НабережныеЧелны",
  "Навашино",
  "Наволоки",
  "Надым",
  "Назарово",
  "Назрань",
  "Называевск",
  "Нальчик",
  "Нариманов",
  "Наро-Фоминск",
  "Нарткала",
  "Нарьян-Мар",
  "Находка",
  "Невель",
  "Невельск",
  "Невинномысск",
  "Невьянск",
  "Нелидово",
  "Неман",
  "Нерехта",
  "Нерчинск",
  "Нерюнгри",
  "Нестеров",
  "Нефтегорск",
  "Нефтекамск",
  "Нефтекумск",
  "Нефтеюганск",
  "Нея",
  "Нижневартовск",
  "Нижнекамск",
  "Нижнеудинск",
  "НижниеСерги",
  "НижнийЛомов",
  "НижнийНовгород",
  "НижнийТагил",
  "НижняяСалда",
  "НижняяТура",
  "Николаевка",
  "Николаевка(город)",
  "Николаевск",
  "Николаевск-на-Амуре",
  "Никольск",
  "Никольское",
  "НоваяАнапа",
  "НоваяЕвпатория",
  "НоваяКаховка",
  "НоваяЛадога",
  "НоваяЛяля",
  "Новоазовск",
  "Новоалександровск",
  "Новоалтайск",
  "Новоаннинский",
  "Нововоронеж",
  "Новогродовка",
  "Новодвинск",
  "Новодружеск",
  "Новозыбков",
  "Новокубанск",
  "Новокузнецк",
  "Новокуйбышевск",
  "Новомихайловский",
  "Новомичуринск",
  "Новомосковск",
  "Новопавловск",
  "Новоржев",
  "Новороссийск",
  "Новосибирск",
  "Новосиль",
  "Новосокольники",
  "Новотроицк",
  "Новоузенск",
  "Новоульяновск",
  "Новоуральск",
  "Новохопёрск",
  "Новочебоксарск",
  "Новочеркасск",
  "Новошахтинск",
  "НовыйОскол",
  "НовыйСвет",
  "НовыйУренгой",
  "Ногинск",
  "Нолинск",
  "Норильск",
  "Ноябрьск",
  "Нурлат",
  "Нытва",
  "Нюрба",
  "Нягань",
  "Нязепетровск",
  "Няндома",
  "Облучье",
  "Обнинск",
  "Обоянь",
  "Обь",
  "Одинцово",
  "Озёрск",
  "Озёры",
  "Октябрьск",
  "Октябрьский",
  "Окуловка",
  "Оленевка",
  "Оленегорск",
  "Олонец",
  "Ольгинка",
  "Олёкминск",
  "Омск",
  "Омутнинск",
  "Онега",
  "Опочка",
  "Орджоникидзе",
  "Оренбург",
  "Орехов",
  "Орехово-Зуево",
  "Орлов",
  "Орск",
  "Орёл",
  "Оса",
  "Осинники",
  "Осташков",
  "Остров",
  "Островной",
  "Острогожск",
  "Отрадное",
  "Отрадный",
  "Оха",
  "Оханск",
  "Очёр",
  "Павлово",
  "Павловск",
  "ПавловскийПосад",
  "Палех",
  "Палласовка",
  "Партенит",
  "Партизанск",
  "Певек",
  "Пенза",
  "Первомайск",
  "Первомайск",
  "Первоуральск",
  "Перевальск",
  "Перевоз",
  "Пересвет",
  "Переславль-Залесский",
  "Пересыпь",
  "Пермь",
  "Пестово",
  "Петергоф",
  "ПетровВал",
  "Петровск",
  "Петровск-Забайкальский",
  "Петровское",
  "Петрозаводск",
  "Петропавловск-Камчатский",
  "Петухово",
  "Петушки",
  "Печора",
  "Печоры",
  "Пикалёво",
  "Пионерский",
  "Питкяранта",
  "Плавск",
  "Пласт",
  "Плёс",
  "Поворино",
  "Подольск",
  "Подпорожье",
  "Покачи",
  "Покров",
  "Покровск",
  "Полевской",
  "Полесск",
  "Пологи",
  "Полысаево",
  "ПолярныеЗори",
  "Полярный",
  "Попасная",
  "Поповка",
  "Поронайск",
  "Порхов",
  "Похвистнево",
  "Почеп",
  "Починок",
  "Пошехонье",
  "Правдинск",
  "Приволжск",
  "Приволье",
  "Приморск",
  "Приморск(Запорожскаяобласть)",
  "Приморский",
  "Приморско-Ахтарск",
  "Приозерск",
  "Прокопьевск",
  "Пролетарск",
  "Протвино",
  "Прохладный",
  "Псков",
  "Пугачёв",
  "Пудож",
  "Пустошка",
  "Пучеж",
  "Пушкино",
  "Пущино",
  "Пыталово",
  "Пыть-Ях",
  "Пятигорск",
  "Радужный",
  "Райчихинск",
  "Раменское",
  "Рассказово",
  "Ревда",
  "Реж",
  "Реутов",
  "Ржев",
  "Ровеньки",
  "Родинское",
  "Родники",
  "Рославль",
  "Россошь",
  "Ростов",
  "РостовВеликий",
  "Ростов-на-Дону",
  "Рошаль",
  "Ртищево",
  "Рубежное",
  "Рубцовск",
  "Рудня",
  "Руза",
  "Рузаевка",
  "Рыбачье",
  "Рыбинск",
  "Рыбное",
  "Рыльск",
  "Ряжск",
  "Рязань",
  "Саки",
  "Салават",
  "Салаир",
  "Салехард",
  "Сальск",
  "Самара",
  "Санкт-Петербург",
  "Саранск",
  "Сарапул",
  "Саратов",
  "Саров",
  "Сасово",
  "Сатка",
  "Сафоново",
  "Саяногорск",
  "Саянск",
  "Сватово",
  "Свердловск",
  "Светлогорск",
  "Светлоград",
  "Светлодарск",
  "Светлый",
  "Светогорск",
  "Свирск",
  "Свияжск",
  "Свободный",
  "Святогорск",
  "Себеж",
  "Севастополь",
  "Северо-Курильск",
  "Северобайкальск",
  "Северодвинск",
  "Северодонецк",
  "Североморск",
  "Североуральск",
  "Северск",
  "Северск",
  "Севск",
  "Сегежа",
  "Селидово",
  "Сельцо",
  "Семикаракорск",
  "Семилуки",
  "Семёнов",
  "Сенгилей",
  "Серафимович",
  "Сергач",
  "СергиевПосад",
  "Сердобск",
  "Серов",
  "Серпухов",
  "Сертолово",
  "Сибай",
  "Сим",
  "Симеиз",
  "Симферополь",
  "Скадовск",
  "Сковородино",
  "Скопин",
  "Славгород",
  "Славск",
  "Славянск",
  "Славянск-на-Кубани",
  "Сланцы",
  "Слободской",
  "Слюдянка",
  "Смоленск",
  "Снежинск",
  "Снежногорск",
  "Снежное",
  "Снигирёвка",
  "Собинка",
  "Советск",
  "СоветскаяГавань",
  "Советский",
  "Сокол",
  "Соледар",
  "Солигалич",
  "Соликамск",
  "Солнечногорск",
  "Солнечногорское",
  "Соль-Илецк",
  "Сольвычегодск",
  "Сольцы",
  "Сорочинск",
  "Сорск",
  "Сортавала",
  "Сосенский",
  "Сосновка",
  "Сосновоборск",
  "СосновыйБор",
  "Сосногорск",
  "Сочи",
  "Спас-Деменск",
  "Спас-Клепики",
  "Спасск",
  "Спасск-Дальний",
  "Спасск-Рязанский",
  "Среднеколымск",
  "Среднеуральск",
  "Сретенск",
  "Ставрополь",
  "СтараяКупавна",
  "СтараяЛадога",
  "СтараяРусса",
  "Старица",
  "Старобельск",
  "Стародуб",
  "СтарыйКрым",
  "СтарыйОскол",
  "Стаханов",
  "Стерлитамак",
  "Стрежевой",
  "Строитель",
  "Струнино",
  "Ступино",
  "Суворов",
  "Судак",
  "Суджа",
  "Судогда",
  "Суздаль",
  "Сукко",
  "Сунжа",
  "Суоярви",
  "Сураж",
  "Сургут",
  "Суровикино",
  "Сурск",
  "Сусуман",
  "Сухиничи",
  "Суходольск",
  "СухойЛог",
  "Счастье",
  "Сызрань",
  "Сыктывкар",
  "Сысерть",
  "Сычёвка",
  "Сясьстрой",
  "Тавда",
  "Таврийск",
  "Таганрог",
  "Тайга",
  "Тайшет",
  "Талдом",
  "Талица",
  "Тамань",
  "Тамбов",
  "Тара",
  "Тарко-Сале",
  "Таруса",
  "Татарск",
  "Таштагол",
  "Тверь",
  "Теберда",
  "Тейково",
  "Темников",
  "Темрюк",
  "Терек",
  "Тетюши",
  "Тимашёвск",
  "Тихвин",
  "Тихорецк",
  "Тобольск",
  "Тогучин",
  "Токмак",
  "Тольятти",
  "Томари",
  "Томмот",
  "Томск",
  "Топки",
  "Торез",
  "Торжок",
  "Торопец",
  "Тосно",
  "Тотьма",
  "Троицк",
  "Трубчевск",
  "Трёхгорный",
  "Туапсе",
  "Туймазы",
  "Тула",
  "Тулун",
  "Туран",
  "Туринск",
  "Тутаев",
  "Тында",
  "Тырныауз",
  "Тюкалинск",
  "Тюмень",
  "Уварово",
  "Углегорск",
  "Углегорск",
  "Угледар",
  "Углич",
  "Удачный",
  "Удомля",
  "Ужур",
  "Узловая",
  "Украинск",
  "Улан-Удэ",
  "Ульяновск",
  "Унеча",
  "Урай",
  "Урень",
  "Уржум",
  "Урус-Мартан",
  "Урюпинск",
  "Усинск",
  "Усмань",
  "Усолье",
  "Усолье-Сибирское",
  "Уссурийск",
  "Усть-Джегута",
  "Усть-Илимск",
  "Усть-Катав",
  "Усть-Кут",
  "Усть-Лабинск",
  "Устюжна",
  "Уфа",
  "Ухта",
  "Учалы",
  "Уяр",
  "Фатеж",
  "Феодосия",
  "Фокино",
  "Форос",
  "Фролово",
  "Фрязино",
  "Фурманов",
  "Хабаровск",
  "Хадыженск",
  "Ханты-Мансийск",
  "Харабали",
  "Харовск",
  "Харцызск",
  "Хасавюрт",
  "Хвалынск",
  "Херсон",
  "Хилок",
  "Химки",
  "Холм",
  "Холмск",
  "Хоста",
  "Хотьково",
  "Царскоесело",
  "Цивильск",
  "Цимлянск",
  "Циолковский",
  "Чадан",
  "Чайковский",
  "Чапаевск",
  "Чаплыгин",
  "ЧасовЯр",
  "Чебаркуль",
  "Чебоксары",
  "Чегем",
  "Чекалин",
  "Челябинск",
  "Червонопартизанск",
  "Чердынь",
  "Черемхово",
  "Черепаново",
  "Череповец",
  "Черкесск",
  "Черноголовка",
  "Черногорск",
  "Черноморское",
  "Чернушка",
  "Черняховск",
  "Чехов",
  "Чистополь",
  "Чита",
  "Чкаловск",
  "Чудово",
  "Чулым",
  "Чусовой",
  "Чухлома",
  "Чёрмоз",
  "Шагонар",
  "Шадринск",
  "Шали",
  "Шарыпово",
  "Шарья",
  "Шатура",
  "Шахты",
  "Шахтёрск",
  "Шахунья",
  "Шацк",
  "Шебекино",
  "Шелехов",
  "Шенкурск",
  "Шерегеш",
  "Шилка",
  "Шимановск",
  "Шиханы",
  "Шлиссельбург",
  "Штормовое",
  "Шумерля",
  "Шумиха",
  "Шуя",
  "Щелкино",
  "Щигры",
  "Щучье",
  "Щёкино",
  "Щёлкино",
  "Щёлково",
  "Электрогорск",
  "Электросталь",
  "Электроугли",
  "Элиста",
  "Энгельс",
  "Энергодар",
  "Эртиль",
  "Югорск",
  "Южа",
  "Южно-Сахалинск",
  "Южно-Сухокумск",
  "Южноуральск",
  "Юнокоммунаровск",
  "Юрга",
  "Юрьев-Польский",
  "Юрьевец",
  "Юрюзань",
  "Юхнов",
  "Ядрин",
  "Якутск",
  "Ялта",
  "Ялуторовск",
  "Янаул",
  "Яранск",
  "Яровое",
  "Ярославль",
  "Ярцево",
  "Ясиноватая",
  "Ясногорск",
  "Ясный",
  "Яхрома",
];

export const citiesOptions: AutocompleteOption[] = cities.map((elem) => {return {label: elem, value: elem};})