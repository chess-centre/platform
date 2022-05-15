interface SectionType {
    name: string,
    ratingBand: string | null
}

export const juniorSections: SectionType[] = [
    { name: "Open", ratingBand: undefined },
    { name: "Intermediate", ratingBand: "(1450 and below)" },
    { name: "Minor", ratingBand: "(1000 and below)" }
];

export const standardSections: SectionType[] = [
    { name: "Open", ratingBand: undefined },
    { name: "Major", ratingBand: "(2000 and below)" },
    { name: "Intermediate", ratingBand: "(1750 and below)" },
    { name: "Minor", ratingBand: "(1500 and below)" }
];