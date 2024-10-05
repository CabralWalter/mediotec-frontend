import { useState, useEffect } from 'react';

import { getLessonsByProfessorCpf } from '@/app/services/userConsultService';
import LessonCard from './LessonCard';

interface Lesson {
  id: number;
  name: string;
  discipline: {
    name: string;
  };
  schoolClass: {
    id: number,
    letter: string;
    shift: string;
    year: string;
  };
  weekDay: string;
  startTime: string;
  endTime: string;
  room: string;
}

interface ProfessorPageProps {
  cpf: string;
}

const ProfessorPage: React.FC<ProfessorPageProps> = ({ cpf }) => {
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const data = await getLessonsByProfessorCpf(cpf);
        setLessons(data);
      } catch (error) {
        console.error('Erro ao buscar as aulas:', error);
      }
    };

    fetchLessons();
  }, [cpf]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Minhas Turmas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </div>
  );
};

export default ProfessorPage;
