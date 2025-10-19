
import ClientNav from '../../components/client/nav.tsx'
import Hero from '../../components/client/hero.tsx'
import Rooms from '../../components/client/rooms.jsx'
import Facilities from '../../components/client/facilities.jsx'
import Footer from '../../components/client/footer.jsx'

const ClientPage = () => {
  return (
    <div>
      <ClientNav/>
      <Hero/>
      <Rooms/>
      <Facilities/>
      <Footer/>
    </div>
  )
}

export default ClientPage
