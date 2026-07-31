export interface ProductMedia {
  type: "main" | "lifestyle" | string;
  src: string;
  fallback: string;
  alt: string;
}

export interface ProductColor {
  id: string;
  name: { fr: string; ar: string };
  value: string;
  images: {
    front: string;
    angle: string;
    detail?: string;
  } | ProductMedia[];
}

export interface Product {
  id: string;
  slug: string;
  name: { fr: string; ar: string };
  hook: { fr: string; ar: string };
  description: { fr: string; ar: string };
  price: number;
  originalPrice: number | null;
  colors: ProductColor[];
  sizes: string[];
  stockCount: number;
}

export const products: Product[] = [
  {
    id: "prod_alma",
    slug: "ensemble-alma",
    name: { fr: "Ensemble Alma", ar: "طقم ألما" },
    hook: { 
      fr: "L’ensemble fluide qui vous habille en quelques secondes.",
      ar: "الطقم الانسيابي الذي يجهزك في ثوانٍ." 
    },
    description: { 
      fr: "L’Ensemble Alma réunit une coupe fluide, un imprimé affirmé et le confort d’une tenue facile à porter. Son haut sans manches tombe légèrement sous le nombril, tandis que son pantalon large à taille élastiquée accompagne naturellement vos mouvements. Portez les deux pièces ensemble pour un look immédiatement coordonné, ou séparément avec les essentiels de votre garde-robe.",
      ar: "يجمع طقم ألما بين القصة الانسيابية والطبعة الجريئة والراحة التي توفرها الملابس السهلة الارتداء. قميصه بدون أكمام ينسدل برفق أسفل السرة، بينما يتكيف السروال الواسع ذو الخصر المطاطي مع حركاتك بشكل طبيعي. ارتدِ القطعتين معًا لإطلالة متناسقة، أو كل قطعة على حدة لتنسيقات مختلفة."
    },
    price: 259,
    originalPrice: 350,
    colors: [
      {
        id: "bleu-floral",
        name: { fr: "Bleu floral", ar: "أزرق زهري" },
        value: "#4968A8",
        images: [
          {
            type: "main",
            src: "/images/alma-blue-main.webp",
            fallback: "/images/alma-blue-main.png",
            alt: "Ensemble Alma bleu floral porté devant un grand miroir"
          },
          {
            type: "lifestyle",
            src: "/images/alma-blue-lifestyle.webp",
            fallback: "/images/alma-blue-lifestyle.png",
            alt: "Femme portant l’Ensemble Alma bleu floral avec un sac dans une chambre"
          }
        ]
      },
      {
        id: "bordeaux-floral",
        name: { fr: "Bordeaux floral", ar: "عنابي زهري" },
        value: "#7A2735",
        images: [
          {
            type: "main",
            src: "/images/alma-burgundy-main.webp",
            fallback: "/images/alma-burgundy-main.png",
            alt: "Ensemble Alma bordeaux floral porté devant un grand miroir"
          },
          {
            type: "lifestyle",
            src: "/images/alma-burgundy-lifestyle.webp",
            fallback: "/images/alma-burgundy-lifestyle.png",
            alt: "Femme portant l’Ensemble Alma bordeaux floral avec un sac dans une chambre"
          }
        ]
      }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stockCount: 15,
  }
];
