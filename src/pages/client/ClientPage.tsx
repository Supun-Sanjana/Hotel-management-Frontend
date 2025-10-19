
import ClientNav from '../../components/client/nav'
import Hero from '../../components/client/hero'
import Rooms from '../../components/client/rooms.jsx'
import Facilities from '../../components/client/facilities.jsx'

const ClientPage = () => {
  return (
    <div>
      <ClientNav/>
      <Hero/>
      <Rooms/>
      <Facilities/>
    </div>
  )
}

export default ClientPage
