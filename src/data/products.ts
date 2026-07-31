export interface ProductColor {
  id: string;
  name: { fr: string; ar: string };
  value: string;
  images: {
    front: string;
    angle: string;
    detail?: string;
  };
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
    price: 199,
    originalPrice: null,
    colors: [
      {
        id: "bleu-floral",
        name: { fr: "Bleu floral", ar: "أزرق زهري" },
        value: "#4968A8",
        images: {
          front: "https://i.ibb.co/VppFV0KM/Chat-GPT-Image-Jul-31-2026-12-36-06-AM.png",
          angle: "https://i.ibb.co/VppFV0KM/Chat-GPT-Image-Jul-31-2026-12-36-06-AM.png",
          detail: "https://i.ibb.co/VppFV0KM/Chat-GPT-Image-Jul-31-2026-12-36-06-AM.png",
        }
      },
      {
        id: "bordeaux-floral",
        name: { fr: "Bordeaux floral", ar: "عنابي زهري" },
        value: "#7A2735",
        images: {
          front: "https://i.ibb.co/5WCw3JWC/Chat-GPT-Image-Jul-31-2026-12-35-54-AM-1.png",
          angle: "https://i.ibb.co/5WCw3JWC/Chat-GPT-Image-Jul-31-2026-12-35-54-AM-1.png",
          detail: "https://i.ibb.co/5WCw3JWC/Chat-GPT-Image-Jul-31-2026-12-35-54-AM-1.png",
        }
      }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stockCount: 15,
  }
];
