interface SectionType {
    key: string;
    name: string,
    ratingBand: string | undefined,
    cap: number | undefined,
    description: string
}

export const juniorSections: SectionType[] = [
    { key: "open", name: "Open", ratingBand: undefined, cap: undefined, description: "Open to all" },
    { key: "major", name: "Major", ratingBand: "(1450 and below)", cap: 1450, description: "ECF 1450 and below" },
    { key: "inter", name: "Intermediate", ratingBand: "(1200 and below)", cap: 1200, description: "ECF 1200 and below" },
    { key: "minor", name: "Minor", ratingBand: "(1000 and below)", cap: 1000, description: "ECF 1000 and below" }
];

export const standardSections: SectionType[] = [
    { key: "open", name: "Open", ratingBand: undefined, cap: undefined, description: "Open to all" },
    { key: "major", name: "Major", ratingBand: "(2000 and below)", cap: 2000, description: "ECF 2000 and below" },
    { key: "inter", name: "Intermediate", ratingBand: "(1750 and below)", cap: 1750, description: "ECF 1750 and below" },
    { key: "minor", name: "Minor", ratingBand: "(1500 and below)", cap: 1500, description: "ECF 1500 and below" }
];