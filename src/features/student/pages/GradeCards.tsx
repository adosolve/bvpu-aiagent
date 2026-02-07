import React, { useState } from 'react';

interface GradeCard {
  id: string;
  examSeason: string;
  semester: string;
  programName: string;
  academicYear: string;
  examType: string;
  status: 'Published' | 'Not Published';
}

const mockGradeCards: GradeCard[] = [
  {
    id: '1',
    examSeason: 'Odd Semester End Examination 2025–26',
    semester: 'Seventh Semester',
    programName: 'Bachelor of Technology (Computer Science)',
    academicYear: '2025-26',
    examType: 'End Semester Examination',
    status: 'Published'
  },
  {
    id: '2',
    examSeason: 'Even Semester End Examination 2024–25',
    semester: 'Sixth Semester',
    programName: 'Bachelor of Technology (Computer Science)',
    academicYear: '2024-25',
    examType: 'End Semester Examination',
    status: 'Published'
  },
  {
    id: '3',
    examSeason: 'Odd Semester End Examination 2024–25',
    semester: 'Fifth Semester',
    programName: 'Bachelor of Technology (Computer Science)',
    academicYear: '2024-25',
    examType: 'End Semester Examination',
    status: 'Published'
  },
  {
    id: '4',
    examSeason: 'Even Semester End Examination 2025–26',
    semester: 'Eighth Semester',
    programName: 'Bachelor of Technology (Computer Science)',
    academicYear: '2025-26',
    examType: 'End Semester Examination',
    status: 'Not Published'
  }
];

const GradeCards: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleCard = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const handleViewGradeCard = (cardId: string) => {
    console.log('Viewing grade card:', cardId);
  };

  const handleDownloadPDF = (cardId: string) => {
    console.log('Downloading PDF for:', cardId);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <header>
        <h1 className="text-4xl font-semibold text-stone-900 leading-tight mb-2">Grade Cards</h1>
        <p className="text-stone-500 text-sm font-medium">View and download semester-wise grade cards</p>
      </header>

      {/* Grade Cards Accordion */}
      <div className="space-y-4">
        {mockGradeCards.map((card) => (
          <div key={card.id} className="bg-white border border-stone-200 rounded-3xl shadow-sm overflow-hidden animate-in fade-in duration-300">
            <div
              className="p-6 cursor-pointer hover:bg-stone-50/50 transition-all duration-200"
              onClick={() => toggleCard(card.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-lg font-semibold text-stone-800">{card.examSeason}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${
                        card.status === 'Published'
                          ? 'bg-green-50 text-green-700 border-green-100'
                          : 'bg-stone-50 text-stone-500 border-stone-200'
                      }`}
                    >
                      {card.status}
                    </span>
                  </div>
                  <p className="text-stone-600 font-medium">{card.semester}</p>
                </div>
                <div className="ml-4">
                  <svg 
                    className={`w-5 h-5 text-stone-400 transition-transform duration-200 ${
                      expandedCard === card.id ? 'rotate-180' : ''
                    }`} 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
            </div>

            {expandedCard === card.id && (
              <div className="border-t border-stone-100 p-6 bg-stone-50/30 animate-in slide-in-from-top-2 duration-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest block mb-2">
                      Program Name
                    </label>
                    <p className="text-sm font-semibold text-stone-800">{card.programName}</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest block mb-2">
                      Semester
                    </label>
                    <p className="text-sm text-stone-600">{card.semester}</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest block mb-2">
                      Academic Year
                    </label>
                    <p className="text-sm text-stone-600">{card.academicYear}</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest block mb-2">
                      Exam Type
                    </label>
                    <p className="text-sm text-stone-600">{card.examType}</p>
                  </div>
                </div>

                {card.status === 'Published' ? (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => handleViewGradeCard(card.id)}
                      className="flex items-center justify-center gap-3 px-6 py-3 bg-[#5D4037] text-white rounded-xl font-semibold text-sm hover:bg-[#4E342E] transition-all duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View Grade Card
                    </button>
                    <button
                      onClick={() => handleDownloadPDF(card.id)}
                      className="flex items-center justify-center gap-3 px-6 py-3 border border-stone-200 text-stone-600 rounded-xl font-semibold text-sm hover:bg-stone-50 transition-all duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download PDF
                    </button>
                  </div>
                ) : (
                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                    <p className="text-amber-800 text-sm font-medium mb-4">
                      Grade card will be available after official publication
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        disabled
                        className="flex items-center justify-center gap-3 px-6 py-3 bg-stone-100 text-stone-400 rounded-xl font-semibold text-sm cursor-not-allowed"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View Grade Card
                      </button>
                      <button
                        disabled
                        className="flex items-center justify-center gap-3 px-6 py-3 bg-stone-100 text-stone-400 rounded-xl font-semibold text-sm cursor-not-allowed"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download PDF
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GradeCards;