import React, { useEffect, useState } from "react"
import ProductCard from "@/components/ProductCard"
import RegisterForm from "@/components/RegisterForm";

const Home = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const getProducts = async () => {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/products')
            const productList = await response.json()
            setProducts(productList)
        }
        getProducts()
    }, [])

    return (
        <>
        <RegisterForm/>
        <div className="grid grid-cols-3 gap-10">
            {products.map((product, index) => {
                return(
                    <React.Fragment key={product._id}>
                        {index % 7 === 0  
                        ?   (
                            <section className="col-span-3">
                                <ProductCard product={products[index]}/>
                            </section>)
                        : (
                            <section className="col-span-1">
                                <ProductCard product={product} />
                            </section>
                        )
                        }
                    </React.Fragment>
                )
            })}
        </div>
        </>
    )
};

export default Home;
