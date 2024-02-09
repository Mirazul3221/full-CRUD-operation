
import Header from './Header'
import ProtectRoute from './ProtectRoute'


const Home = () => {
  return (
      <div className=''>
      <Header /> 
      <ProtectRoute />
    </div>
  )
}

export default Home