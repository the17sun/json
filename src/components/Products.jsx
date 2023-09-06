import React, { useEffect, useState } from "react";
import {
    BsFillArrowLeftSquareFill,
    BsFillArrowRightSquareFill,
    BsGlobe,
} from "react-icons/bs";
import { FaLinkedin, FaGithubSquare } from "react-icons/fa";
import { MdMail } from "react-icons/md";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const fetchProducts = async () => {
        const res = await fetch("https://dummyjson.com/products?limit=100");
        const data = await res.json();

        if (data && data.products) {
            setProducts(data.products);
            console.log(data);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const selectPageHandler = (selectedPage) => {
        if (
            selectedPage >= 1 &&
            selectedPage <= products.length / 20 &&
            selectedPage !== page
        )
            setPage(selectedPage);
    };

    return (
        <>
            <div className='flex flex-row justify-center items-center space-x-2 z-10 sticky top-0 left-0 bg-gray-200 shadow-lg p-2'>
                <a
                    className='bg-indigo-300 hover:bg-indigo-400 text-2xl text-white p-2 rounded-full'
                    href='https://nur-v2-0.vercel.app/'
                    target='_blank'
                    rel='noopener noreferrer'>
                    <BsGlobe />
                </a>
                <a
                    className='bg-blue-500 hover:bg-blue-600 text-2xl text-white p-2 rounded-full'
                    href='https://www.linkedin.com/in/nur-karshibaev-93b929281'
                    target='_blank'
                    rel='noopener noreferrer'>
                    <FaLinkedin />
                </a>
                <a
                    className='bg-gray-700 hover:bg-gray-800 text-2xl text-white p-2 rounded-full'
                    href='https://github.com/the17sun'
                    target='_blank'
                    rel='noopener noreferrer'>
                    <FaGithubSquare />
                </a>
                <a
                    className='bg-lime-500 hover:bg-lime-600 text-2xl text-white p-2 rounded-full'
                    href='mailto:the17sun@mail.ru'>
                    <MdMail />
                </a>
            </div>

            <h2 className='text-gray-500 text-2xl lg:text-3xl font-bold pt-4 lg:pt-6 tracking-widest uppercase text-center animate-bounce'>
                XVII | Market
            </h2>

            {products.length > 0 && (
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 font-Roboto p-5 lg:p-7'>
                    {products.slice(page * 10 - 10, page * 20).map((prod) => {
                        return (
                            <div
                                key={prod.id}
                                className='bg-gray-100 border-2 border-gray-200 hover:shadow-2xl transition-shadow duration-300 rounded-xl flex flex-col justify-center items-center cursor-pointer'>
                                <img
                                    className='h-52 w-52 lg:h-72 lg:w-72 rounded-lg object-cover'
                                    src={prod.thumbnail}
                                    alt={prod.title}
                                />
                                <h3 className='text-sm lg:text-lg tracking-widest p-1 text-gray-500'>
                                    Title : {prod.title}
                                </h3>
                                <h3 className='text-sm lg:text-lg tracking-widest p-1 text-gray-500'>
                                    Brand : {prod.brand}
                                </h3>
                            </div>
                        );
                    })}
                </div>
            )}

            {products.length > 0 && (
                <div className='flex flex-row justify-center items-center space-x-2'>
                    <span
                        onClick={() => selectPageHandler(page - 1)}
                        className={` ${
                            page > 1 ? "" : "hidden"
                        }   text-2xl text-blue-400 hover:text-blue-500  cursor-pointer`}>
                        <BsFillArrowLeftSquareFill />
                    </span>
                    {[...Array(products.length / 20)].map((_, i) => {
                        return (
                            <span
                                onClick={() => selectPageHandler(i + 1)}
                                key={i}
                                className={` ${
                                    page === i + 1
                                        ? "bg-blue-400"
                                        : "bg-gray-200"
                                } p-2 rounded-lg text-gray-800 hover:bg-gray-400 cursor-pointer`}>
                                {i + 1}
                            </span>
                        );
                    })}
                    <span
                        onClick={() => selectPageHandler(page + 1)}
                        className={` ${
                            page < products.length / 10 ? "" : "hidden"
                        } text-2xl text-blue-400 hover:text-blue-500 cursor-pointer`}>
                        <BsFillArrowRightSquareFill />
                    </span>
                </div>
            )}
            <span className='text-sm lg:text-sm text-white bg-gray-700  flex justify-center p-2 sticky bottom-0 right-0'>
                Desined by XVII
            </span>
        </>
    );
};

export default Products;
