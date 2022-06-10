interface SectionType {
    name: string,
    ratingBand: string | null,
    cap: number | null
}

export const juniorSections: SectionType[] = [
    { name: "Open", ratingBand: undefined, cap: undefined },
    { name: "Major", ratingBand: "(1450 and below)", cap: 1450 },
    { name: "Intermediate", ratingBand: "(1200 and below)", cap: 1200 },
    { name: "Minor", ratingBand: "(1000 and below)", cap: 1000 }
];

export const standardSections: SectionType[] = [
    { name: "Open", ratingBand: undefined, cap: undefined },
    { name: "Major", ratingBand: "(2000 and below)", cap: 2000  },
    { name: "Intermediate", ratingBand: "(1750 and below)", cap: 1750 },
    { name: "Minor", ratingBand: "(1500 and below)", cap: 1500 }
];