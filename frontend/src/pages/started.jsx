import React from "react";
import { useNavigate } from "react-router-dom";

const Started = () => {
  const navigate = useNavigate();
  const handleStartClick = () => {
    console.log('Navigate to /blog');
    navigate('/blog');
  };

  const handleExploreClick = () => {
    console.log('Navigate to /blogs');
    navigate('/signup');
  };

  const handleCreateClick = () => {
    navigate('/create')
    console.log('Navigate to /create');
  };

  return (
    <div className="min-h-screen bg-[#0F172A] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#38BDF8]/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#0EA5E9]/10 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#38BDF8]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="mb-8 animate-fadeInUp">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-[#38BDF8] via-[#0EA5E9] to-[#38BDF8] bg-clip-text text-transparent">
                Share Your Story
              </span>
              <br />
              <span className="text-[#E5E7EB]">With The World</span>
            </h1>
            <p className="text-xl text-[#9CA3AF] max-w-3xl mx-auto leading-relaxed">
              Join a community of passionate writers and readers. Create, discover, and engage with stories that matter.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <button
              onClick={handleStartClick}
              className="px-8 py-4 bg-gradient-to-r from-[#38BDF8] to-[#0EA5E9] text-[#0F172A] font-bold text-lg rounded-xl hover:shadow-2xl hover:shadow-[#38BDF8]/40 transition-all duration-300 flex items-center gap-3 group"
            >
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              Start Exploring
            </button>
            
            <button
              onClick={handleCreateClick}
              className="px-8 py-4 bg-[#111827] text-[#E5E7EB] border-2 border-[#38BDF8] font-bold text-lg rounded-xl hover:bg-[#38BDF8]/10 transition-all duration-300 flex items-center gap-3"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Create Your Blog
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              ),
              title: "Create & Share",
              description: "Write captivating stories and share your unique perspective with a global audience."
            },
            {
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              ),
              title: "Discover Content",
              description: "Explore diverse articles from writers around the world on topics you love."
            },
            {
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              ),
              title: "Engage & Connect",
              description: "Comment, discuss, and build meaningful connections with fellow writers and readers."
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-[#111827] border border-[#1F2937] rounded-2xl p-8 hover:border-[#38BDF8]/50 hover:shadow-xl hover:shadow-[#38BDF8]/10 transition-all duration-300 group animate-fadeInUp"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#38BDF8]/20 to-[#0EA5E9]/20 flex items-center justify-center mb-6 text-[#38BDF8] group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-[#E5E7EB] mb-3">{feature.title}</h3>
              <p className="text-[#9CA3AF] leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {[
            { value: "10K+", label: "Active Writers" },
            { value: "50K+", label: "Published Blogs" },
            { value: "100K+", label: "Monthly Readers" },
            { value: "4.9★", label: "User Rating" }
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center animate-fadeInUp"
              style={{ animationDelay: `${0.7 + index * 0.1}s` }}
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-[#38BDF8] to-[#0EA5E9] bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-[#9CA3AF] text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-[#111827] to-[#0F172A] border border-[#1F2937] rounded-3xl p-12 text-center animate-fadeInUp" style={{ animationDelay: '1s' }}>
          <h2 className="text-3xl md:text-4xl font-bold text-[#E5E7EB] mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-[#9CA3AF] text-lg mb-8 max-w-2xl mx-auto">
            Whether you're here to write, read, or connect, your story begins now.
          </p>
          <button
            onClick={handleExploreClick}
            className="px-10 py-4 bg-gradient-to-r from-[#38BDF8] to-[#0EA5E9] text-[#0F172A] font-bold text-lg rounded-xl hover:shadow-2xl hover:shadow-[#38BDF8]/40 transition-all duration-300 inline-flex items-center gap-3 group"
          >
            Get Started Now
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-30px);
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 10s ease-in-out infinite;
          animation-delay: -3s;
        }
      `}</style>
    </div>
  );
};

export default Started;