"use client"
import dynamic from "next/dynamic";


const Nav = dynamic(() => import('../components/Nav'), { ssr: false });
export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] p-4">
      <div
        className="bg-white rounded-xl shadow-2xl w-full  mx-auto flex flex-col items-center p-0 sm:p-0"
        style={{ minHeight: 320 }}
      >
        {/* Nav Bar at the top of the modal */}
       
        {/* Modal Content Placeholder */}
        <div className="flex-1 w-full flex flex-col items-center justify-center p-8">
        <Nav />
        </div>
      </div>
    </div>
  );
}
