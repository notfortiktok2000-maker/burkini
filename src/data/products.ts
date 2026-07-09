export interface Product {
  id: string;
  slug: string;
  name: { fr: string; ar: string };
  hook: { fr: string; ar: string };
  description: { fr: string; ar: string };
  price: number;
  originalPrice: number;
  images: {
    front: string;
    angle: string;
    detail?: string;
  };
  sizes: string[];
  stockCount: number;
}

export const products: Product[] = [
  {
    id: "prod_1",
    slug: "swim-tunic-set",
    name: { fr: "Ensemble Tunique de Bain", ar: "طقم سترة السباحة" },
    hook: { fr: "Couvrance parfaite et style", ar: "تغطية مثالية وأناقة" },
    description: { 
      fr: "Tunique de bain avec pantalon assorti. Conçu pour allier confort et modestie à la plage.",
      ar: "سترة سباحة مع سروال متناسق. مصمم ليجمع بين الراحة والحشمة على الشاطئ."
    },
    price: 289,
    originalPrice: 409,
    images: {
      front: "https://i.ibb.co/jPVFyJS6/Woman-with-hand-on-hip-202607082242-1.jpg",
      angle: "https://i.ibb.co/N2qNFdLt/Woman-walking-toward-surfboards-2-K-202607082242.jpg",
      detail: "https://i.ibb.co/JFpTX2nK/Woman-in-swim-tunic-2-K-202607082218.jpg",
    },
    sizes: ["M", "L", "XL", "XXL"],
    stockCount: 4,
  },
  {
    id: "prod_2",
    slug: "swim-set-ocean",
    name: { fr: "Ensemble de Bain Océan", ar: "طقم السباحة المحيط" },
    hook: { fr: "Léger et séchage rapide", ar: "خفيف وسريع الجفاف" },
    description: { 
      fr: "Ensemble complet pour une baignade en toute tranquillité. Tissu respirant qui ne colle pas.",
      ar: "طقم كامل لسباحة مريحة. قماش يسمح بمرور الهواء ولا يلتصق بالجسم."
    },
    price: 289,
    originalPrice: 409,
    images: {
      front: "https://i.ibb.co/Fk7QMz9M/Woman-in-swim-set-on-202607082218.jpg",
      angle: "https://i.ibb.co/QWDKSgJ/Woman-in-tie-dye-tunic-beach-202607082251.jpg",
      detail: "https://i.ibb.co/PvQPbLq4/Woman-standing-at-shoreline-horizon-202607082242.jpg",
    },
    sizes: ["M", "L", "XL", "XXL"],
    stockCount: 7,
  },
  {
    id: "prod_3",
    slug: "brookini-with-hat",
    name: { fr: "Burkini Azur", ar: "بوركيني أزور" },
    hook: { fr: "Protection solaire élégante", ar: "حماية أنيقة من الشمس" },
    description: { 
      fr: "Le Brookini idéal avec son chapeau assorti. Parfait pour les longues journées ensoleillées.",
      ar: "البروكيني المثالي مع قبعته المتناسقة. مثالي للأيام المشمسة الطويلة."
    },
    price: 289,
    originalPrice: 409,
    images: {
      front: "https://i.ibb.co/9H6pWStx/Woman-wearing-brookini-and-hat-202607082236.jpg",
      angle: "https://i.ibb.co/PvcS5J34/Woman-seated-on-lounger-2-K-202607082236.jpg",
    },
    sizes: ["M", "L", "XL", "XXL"],
    stockCount: 2,
  },
  {
    id: "prod_4",
    slug: "lounge-swim-set",
    name: { fr: "Ensemble Lounge", ar: "طقم الاسترخاء" },
    hook: { fr: "Confort absolu au bord de l'eau", ar: "راحة مطلقة على الشاطئ" },
    description: { 
      fr: "Un ensemble polyvalent, à porter dans l'eau comme au bord de la piscine.",
      ar: "طقم متعدد الاستخدامات، يمكن ارتداؤه في الماء أو بجانب المسبح."
    },
    price: 289,
    originalPrice: 409,
    images: {
      front: "https://i.ibb.co/NMX84B3/Woman-standing-near-lounge-chair-202607082242.jpg",
      angle: "https://i.ibb.co/JjHSJshs/Woman-in-floral-outfit-seated-202607082218.jpg",
    },
    sizes: ["M", "L", "XL", "XXL"],
    stockCount: 5,
  }
];
