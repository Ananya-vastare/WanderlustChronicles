// App.js or Carousel.js
import React from "react";
import Slider from "react-slick";
import image1 from "./images/Promo1.png";
import image2 from "./images/Promo2.png"
import image3 from "./images/Promo3.png"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css"; // Optional external styles

function Carousel() {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        pauseOnHover: true,
    };

    return (
        <div className="carousel-container">
            <h2 className="carousel-title">Explore the World with Us 🌍</h2>
            <Slider {...settings}>
                <div className="slide">
                    <img src={image1} alt="Promo 1" className="carousel-img" />
                    <div className="caption">Adventure Awaits</div>
                </div>
                <div className="slide">
                    <img src={image2} alt="Promo 2" className="carousel-img" />
                    <div className="caption">Discover Hidden Gems</div>
                </div>
                <div className="slide">
                    <img src={image3} alt="Promo 3" className="carousel-img" />
                    <div className="caption">Your Journey Begins Here</div>
                </div>
            </Slider>
        </div>
    );
}

export default Carousel;
