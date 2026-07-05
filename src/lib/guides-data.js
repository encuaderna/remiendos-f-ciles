// Datos de todas las guías paso a paso

export const LEVELS = {
  basico: { label: "Básico", color: "emerald", emoji: "🌱" },
  intermedio: { label: "Intermedio", color: "amber", emoji: "🪡" },
  avanzado: { label: "Avanzado", color: "rose", emoji: "✨" },
};

export const GUIDES = [
  {
    id: "basta",
    title: "Hacer una basta",
    level: "basico",
    time: "20–30 min",
    difficulty: 1,
    when: "Cuando un pantalón, falda o vestido queda muy largo y necesitas acortarlo sin cortar la tela.",
    materials: ["Aguja de coser", "Hilo del color de la prenda", "Tijeras", "Alfileres", "Cinta métrica", "Plancha (opcional)"],
    steps: [
      "Ponte la prenda y marca con alfileres la altura que quieres.",
      "Quítate la prenda y mide con la cinta métrica que la marca sea pareja en todo el contorno.",
      "Dobla la tela hacia adentro en la marca y sujeta con alfileres cada 5 cm aproximadamente.",
      "Si puedes, plancha el doblez para que quede bien marcado.",
      "Enhebra la aguja con un hilo de unos 50 cm y haz un nudo en la punta.",
      "Cose con puntada escondida: toma un hilito pequeñísimo de la tela de arriba y luego pasa la aguja por dentro del doblez unos 5 mm.",
      "Repite todo el contorno manteniendo las puntadas parejas.",
      "Al terminar, haz 2-3 puntadas en el mismo lugar para asegurar y corta el hilo."
    ],
    mistakes: [
      "Coser con puntadas muy visibles por fuera — toma hilos muy pequeños de la tela exterior.",
      "No medir parejo — la basta queda chueca.",
      "Usar hilo de color muy diferente a la tela."
    ],
    tips: [
      "Si la tela es gruesa, usa una aguja más grande.",
      "Planchar el doblez antes de coser facilita mucho el trabajo.",
      "Para telas que se deshilachan, dobla dos veces el borde."
    ],
    easier: null,
    next: "parche"
  },
  {
    id: "parche",
    title: "Colocar un parche",
    level: "basico",
    time: "15–20 min",
    difficulty: 1,
    when: "Cuando una prenda tiene un agujero o desgaste que quieres cubrir y reforzar.",
    materials: ["Retazo de tela (un poco más grande que el agujero)", "Aguja de coser", "Hilo", "Tijeras", "Alfileres"],
    steps: [
      "Recorta un pedazo de tela que sea al menos 2 cm más grande que el agujero por cada lado.",
      "Dobla los bordes del retazo hacia adentro (medio centímetro) para que no se deshilache.",
      "Coloca el parche sobre el agujero y sujétalo con alfileres.",
      "Enhebra la aguja y haz un nudo.",
      "Cose el parche por todo el borde con puntada pequeña y pareja.",
      "Puedes coser primero los bordes y luego hacer una costura en cruz por dentro para mayor firmeza.",
      "Remata con varias puntadas en el mismo punto y corta el hilo."
    ],
    mistakes: [
      "Usar un retazo demasiado pequeño que no cubre bien.",
      "No doblar los bordes del parche — se deshilacha con el lavado.",
      "Estirar demasiado la tela al coser — queda fruncido."
    ],
    tips: [
      "Elige una tela de peso similar a la prenda.",
      "Un parche decorativo puede ser un detalle bonito — usa telas de colores o estampadas.",
      "Para jeans, usa tela de mezclilla y puntadas fuertes."
    ],
    easier: "basta",
    next: "boton"
  },
  {
    id: "boton",
    title: "Volver a coser un botón",
    level: "basico",
    time: "10–15 min",
    difficulty: 1,
    when: "Cuando un botón se cayó o está flojo y necesitas fijarlo de nuevo.",
    materials: ["Aguja de coser", "Hilo resistente", "Tijeras", "El botón (o uno de repuesto)"],
    steps: [
      "Marca el lugar exacto donde va el botón (fíjate en la marca que dejó el anterior).",
      "Enhebra la aguja con hilo doble (unos 40 cm) y haz un nudo.",
      "Desde atrás de la tela, saca la aguja justo donde va el botón.",
      "Pasa la aguja por uno de los hoyitos del botón.",
      "Pon un alfiler o fósforo sobre el botón (entre los hoyitos) para dejar espacio.",
      "Pasa la aguja de vuelta por el otro hoyito y la tela. Repite 4-5 veces.",
      "Saca el alfiler. Envuelve el hilo alrededor del cuellito que se formó entre el botón y la tela, 3-4 vueltas.",
      "Pasa la aguja hacia atrás de la tela y haz varias puntadas de remate. Corta el hilo."
    ],
    mistakes: [
      "Coser el botón pegado a la tela sin dejar cuellito — no entra en el ojal.",
      "Usar muy pocas pasadas de hilo — el botón se vuelve a caer.",
      "No rematar bien el hilo al final."
    ],
    tips: [
      "El truco del alfiler o fósforo es clave para que el botón quede con espacio para abotonarse.",
      "Si el botón tiene 4 hoyitos, cose primero un par y luego el otro formando una cruz o líneas paralelas.",
      "Guarda siempre los botones extra que vienen con la ropa nueva."
    ],
    easier: "parche",
    next: "costura-abierta"
  },
  {
    id: "punto-corrido",
    title: "Recoger un punto corrido en un chaleco",
    level: "intermedio",
    time: "20–30 min",
    difficulty: 2,
    when: "Cuando un punto del tejido se soltó y se está corriendo formando una línea vertical de malla abierta.",
    materials: ["Aguja de crochet fina (o un alfiler de gancho)", "Aguja de coser", "Hilo del color del chaleco"],
    steps: [
      "Encuentra el punto suelto lo antes posible — mientras más esperes, más se corre.",
      "Pon un alfiler de gancho en el último punto suelto para que no siga bajando.",
      "Con la aguja de crochet, engancha el punto suelto.",
      "Busca la primera hebra horizontal suelta que está justo arriba.",
      "Pasa esa hebra a través del punto con la aguja de crochet (como si tejieras un punto de cadena).",
      "Repite con cada hebra horizontal hacia arriba, una por una.",
      "Cuando llegues al último punto, asegúralo con aguja e hilo pasando el hilo por el punto y cosiendo por atrás."
    ],
    mistakes: [
      "Saltarse una hebra horizontal — queda un hueco.",
      "Torcer el punto — queda irregular.",
      "No asegurar el punto al final — se vuelve a correr."
    ],
    tips: [
      "Trabaja en buena luz para ver los puntos.",
      "Si no tienes aguja de crochet, un alfiler de gancho grueso puede servir.",
      "Practica primero con un tejido viejo."
    ],
    easier: "costura-abierta",
    next: "elastico"
  },
  {
    id: "costura-abierta",
    title: "Cerrar una costura abierta",
    level: "basico",
    time: "10–15 min",
    difficulty: 1,
    when: "Cuando una costura se descosió — en axilas, entrepierna, costados o cualquier unión de telas.",
    materials: ["Aguja de coser", "Hilo resistente del color de la prenda", "Tijeras", "Alfileres"],
    steps: [
      "Da vuelta la prenda al revés para trabajar por dentro.",
      "Junta los bordes de la costura abierta y sujeta con alfileres.",
      "Enhebra la aguja con hilo doble y haz un nudo.",
      "Empieza a coser 1 cm antes de donde se abrió (sobre la costura que aún está firme).",
      "Cose con puntada atrás: adelanta 3 mm, retrocede la aguja y vuelve a salir 3 mm más adelante.",
      "Mantén la costura derecha y pareja, siguiendo la línea original.",
      "Pasa 1 cm más allá de donde terminó la abertura.",
      "Remata con varias puntadas en el mismo lugar y corta el hilo."
    ],
    mistakes: [
      "No empezar antes del inicio de la abertura — la costura se vuelve a abrir.",
      "Coser muy flojo — no aguanta.",
      "No seguir la línea original — la prenda queda torcida."
    ],
    tips: [
      "La puntada atrás es la más resistente para cerrar costuras.",
      "En zonas de mucho movimiento (axilas, entrepierna) usa hilo doble.",
      "Si la tela está muy gastada en los bordes, refuerza con un retazo por dentro."
    ],
    easier: "boton",
    next: "punto-corrido"
  },
  {
    id: "elastico",
    title: "Cambiar o pasar un elástico",
    level: "intermedio",
    time: "25–35 min",
    difficulty: 2,
    when: "Cuando el elástico de la cintura, puños o tobillos se estiró y la prenda ya no ajusta bien.",
    materials: ["Elástico nuevo del ancho adecuado", "Alfiler de gancho grande (imperdible)", "Aguja de coser", "Hilo", "Tijeras", "Descosedor o tijera pequeña"],
    steps: [
      "Busca una abertura en la jareta (el canalito por donde pasa el elástico). Si no hay, abre un pedacito de la costura con el descosedor.",
      "Saca el elástico viejo.",
      "Mide el elástico nuevo: rodea tu cintura (o la parte del cuerpo) con comodidad y agrega 2 cm extra.",
      "Corta el elástico nuevo.",
      "Prende un alfiler de gancho en una punta del elástico nuevo.",
      "Mete el alfiler en la jareta y ve empujándolo por dentro del canal, arruchando la tela.",
      "Ten cuidado de no soltar la otra punta — sujétala con otro alfiler a la tela.",
      "Cuando el alfiler salga por el otro lado, junta las dos puntas del elástico.",
      "Cose las puntas del elástico superpuestas (1 cm encima de la otra) con varias puntadas fuertes.",
      "Cierra la abertura de la jareta con puntada escondida."
    ],
    mistakes: [
      "Cortar el elástico muy corto — aprieta demasiado.",
      "Soltar una punta del elástico dentro de la jareta — toca descoser para buscarlo.",
      "No coser bien las puntas del elástico — se sueltan adentro."
    ],
    tips: [
      "El alfiler de gancho es tu mejor herramienta para pasar elásticos.",
      "Si la jareta es muy larga, ve arruchando poco a poco.",
      "Prueba el largo del elástico antes de coser las puntas."
    ],
    easier: "costura-abierta",
    next: "deshacer-chaleco"
  },
  {
    id: "deshacer-chaleco",
    title: "Deshacer un chaleco para reutilizar la lana",
    level: "avanzado",
    time: "60–90 min",
    difficulty: 3,
    when: "Cuando tienes un chaleco de lana que ya no usas y quieres recuperar la lana para tejer algo nuevo.",
    materials: ["El chaleco de lana", "Tijeras", "Descosedor", "Ovillos o cartón para enrollar la lana"],
    steps: [
      "Examina el chaleco para encontrar las costuras — generalmente están en hombros, costados y mangas.",
      "Con el descosedor o tijeras, abre las costuras para separar las piezas (delantero, espalda, mangas).",
      "Busca el inicio del tejido en cada pieza (generalmente es el borde superior o inferior).",
      "Empieza a tirar suavemente del hilo, deshaciendo fila por fila.",
      "Si encuentras nudos, córtalos con cuidado y sigue deshaciendo.",
      "Ve enrollando la lana en un ovillo o alrededor de un cartón.",
      "Para alisar la lana (que viene ondulada), haz madejas sueltas y lávalas con agua tibia.",
      "Deja secar las madejas colgadas con un pequeño peso abajo para que se estiren.",
      "Enrolla la lana seca en ovillos listos para usar."
    ],
    mistakes: [
      "Tirar con fuerza y cortar la lana accidentalmente.",
      "No separar bien las costuras antes de deshacer.",
      "No lavar la lana — queda ondulada y es difícil de tejer."
    ],
    tips: [
      "Trabaja con paciencia, es un proceso lento pero satisfactorio.",
      "La lana recuperada es perfecta para proyectos multicolor.",
      "Si la lana está muy apolillada o frágil, puede que no valga la pena deshacerla."
    ],
    easier: "elastico",
    next: "transformar-ropa"
  },
  {
    id: "transformar-ropa",
    title: "Transformar ropa vieja en nuevos usos",
    level: "avanzado",
    time: "45–60 min",
    difficulty: 3,
    when: "Cuando tienes prendas que ya no usas pero la tela todavía está buena y quieres darle una segunda vida.",
    materials: ["Ropa vieja con tela en buen estado", "Tijeras", "Aguja de coser", "Hilo", "Alfileres", "Cinta métrica", "Lápiz o tiza de tela"],
    steps: [
      "Selecciona la prenda y decide qué quieres hacer: una bolsa, paño de cocina, funda, etc.",
      "Lava y plancha la prenda antes de cortarla.",
      "Dibuja el molde sobre la tela con tiza o jabón. Para una bolsa simple, marca un rectángulo del tamaño deseado.",
      "Corta siguiendo las marcas, dejando 1 cm extra en cada lado para las costuras.",
      "Junta las piezas con alfileres, con el derecho de la tela hacia adentro.",
      "Cose los lados y el fondo con puntada atrás o puntada corrida firme.",
      "Si es una bolsa, deja la parte de arriba abierta y haz un doblez para el borde.",
      "Para las asas, corta dos tiras de tela, dóblalas y cóselas.",
      "Da vuelta la pieza al derecho y ¡listo!"
    ],
    mistakes: [
      "No lavar la tela antes — puede encoger después.",
      "Cortar sin dejar margen de costura.",
      "Usar telas muy delgadas para bolsas que cargarán peso."
    ],
    tips: [
      "Las camisas de hombre sirven para hacer bolsas y fundas de cojín.",
      "Los jeans viejos dan tela muy resistente para bolsos y estuches.",
      "Combina telas de diferentes prendas para diseños únicos."
    ],
    easier: "deshacer-chaleco",
    next: null
  }
];

export const LEARNING_PATHS = [
  {
    id: "principiante",
    title: "Ruta Principiante",
    emoji: "🌱",
    description: "Empieza desde cero con las técnicas más usadas en el día a día.",
    guideIds: ["boton", "costura-abierta", "parche", "basta"],
    color: "emerald"
  },
  {
    id: "reciclaje",
    title: "Ruta Reciclaje",
    emoji: "♻️",
    description: "Dale una segunda vida a tu ropa con proyectos de upcycling.",
    guideIds: ["parche", "elastico", "deshacer-chaleco", "transformar-ropa"],
    color: "sky"
  }
];

export const TOOLS = [
  { name: "Agujas de coser", description: "Vienen en diferentes grosores. Las más finas son para telas livianas, las más gruesas para telas pesadas como jeans. Ten al menos 3 tamaños.", icon: "🪡" },
  { name: "Hilos", description: "Necesitas hilo de coser común en colores básicos: negro, blanco, azul oscuro, gris y beige. Con esos cubres la mayoría de los arreglos.", icon: "🧵" },
  { name: "Tijeras", description: "Una tijera exclusiva para tela (no la uses con papel porque se desafila). Idealmente una grande para cortar y una chica para detalles.", icon: "✂️" },
  { name: "Alfileres", description: "Para sujetar la tela antes de coser. Los de cabeza de colores son más fáciles de ver y no se pierden.", icon: "📌" },
  { name: "Cinta métrica", description: "Flexible, para medir contornos del cuerpo y telas. También sirve una regla para medidas rectas.", icon: "📏" },
  { name: "Tiza o jabón de tela", description: "Para marcar la tela donde vas a cortar o coser. Se borra fácilmente con el lavado.", icon: "🖍️" },
  { name: "Dedal", description: "Protege tu dedo cuando empujas la aguja a través de telas gruesas. Se pone en el dedo medio.", icon: "🫐" },
  { name: "Imperdibles", description: "Alfiler de gancho. Súper útiles para pasar elásticos, sujetar provisionalmente y mil cosas más.", icon: "🔗" },
  { name: "Botones", description: "Guarda siempre los botones extra que vienen con la ropa nueva. Ten una cajita con botones de distintos tamaños.", icon: "⚫" },
  { name: "Retazos de tela", description: "Pedazos de tela que sobran. Guárdalos para parches, refuerzos y proyectos pequeños.", icon: "🧩" }
];

export const RECYCLING_IDEAS = [
  { title: "Bolsas de compras", description: "Corta rectángulos grandes de telas resistentes (jeans, chaquetas), cose los lados y agrega asas. Perfectas para ir a la feria.", source: "Jeans, chaquetas, faldas gruesas", difficulty: "Intermedio" },
  { title: "Paños de cocina", description: "Las camisetas de algodón son excelentes para hacer paños absorbentes. Corta rectángulos de 30x40 cm y haz un dobladillo simple.", source: "Camisetas de algodón", difficulty: "Básico" },
  { title: "Parches decorativos", description: "Recorta formas bonitas de telas estampadas para cubrir agujeros en otras prendas. Dale un toque personal a tu ropa.", source: "Cualquier tela con diseño", difficulty: "Básico" },
  { title: "Fundas de cojín", description: "Con una camisa puedes hacer una funda con botones al frente. Corta la espalda y el frente y cose los bordes.", source: "Camisas, poleras grandes", difficulty: "Intermedio" },
  { title: "Bolsillos extra", description: "Corta los bolsillos de jeans o chaquetas viejas y cóselos a otra prenda, un delantal o una bolsa.", source: "Jeans, chaquetas con bolsillos", difficulty: "Básico" },
  { title: "Rodilleras", description: "Corta parches ovalados de tela gruesa y cóselos por dentro de pantalones en la zona de las rodillas para reforzarlos.", source: "Jeans, tela gruesa", difficulty: "Intermedio" },
  { title: "Bolsitas para guardar cosas", description: "Pequeñas bolsas con cordón para guardar jabón, joyas, monedas o hierbas. Usa telas suaves y ligeras.", source: "Camisas, blusas, telas livianas", difficulty: "Intermedio" },
  { title: "Trapos de limpieza", description: "Las camisetas viejas de algodón son los mejores trapos. No sueltan pelusa y absorben bien. Simplemente córtalas en pedazos.", source: "Camisetas, ropa interior de algodón", difficulty: "Básico" }
];

export const SECURITY_TIPS = [
  { icon: "✂️", title: "Tijeras", tip: "Siempre corta alejando la tijera de tu cuerpo. Cuando las pases a otra persona, hazlo con las puntas hacia abajo o cerradas. Guárdalas fuera del alcance de niñas/os pequeños." },
  { icon: "🪡", title: "Agujas y alfileres", tip: "Trabaja en una superficie plana y con buena luz. Cuenta los alfileres antes y después de usarlos. Si cae una aguja al suelo, búscala de inmediato antes de pararte." },
  { icon: "🔥", title: "Plancha", tip: "Nunca dejes la plancha caliente sin vigilancia. Ponla siempre de pie o en su base. Desenchúfala al terminar y deja enfriar antes de guardar. Usa un paño húmedo para telas delicadas." },
  { icon: "💡", title: "Iluminación", tip: "Cose siempre con buena luz para evitar forzar la vista y tener mejor control de la aguja. Una lámpara de escritorio orientada a la tela hace una gran diferencia." }
];