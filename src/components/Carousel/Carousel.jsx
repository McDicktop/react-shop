import InfiniteCarousel from "react-leaf-carousel";
import "./style.css";
import HeaderBanners from "../../config/bannersArr";

function Carousel() {
    const urls = HeaderBanners;

    return (
        <InfiniteCarousel
            dots={true}
            arrows={false}
            sidesOpacity={0}
            slidesToScroll={1}
            slidesToShow={1}
            scrollOnDevice={true}
            autoCycle={true}
            cycleInterval={5000}
            animationDuration={250}
        >
            {urls.map((el, index) => {
                return (
                    <div key={index}>
                        <img
                            src={el}
                            alt="image"
                        />
                    </div>
                );
            })}
        </InfiniteCarousel>
    );
}

export default Carousel;
