import OneExample from '../../assets/2.webp';
import TwoExample from '../../assets/3.webp';
import ThreeExample from '../../assets/5.webp';
import FourExample from '../../assets/6.webp';
import FiveExample from '../../assets/9.webp';

const pages = [
  {
    title: 'Начало путешествия',
    component: OneExample,
    text: 'Тата открыла глаза и увидела вокруг не свою комнату, а яркую сказочную траву. Между травинками росли большие цветы, а рядом...',
  },
  {
    title: 'Город котиков',
    component: TwoExample,
    text: 'Котики несли корзинки с булочками, поливали цветы, катили коляски с котятами и занимались своими кошачьими делами...',
  },
  {
    title: 'Встреча с другом',
    component: ThreeExample,
    text: 'МяуТау был большой. Тате стало не по себе. Ей нужно было сначала посмотреть, подумать и самой решить, можно ли доверять коту...',
  },
  {
    title: 'Испытания на пути',
    component: FourExample,
    text: 'Смелость это не когда совсем не страшно. Это когда страшно, но ты не убегаешь. Смелости можно научиться...',
  },
  {
    title: 'Счастливый финал',
    component: FiveExample,
    text: 'Дома её ждали мама, папа, бабушка и дедушка. Её ждал день рождения. Её ждали объятия, игрушки, смех и самый любимый дом!',
  },
];

export function BookExampleSection() {
  return (
    <section className='landing-section landing-section-muted py-24 px-8'>
      <div className='max-w-[1440px] mx-auto'>
        <div className='text-center mb-16'>
          <p className='section-eyebrow'>Пример персональной сказки</p>
          <h2 className='section-title'>Как выглядит книга изнутри</h2>
          <p className='section-copy mt-3'>
            Ниже пример некоторых страниц. Каждый разворот это отдельная сцена с
            иллюстрацией с одной стороны и авторским текстом с другой.
          </p>
          <p className='section-copy mt-3'>
            На иллюстрациях замечательная Таня, котрая любит машинки и котиков. ♥️
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5'>
          {pages.map((page) => (
            <div
              key={page.title}
              className='surface-card-soft flex flex-col rounded-3xl overflow-hidden transition-all duration-300 border-[rgba(196,164,120,0.2)]'
            >
              <img
                src={page.component}
                alt='Открытая детская сказочная книжка с иллюстрациями'
                className='full-image'
                loading='lazy'
                decoding='async'
              />

              <div className='surface-card flex flex-col gap-3 p-5 flex-1'>
                <h4 className='card-title-sm'>{page.title}</h4>
                <p className='section-copy-xs'>{page.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
