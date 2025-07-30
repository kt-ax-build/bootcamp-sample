import { Button } from './ui/button';

const IntroSection = () => {
  return (
    <section id="intro" className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <span className="text-3xl">🤖</span>
              </div>
              <div className="w-8 h-8 bg-purple-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Ready for your next<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              AI Hackathon?
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            최신 AI 기술로 혁신적인 솔루션을 만들어보세요.<br />
            창의적인 아이디어와 기술력을 겨루는 특별한 기회입니다.
          </p>
          
          <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg rounded-full">
            참가 신청하기
          </Button>
        </div>

        {/* Event Info */}
        <div className="grid md:grid-cols-3 gap-8 text-white">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold mb-4">대회 목적</h3>
            <p className="text-gray-300 leading-relaxed">
              사내 개발자들의 AI 기술 역량 강화 및 혁신적인 아이디어 발굴을 통해 
              차세대 AI 서비스 개발의 기반을 마련합니다.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold mb-4">대회 주제</h3>
            <p className="text-gray-300 leading-relaxed">
              "일상을 바꾸는 AI" - 생활 속에서 실제로 활용할 수 있는 
              AI 기반 솔루션을 개발하여 사용자 경험을 혁신해보세요.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold mb-4">주최 및 주관</h3>
            <p className="text-gray-300 leading-relaxed">
              <strong>주최:</strong> 회사명 AI Lab<br />
              <strong>주관:</strong> 개발본부<br />
              <strong>후원:</strong> CTO Office
            </p>
          </div>
        </div>

        {/* Schedule */}
        <div className="mt-16 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">대회 일정</h3>
          <div className="grid md:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="bg-purple-600 text-white rounded-lg py-3 px-4 mb-3">
                <div className="font-bold">참가 신청</div>
                <div className="text-sm">~ 3/15(금)</div>
              </div>
              <p className="text-gray-300 text-sm">AI에 관심이 있는 누구나</p>
            </div>
            
            <div className="text-center">
              <div className="bg-slate-700 text-white rounded-lg py-3 px-4 mb-3">
                <div className="font-bold">서류 발표</div>
                <div className="text-sm">3/18(월) ~ 3/20(수)</div>
              </div>
              <p className="text-gray-300 text-sm">100팀 선발</p>
            </div>
            
            <div className="text-center">
              <div className="bg-slate-700 text-white rounded-lg py-3 px-4 mb-3">
                <div className="font-bold">예선</div>
                <div className="text-sm">3/25(월) ~ 4/5(금)</div>
              </div>
              <p className="text-gray-300 text-sm">100팀 진행<br />NSML을 통한 온라인 예선</p>
            </div>
            
            <div className="text-center">
              <div className="bg-slate-700 text-white rounded-lg py-3 px-4 mb-3">
                <div className="font-bold">결선(온라인)</div>
                <div className="text-sm">4/8(월) ~ 4/12(금)</div>
              </div>
              <p className="text-gray-300 text-sm">상위 30팀 진출<br />NSML을 통한 온라인 결선</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-600 text-white rounded-lg py-3 px-4 mb-3">
                <div className="font-bold">결선(오프라인)</div>
                <div className="text-sm">4/26(금) ~ 4/27(토)</div>
              </div>
              <p className="text-gray-300 text-sm">최종 커넥트홀에서<br />1박 2일 오프라인 결선</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;