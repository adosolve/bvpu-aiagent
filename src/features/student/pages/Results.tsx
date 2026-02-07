import React, { useState } from 'react';

interface Subject {
  subjectCode: string;
  subjectName: string;
  credits: number;
  internalMarks: number;
  externalMarks: number;
  total: number;
  grade: string;
  resultStatus: 'Pass' | 'Fail' | 'AB';
}

interface SemesterResult {
  id: string;
  semester: string;
  academicYear: string;
  resultStatus: 'Pass' | 'Fail' | 'Withheld';
  sgpa: string;
  totalCredits: number;
  subjects: Subject[];
}

const mockResults: SemesterResult[] = [
  {
    id: '1',
    semester: 'Odd Semester End Examination 2025–26',
    academicYear: '2025-26',
    resultStatus: 'Pass',
    sgpa: '8.45',
    totalCredits: 22,
    subjects: [
      {
        subjectCode: 'CS701',
        subjectName: 'Advanced Data Structures',
        credits: 4,
        internalMarks: 38,
        externalMarks: 42,
        total: 80,
        grade: 'A',
        resultStatus: 'Pass'
      },
      {
        subjectCode: 'CS702',
        subjectName: 'Machine Learning',
        credits: 4,
        internalMarks: 35,
        externalMarks: 45,
        total: 80,
        grade: 'A',
        resultStatus: 'Pass'
      },
      {
        subjectCode: 'CS703',
        subjectName: 'Software Engineering',
        credits: 3,
        internalMarks: 32,
        externalMarks: 38,
        total: 70,
        grade: 'B+',
        resultStatus: 'Pass'
      },
      {
        subjectCode: 'CS704',
        subjectName: 'Computer Networks',
        credits: 3,
        internalMarks: 40,
        externalMarks: 48,
        total: 88,
        grade: 'A+',
        resultStatus: 'Pass'
      },
      {
        subjectCode: 'CS705',
        subjectName: 'Database Management Systems',
        credits: 4,
        internalMarks: 36,
        externalMarks: 41,
        total: 77,
        grade: 'B+',
        resultStatus: 'Pass'
      },
      {
        subjectCode: 'CS706L',
        subjectName: 'ML Laboratory',
        credits: 2,
        internalMarks: 45,
        externalMarks: 48,
        total: 93,
        grade: 'A+',
        resultStatus: 'Pass'
      },
      {
        subjectCode: 'CS707L',
        subjectName: 'Networks Laboratory',
        credits: 2,
        internalMarks: 42,
        externalMarks: 46,
        total: 88,
        grade: 'A+',
        resultStatus: 'Pass'
      }
    ]
  },
  {
    id: '2',
    semester: 'Even Semester End Examination 2024–25',
    academicYear: '2024-25',
    resultStatus: 'Pass',
    sgpa: '7.89',
    totalCredits: 20,
    subjects: [
      {
        subjectCode: 'CS601',
        subjectName: 'Operating Systems',
        credits: 4,
        internalMarks: 34,
        externalMarks: 38,
        total: 72,
        grade: 'B+',
        resultStatus: 'Pass'
      },
      {
        subjectCode: 'CS602',
        subjectName: 'Compiler Design',
        credits: 4,
        internalMarks: 36,
        externalMarks: 42,
        total: 78,
        grade: 'B+',
        resultStatus: 'Pass'
      },
      {
        subjectCode: 'CS603',
        subjectName: 'Web Technologies',
        credits: 3,
        internalMarks: 38,
        externalMarks: 44,
        total: 82,
        grade: 'A',
        resultStatus: 'Pass'
      },
      {
        subjectCode: 'CS604',
        subjectName: 'Artificial Intelligence',
        credits: 3,
        internalMarks: 40,
        externalMarks: 46,
        total: 86,
        grade: 'A',
        resultStatus: 'Pass'
      },
      {
        subjectCode: 'CS605L',
        subjectName: 'OS Laboratory',
        credits: 2,
        internalMarks: 44,
        externalMarks: 47,
        total: 91,
        grade: 'A+',
        resultStatus: 'Pass'
      },
      {
        subjectCode: 'CS606L',
        subjectName: 'Web Technologies Lab',
        credits: 2,
        internalMarks: 42,
        externalMarks: 45,
        total: 87,
        grade: 'A+',
        resultStatus: 'Pass'
      },
      {
        subjectCode: 'HS601',
        subjectName: 'Professional Ethics',
        credits: 2,
        internalMarks: 35,
        externalMarks: 40,
        total: 75,
        grade: 'B+',
        resultStatus: 'Pass'
      }
    ]
  }
];

const Results: React.FC = () => {
  const [selectedSemester, setSelectedSemester] = useState<string>('');
  const [selectedResult, setSelectedResult] = useState<SemesterResult | null>(null);

  const handleSemesterChange = (semesterId: string) => {
    setSelectedSemester(semesterId);
    const result = mockResults.find(r => r.id === semesterId);
    setSelectedResult(result || null);
  };

  const getResultStatusStyle = (status: string) => {
    switch (status) {
      case 'Pass':
        return 'bg-green-50 text-green-700 border-green-100';
      case 'Fail':
        return 'bg-red-50 text-red-700 border-red-100';
      case 'Withheld':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'AB':
        return 'bg-stone-50 text-stone-500 border-stone-200';
      default:
        return 'bg-stone-50 text-stone-500 border-stone-200';
    }
  };

  const getGradeStyle = (grade: string) => {
    if (grade === 'A+' || grade === 'A') return 'text-green-700 font-semibold';
    if (grade === 'B+' || grade === 'B') return 'text-blue-700 font-semibold';
    if (grade === 'C+' || grade === 'C') return 'text-amber-700 font-semibold';
    return 'text-stone-600 font-semibold';
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <header>
        <h1 className="text-4xl font-semibold text-stone-900 leading-tight mb-2">Results</h1>
        <p className="text-stone-500 text-sm font-medium">View detailed examination results for each semester</p>
      </header>

      {/* Semester Selection */}
      <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm">
        <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest block mb-3">
          Select Examination / Semester
        </label>
        <select
          value={selectedSemester}
          onChange={(e) => handleSemesterChange(e.target.value)}
          className="w-full md:w-auto min-w-[300px] p-4 border border-stone-200 rounded-xl text-sm font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#5D4037]/20 focus:border-[#5D4037] bg-white"
        >
          <option value="">Choose a semester...</option>
          {mockResults.map((result) => (
            <option key={result.id} value={result.id}>
              {result.semester}
            </option>
          ))}
        </select>
      </div>

      {/* Result Summary Card */}
      {selectedResult && (
        <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm animate-in fade-in duration-300">
          <h3 className="text-lg font-semibold text-stone-800 mb-6">Result Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div>
              <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest block mb-2">
                Semester
              </label>
              <p className="text-sm font-semibold text-stone-800">{selectedResult.semester}</p>
            </div>
            <div>
              <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest block mb-2">
                Academic Year
              </label>
              <p className="text-sm text-stone-600">{selectedResult.academicYear}</p>
            </div>
            <div>
              <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest block mb-2">
                Result Status
              </label>
              <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${getResultStatusStyle(selectedResult.resultStatus)}`}>
                {selectedResult.resultStatus}
              </span>
            </div>
            <div>
              <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest block mb-2">
                SGPA
              </label>
              <p className="text-2xl font-semibold text-[#5D4037]">{selectedResult.sgpa}</p>
            </div>
            <div>
              <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest block mb-2">
                Total Credits
              </label>
              <p className="text-sm font-semibold text-stone-800">{selectedResult.totalCredits}</p>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Result Table */}
      {selectedResult && (
        <div className="bg-white border border-stone-200 rounded-3xl shadow-sm overflow-hidden animate-in fade-in duration-300 delay-200">
          <div className="p-6 border-b border-stone-100">
            <h3 className="text-lg font-semibold text-stone-800">Detailed Results</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50/50">
                  <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Subject Code</th>
                  <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Subject Name</th>
                  <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest text-center">Credits</th>
                  <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest text-center">INT</th>
                  <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest text-center">EXT</th>
                  <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest text-center">Total</th>
                  <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest text-center">Grade</th>
                  <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {selectedResult.subjects.map((subject, index) => (
                  <tr key={index} className="hover:bg-stone-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-sm font-mono font-semibold text-stone-800">{subject.subjectCode}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-stone-800">{subject.subjectName}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-medium text-stone-600">{subject.credits}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm text-stone-600">{subject.internalMarks}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm text-stone-600">{subject.externalMarks}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-semibold text-stone-800">{subject.total}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`text-sm ${getGradeStyle(subject.grade)}`}>{subject.grade}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${getResultStatusStyle(subject.resultStatus)}`}>
                        {subject.resultStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Legend & Notes */}
      {selectedResult && (
        <div className="bg-stone-50 border border-stone-100 rounded-xl p-6 animate-in fade-in duration-300 delay-400">
          <h4 className="text-sm font-semibold text-stone-700 mb-3">Legend & Notes</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-stone-600">
            <div>
              <span className="font-semibold text-stone-700">INT</span> = Internal Assessment
            </div>
            <div>
              <span className="font-semibold text-stone-700">EXT</span> = End Term Examination
            </div>
            <div>
              <span className="font-semibold text-stone-700">PR</span> = Practical
            </div>
            <div>
              <span className="font-semibold text-stone-700">AB</span> = Absent
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-stone-200">
            <p className="text-xs text-stone-500">
              Results are provisional and subject to verification. For any discrepancies, please contact the examination office.
            </p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!selectedResult && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center text-stone-300 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <line x1="10" y1="9" x2="8" y2="9"></line>
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-stone-800 mb-2">Select a Semester</h3>
          <p className="text-stone-500 text-sm max-w-xs mx-auto">Choose an examination semester from the dropdown above to view your detailed results.</p>
        </div>
      )}
    </div>
  );
};

export default Results;