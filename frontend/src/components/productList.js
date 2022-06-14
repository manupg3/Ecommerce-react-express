import { Transition } from "@headlessui/react";
import { motion } from "framer-motion"
import ButtonAddToCart from "./buttonAddToCart";
const products = [
    {
      id: 1,
      name: 'Basic Tee',
      href: '#',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '235',
      color: 'Black',
    },
    {
        id: 2,
        name: 'Basic Tee',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '35',
        color: 'Black',
      },
      {
        id: 3,
        name: 'Basic Tee',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '35',
        color: 'Black',
      },
      {
        id: 4,
        name: 'Basic Tee',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '35',
        color: 'Black',
      },

  ]
  
  export default function ProductList() {
      const classStyles ="flex shadow-lg justify-center bg-indigo-600 rounded-[5px] pl-14 pr-14 pt-2 pb-2 text-white"


    return (
      <div className="bg-white pb-12">
        <div className="max-w-2xl mx-auto py-2 pr-28 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-semibild tracking-tight text-gray-900">Featured Products</h2>
  
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className=" relative shadow-md hover:shadow-xl rounded-md p-4 pb-4">
              <div >
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden  lg:h-80 lg:aspect-none">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href}>
                        <span aria-hidden="true" className="font-semibold" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-1 mb-2 float-left text-sm text-gray-500">{product.color}</p>
                  </div>
                  <div className="block">
                  <p className="text-sm font-medium text-gray-900">{product.price}</p>
               
                  </div>
                </div>
                <div className="flex justify-center">
              <div>
              <ButtonAddToCart product={product} classStyles={classStyles}/>
              </div>
               </div>
               </div>
              </div>
              
            ))}
          </div>
        </div>
      </div>
    )
  }
  