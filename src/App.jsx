import { useState, useEffect } from 'react'
import './App.css'


const Card = ({ image, title }) => {

  return <div className='card border p-2 ' >

    <img src={image} alt={title} />
    <span>{title}</span>
  </div>
}


function App() {

  const [products, setproducts] = useState([])
  const [currentpage, setCurrentpage] = useState(0);

  const totalProduct = products.length;
  const page_size = 20;
  const noOfPage = Math.ceil(totalProduct / page_size);
  const start = currentpage * page_size;
  const end = start + page_size;
  const fetchproduct = async () => {
    const Data = await fetch('https://dummyjson.com/products?limit=300')
    const json = await Data.json();

    setproducts(json.products)
  };

  useEffect(() => {
    fetchproduct();
  },[])

  const handlePageChange = (n) => {
    setCurrentpage(n);
  };

  const goPreviousPage = () => {
    setCurrentpage((prev) => prev - 1)
  }

  const goNextPage = () => {
    setCurrentpage((next) => next + 1)
  }
  return !products.length ? (<h2>no prooduct found</h2>
  ) : (
    <div>

      <div className=' pro mb-12 grid grid-cols-2 md:grid-cols-4  gap-1.5'>

        {
          products.slice(start, end).map(p => <Card image={p.thumbnail} title={p.title} key={p.id} />)
        }


      </div>


      <div className=' fixed bottom-0 p-2 center  flex justify-center bg-amber-700 w-full  '>

        <button
          onClick={goPreviousPage} disabled={currentpage === 0} >

          ◀</button>

        {[...Array(noOfPage).keys()].map((n) => (<button key={n} className={ `m-0.5 border p-2 cursor-pointer   ${n === currentpage? " bg-sky-400 " : " " }`  } onClick={() => handlePageChange(n)} > {n}</button>))}

        <button
          onClick={goNextPage} disabled={currentpage === noOfPage - 1}>

          ▶</button>

      </div>

      
    </div>

  )
}

export default App