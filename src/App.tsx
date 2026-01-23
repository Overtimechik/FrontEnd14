import { useState, type FC } from "react"
import { BasketCards } from "./components/BasketCard"

const data = ["cola", "pepsi", "fanta"]

const App: FC = () => {
  const [total, setTotal] = useState(0)

  return (
    <>
      <h1 className="text-xl">Всего товаров: {total}</h1>

      <ul>
        {data.map(item => (
          <BasketCards
            key={item}
            title={item}
            onPlus={() => setTotal(t => t + 1)}
            onMinus={() => setTotal(t => Math.max(0, t - 1))}
          />
        ))}
      </ul>
    </>
  )
}

export default App
