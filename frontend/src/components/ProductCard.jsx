import React from 'react'

const ProductCard = ({product}) => {
    return (
        <article className='p-5'>
                <div className='flex justify-center'>
                    <a href={product.link} className=''>
                        <img className='max-w-full' src={product.imageURL} alt={product.altText} />
                    </a>
                </div>
                <div className='flex justify-between'>
                    <div className='flex-col'>
                        <p className=''>{product.productName}</p>
                        <p className=''>{product.company}</p>
                    </div>
                    <p className=''>${product.price}</p>
                </div>
        </article>
    )
}

export default ProductCard