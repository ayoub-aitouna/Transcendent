import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'next/image';

function CarouselAnnounce() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <Image className="" src='/assets/images/Valorant.png' alt="Profile Image" width={73} height={73}/>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image className="" src='/assets/images/Valorant.png' alt="Profile Image" width={73} height={73}/>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image className="" src='/assets/images/Valorant.png' alt="Profile Image" width={73} height={73}/>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselAnnounce;