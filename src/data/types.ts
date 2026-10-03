export interface StudyItem {
  q: string;
  a: string;
  diagram?: string; // Mermaid.js syntax or markdown
}

export interface StudySection {
  section: string;
  items: StudyItem[];
}
