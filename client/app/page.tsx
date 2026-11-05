import Section01 from "./components/sections/home/section01";
import Section02 from "./components/sections/home/Section02";
import Section03 from "./components/sections/home/Section03";
import Section04 from "./components/sections/home/Section04";
import Section05 from "./components/sections/home/section05";
import Section06 from "./components/sections/home/Section06";
import Section07 from "./components/sections/home/Section07";
import Section08 from "./components/sections/home/Section08";
import Footer from "./components/Footer";
import Section09 from "./components/sections/home/Section09";
import Homeproduct from '@/app/components/Products/Homeproduct'

export default function Home() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <Section01 />
      <Section02 />
      <Homeproduct />
      {/* <Section03 /> */}
      <Section07 />
      <Section05 />
      <Section04 />

      <Section06 />
      <Section08 />
      <Section07 />
      <Section09 />
      <Footer />
    </div>
  );
}
