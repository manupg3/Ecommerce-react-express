
import { Fragment, useState, useEffect } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { MenuIcon, SearchIcon, ShoppingBagIcon, XIcon,TrashIcon } from '@heroicons/react/outline'
import Offcanvas from 'react-bootstrap/Offcanvas'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import { LinkContainer } from 'react-router-bootstrap'
import Nav from 'react-bootstrap/Nav'
import { motion } from "framer-motion";
import { supabase } from '../config/config'
import { useProfile } from '../customHook/useProfile'
import { getUserProfile } from '../services/auth'
import { useLocation } from 'react-router-dom'
import { logout } from '../services/auth'


const navigation = {
  categories: [
    {
      id: 'women',
      name: 'Women',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '#' },
            { name: 'Dresses', href: '#' },
            { name: 'Pants', href: '#' },
            { name: 'Denim', href: '#' },
            { name: 'Sweaters', href: '#' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Jackets', href: '#' },
            { name: 'Activewear', href: '#' },
            { name: 'Browse All', href: '#' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '#' },
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' },
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Significant Other', href: '#' },
          ],
        },
      ],
    },
    {
      id: 'men',
      name: 'Men',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Artwork Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '#' },
            { name: 'Pants', href: '#' },
            { name: 'Sweaters', href: '#' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Jackets', href: '#' },
            { name: 'Activewear', href: '#' },
            { name: 'Browse All', href: '#' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '#' },
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'Store', to: '/store' },
    { name: 'Contact', to: '/contact' },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbarv2(props) {
  const [LogIn, SetIsLogIn] = useState("")

  let usernameFromSessionStorage = sessionStorage.getItem("UserSessionName")

  let IsLogedIn = sessionStorage.getItem("IsLogedIn")
  
  console.log("USERNAME EN NAVBAR DE SESSION STORAGE",usernameFromSessionStorage)
  let usern = "Mi Cuenta"
  let logedIn = false
  const location = useLocation();
  
  const [usernameE, setusernameE] = useState(null)
   
  console.log("LOCATION STATE",location.state)

  if(location.state !=null){
    usern = location.state.email
    logedIn = location.state.logedIn
    sessionStorage.setItem("UserSessionName", usern)
    sessionStorage.setItem("IsLogedIn", logedIn)

    console.log(usern)
    console.log(logedIn)
  }
if(usernameFromSessionStorage){
  usern = usernameFromSessionStorage
}
if(IsLogedIn){
  logedIn = IsLogedIn
}
function LogOut (props) {
   
  console.log("LOGED IN EN LOGOUT", props.logedIn)
  if(props.logedIn == "true")
{
  
  return <button onClick={signOut}>LOG OUT</button>

}


}


  let subtotal = 0
  let GetsubTotal
  let sideCartArray=[]
  if(localStorage.getItem("sideCart")){
   sideCartArray = JSON.parse(localStorage.getItem("sideCart"))
  }
  if(localStorage.getItem("subtotalCart")){

     GetsubTotal =  JSON.parse(localStorage.getItem("subtotalCart")) 
    console.log("GET SUB",GetsubTotal)

  }
else{
  localStorage.setItem("subtotalCart", JSON.stringify({"subtotal":0}))
   GetsubTotal =  JSON.parse(localStorage.getItem("subtotalCart")) 
  console.log("GET SUB",GetsubTotal)
}
  useEffect(() => {
  getSideCart()
  
  });
 const getSideCart = () =>{


}
 let updateCart=false
  const [showSearch, setShowSearch] = useState(false)
  const [itemsTotalSideCart, setItemsTotalSideCart] = useState(0)
    const [showSideCart, setShowSideCart] = useState(false)
    const [sidebarCartItems, setSidebarCart] = useState(sideCartArray)
    const [subTotal, setSubtotal] = useState(GetsubTotal.subtotal)
    const handleCloseSearch = () => setShowSearch(false)
    const handleCloseSideCart = () => setShowSideCart(false)
    const handleShowSearch = () => setShowSearch(true)
    const [close, setClose] = useState(false)
    const closeNav = () => setClose(true)
    const [open, setOpen] = useState(false)

  

const getTotalItems = () =>
{
  const sideCartArray = JSON.parse(localStorage.getItem("sideCart"))
  setItemsTotalSideCart(sideCartArray.length)
  console.log("TOTAL ITMES", itemsTotalSideCart)
}

    const handleShowSideCart = () => {

       const subtotalCart = sideCartArray.map(product => product.price).reduce((prev, curr) => prev + curr, 0);
       const subtotal = JSON.parse(localStorage.getItem("subtotalCart"))
       
       console.log("SUBTOTAL",subtotal)
       setShowSideCart(true)
       
      } 
      const signOut = async() =>
      {
        
        await logout()

      }
    
    const deleteFromSideCart = (product) => {       
       updateCart=true
       const sideCartArray = JSON.parse(localStorage.getItem("sideCart"))
      
        console.log("ID A ELIMINAR",product)

        const newSideCart = sideCartArray.filter((products) => products.id !== product.id)
        
        localStorage.setItem('sideCart', JSON.stringify(newSideCart))
        const newCart = JSON.parse(localStorage.getItem("sideCart"))
        setSidebarCart(newCart)
        console.log("NEW CART",sidebarCartItems)
        updateSubtotal(product.price)
      }    
  const updateSubtotal = (restPrice) =>{
   console.log("SUBTOTAL EN UPDATE SUBTOTAL",restPrice)
   
    const subtotal = JSON.parse(localStorage.getItem("subtotalCart"))
    const subtotalUpdate = subtotal.subtotal - restPrice
     console.log("SUBTOTAL RESTADO",subtotalUpdate)
    localStorage.setItem('subtotalCart', JSON.stringify({"subtotal":subtotalUpdate}))

  }
      const showTrash = {
        rest: { opacity: 0, ease: "easeOut", duration: 0.2, type: "tween" },
        hover: {
          opacity: 1,
          transition: {
            duration: 0.4,
            type: "tween",
            ease: "easeIn"
          }
        }
      };

   return (
    <div className="bg-white fixed w-full z-50">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 flex z-40">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
                <div className="px-4 pt-5 pb-2 flex">
                  <button
                    type="button"
                    className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
            
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                   
                    <Tab.List className="-mb-px flex px-4 space-x-8">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected ? 'text-indigo-600 border-indigo-600' : 'text-gray-900 border-transparent',
                              'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium'
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel key={category.name} className="pt-10 pb-8 px-4 space-y-10">
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div key={item.name} className="group relative text-sm">
                              <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                <img src={item.imageSrc} alt={item.imageAlt} className="object-center object-cover" />
                              </div>
                              <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                <span className="absolute z-10 inset-0" aria-hidden="true" />
                                {item.name}
                              </a>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                              {section.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.items.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <a href={item.href} className="-m-2 p-2 block text-gray-500">
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                  {/* {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a href={page.href} className="-m-2 p-2 block font-medium text-gray-900">
                        {page.name}
                      </a>
                    </div>
                  ))} */}
                    <LinkContainer to="/">
                    <Nav.Link  class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800 nav-link">Home</Nav.Link>
                    </LinkContainer>
                </div>

                <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                  <div className="flow-root">
                    <a href="#" className="-m-2 p-2 block font-medium text-gray-900">
                      Log in
                    </a>
                  </div>
                  <div className="flow-root">
                  <LinkContainer to="/account">
                    <Nav.Link  class="-m-2 p-2 block font-medium text-gray-900">Registrarse</Nav.Link>
                    </LinkContainer>
                    <a href="#" className="-m-2 p-2 block font-medium text-gray-900">
                      Registrarse
                    </a>
                  </div>
                </div>

          
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <p className="bg-indigo-600 h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p>

        <nav aria-label="Top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="h-16 flex items-center">
              <button
                type="button"
                className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="#">
                  <span className="sr-only">Workflow</span>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                </a>
              </div>

              {/* Flyout menus */}
              <LinkContainer to="/">
                       <Nav.Link >Home</Nav.Link>
                    </LinkContainer>
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="h-full flex space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? 'border-indigo-600 text-indigo-600'
                                  : 'border-transparent text-gray-700 hover:text-gray-800',
                                'relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px'
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        
                          >
                            <Popover.Panel className="absolute top-full inset-x-0 text-sm text-gray-500 z-40">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                              <div className="relative bg-white">
                                <div className="max-w-7xl mx-auto px-8">
                                  <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div key={item.name} className="group relative text-base sm:text-sm">
                                          <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-center object-cover"
                                            />
                                          </div>
                                          <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                            <span className="absolute z-10 inset-0" aria-hidden="true" />
                                            {item.name}
                                          </a>
                                          <p aria-hidden="true" className="mt-1">
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p id={`${section.name}-heading`} className="text-left font-medium text-gray-900">
                                            {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li key={item.name} className="flex">
                                                <a href={item.href} className="hover:text-gray-800">
                                                  {item.name}
                                                </a>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                {navigation.pages.map((page) => (
                    
                    <LinkContainer key={page.name} to={page.to}>
                    <Nav.Link  className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">{page.name}</Nav.Link>
                    </LinkContainer>
                    // <a
                    //   key={page.name}
                    //   href={page.href}
                    //   className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    // >
                    //   {page.name}
                    // </a>
                  ))} 
                      
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
               
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                
                   <LinkContainer to="/account">
                    <Nav.Link  class="-m-2 p-2 block font-medium text-gray-900">{usern} </Nav.Link>
                    </LinkContainer>
                    <LogOut logedIn={logedIn}/>
                
                </div>

                {/* Search */}
                <div className="flex lg:ml-6">
                  <button onClick={handleShowSearch} className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <SearchIcon className="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>
           {/* Search OffCanvas */}
                <Offcanvas show={showSearch} placement='top' className="offcanvas-search" onHide={handleCloseSearch}>
        <Offcanvas.Header closeButton className="pb-0">
          <Offcanvas.Title className="ml-auto mr-auto pt-8 ">find what you're looking for</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <Form className="d-flex w-[60%] ml-auto mr-auto mt-2">
        <FormControl
          type="search"
          placeholder="Search"
          className=""
          aria-label="Search"
        />
         <button className="bg-tansparent text-black semibold border-b-[1px] border-gray-300 focus:shadow-none">
         <SearchIcon className="w-6 h-6" aria-hidden="true" />
                         </button>
      </Form>
        </Offcanvas.Body>
      </Offcanvas>


                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <button onClick={handleShowSideCart} className="group -m-2 p-2 flex items-center">
                    <ShoppingBagIcon
                      className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{itemsTotalSideCart}</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </button>
                </div>
         
              </div>
            </div>
          </div>
        </nav>
      </header>
      <Offcanvas show={showSideCart} placement='end' className="" onHide={handleCloseSideCart}>
        <Offcanvas.Header closeButton className="pb-0">
          <Offcanvas.Title className=" ">Tu Pedido</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div className=' h-[70%] overflow-y-auto'>
       {sideCartArray.map((product) => (
         
          <motion.div 
          initial="rest" whileHover="hover" animate="rest"
          className=' mb-4 pt-2 hover:shadow-lg rounded-md shadow-md'
          key={product.id}
          > 
          <div className='flex'>
            <div>
          <img className='mr-4' width={50} height={50} src={product.imageSrc} />        
          </div>
            <div>
            <div className='pt-2 font-semibold'>
            <h2>
             {product.name}
           </h2>
           </div> 
           <div className='pt-0 font-bold'>
            <p>
             ${product.price}
           </p>
           </div>
            </div>
            <motion.div 
            variants={showTrash}
            className=' ml-[170px]'>
            <button onClick={() => deleteFromSideCart(product)}>
            <TrashIcon
                      className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    </button>
            </motion.div>
            </div>

              </motion.div>

        ))}  
            </div>
            <div>
            <div className='mt-8 mb-6 font-bold text-lg'>  
              Subtotal: ${GetsubTotal.subtotal} 
            </div>
            <button class="w-full shadow-lg justify-center bg-indigo-600 rounded-[5px] pl-14 pr-14 pt-[12px] pb-[12px] text-white">
              Finalizar Compra
            </button>
            </div>

        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}
