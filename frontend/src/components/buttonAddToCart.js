import React, { useEffect } from 'react'
import { motion } from "framer-motion"
import { faL } from '@fortawesome/free-solid-svg-icons'

const ButtonAddToCart = ({product, classStyles})=> {
  let sideCartArray = []
  let CART ={
      product:[]
  }
    const handleAddToCart = () =>{
        sideCartArray.push(JSON.parse(localStorage.getItem('sideCart')))
      
        if(localStorage.getItem('sideCart')){
          let repetido = false

          let arrayProductsAdd = JSON.parse(localStorage.getItem('sideCart'));

          const arraySumRepeat = arrayProductsAdd.map(products =>{
              console.log(products.id, product.id)
            if(products.id === product.id){
               repetido = true
              console.log("ENTRO")
              products.price = Number(products.price) + Number(product.price)
             console.log("PRODUCT PRICE",Number(product.price))
            }
            return products
        })
        
        const isRepeat = repetido ? addSumRepeat(arraySumRepeat) : addProduct(product,arrayProductsAdd)
         
        }
       else{
         CART.product.push(product)
         localStorage.setItem('sideCart',JSON.stringify(CART.product))
       }
  }

  const addSumRepeat = (arraySumRepeat) =>{
    localStorage.setItem('sideCart', JSON.stringify(arraySumRepeat))
 }
  const addProduct = (product, arrayProductsAdd) =>{

    arrayProductsAdd.push(product)
    localStorage.setItem('sideCart', JSON.stringify(arrayProductsAdd))
    const subtotalCart = arrayProductsAdd.reduce((acc,product) =>{
      const {price} = product
      acc.subtotal += Number(price)
        return acc
    },{
      subtotal:0
    })
    localStorage.setItem('subtotalCart', JSON.stringify(subtotalCart))

  }

    return (
    <div>
        <motion.button 
                whileHover={
                {scale: 1.05,
                boxShadow: "1px 1px 10px 1px #c2c2c2",
                }}
                transition={{type:"spring", stiffness: 300 }}
                className={classStyles }
                onClick={handleAddToCart}
               >  
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-[2px] mr-[3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
               </svg>Add to cart</motion.button>
    </div>
  )
}
export default ButtonAddToCart