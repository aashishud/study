import { ancientIndianCommData } from './ancientIndianComm';
import { mediaLawsData } from './mediaLaws';
import { filmCommunicationData } from './filmCommunication';
import { mediaPlanningData } from './mediaPlanning';
import { adDesigningData } from './studyData';

export const subjects = [
  { id: 'film-communication', title: 'Film Communication - I', date: '08/10/2026 (Thursday)', color: 'from-rose-500 to-rose-700' },
  { id: 'media-laws', title: 'Media Laws and Ethics', date: '09/10/2026 (Friday)', color: 'from-violet-500 to-violet-700' },
  { id: 'ad-designing', title: 'AD Designing', date: '10/10/2026 (Saturday)', color: 'from-blue-500 to-blue-700' },
  { id: 'media-planning', title: 'Media Planning & Buying', date: '12/10/2026 (Monday)', color: 'from-emerald-500 to-emerald-700' },
  { id: 'ancient-indian-comm', title: 'Ancient Indian Comm. System', date: '13/10/2026 (Tuesday)', color: 'from-amber-500 to-amber-700' }
];

export const getSubjectData = (id: string) => {
  switch (id) {
    case 'film-communication': return filmCommunicationData;
    case 'media-laws': return mediaLawsData;
    case 'ad-designing': return adDesigningData;
    case 'media-planning': return mediaPlanningData;
    case 'ancient-indian-comm': return ancientIndianCommData;
    default: return [];
  }
};
