import React from 'react'
import Carousel from "react-bootstrap/Carousel"
import Categories from '../components/categories'
import ProductList from '../components/productList'
import PromoProduct from '../components/promoProduct'

const CarouselHome = () =>{

      const imgSlide_1 = "slider_1.png"
      const imgSlide_2 = "slider_2.png"
      const imgSlide_3 = "slider_3.png"

    return(
        <Carousel fade controls={false} indicators={false}>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={require('../assets/img/'+imgSlide_1)}
      alt="First slide"
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={require('../assets/img/'+imgSlide_2)}
      alt="Second slide"
    />

  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={require('../assets/img/'+imgSlide_3)}
      alt="Third slide"
    />


  </Carousel.Item>
</Carousel>
    )
}


function HomePage() {
  return (
    <div className='pt-[104px]'>
        <CarouselHome/>
        <div className='bg-white pl-8 pr-8'>
        <Categories/> 
        <ProductList/> 
        <ProductList/> 
        <div className='pr-8 pl-8'>
        <PromoProduct/>
        </div>
        </div>
    </div>
  )
}

export default HomePage