# Генератор слайдов для актуальных Instagram.
# Цены и тексты меняются здесь, потом: python build.py
# Готовые PNG появляются в папке out/.

import subprocess, shutil
from PIL import Image
from pathlib import Path

ROOT = Path(__file__).resolve().parent
ASSETS = (ROOT / "../../assets").resolve()
BUILD = ROOT / "build"
OUT = ROOT / "out"
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

# ---- Условия (как на сайте) ----
BASE = 15_000
TIERS = [  # название, цена листа, пояснение, разворот (2 страницы или одна широкая картинка)
    ("Классика", 3_000, "Все страницы с текстом -<br>на одинаковом фоне",
     ("books/tata/08.webp", "free.png")),
    ("Сказка", 4_500, "У каждой страницы с текстом<br>свой фон под сцену",
     ("books/tata/08.webp", "paid1.jpg")),
    ("Волшебство", 6_500, "Картинка на весь разворот,<br>текст прямо на ней",
     ("books/forest/01.webp",)),
]
MIN_SHEETS = 8
PRINT = 1_000
DEPOSIT = 15_000
DAYS = "5-7 дней"
TG = "@stretchy97"


def n(x):
    return f"{x:,}".replace(",", "\u00a0")


def img(p):
    # photos/... - исходные фото клиентов рядом со скриптом, остальное - картинки сайта
    return ((ROOT if p.startswith("photos/") else ASSETS) / p).as_uri()


CSS = f"""
@font-face {{ font-family: PF; font-weight: 400 900;
  src: url('{(ASSETS / 'fonts/playfair-display-regular-cyrillic.woff2').as_uri()}'); unicode-range: U+0400-045F; }}
@font-face {{ font-family: PF; font-weight: 400 900;
  src: url('{(ASSETS / 'fonts/playfair-display-regular-latin.woff2').as_uri()}'); }}
@font-face {{ font-family: PF; font-style: italic; font-weight: 400 500;
  src: url('{(ASSETS / 'fonts/playfair-display-italic-cyrillic.woff2').as_uri()}'); unicode-range: U+0400-045F; }}
* {{ margin: 0; padding: 0; box-sizing: border-box; }}
html, body {{ width: 1080px; height: 1920px; overflow: hidden; }}
body {{ position: relative; }}
body {{
  font-family: PF, Georgia, serif; color: #3a2e26;
  font-variant-numeric: lining-nums; font-feature-settings: 'lnum' 1;
  background:
    radial-gradient(900px 700px at 100% 0%, #f4d9bd 0%, transparent 70%),
    radial-gradient(800px 800px at 0% 100%, #f2dcc6 0%, transparent 70%),
    #fbf5ec;
}}
body.sage {{
  background:
    radial-gradient(900px 800px at 100% 0%, #dfe3d3 0%, transparent 70%),
    radial-gradient(900px 800px at 0% 100%, #d6dccb 0%, transparent 70%),
    #e9ebe1;
}}
.page {{ position: absolute; inset: 250px 80px 300px 80px; display: flex; flex-direction: column; }}
.center {{ justify-content: center; }}
h1 {{ font-size: 104px; font-weight: 600; line-height: 1.08; letter-spacing: -1px; }}
h2 {{ font-size: 92px; font-weight: 600; line-height: 1.1; }}
p {{ font-size: 60px; line-height: 1.3; }}
.big {{ font-size: 170px; font-weight: 700; color: #b06a32; line-height: 1; letter-spacing: -2px; }}
.mid {{ font-size: 88px; font-weight: 700; color: #b06a32; line-height: 1.1; }}
.soft {{ color: #7a6656; }}
em {{ font-style: italic; }}
.photo {{ border-radius: 36px; box-shadow: 0 30px 60px rgba(90,60,30,.18); object-fit: cover; }}
.rule {{ height: 3px; background: #e0c6a8; margin: 56px 0; border-radius: 2px; }}
.card {{ background: #fffaf3; border-radius: 48px; padding: 90px 70px;
  box-shadow: 0 30px 70px rgba(60,70,50,.15); }}
"""


def page(body, cls=""):
    return f"<!doctype html><html><head><meta charset='utf-8'><style>{CSS}</style></head><body class='{cls}'>{body}</body></html>"


def spread(pics, w=920, h=650, gap=4):
    """Разворот книжки на пружине: две страницы, отверстия и металлические витки по центру.
    Одна широкая картинка режется пополам на две страницы."""
    pw = (w - gap) // 2
    if len(pics) == 1:
        u = img(pics[0])
        pages = [f"background:url('{u}') left center/{2 * pw + gap}px {h}px",
                 f"background:url('{u}') right center/{2 * pw + gap}px {h}px"]
    else:
        pages = [f"background:url('{img(x)}') center/cover" for x in pics]
    radius = ["24px 2px 2px 24px", "2px 24px 24px 2px"]
    page_html = "".join(
        f'<div style="width:{pw}px;height:{h}px;{bg};border-radius:{r};'
        f'box-shadow:0 26px 50px rgba(90,60,30,.22)"></div>'
        for bg, r in zip(pages, radius)
    )
    # витки пружины: тонкая черная двойная (как Wire-O на А4, шаг ~19px на высоту страницы)
    cx, step, reach = w / 2, 15, gap / 2 + 9
    coils = []
    for y in range(14, h - 6, step):
        l, r = cx - reach, cx + reach
        coils.append(
            f'<rect x="{l - 2.5}" y="{y - 2.5}" width="5" height="5" rx="1.5" fill="#1c1611" opacity=".7"/>'
            f'<rect x="{r - 2.5}" y="{y - 2.5}" width="5" height="5" rx="1.5" fill="#1c1611" opacity=".7"/>'
        )
        for dy in (-1.6, 1.6):
            yy = y + dy
            d = f"M{l},{yy} C{l - 1},{yy - 10} {r + 1},{yy - 10} {r},{yy}"
            coils.append(
                f'<path d="{d}" fill="none" stroke="rgba(0,0,0,.22)" stroke-width="2.2" transform="translate(0,2)"/>'
                f'<path d="{d}" fill="none" stroke="url(#metal)" stroke-width="1.9" stroke-linecap="round"/>'
            )
    svg = (f'<svg width="{w}" height="{h}" style="position:absolute;inset:0" xmlns="http://www.w3.org/2000/svg">'
           '<defs><linearGradient id="metal" x1="0" y1="0" x2="0" y2="1">'
           '<stop offset="0" stop-color="#6b6560"/><stop offset=".35" stop-color="#2a2622"/>'
           '<stop offset="1" stop-color="#0d0b09"/></linearGradient></defs>'
           + "".join(coils) + "</svg>")
    return (f'<div style="position:relative;margin-top:70px;width:{w}px;height:{h}px;'
            f'display:flex;justify-content:space-between">{page_html}{svg}</div>')


# ---- Слайды ----
cheapest = [BASE + t[1] * MIN_SHEETS for t in TIERS]
ex_tier, ex_price = TIERS[1][0], TIERS[1][1]
ex_sheets = 10

PRICES = {
    "01": page(f"""
<div class="page">
  <img class="photo" src="{img('hero-book-open.jpg')}" style="width:100%;height:640px">
  <div style="margin-top:100px">
    <h1>Сколько стоит<br>книжка</h1>
    <div class="big" style="margin-top:56px">от {n(cheapest[0])}</div>
    <p class="soft" style="margin-top:24px">драм</p>
  </div>
</div>"""),
    "02": page(f"""
<div class="page center">
  <h2>Цена складывается<br>из двух частей</h2>
  <div class="rule"></div>
  <div class="mid">{n(BASE)}</div>
  <p>обложка и сюжет</p>
  <div class="mid" style="margin:40px 0 0">+</div>
  <div class="mid" style="margin-top:40px">листы по тарифу</div>
  <p>лист - это 2 страницы книжки</p>
  <div class="rule"></div>
  <p>Минимум {MIN_SHEETS} листов,<br>то есть {MIN_SHEETS * 2} страниц.</p>
</div>"""),
    **{
        f"03{chr(97 + i)}": page(f"""
<div class="page center">
  <p class="soft">Тариф</p>
  <h1 style="margin-top:10px">{name}</h1>
  <div class="mid" style="margin-top:30px">{n(price)} за лист</div>
  <p class="soft">лист = 2 страницы</p>
  <p style="margin-top:16px">книжка от {n(c)} драм</p>
  {spread(pics)}
  <p style="margin-top:56px">{desc}</p>
</div>""")
        for i, ((name, price, desc, pics), c) in enumerate(zip(TIERS, cheapest))
    },
    "04": page(f"""
<div class="page center">
  <h2>Например</h2>
  <p style="margin-top:40px">{ex_tier}, {ex_sheets} листов<br>({ex_sheets * 2} страниц)</p>
  <div class="rule"></div>
  <p>{n(BASE)} - обложка и сюжет</p>
  <p style="margin-top:20px">{n(ex_price * ex_sheets)} - {ex_sheets} листов по {n(ex_price)}</p>
  <div class="rule"></div>
  <div class="big">{n(BASE + ex_price * ex_sheets)}</div>
  <p class="soft" style="margin-top:20px">драм, без печати</p>
</div>"""),
    "05": page(f"""
<div class="page center">
  <h2>Печать</h2>
  <div class="mid" style="margin-top:60px">+{n(PRINT)} за лист</div>
  <p style="margin-top:20px">лист - это 2 страницы,<br>печать с двух сторон.<br>Книжка на пружине,<br>печатаю в Ереване</p>
  <div class="rule"></div>
  <h2 style="font-size:64px">Или без печати</h2>
  <p style="margin-top:20px">пришлю файлы в высоком<br>качестве и PDF - печатайте<br>где удобно</p>
</div>"""),
    "06": page(f"""
<div class="page center">
  <h2>Оплата<br>в два шага</h2>
  <div class="rule"></div>
  <div class="mid">{n(DEPOSIT)}</div>
  <p>предоплата, чтобы начать</p>
  <div class="mid" style="margin-top:70px">Остаток</div>
  <p>когда вы посмотрели<br>всю книжку и всё нравится</p>
  <div class="rule"></div>
  <p>Готово за <b>{DAYS}</b></p>
</div>"""),
    "07": page("""
<div class="page center">
  <h2>Правки</h2>
  <div class="rule"></div>
  <div class="mid">Бесплатно</div>
  <p>пока книжка<br>на этапе эскизов</p>
  <div class="mid" style="margin-top:80px">50% цены листа</div>
  <p>если нужно переделать лист<br>в уже готовой книжке</p>
</div>"""),
}

ORDER = {
    "01": page(f"""
<div class="page center">
  <h2>Как всё проходит</h2>
  <div class="rule"></div>
  {''.join(f'''<div style="display:flex;gap:40px;margin-bottom:56px">
    <div class="mid" style="width:70px;flex:none">{i}</div>
    <p>{t}</p></div>''' for i, t in enumerate([
        "Пишете мне в Telegram<br>и присылаете фото",
        f"Отвечаете на вопросы<br>о ребенке прямо в чате,<br>предоплата {n(DEPOSIT)}",
        "Присылаю сюжет и эскизы,<br>правки бесплатно",
        "Смотрите всю книжку,<br>оплачиваете остаток -<br>получаете файлы или печать",
    ], 1))}
  <p class="soft">Обычно {DAYS}</p>
</div>"""),
}

QA = [
    ("Можно книжку<br>на армянском?",
     "Да. Текст пишу на русском и перевожу на армянский нейросетью.<br><br>Перед печатью его обязательно проверяете вы или знакомый, кто хорошо знает язык."),
    ("Можно<br>без печати?",
     "Да. Пришлю файлы в высоком качестве и PDF.<br><br>Подходят для любой типографии и любого переплета."),
    ("Можно вернуть<br>предоплату?",
     "Да, полностью - если передумали до начала работы.<br><br>Если сюжет уже готов, предоплата идет в оплату сделанной работы."),
]
QUESTIONS = {
    f"{i:02d}": page(f"""
<div class="page center"><div class="card">
  <h2 style="font-size:80px">{q}</h2>
  <div class="rule"></div>
  <p>{a}</p>
</div></div>""", "sage")
    for i, (q, a) in enumerate(QA, 1)
}

# ---- Что это? и Примеры ----
def tag(text):
    return (f'<div style="position:absolute;left:24px;bottom:24px;background:rgba(251,245,236,.92);'
            f'border-radius:40px;padding:10px 30px;font-size:44px;font-weight:600">{text}</div>')


def before_after(before, after, title):
    box = lambda src, label: (
        f'<div style="position:relative;width:600px;height:600px;align-self:center">'
        f'<img class="photo" src="{img(src)}" style="width:600px;height:600px">{tag(label)}</div>')
    return page(f"""
<div class="page center">
  <h2 style="font-size:84px;text-align:center">{title}</h2>
  <div style="display:flex;flex-direction:column;gap:36px;margin-top:56px">
    {box(before, "Фото")}{box(after, "В книжке")}
  </div>
</div>""")


def sparkle(x, y, size, color, op=1.0):
    """Четырехлучевая звездочка как в старых сторис."""
    h = size / 2
    q = size / 9
    d = (f"M{x},{y - h} C{x + q},{y - q} {x + q},{y - q} {x + h},{y} "
         f"C{x + q},{y + q} {x + q},{y + q} {x},{y + h} "
         f"C{x - q},{y + q} {x - q},{y + q} {x - h},{y} "
         f"C{x - q},{y - q} {x - q},{y - q} {x},{y - h}Z")
    return f'<path d="{d}" fill="{color}" opacity="{op}"/>'


STARS = [  # x, y, размер, цвет — вручную, по краям, мимо лиц
    (90, 170, 70, "#f2c98a"), (200, 330, 36, "#f6d8c8"), (60, 520, 48, "#f2c98a"),
    (150, 700, 30, "#ffffff"), (80, 880, 56, "#f6d8c8"), (990, 1350, 64, "#f2c98a"),
    (900, 1500, 34, "#ffffff"), (1010, 1640, 48, "#f6d8c8"), (880, 1780, 70, "#f2c98a"),
    (760, 1420, 26, "#ffffff"), (1000, 1180, 30, "#ffffff"), (300, 1830, 40, "#f2c98a"),
]


INSETS = {  # кадрирование фото для вставки (доли ширины/высоты): лицо по центру, чужие люди вне кадра
    "photos/mika_ski.jpg": (0.0, 0.05, 1.0, 0.85),
    "photos/mika_sofa.jpg": (0.0, 0.08, 1.0, 0.85),
    "photos/mika_tree.jpg": (0.0, 0.36, 0.52, 0.98),
    "photos/mika_flowers.jpg": (0.12, 0.13, 0.68, 0.56),
    "before1.png": (0.0, 0.0, 1.0, 1.0),
    "before111.png": (0.1, 0.0, 0.95, 1.0),
}


def inset_file(src):
    """Вырезает кусок фото для вставки и кладет в build/insets."""
    box = INSETS.get(src, (0, 0, 1, 1))
    path = (ROOT if src.startswith("photos/") else ASSETS) / src
    im = Image.open(path).convert("RGB")
    w, h = im.size
    crop = im.crop((int(box[0] * w), int(box[1] * h), int(box[2] * w), int(box[3] * h)))
    out = BUILD / "insets" / (Path(src).stem + ".jpg")
    out.parent.mkdir(parents=True, exist_ok=True)
    crop.save(out, quality=92)
    return out.as_uri()


def collage(before, after, corner="left"):
    """Иллюстрация крупно, настоящее фото — скругленная вставка в углу.
    Фон — та же иллюстрация, размытая: у каждого слайда свои цвета."""
    path = (ROOT if after.startswith("photos/") else ASSETS) / after
    iw, ih = Image.open(path).size
    w = 960
    h = min(int(w * ih / iw), 1340)
    top = 250 + (1340 - h) // 2
    side = "left:40px" if corner == "left" else "right:40px"
    return page(f"""
<div style="position:absolute;inset:-80px;background:url('{img(after)}') center/cover;filter:blur(50px) saturate(1.2)"></div>
<div style="position:absolute;inset:0;background:rgba(10,10,25,.25)"></div>
<img src="{img(after)}" style="position:absolute;left:60px;top:{top}px;width:{w}px;height:{h}px;object-fit:cover;
  border-radius:28px;box-shadow:0 30px 70px rgba(0,0,0,.45)">
<img src="{inset_file(before)}" style="position:absolute;{side};top:{top + h - 470}px;width:400px;height:530px;
  object-fit:cover;border-radius:44px;box-shadow:0 24px 50px rgba(0,0,0,.5)">
""")


def picture(src, title, sub="", w=800, h=1130, pos="center"):
    return page(f"""
<div class="page center" style="align-items:center;text-align:center">
  <img class="photo" src="{img(src)}" style="width:{w}px;height:{h}px;object-position:{pos}">
  <h2 style="font-size:68px;margin-top:56px">{title}</h2>
  {f'<p class="soft" style="margin-top:12px">{sub}</p>' if sub else ''}
</div>""")


CTA = page(f"""
<div class="page center">
  <h1>Хотите такую<br>книжку?</h1>
  <div class="rule"></div>
  <p>Пришлите пару фото в Telegram -<br>скажу, подойдут ли они,<br>и посчитаю цену</p>
  <div class="mid" style="margin-top:70px">{TG}</div>
  <p class="soft" style="margin-top:70px">Спросить ни к чему<br>не обязывает</p>
</div>""")

HOOK = page(f"""
<div class="page center">
  <img class="photo" src="{img('books/mika/01.webp')}" style="width:640px;height:905px;align-self:center">
  <h1 style="margin-top:60px;font-size:88px">Сказка, где<br>главный герой -<br>ваш ребенок</h1>
  <p class="soft" style="margin-top:20px">по его фото и рассказу о нем</p>
</div>""")

EXAMPLES = {
    "01": HOOK,
    "02": collage("before1.png", "after1.png"),
    "03": collage("before111.png", "after111.png", "right"),
    "04": page(f"""
<div class="page center">
  <h2>История про вашего<br>ребенка</h2>
  <p class="soft" style="margin-top:50px">Мама рассказала:</p>
  <p>дочка Тата любит котиков<br>и боится грозы</p>
  <img class="photo" src="{img('6.png')}" style="width:920px;height:580px;margin-top:44px;object-position:center 40%">
  <p style="margin-top:40px">В книжке она попадает<br>в город котиков<br>и учится не бояться грома</p>
</div>"""),
    "05": picture("books/mika/05.webp", "Микаэль и сокровище<br>космических пиратов", "тариф Сказка"),
    "06": picture("books/mika/06.webp", "Микаэль среди пиратов", "страница из книжки"),
    "07": picture("books/tata/01.webp", "Тата и долина смелости", "тариф Сказка"),
    "08": page(f"""
<div class="page center" style="align-items:center;text-align:center">
  <h2 style="font-size:84px">Маша и день рождения<br>в волшебном лесу</h2>
  <p class="soft" style="margin-top:20px">тариф Волшебство</p>
  {spread(("books/forest/01.webp",))}
  <p style="margin-top:56px">Одна картинка на весь разворот,<br>текст прямо на ней</p>
</div>"""),
    "09": page(f"""
<div class="page center">
  <img class="photo" src="{img('hero-book-open.jpg')}" style="width:920px;height:690px">
  <h2 style="margin-top:80px">Книжку можно<br>подержать в руках</h2>
  <p style="margin-top:30px">А4, печать на пружине<br>в Ереване</p>
  <p class="soft" style="margin-top:30px">или файлы и PDF,<br>если печатаете сами</p>
</div>"""),
    "10": CTA,
}

ORDER = {
    "01": ORDER["01"],
    "02": page("""
<div class="page center">
  <h2>Какие фото нужны</h2>
  <div class="rule"></div>
  <p>Чем больше четких фото<br>лица и эмоций, тем лучше</p>
  <p style="margin-top:50px">Присылайте оригиналы<br>файлом - не скриншоты<br>и не сжатые из переписки</p>
  <div class="rule"></div>
  <p class="soft">Если фото не подойдут,<br>скажу до начала работы</p>
</div>"""),
    "03": PRICES["07"],
    "04": CTA,
    "05": page(f"""
<div class="page center">
  <img class="photo" src="{img('books/mika/07.webp')}" style="width:920px;height:520px;object-position:center 18%">
  <h2 style="margin-top:70px">Всё подробно -<br>на сайте</h2>
  <div class="mid" style="margin-top:30px">paperstars.shop</div>
  <div class="rule"></div>
  <p>примеры книжек<br>калькулятор цены<br>ответы на вопросы</p>
  <p class="soft" style="margin-top:30px">на русском и армянском</p>
</div>"""),
}

QA = [
    ("Чем это отличается<br>от фотоколлажа?",
     "В коллаже ребенка вырезают с фото и ставят на фон.<br><br>У меня ребенок - герой сцены: каждая картинка рисуется под сюжет, а лицо я довожу вручную."),
    ("Можно книжку<br>на армянском?",
     "Да. Текст пишу на русском и перевожу на армянский нейросетью.<br><br>Перед печатью его обязательно проверяете вы или знакомый, кто хорошо знает язык."),
    ("Можно заказать<br>не из Армении?",
     "Да. Пришлю файлы в высоком качестве и PDF.<br><br>Их можно напечатать в любой типографии."),
    ("Можно вернуть<br>предоплату?",
     "Да, полностью - если передумали до начала работы.<br><br>Если сюжет уже готов, предоплата идет в оплату сделанной работы."),
]
QUESTIONS = {
    f"{i:02d}": page(f"""
<div class="page center"><div class="card">
  <h2 style="font-size:80px">{q}</h2>
  <div class="rule"></div>
  <p>{a}</p>
</div></div>""", "sage")
    for i, (q, a) in enumerate(QA, 1)
}

GROUPS = {
    # старые слайды «Примеров» про Микаэля остаются в актуальном, добавляем только новое
    "1 - Примеры": {
        "m0": collage("photos/mika_flowers.jpg", "photos/mika_planet.png", "left"),
        "m1": collage("photos/mika_ski.jpg", "books/mika/01.webp"),
        "m2": collage("photos/mika_sofa.jpg", "books/mika/02.webp", "right"),
        "m3": collage("photos/mika_tree.jpg", "books/mika/06.webp"),
        **{k: EXAMPLES[k] for k in ("02", "03", "04", "07", "08", "09", "10")},
    },
    "2 - Цены": PRICES,
    "3 - Как заказать": ORDER,
    "4 - Вопросы": QUESTIONS,
}


def main():
    # python build.py                 - все слайды
    # python build.py 1               - только группа, начинающаяся с "1"
    # python build.py 1 04 05         - только эти слайды группы
    import sys
    only_group = sys.argv[1] if len(sys.argv) > 1 else None
    only_nums = set(sys.argv[2:])
    OUT.mkdir(exist_ok=True)
    shutil.copy(ROOT / "ИНСТРУКЦИЯ.md", OUT / "ИНСТРУКЦИЯ.md")
    for group, slides in GROUPS.items():
        if only_group and not group.startswith(only_group):
            continue
        if not only_nums:
            shutil.rmtree(OUT / group, ignore_errors=True)
        (BUILD / group).mkdir(parents=True, exist_ok=True)
        (OUT / group).mkdir(parents=True, exist_ok=True)
        for i, html in enumerate(slides.values(), 1):
            num = f"{i:02d}"
            if only_nums and num not in only_nums:
                continue
            src = BUILD / group / f"{num}.html"
            src.write_text(html, encoding="utf-8")
            png = OUT / group / f"{num}.png"
            subprocess.run([
                CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars",
                "--force-device-scale-factor=1", "--allow-file-access-from-files",
                "--virtual-time-budget=3000", "--window-size=1080,2015",
                f"--screenshot={png}", src.as_uri(),
            ], check=True, capture_output=True)
            # headless Chrome съедает ~95px высоты окна, поэтому рендерим выше и обрезаем
            im = Image.open(png); im.crop((0, 0, 1080, 1920)).save(png)
            print(png.relative_to(ROOT))


if __name__ == "__main__":
    main()
