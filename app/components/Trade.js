import { useEffect, useState } from "react"
import { ethers } from "ethers"

function Trade({ toggleTrade, token, provider, factory }) {

  const [target, setTarget] = useState(0)
  const [limit, setLimit] = useState(0)
  const [cost, setCost] = useState(0)

  async function getSaleDetails() {
    const target = await factory.TARGET()
    setTarget(target)

    const limit = await factory.TOKEN_LIMIT()
    setLimit(limit)

    const cost = await factory.getCost(token.sold)
    setCost(cost)
  }

  useEffect(() => {
    getSaleDetails()
  }, [])

  return (
    <div className="trade">
        <h2>trade</h2>

        <div className="token__details">
          <p className="name">{token.name}</p>
          <p>creator: {token.creator.slice(0, 6) + '...' + token.creator.slice(38, 42)}</p>
          <img src={token.image} alt="1023xc" width={256} height={256} />
          <p>market Cap: {ethers.formatUnits(token.raised, 18)} ETH</p>
          <p>base cost: {ethers.formatUnits(cost, 18)} ETH</p>
        </div>

        <button onClick={toggleTrade} className="btn--fancy">[ cancel ]</button>
    </div >
  );
}

export default Trade;