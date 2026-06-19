import { Sparkles, Star, BookOpen } from 'lucide-react';
import heroBookImage from '../../assets/hero-book-open.webp';
import examplePdf from '../../assets/example.pdf';

const TELEGRAM_LINK = 'https://t.me/Stretchy97';

export function HeroSection() {
  return (
    <section className='hero-section relative overflow-hidden flex items-center'>
      <div className='hero-bg absolute inset-0 -z-10' />

      <Star
        size={10}
        className='hero-star-1 absolute top-24 left-16 opacity-30 fill-[#e8b87a] text-[#e8b87a]'
      />
      <Star
        size={6}
        className='hero-star-2 absolute top-40 left-32 opacity-20 fill-[#c4844a] text-[#c4844a]'
      />
      <Star
        size={12}
        className='hero-star-3 absolute top-16 right-64 opacity-25 fill-[#e8b87a] text-[#e8b87a]'
      />
      <Star
        size={7}
        className='hero-star-4 absolute bottom-40 left-20 opacity-20 fill-[#d4b896] text-[#d4b896]'
      />
      <Sparkles
        size={18}
        className='hero-star-5 absolute top-28 right-1/3 opacity-20 text-[#c4844a]'
      />

      <div className='max-w-[1440px] mx-auto w-full px-8 py-6 grid lg:grid-cols-2 gap-16 items-center'>
        <div className='flex flex-col gap-8'>
          <h1 className='hero-title'>
            Книжка с историей,
            <br />
            где ваш ребёнок <span className='hero-emphasis'>главный герой</span>
          </h1>

          <p className='hero-copy'>
            Создаю персональные детские фотокнижки по фотографиям ребёнка: с
            индивидуальным сюжетом, узнаваемым образом, ручной доработкой
            иллюстраций и подготовкой к печати.
          </p>

          <div className='flex flex-wrap gap-4'>
            <a
              href={TELEGRAM_LINK}
              target='_blank'
              rel='noopener noreferrer'
              className='landing-button landing-button-primary landing-button-pill landing-button-lg landing-button-order'
            >
              Заказать книгу
            </a>
            <a
              href={examplePdf}
              target='_blank'
              rel='noopener noreferrer'
              className='landing-button landing-button-outline landing-button-pill landing-button-lg'
            >
              Посмотреть пример
            </a>
          </div>

          <p className='hero-note'>
            Меня зовут Ольга. Я живу в Армении, но могу сделать книжку для семьи
            из любой страны и на трёх языках: армянском, английском и русском.
            Для заказов из Еревана могу помочь с печатью и доставкой.
          </p>
        </div>

        <div className='relative flex justify-center items-center'>
          <div className='hero-glow absolute rounded-full' />

          <div className='hero-paper-left absolute -top-6 -left-4 w-32 h-40 rounded-xl opacity-40' />
          <div className='hero-paper-right absolute -bottom-4 -right-6 w-28 h-36 rounded-xl opacity-30' />

          <div className='hero-book-frame relative rounded-2xl overflow-hidden'>
            <img
              src={heroBookImage}
              alt='Открытая детская фотокнига с иллюстрациями'
              className='cover-image'
              width='800'
              height='600'
              loading='eager'
              fetchPriority='high'
              decoding='async'
            />
            <div className='hero-book-overlay absolute inset-0' />
            <div className='hero-badge absolute bottom-4 left-4 px-4 py-2 rounded-xl'>
              <div className='flex items-center gap-2'>
                <BookOpen size={16} className='icon-primary' />
                <span className='hero-badge-text'>Примеры готовых книжек</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
