import { subjects, getSubjectData } from '@/data/subjects';
import SubjectClient from './SubjectClient';

export function generateStaticParams() {
  return subjects.map((subject) => ({
    subject: subject.id,
  }));
}

export default async function SubjectPage({ params }: { params: Promise<{ subject: string }> }) {
  const resolvedParams = await params;
  const subjectMeta = subjects.find(s => s.id === resolvedParams.subject);
  const studyData = getSubjectData(resolvedParams.subject);

  if (!subjectMeta) {
    return <div className="p-12 text-center text-xl font-bold">Subject not found.</div>;
  }

  return <SubjectClient subjectMeta={subjectMeta} studyData={studyData} />;
}
