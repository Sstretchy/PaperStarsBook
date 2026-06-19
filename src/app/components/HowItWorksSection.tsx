const steps = [
  {
    num: '01',
    title: 'Вы присылаете фотографии',
    text: 'Вы отправляете несколько чётких фото ребёнка: лицо, эмоции, рост, одежда, важные детали. Я смотрю исходники и честно говорю, подойдут ли они для работы.',
  },
  {
    num: '02',
    title: 'Заполняете небольшой опрос',
    text: 'Я спрашиваю про характер ребёнка, любимые вещи, пожелания к сюжету и формат книжки.',
  },
  {
    num: '03',
    title: 'Я создаю сюжет и страницы',
    text: 'Смотрю исходники, продумываю историю и собираю каждую страницу через работу с фото, Photoshop и промтами.',
  },
  {
    num: '04',
    title: 'Вы получаете готовую книжку',
    text: 'Обычно создание занимает 2–3 дня при отсутствии параллельных заказов. Если нужна печать, сроки зависят от графика типографии.',
  },
];

export function HowItWorksSection() {
  return (
    <section className='landing-section landing-section-bg py-24 px-8'>
      <div className='max-w-[1200px] mx-auto'>
        <div className='text-center mb-16'>
          <p className='section-eyebrow'>Процесс</p>
          <h2 className='section-title'>Как всё проходит</h2>
        </div>

        <div className='relative grid md:grid-cols-4 gap-8'>
          <div className='process-line absolute top-10 left-0 right-0 hidden md:block' />

          {steps.map((step) => (
            <div key={step.num} className='relative flex flex-col gap-5 z-10'>
              <div className='process-step-circle surface-card w-20 h-20 rounded-full flex items-center justify-center mx-auto md:mx-0'>
                <span className='process-step-num card-title'>{step.num}</span>
              </div>

              <div className='flex flex-col gap-2 text-center md:text-left'>
                <h3 className='card-title-md'>{step.title}</h3>
                <p className='section-copy-sm'>{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
