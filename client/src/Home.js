import React from 'react'

const Home = ({username}) => {
  return (
    <main className='homepage'>
        <a href='#'>Applications</a>
        <a href='#'>New hires</a>
        <a href='#'>Attendance</a>
        <a href='#'>Requests</a>
        <a href='/departments'>Departments</a>
        <a href='#'>Payroll</a>
      {/* <section className='profile'>
          <div>
            <h1>{`Wellcome back, ${username}`}</h1>
          </div>
          <div>
              <button></button>
              <button></button>
          </div>
      </section> */}
    </main>
  )
}

export default Home
