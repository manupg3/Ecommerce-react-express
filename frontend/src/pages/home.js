import React from 'react'
import Carousel from "react-bootstrap/Carousel"

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
    <div>
        <CarouselHome/>
    </div>
  )
}

export default HomePage