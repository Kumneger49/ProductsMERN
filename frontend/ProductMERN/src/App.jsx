import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
 
function App() {
  const [name, setName] = useState("")
  const [image, setImage] = useState("")
  const [price, setPrice] = useState(0)
  const [products, setProducts] = useState([])


  //fetching data function from the backend 
  async function fetchProducts(){
    try{
      const response = await fetch("http://localhost:5000/api/products")
      if(response.ok){
        const data = await response.json()
        setProducts(data.data)
        console.log(data)
      }
      else{
        console.log("failed to fetch products")
      }
    }
    catch(error){
      console.log("error happened ", error.message)
    }
  }

  //fetching fesh data when the component mounts for the first time 
  useEffect(()=>{
    fetchProducts()
  }, [])

  //creating product and sending it to the backend
  const handleCreatingProduct= async (event)=>{
    event.preventDefault();
    const product = {name, image, price: parseFloat(price)}
    console.log(product)
    try{
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST", 
        headers: {
          "Content-Type": "application/JSON"
        },
        body: JSON.stringify(product)
      })

      if(response.ok){
        console.log("Product created succesfullly")
        setName("")
        setImage("")
        setPrice("")
        // setProducts(prevProduct=>[...prevProduct, product])
        fetchProducts()
      }
      else{
        console.log("failed to create the product")
      }
    }
    catch(error){
      console.log("error happened ", error.message)
    }
  }

  //trigerring the backend to delete products from the backend

  const handDeletingProduct= async (id)=>{
      try{
        const response = await fetch(`http://localhost:5000/api/products/${id}`, {method: "DELETE"})
        if(response.ok){
          console.log("product deleted successfully")
          fetchProducts()  
        }
        else{
          console.log("failed to delete the product")
        }
      }
      catch(error){
      console.log("error happened ", error.message)
      }
  }

  return (
    <>
       <h1>This is react</h1>
       <form action="" onSubmit={handleCreatingProduct} style={{display: "flex", gap: "1rem"}}>
        <input style={{fontSize: "1.2rem", fontWeight: "500"}} 
          type='text' 
          name='name' 
          required value={name} 
          onChange={(event)=>setName(event.target.value)}/>
        <input style={{fontSize: "1.2rem", fontWeight: "500"}} 
          type='text' 
          name='image' 
          required value={image} 
          onChange={(event)=>setImage(event.target.value)} />
        <input style={{fontSize: "1.2rem", fontWeight: "500"}} 
          type='number' 
          name='price' 
          required value={price} 
          onChange={(event)=>setPrice(event.target.value)}/>
        <button type='submit'>Create product</button>
       </form>
       <div>
       {
        products.length>0&&products.map((product, _id)=>(
          <div key={_id}>{product.name}    <button onClick={()=>handDeletingProduct(product._id)}>Delete</button></div>
        ))
       }
       </div>
    </>
  )
}

export default App
