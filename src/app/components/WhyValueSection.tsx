import BookImage from '../../assets/hero2.webp';

const points = [
  {
    label: 'С душой',
    text: 'Книжка создаётся не по шаблону, а под конкретного ребёнка и вашу историю.',
  },
  {
    label: 'С вашим участием',
    text: 'Вы можете добавить детали о ребёнке, его привычках, любимых вещах и пожеланиях к сюжету.',
  },
  {
    label: 'Не просто AI-генерация',
    text: 'Я вручную работаю с исходниками, промтами, композицией и деталями, чтобы результат выглядел цельно и аккуратно.',
  },
];

export function WhyValueSection() {
  return (
    <section className='landing-section landing-section-bg py-24 px-8'>
      <div className='max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-16 items-center'>
        <div className='relative order-last lg:order-first'>
          <div className='section-image-backdrop absolute -top-6 -left-6 w-full h-full rounded-3xl' />

          <div className='section-image-frame relative rounded-3xl overflow-hidden'>
            <img
              src={BookImage}
              alt='Открытая книжка на тёплой ткани'
              className='full-image'
              loading='lazy'
              decoding='async'
            />
            <div className='image-overlay-soft absolute inset-0' />
          </div>

          <div className='floating-quote-card surface-card absolute -bottom-6 -right-6 p-5 rounded-2xl max-w-60'>
            <p className='quote-text'>
              «Всё хорошо, всё в одной стилистике, и текст простой для двухлетки,
              и мораль есть, и выглядит всё замечательно!»
            </p>
            <p className='quote-attribution'>— мама Тани</p>
          </div>
        </div>

        <div className='flex flex-col gap-8'>
          <div>
            <p className='section-eyebrow'>Почему это ценно</p>
            <h2 className='section-title'>Это не просто картинки</h2>
          </div>

          <p className='value-emphasis'>
            «Это история, в которой ребёнок видит себя смелым, любимым и
            особенным».
          </p>

          <p className='section-copy-sm'>
            Такая книжка приятна не только потому, что она красивая. В ней есть
            участие семьи, детали из жизни ребёнка, ручная работа и внимание к
            образу. У меня у самой большой запрос на искренность к жизни сейчас в эпоху ИИ.
          </p>

          <div className='flex flex-col gap-5'>
            {points.map((item) => (
              <div key={item.label} className='flex flex-col gap-1.5'>
                <span className='value-point-label'>{item.label}</span>
                <p className='section-copy-sm'>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
