import { CheckCircle, Users, FileText, Calendar } from 'lucide-react';

const ParticipationSection = () => {
  return (
    <section id="participation" className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">참가 안내</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AI 해커톤 참가를 위한 자세한 안내사항을 확인하세요
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* 참가 자격 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="flex items-center mb-6">
              <CheckCircle className="w-8 h-8 text-purple-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">참가 자격</h3>
            </div>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>사내 임직원 누구나 (정규직, 계약직, 인턴 포함)</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>AI 및 머신러닝에 관심이 있는 모든 직군</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>프로그래밍 경험이 있거나 학습 의지가 있는 자</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>전체 일정에 성실히 참여 가능한 자</span>
              </li>
            </ul>
          </div>

          {/* 팀 구성 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="flex items-center mb-6">
              <Users className="w-8 h-8 text-purple-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">팀 구성</h3>
            </div>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>팀 규모:</strong> 1~4명 (개인 참가 가능)</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>팀 구성:</strong> 자유롭게 팀 구성 또는 개인 참가</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>팀 리더:</strong> 팀당 1명 지정 (대표 연락처)</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>권장 구성:</strong> 개발자 + 기획자 + 디자이너</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* 신청 방법 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="flex items-center mb-6">
              <FileText className="w-8 h-8 text-purple-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">신청 방법</h3>
            </div>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <span className="text-sm font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">온라인 신청서 작성</h4>
                  <p className="text-gray-600 text-sm">팀 정보 및 참가자 정보 입력</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <span className="text-sm font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">아이디어 개요 제출</h4>
                  <p className="text-gray-600 text-sm">해결하고 싶은 문제와 접근 방법 간략히 기술</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <span className="text-sm font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">서약서 제출</h4>
                  <p className="text-gray-600 text-sm">개인정보 활용 동의 및 참가 규정 동의</p>
                </div>
              </div>
            </div>
          </div>

          {/* 주요 안내사항 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="flex items-center mb-6">
              <Calendar className="w-8 h-8 text-purple-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">주요 안내사항</h3>
            </div>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>신청 마감:</strong> 2024년 3월 15일 (금) 18:00</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>선발 인원:</strong> 총 100팀 (선착순 아님, 서류 심사)</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>제공 사항:</strong> 개발 환경, 멘토링, 식사, 기념품</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>시상:</strong> 대상 1팀 (500만원), 우수상 2팀 (각 200만원)</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>문의:</strong> ai-hackathon@company.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParticipationSection;