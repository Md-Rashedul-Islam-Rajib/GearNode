import Banner from '@/components/shared/Banner'
import ExtraSection from '@/components/shared/ExtraSection'
import FeaturedProducts from '@/components/shared/FeaturedProducts'
import Footer from '@/components/shared/Footer'
import Navbar from '@/components/shared/Navbar'


const Home = () => {
  return (
    <div>
          <Navbar />
      <div className="my-4">
      <Banner />
      </div>
      <FeaturedProducts />
      <div className="my-8">
      <ExtraSection />
      </div>
      <Footer/>
    </div>
  )
}

export default Home
