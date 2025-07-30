import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Search, FileText, Calendar, Users, Mail } from 'lucide-react';

const ConfirmationSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [applicationData, setApplicationData] = useState(null);

  // Mock data for demonstration
  const mockApplication = {
    teamName: '혁신 AI 팀',
    status: '서류 심사 중',
    submissionDate: '2024년 3월 12일',
    teamLeader: '김개발',
    members: [
      { name: '김개발', department: '개발본부', email: 'kim@company.com' },
      { name: '이기획', department: '상품기획팀', email: 'lee@company.com' },
      { name: '박디자인', department: 'UX팀', email: 'park@company.com' }
    ],
    ideaTitle: '일상 대화 AI 어시스턴트',
    problemStatement: '업무 중 발생하는 반복적인 질문들을 AI가 자동으로 답변해주는 시스템이 필요합니다.',
    techStack: 'Python, OpenAI GPT, React, Node.js',
    applicationId: 'HACK2024-001'
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Mock search - in real app, this would be an API call
      setApplicationData(mockApplication);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '접수 완료':
        return 'bg-blue-100 text-blue-800';
      case '서류 심사 중':
        return 'bg-yellow-100 text-yellow-800';
      case '예선 통과':
        return 'bg-green-100 text-green-800';
      case '결선 진출':
        return 'bg-purple-100 text-purple-800';
      case '미선발':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section id="confirmation" className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">신청 확인</h2>
          <p className="text-xl text-gray-600">
            신청하신 정보를 확인하고 진행 상황을 조회하세요
          </p>
        </div>

        {/* 검색 섹션 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900 flex items-center">
              <Search className="w-6 h-6 mr-2 text-purple-600" />
              신청 조회
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="search">팀명 또는 신청자 이메일</Label>
                <Input
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="팀명 또는 이메일을 입력하세요"
                  className="mt-2"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={handleSearch}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6"
                >
                  조회하기
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 신청 정보 표시 */}
        {applicationData && (
          <div className="space-y-6">
            {/* 기본 정보 */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-gray-900">신청 정보</CardTitle>
                  <Badge className={getStatusColor(applicationData.status)}>
                    {applicationData.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-gray-600">신청 번호</Label>
                    <p className="font-semibold text-gray-900">{applicationData.applicationId}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">신청일</Label>
                    <p className="font-semibold text-gray-900">{applicationData.submissionDate}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">팀명</Label>
                    <p className="font-semibold text-gray-900">{applicationData.teamName}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">팀 리더</Label>
                    <p className="font-semibold text-gray-900">{applicationData.teamLeader}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 팀원 정보 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-purple-600" />
                  팀원 정보
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applicationData.members.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {member.name} {index === 0 && <span className="text-purple-600">(팀 리더)</span>}
                        </p>
                        <p className="text-gray-600">{member.department}</p>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Mail className="w-4 h-4 mr-1" />
                        <span className="text-sm">{member.email}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 아이디어 정보 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-purple-600" />
                  아이디어 정보
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-600">아이디어 제목</Label>
                  <p className="font-semibold text-gray-900">{applicationData.ideaTitle}</p>
                </div>
                <div>
                  <Label className="text-gray-600">해결하고자 하는 문제</Label>
                  <p className="text-gray-700">{applicationData.problemStatement}</p>
                </div>
                <div>
                  <Label className="text-gray-600">기술 스택</Label>
                  <p className="text-gray-700">{applicationData.techStack}</p>
                </div>
              </CardContent>
            </Card>

            {/* 진행 상황 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-purple-600" />
                  진행 상황
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 rounded-full mr-4"></div>
                    <div>
                      <p className="font-semibold text-gray-900">신청 접수 완료</p>
                      <p className="text-sm text-gray-600">2024년 3월 12일</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full mr-4"></div>
                    <div>
                      <p className="font-semibold text-gray-900">서류 심사 중</p>
                      <p className="text-sm text-gray-600">3월 20일 결과 발표 예정</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-300 rounded-full mr-4"></div>
                    <div>
                      <p className="text-gray-500">예선 진행</p>
                      <p className="text-sm text-gray-400">3월 25일 ~ 4월 5일</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-300 rounded-full mr-4"></div>
                    <div>
                      <p className="text-gray-500">결선 진행</p>
                      <p className="text-sm text-gray-400">4월 26일 ~ 4월 27일</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 액션 버튼 */}
            <div className="text-center space-x-4">
              <Button variant="outline" className="px-8 py-3">
                정보 수정하기
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
                추가 자료 제출
              </Button>
            </div>
          </div>
        )}

        {/* 검색 결과가 없을 때 */}
        {searchQuery && !applicationData && (
          <Card>
            <CardContent className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">검색 결과가 없습니다</h3>
              <p className="text-gray-600">
                입력하신 정보와 일치하는 신청 내역을 찾을 수 없습니다.<br />
                팀명 또는 이메일을 다시 확인해주세요.
              </p>
            </CardContent>
          </Card>
        )}

        {/* 도움말 */}
        {!searchQuery && (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-blue-900 mb-2">신청 조회 안내</h3>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• 신청 시 등록하신 팀명 또는 이메일로 조회 가능합니다</li>
                <li>• 서류 심사 결과는 3월 20일(수)에 개별 통보됩니다</li>
                <li>• 문의사항은 ai-hackathon@company.com으로 연락해주세요</li>
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default ConfirmationSection;