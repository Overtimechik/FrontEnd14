import { useState, type FC } from "react"
import { Cards } from "./Cards"
import { Button } from "../share/Button"

interface Props {
  title: string
  onPlus: () => void
  onMinus: () => void
}

export const BasketCards: FC<Props> = ({ title, onPlus, onMinus }) => {
  const [count, setCount] = useState(0)

  return (
    <li>
      <Cards>
        <h1 className="text-center">{title}</h1>

        <div className="flex items-center justify-center gap-2">
          <Button
            mode="dark"
            className="w-10"
            onClick={() => {
              setCount(c => c + 1)
              onPlus()
            }}
          >
            +
          </Button>

          <p className="w-10 text-center">{count}</p>

          <Button
            mode="dark"
            className="w-10"
            onClick={() => {
              if (count > 0) {
                setCount(count - 1)
                onMinus()
              }
            }}
          >
            -
          </Button>
        </div>
      </Cards>
    </li>
  )
}
