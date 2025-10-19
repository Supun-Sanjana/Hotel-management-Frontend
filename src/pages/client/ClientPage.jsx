
// import ClientNav from '../../components/client/nav.tsx'
// import Hero from '../../components/client/hero.tsx'
// import Rooms from '../../components/client/rooms.jsx'
// import Facilities from '../../components/client/facilities.jsx'
// import Footer from '../../components/client/footer.jsx'
// import Gallery from '../../components/client/gallery.jsx'

// const ClientPage = () => {
//   return (
//     <div>
//       <ClientNav/>
//       <Hero/>
//       <Rooms/>
//       <Facilities/>
//       <Gallery/>
//       <Footer/>
//     </div>
//   )
// }

// export default ClientPage


import { useRef } from "react";
import Hero from "../../components/client/hero";
import Rooms from "../../components/client/rooms";
import Facilities from "../../components/client/facilities";
import Gallery from "../../components/client/gallery";
import Footer from "../../components/client/footer";
import ClientNav from "../../components/client/nav";

const ClientPage = () => {
  const heroRef = useRef(null);
  const roomsRef = useRef(null);
  const facilitiesRef = useRef(null);
  const galleryRef = useRef(null);
  const footerRef = useRef(null);

  const handleScroll = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <ClientNav
        onScrollTo={{
          hero: () => handleScroll(heroRef),
          rooms: () => handleScroll(roomsRef),
          facilities: () => handleScroll(facilitiesRef),
          gallery: () => handleScroll(galleryRef),
          footer: () => handleScroll(footerRef),
        }}
      />

      <div ref={heroRef}><Hero /></div>
      <div ref={roomsRef}><Rooms /></div>
      <div ref={facilitiesRef}><Facilities /></div>
      <div ref={galleryRef}><Gallery /></div>
      <div ref={footerRef}><Footer /></div>
    </div>
  );
};

export default ClientPage;
