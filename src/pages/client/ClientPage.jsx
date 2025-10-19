
import ClientNav from '../../components/client/nav.tsx'
import Hero from '../../components/client/hero.tsx'
import Rooms from '../../components/client/rooms.jsx'
import Facilities from '../../components/client/facilities.jsx'
import Footer from '../../components/client/footer.jsx'
import Gallery from '../../components/client/gallery.jsx'

const ClientPage = () => {
  return (
    <div>
      <ClientNav/>
      <Hero/>
      <Rooms/>
      <Facilities/>
      <Gallery/>
      <Footer/>
    </div>
  )
}

export default ClientPage
