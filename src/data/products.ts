import { productImages } from "./imageManifest";

export interface ProductMedia {
  type: "main" | "lifestyle" | "detail" | string;
  src: string;
  fallback: string;
  alt: string;
}

export interface ProductColor {
  id: string;
  name: { fr: string; ar: string };
  value: string;
  images: ProductMedia[];
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
            src: productImages.ensembleAlma.blue.main.webp,
            fallback: productImages.ensembleAlma.blue.main.fallback,
            alt: productImages.ensembleAlma.blue.main.alt
          },
          {
            type: "lifestyle",
            src: productImages.ensembleAlma.blue.lifestyle.webp,
            fallback: productImages.ensembleAlma.blue.lifestyle.fallback,
            alt: productImages.ensembleAlma.blue.lifestyle.alt
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
            src: productImages.ensembleAlma.burgundy.main.webp,
            fallback: productImages.ensembleAlma.burgundy.main.fallback,
            alt: productImages.ensembleAlma.burgundy.main.alt
          },
          {
            type: "lifestyle",
            src: productImages.ensembleAlma.burgundy.lifestyle.webp,
            fallback: productImages.ensembleAlma.burgundy.lifestyle.fallback,
            alt: productImages.ensembleAlma.burgundy.lifestyle.alt
          }
        ]
      }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stockCount: 15,
  },
  {
    id: "SANDALES-MAYA",
    slug: "sandales-maya",
    name: { fr: "Sandales Maya", ar: "صندل مايا" },
    hook: {
      fr: "La paire facile à associer à toutes vos tenues d’été.",
      ar: "الزوج الذي يسهل تنسيقه مع جميع إطلالاتك الصيفية."
    },
    description: {
      fr: "Les Sandales Maya apportent une finition simple et élégante à vos tenues du quotidien. Leur silhouette plate, leurs brides fines et leur détail métallique créent un modèle facile à porter avec un ensemble fluide, une robe, un jean ou un pantalon large.",
      ar: "يضفي صندل مايا لمسة بسيطة وأنيقة على ملابسك اليومية. شكله المسطح وأشرطته الرفيعة وتفاصيله المعدنية تجعله نموذجًا يسهل ارتداؤه مع طقم انسيابي أو فستان أو جينز أو سروال واسع."
    },
    price: 219,
    originalPrice: null,
    colors: [
      {
        id: "noir",
        name: { fr: "Noir", ar: "أسود" },
        value: "#1D1D1F",
        images: [
          {
            type: "main",
            src: productImages.sandalesMaya.black.main.webp,
            fallback: productImages.sandalesMaya.black.main.fallback,
            alt: productImages.sandalesMaya.black.main.alt
          }
        ]
      },
      {
        id: "blanc",
        name: { fr: "Blanc", ar: "أبيض" },
        value: "#F5F5F7",
        images: [
          {
            type: "main",
            src: productImages.sandalesMaya.white.main.webp,
            fallback: productImages.sandalesMaya.white.main.fallback,
            alt: productImages.sandalesMaya.white.main.alt
          },
          {
            type: "detail",
            src: productImages.sandalesMaya.white.detail.webp,
            fallback: productImages.sandalesMaya.white.detail.fallback,
            alt: productImages.sandalesMaya.white.detail.alt
          }
        ]
      },
      {
        id: "marron-cognac",
        name: { fr: "Marron cognac", ar: "بني كونياك" },
        value: "#8B4513",
        images: [
          {
            type: "main",
            src: productImages.sandalesMaya.cognac.main.webp,
            fallback: productImages.sandalesMaya.cognac.main.fallback,
            alt: productImages.sandalesMaya.cognac.main.alt
          }
        ]
      }
    ],
    sizes: ["36", "37", "38", "39", "40", "41"],
    stockCount: 50,
  }
];

export const lookAlmaBundle = {
  id: "LOOK-ALMA",
  slug: "look-alma-complet",
  name: { fr: "Look Alma Complet", ar: "طقم ألما الكامل" },
  price: 429,
  separateProductsValue: 478,
  normalShipping: 30,
  normalDeliveredTotal: 508,
  customerSavings: 79,
  bundleShipping: 0,
  currency: "MAD",
  includes: [
    "prod_alma",
    "SANDALES-MAYA"
  ]
};
