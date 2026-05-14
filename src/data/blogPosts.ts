export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: '5 Consejos para elegir el lugar perfecto para tu boda',
    excerpt: 'Encontrar el sitio ideal es el primer paso para una boda inolvidable. Te contamos en qué debes fijarte.',
    content: `
      <h2>El lugar de tus sueños</h2>
      <p>Elegir el lugar de la boda es una de las decisiones más importantes y emocionantes que tomarás. No solo determinará la fecha, sino también el presupuesto y el estilo general de vuestro gran día.</p>
      <h3>1. Capacidad y Espacio</h3>
      <p>Asegúrate de que el lugar pueda albergar cómodamente a todos tus invitados. Un espacio demasiado grande puede parecer vacío, mientras que uno pequeño será agobiante.</p>
      <h3>2. Localización y Accesibilidad</h3>
      <p>Considera lo fácil que será para los invitados llegar allí. Si está lejos, ¿hay opciones de transporte o alojamiento cerca?</p>
      <h3>3. Plan B para el Clima</h3>
      <p>Si planeas una boda al aire libre, siempre pregunta por el plan B. Una lluvia inesperada no debería arruinar el día.</p>
    `,
    author: 'Elena García',
    date: '2026-05-10',
    category: 'Planificación',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800',
    readTime: '5 min'
  },
  {
    id: '2',
    title: 'Tendencias en vestidos de novia para 2026',
    excerpt: 'Desde minimalismo puro hasta detalles arquitectónicos. Descubre lo que viene esta temporada.',
    content: `
      <h2>Vístete para impresionar</h2>
      <p>Las pasarelas de este año han mostrado una mezcla fascinante de lo clásico y lo vanguardista. Aquí te presentamos las tendencias que dominan el 2026.</p>
      <h3>1. Minimalismo de los 90</h3>
      <p>Líneas limpias, telas satinadas y siluetas depuradas. El menos es más sigue siendo un fuerte contendiente.</p>
      <h3>2. Mangas Abullonadas</h3>
      <p>Para las novias que buscan un toque romántico y dramático, las mangas con volumen son la elección ideal.</p>
      <h3>3. Sostenibilidad</h3>
      <p>Cada vez más novias optan por vestidos Vintage o diseñadores que utilizan materiales ecológicos.</p>
    `,
    author: 'Marco Rossi',
    date: '2026-04-25',
    category: 'Moda',
    image: 'https://images.pexels.com/photos/1023232/pexels-photo-1023232.jpeg?auto=compress&cs=tinysrgb&w=1200',
    readTime: '7 min'
  },
  {
    id: '3',
    title: 'Cómo gestionar el presupuesto sin morir en el intento',
    excerpt: 'El dinero no debería ser una fuente de estrés. Aprende a priorizar y ahorrar inteligentemente.',
    content: `
      <h2>Control financiero total</h2>
      <p>Sabemos que hablar de dinero puede ser estresante, pero tener un presupuesto claro desde el principio es la clave para la tranquilidad.</p>
      <h3>1. Define vuestras prioridades</h3>
      <p>¿Qué es lo más importante para vosotros? ¿La comida, la música, la fotografía? Asignad más presupuesto a lo que más valoráis.</p>
      <h3>2. Cuenta con los gastos imprevistos</h3>
      <p>Siempre reserva un 5-10% del presupuesto total para sorpresas de última hora.</p>
    `,
    author: 'David López',
    date: '2026-04-12',
    category: 'Presupuesto',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800',
    readTime: '6 min'
  }
];
