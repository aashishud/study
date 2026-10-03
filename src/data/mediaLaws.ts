import { StudySection } from './types';
import { ml_cases } from './mediaLawsCasesMassive';
import { ml_long } from './mediaLawsLongTheory';
import { mediaLawsPart2 } from './mediaLawsPart2';

export const mediaLawsData: StudySection[] = [
  {
    section: "SECTION 1: 15-Mark Landmark Case Studies (Massive)",
    items: ml_cases
  },
  {
    section: "SECTION 2: 15-Mark Long Theory Questions",
    items: ml_long
  },
  ...mediaLawsPart2
];
