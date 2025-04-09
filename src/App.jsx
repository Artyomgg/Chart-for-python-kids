import './index.css'

function App() {
	const Users = [
		{
			name: 'Артем',
			exp: 'Админ',
		},
	]
	return (
		<section className='back'>
      <div className="toAfter" onClick={()=>{
        window.location.href = 'https://it-course-six.vercel.app/'
      }}>
        Назад
      </div>
			<h1>Таблица лидеров</h1>
			<ul>
				{Users.map(({ mesto, name, exp }, index) => (
					<li key={index}>
						<h3>Место: {index + 1}</h3>
						<h3>Имя: {name}</h3>
						<h3>Сколько баллов: {exp}</h3>
					</li>
				))}
			</ul>
		</section>
	)
}

export default App
