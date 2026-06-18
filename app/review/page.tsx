"use client";
import React from 'react';

const LE_THIA_LOGO = "https://lh3.googleusercontent.com/aida-public/AB6AXuDULIs-D-ozw3cg59e8NKcZgP0C881paksA5k47FsOo62Tk72Ypf-eio4E5T74wI_YC8dzsLzv-Y1aWbCFh3g9iyEDYkZn8_Ww13KuqSH7lh1Hk7vLV-N5V5M0dqMu5kq8LoOReSG7LdVN8YjETzcY6dIK_KcxI0sFMRUBPrlvdSq5rpnlQ0sSt-IMWysouG-pMsUyXi5kr3vzLc1Xmke-OS-mqw3BEzj-MBZBYtHmtag2yqU8P1U-scdpDtndb4nyImNF9Yo2NGKfo";

export default function ReviewPage() {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
      <div
        className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8"
        style={{ fontFamily: "'Outfit', sans-serif", backgroundColor: '#492e3b' }}
      >
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
          {/* Logo Section */}
          <div className="mb-4 sm:mb-6 lg:mb-8 flex justify-center">
            <div className="w-40 h-20 sm:w-48 sm:h-24 md:w-56 md:h-28 lg:w-64 lg:h-32 bg-[#faf9f7] flex items-center justify-center overflow-hidden rounded-lg">
              <img
                src={LE_THIA_LOGO}
                alt="Le Thia Cares Logo"
                className="w-full h-full object-contain p-2"
              />
            </div>
          </div>

          {/* Click & Review Section */}
          <div className="text-center mb-6 sm:mb-8 lg:mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#492e3b] mb-3 sm:mb-4">
              Click &amp; Review
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-md mx-auto">
              We&apos;d love to hear your feedback!<br />
              Please click any one of the buttons below to share your review.<br />
              A short review of 4 to 5 lines would be greatly appreciated.
            </p>
          </div>

          {/* Buttons Section */}
          <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5">
            <a href="https://g.page/r/CRxD_0ubmNDWEBM/review" target="_blank" rel="noopener noreferrer">
              <button
                className="btn-primary w-full cursor-pointer py-2 sm:py-3 lg:py-4 text-white text-base sm:text-lg lg:text-xl font-semibold rounded-lg shadow-lg"
                style={{ backgroundColor: '#492e3b' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#3a2330')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#492e3b')}
              >
                Client Review
              </button>
            </a>
            <a href="/client-feedback">
              <button
                className="btn-outline w-full cursor-pointer py-2 sm:py-3 lg:py-4 bg-transparent border-2 text-base sm:text-lg lg:text-xl font-semibold rounded-lg"
                style={{ borderColor: '#492e3b', color: '#492e3b' }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = '#492e3b';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#492e3b';
                }}
              >
                Client Feedback
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
