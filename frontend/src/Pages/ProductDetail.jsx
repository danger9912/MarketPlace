import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/swiper-bundle.css";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { IoShareSocialOutline } from "react-icons/io5";
import { BookProduct } from "../services/functions/payment";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getProductDataById } from "../services/functions/product";
// import frame from '../assets/frame.png'
function ProductDetail() {

  const { id } = useParams();
  const navigate = useNavigate();
  const bigImageRef = useRef(null);
  const [swiperHeight, setSwiperHeight] = useState(0);
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [loading, setLoading] = useState(null);
  useEffect(() => {
    if (bigImageRef.current) {
      const height = bigImageRef.current.clientHeight;
      setSwiperHeight(height);
    }
  }, []);

  useEffect(() => {

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getProductDataById(id);
        setProduct(response);
        setCurrentImage(response.images[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  const handlePayment = async () => {
    await BookProduct(product.price, navigate, id);
  };
  return (
    <div className=" container mx-auto p-2 bg-gradient-to-r from-richblack-25 to-blue-500  h-screen">
      <div className="mt-14 flex flex-col md:flex-row md:space-x-4 bg-gradient-to-r from-richblack-25 to-blue-500  p-5">
        {/* Image Swiper for Small */}
        <div className="w-32 " style={{ height: swiperHeight }}>
          <Swiper
            slidesPerView={4}
            direction="vertical"
            spaceBetween={4}
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            autoplay={{ delay: 3000 }}
            style={{ height: "100%" }}
            className=""
          >
            {product?.images.map((imageUrl,index) => (
              <SwiperSlide key={index}>
                <img
                  onClick={() => {
                    setCurrentImage(imageUrl);
                  }}
                  src={imageUrl}
                  alt={product?.name}
                  className="w-32 md:h-auto"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="flex justify-between w-full">
          {/* Big Image */}
          <div className="w-full md:w-[600px]" ref={bigImageRef}>
            <img src={currentImage} alt="product" className="w-full h-auto" />
          </div>
          <div className="flex flex-col items-center mx-auto  w-[350px] ">
            {/* card1 */}
            <div className=" w-[500px] bg-white rounded-xl shadow-lg p-3">
              <div className="flex items-center justify-between p-3  text-xl">
                <p>Price: ${product?.price}</p>
                <p>
                  <IoShareSocialOutline />
                </p>
              </div>

              <p>{product?.name}</p>
              <div className="flex justify-between mt-5">
                <p>{new Date(product?.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            {/* card2 describtion*/}
            <div className="w-[500px] bg-white rounded-xl shadow-lg p-3 mt-3 ">
              <h1 className="text-xl">Description</h1>
              <p className="mt-3 text-space-x-1 ">
                {product?.description}
              </p>
            </div>
            {/* card3 chat */}

            <div class="py-8 px-8 mt-3  w-[350px] mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
              <img
                class="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0"
                src="data:image/png;base64,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"
                alt="Woman's Face"
              />
              <div class="text-center space-y-2 sm:text-left ">
                <div class="space-y-0.5">
                  <p className="text-sm">ask question to owner</p>
                  <p class="text-lg text-black font-semibold">{product?.ownerId?.name}</p>
                </div>
                <button class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-blue-12  hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
                  Message
                </button>
              </div>
            </div>
            <div className="bg-red-100 px-10  py-2 rounded-lg mt-3">
              <button
                onClick={() => {
                  handlePayment();
                }}
              >
                BookPoduct
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Items (You might need to implement related items section here) */}
      {/* ... */}
    </div>
  );
}

export default ProductDetail;
