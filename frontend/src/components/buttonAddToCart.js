import React, { useEffect } from 'react'
import { motion } from "framer-motion"
import { faL } from '@fortawesome/free-solid-svg-icons'

const ButtonAddToCart = ({product, classStyles,selectedColor,selectedSize})=> {
  let sideCartArray = []
  let CART ={
      product:[]
  }
  console.log("PRODUCT STRUCTURE",product)

   let variableProduct={
     id:"",
     name:"",
     price:"",
     selectedColor:"",
     selectedSize:"",
     mainImage:""
     
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
               console.log("ENTRO ID IGUAL")
               products.price = Number(products.price) + Number(product.price)
               console.log("PRODUCT PRICE SUMADO", products.price) 
               const subtotal = JSON.parse(localStorage.getItem('subtotalCart'))
               const newSubtotal = subtotal.subtotal + Number(product.price)
               console.log("SUBOTAL SIN SUMAR MISMOS", newSubtotal)
             localStorage.setItem('subtotalCart',JSON.stringify({"subtotal":newSubtotal}))

            }
            return products
        })
        
        const isRepeat = repetido ? addSumRepeat(arraySumRepeat) : addProduct(product,arrayProductsAdd)
         
        }
       else{
          console.log("PRODUCT STRUCTURE",product)
          CART.product.push(product)
          localStorage.setItem('sideCart',JSON.stringify(CART.product))
       
        }
  }

  const addSumRepeat = (arraySumRepeat) =>{
    localStorage.setItem('sideCart', JSON.stringify(arraySumRepeat))
 }
  const addProduct = (product, arrayProductsAdd) =>{
    if(selectedColor){
      variableProduct.id = product.id
      variableProduct.name = product.name
      variableProduct.price = product.price
      variableProduct.selectedColor = selectedColor
      variableProduct.selectedSize = selectedSize
      variableProduct.mainImage = product.images[0].src

      arrayProductsAdd.push(variableProduct)

    }
    else{  
       
        arrayProductsAdd.push(product)
    
       }
    
    localStorage.setItem('sideCart', JSON.stringify(arrayProductsAdd))
    const subtotalCart = arrayProductsAdd.reduce((acc,product) =>{
      const {price} = product
      acc.subtotal += Number(price)
        return acc
    },{
      subtotal:0
    })
    console.log("SUBTOTAL CART",subtotalCart)
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