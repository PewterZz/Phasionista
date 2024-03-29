import React, { Component } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Swipe from "react-easy-swipe";
import { CarouselData } from "../Data/CarouselData";

interface CarouselProps {}

interface CarouselState {
  currentSlide: number;
  paused: boolean;
}

class Carousel extends Component<CarouselProps, CarouselState> {
  constructor(props: CarouselProps) {
    super(props);
    this.state = {
      currentSlide: 0,
      paused: false,
    };
  }

  //setting interval for autoplaying slides
  componentDidMount(){
    setInterval(() => {
      if(this.state.paused === false){
        let newSlide = this.state.currentSlide === CarouselData.length - 1 ? 0 : this.state.currentSlide + 1
        this.setState({currentSlide: newSlide})
      }
    }, 5000)
  }

  //changing to the next slide
  nextSlide = () => {
    let newSlide =
      this.state.currentSlide === CarouselData.length - 1
        ? 0
        : this.state.currentSlide + 1;
    this.setState({ currentSlide: newSlide });
  };
  
  //changing to the previous slide
  prevSlide = () => {
    let newSlide =
      this.state.currentSlide === 0
        ? CarouselData.length - 1
        : this.state.currentSlide - 1;
    this.setState({ currentSlide: newSlide });
  };

  //changing the currentslide
  setCurrentSlide = (index : number) => {
    this.setState({ currentSlide: index });
  };

  render() {
    return (
      <div className="">
        <div className="w-screen h-auto flex overflow-hidden relative">

        {/* left and right arrows to change slides on click */}
        <AiOutlineLeft onClick={this.prevSlide} className='absolute left-0 text-3xl inset-y-1/2 text-white cursor-pointer' />
        <AiOutlineRight onClick={this.nextSlide} className='absolute right-0 text-3xl inset-y-1/2 text-white cursor-pointer' />
        
        <Swipe onSwipeLeft={this.nextSlide} onSwipeRight={this.prevSlide}>  
          {CarouselData.map((slide : any, index : number) => {
            return (
              <img
              //setting a pause on hover functionality
              //pauses when it sees the mouse on the img
              onMouseEnter={() => {
                this.setState({paused: true})
              }}
              
              //unpauses when the mouse leaves the img
              onMouseLeave={() => {
                this.setState({paused: false})
              }}
                src={slide.image}
                alt="This is a carousel slide"
                key={index}
                className={
                  index === this.state.currentSlide
                    ? "block w-full h-auto object-cover"
                    : "hidden"
                }
              />
            );
          })}
          </Swipe>

          {/* adding the dots to navigate the carousel */}
          <div className="absolute w-full flex justify-center bottom-0">
            {CarouselData.map((element, index) => {
              return (
                <div
                  className={
                    index === this.state.currentSlide
                      ? "h-2 w-2 bg-blue-700 rounded-full mx-2 mb-2 cursor-pointer"
                      : "h-2 w-2 bg-white rounded-full mx-2 mb-2 cursor-pointer"
                  }
                  key={index}
                  onClick={() => {
                    this.setCurrentSlide(index);
                  }}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;
