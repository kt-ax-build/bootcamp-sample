import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Upload, Plus, Minus } from 'lucide-react';

const RegistrationSection = () => {
  const [teamMembers, setTeamMembers] = useState([{ name: '', department: '', position: '', email: '' }]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const addTeamMember = () => {
    if (teamMembers.length < 4) {
      setTeamMembers([...teamMembers, { name: '', department: '', position: '', email: '' }]);
    }
  };

  const removeTeamMember = (index: number) => {
    if (teamMembers.length > 1) {
      setTeamMembers(teamMembers.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <section id="registration" className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl text-white">✓</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">신청이 완료되었습니다!</h2>
            <p className="text-xl text-gray-600 mb-8">
              등록해주신 이메일로 확인 메일을 발송했습니다.<br />
              서류 심사 결과는 3월 20일(수)에 개별 안내드립니다.
            </p>
            <Button 
              onClick={() => setIsSubmitted(false)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3"
            >
              정보 수정하기
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="registration" className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">신청 및 접수</h2>
          <p className="text-xl text-gray-600">
            AI 해커톤에 참가하시려면 아래 정보를 입력해주세요
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 팀 정보 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">팀 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="teamName">팀명 *</Label>
                  <Input 
                    id="teamName" 
                    placeholder="팀명을 입력하세요" 
                    required 
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="teamSize">팀 구성</Label>
                  <Select>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="팀 구성을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">개인 (1명)</SelectItem>
                      <SelectItem value="2">2명</SelectItem>
                      <SelectItem value="3">3명</SelectItem>
                      <SelectItem value="4">4명</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="teamDescription">팀 소개</Label>
                <Textarea 
                  id="teamDescription"
                  placeholder="팀을 간단히 소개해주세요"
                  className="mt-2"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* 팀원 정보 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl text-gray-900">팀원 정보</CardTitle>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    onClick={addTeamMember}
                    disabled={teamMembers.length >= 4}
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    팀원 추가
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {teamMembers.map((member, index) => (
                <div key={index} className="p-6 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">
                      {index === 0 ? '팀 리더' : `팀원 ${index}`}
                    </h4>
                    {index > 0 && (
                      <Button
                        type="button"
                        onClick={() => removeTeamMember(index)}
                        variant="outline"
                        size="sm"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`name-${index}`}>이름 *</Label>
                      <Input 
                        id={`name-${index}`}
                        placeholder="이름을 입력하세요" 
                        required 
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`department-${index}`}>소속 부서 *</Label>
                      <Input 
                        id={`department-${index}`}
                        placeholder="부서명을 입력하세요" 
                        required 
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`position-${index}`}>직급/직책</Label>
                      <Input 
                        id={`position-${index}`}
                        placeholder="직급 또는 직책을 입력하세요" 
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`email-${index}`}>이메일 *</Label>
                      <Input 
                        id={`email-${index}`}
                        type="email"
                        placeholder="이메일을 입력하세요" 
                        required 
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* 아이디어 정보 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">아이디어 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="ideaTitle">아이디어 제목 *</Label>
                <Input 
                  id="ideaTitle"
                  placeholder="아이디어의 제목을 입력하세요" 
                  required 
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="problemStatement">해결하고자 하는 문제 *</Label>
                <Textarea 
                  id="problemStatement"
                  placeholder="어떤 문제를 해결하고 싶으신가요? (300자 이내)"
                  required
                  className="mt-2"
                  rows={4}
                />
              </div>
              
              <div>
                <Label htmlFor="solution">솔루션 접근 방법 *</Label>
                <Textarea 
                  id="solution"
                  placeholder="어떤 방식으로 해결하실 계획인가요? (500자 이내)"
                  required
                  className="mt-2"
                  rows={5}
                />
              </div>
              
              <div>
                <Label htmlFor="techStack">사용 예정 기술스택</Label>
                <Input 
                  id="techStack"
                  placeholder="예: Python, TensorFlow, React, etc." 
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* 파일 업로드 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">서류 제출</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>참가 서약서 (필수)</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">서약서를 업로드하세요</p>
                  <p className="text-sm text-gray-400 mt-1">PDF, DOC, DOCX 파일 (최대 5MB)</p>
                </div>
              </div>
              
              <div>
                <Label>추가 자료 (선택)</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">포트폴리오, 이력서 등 추가 자료</p>
                  <p className="text-sm text-gray-400 mt-1">PDF, DOC, DOCX, PPT 파일 (최대 10MB)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 제출 버튼 */}
          <div className="text-center pt-8">
            <Button 
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-12 py-4 text-lg rounded-full"
            >
              참가 신청하기
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              * 제출 후에도 마감일 전까지 수정이 가능합니다
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegistrationSection;