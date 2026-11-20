import type { Locale } from "@/i18n/routing";

type LocalizedText = Record<Locale, string>;

export type Product = {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  /** Public path. Add the file at public/fruits/{id}.png and set this field. */
  image?: `/fruits/${string}.png`;
};

export const products: Product[] = [
  {
    id: "yellow-dragon-fruit",
    name: {
      es: "Pitahaya Amarilla",
      en: "Yellow Dragon Fruit",
    },
    description: {
      es: "Fruta tropical de sabor dulce y refrescante, reconocida por su característica cáscara amarilla y pulpa blanca con pequeñas semillas.",
      en: "A tropical fruit with a sweet and refreshing taste, recognized for its distinctive yellow skin and white flesh with small black seeds.",
    },
    image: "/fruits/yellow-dragon-fruit.png",
  },
  {
    id: "red-dragon-fruit",
    name: {
      es: "Pitahaya Roja",
      en: "Red Dragon Fruit",
    },
    description: {
      es: "Fruta exótica de apariencia atractiva, pulpa de color intenso y sabor dulce y delicado.",
      en: "An exotic fruit with an attractive appearance, intensely colored flesh, and a delicate, sweet flavor.",
    },
    image: "/fruits/red-dragon-fruit.png",
  },
  {
    id: "granadilla",
    name: {
      es: "Granadilla",
      en: "Granadilla",
    },
    description: {
      es: "Fruta tropical de sabor naturalmente dulce, aroma agradable y pulpa jugosa.",
      en: "A tropical fruit with a naturally sweet taste, pleasant aroma, and juicy pulp.",
    },
    image: "/fruits/granadilla.png",
  },
  {
    id: "passion-fruit",
    name: {
      es: "Maracuyá",
      en: "Passion Fruit",
    },
    description: {
      es: "Fruta aromática de sabor característico entre dulce y ácido, ampliamente utilizada en la industria alimentaria.",
      en: "An aromatic fruit with a distinctive sweet-and-sour flavor, widely used in the food industry.",
    },
    image: "/fruits/passion-fruit.png",
  },
  {
    id: "baby-banana",
    name: {
      es: "Baby Banano",
      en: "Baby Banana",
    },
    description: {
      es: "Banano de tamaño pequeño, sabor dulce y textura suave.",
      en: "A small-sized banana with a sweet taste and smooth texture.",
    },
    image: "/fruits/baby-banana.png",
  },
  {
    id: "hass-avocado",
    name: {
      es: "Aguacate Hass",
      en: "Hass Avocado",
    },
    description: {
      es: "Variedad reconocida por su textura cremosa, sabor característico y excelente versatilidad gastronómica.",
      en: "A variety known for its creamy texture, distinctive flavor, and excellent versatility in gastronomy.",
    },
    image: "/fruits/hass-avocado.png",
  },
  {
    id: "fuerte-avocado",
    name: {
      es: "Aguacate Fuerte",
      en: "Fuerte Avocado",
    },
    description: {
      es: "Variedad de aguacate de textura suave, sabor delicado y pulpa de buena consistencia.",
      en: "An avocado variety with a smooth texture, delicate flavor, and firm flesh.",
    },
    image: "/fruits/fuerte-avocado.png",
  },
  {
    id: "golden-berry",
    name: {
      es: "Uvilla",
      en: "Golden Berry",
    },
    description: {
      es: "Fruta de color dorado, sabor dulce con notas ligeramente ácidas y propiedades nutricionales apreciadas.",
      en: "A golden-colored fruit with a sweet taste and slightly tangy notes, valued for its nutritional properties.",
    },
    image: "/fruits/golden-berry.png",
  },
  {
    id: "pineapple",
    name: {
      es: "Piña",
      en: "Pineapple",
    },
    description: {
      es: "Fruta tropical de sabor refrescante, equilibrado entre dulzura y acidez.",
      en: "A tropical fruit with a refreshing flavor, balancing sweetness and acidity.",
    },
    image: "/fruits/pineapple.png",
  },
  {
    id: "tamarillo",
    name: {
      es: "Tamarillo",
      en: "Tree Tomato (Tamarillo)",
    },
    description: {
      es: "Fruta andina de sabor característico, ligeramente ácido y refrescante.",
      en: "An Andean fruit with a distinctive, slightly tangy, and refreshing flavor.",
    },
    image: "/fruits/tamarillo.png",
  },
  {
    id: "naranjilla",
    name: {
      es: "Naranjilla",
      en: "Naranjilla (Lulo)",
    },
    description: {
      es: "Fruta tropical de sabor cítrico y aroma particular, utilizada en bebidas y preparaciones gastronómicas.",
      en: "A tropical fruit with a citrus-like flavor and distinctive aroma, commonly used in beverages and culinary preparations.",
    },
    image: "/fruits/naranjilla.png",
  },
  {
    id: "mangosteen",
    name: {
      es: "Mangostán",
      en: "Mangosteen",
    },
    description: {
      es: "Fruta tropical apreciada por su pulpa delicada, jugosa y de sabor dulce.",
      en: "A tropical fruit appreciated for its delicate, juicy flesh and sweet flavor.",
    },
    image: "/fruits/mangosteen.png",
  },
  {
    id: "sweet-cucumber",
    name: {
      es: "Pepino Dulce",
      en: "Sweet Cucumber",
    },
    description: {
      es: "Fruta refrescante de sabor suave y ligeramente dulce.",
      en: "A refreshing fruit with a mild and slightly sweet flavor.",
    },
    image: "/fruits/sweet-cucumber.png",
  },
  {
    id: "soursop",
    name: {
      es: "Guanábana",
      en: "Soursop",
    },
    description: {
      es: "Fruta tropical de pulpa blanca, textura cremosa y sabor característico.",
      en: "A tropical fruit with white flesh, a creamy texture, and a distinctive flavor.",
    },
    image: "/fruits/soursop.png",
  },
  {
    id: "tamarind",
    name: {
      es: "Tamarindo",
      en: "Tamarind",
    },
    description: {
      es: "Fruta tropical de sabor agridulce, ampliamente utilizada en bebidas y preparaciones alimenticias.",
      en: "A tropical fruit with a sweet-and-sour taste, widely used in beverages and food preparations.",
    },
    image: "/fruits/tamarind.png",
  },
  {
    id: "mamey",
    name: {
      es: "Mamey",
      en: "Mamey",
    },
    description: {
      es: "Fruta tropical de pulpa suave y sabor dulce.",
      en: "A tropical fruit with soft flesh and a sweet flavor.",
    },
    image: "/fruits/mamey.png",
  },
];
