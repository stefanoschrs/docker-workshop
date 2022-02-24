import { useEffect, useState } from 'react'

function App () {
  const [foo, setFoo] = useState('loading..')

  const [bar, setBar] = useState('loading..')

  useEffect(() => {
    getFooValues(process.env.REACT_APP_API_URL_FOO)

    getBarValues(process.env.REACT_APP_API_URL_BAR)
  }, [])

  function getFooValues (baseUrl) {
    fetch(baseUrl + '/data')
      .then((res) => res.json())
      .then((res) => setFoo(res.data))
      .catch((err) => setFoo(err.message))
      .finally(() => setTimeout(() => getFooValues(baseUrl), Math.random() * 1000 + 2000))
  }

  function getBarValues (baseUrl) {
    fetch(baseUrl + '/data')
      .then((res) => res.json())
      .then((res) => setBar(res.data))
      .catch((err) => setBar(err.message))
      .finally(() => setTimeout(() => getBarValues(baseUrl), Math.random() * 1000 + 2000))
  }

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">
          Docker Workshop - Multiple Services
        </h1>

        <div className="columns">
          <div className="column">
            <h2 className="subtitle">Service Foo</h2>

            {foo}
          </div>

          <div className="column">
            <h2 className="subtitle">Service Bar</h2>

            {bar}
          </div>
        </div>
      </div>
    </section>
  )
}

export default App
