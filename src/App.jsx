import { useState } from 'react'
import {
	Link,
	Route,
	BrowserRouter as Router,
	Routes,
	useNavigate,
	useParams,
} from 'react-router'
import './index.css'
import { Users, updateUsersData } from './userData'

// Компонент водяного знака
const Watermark = () => {
	const patterns = ['⛛', '⯀', '⯁', '✧', '✦', '✶', '❂', '✺', '✼', '❀']

	const getRandomPattern = () => {
		return patterns[Math.floor(Math.random() * patterns.length)]
	}

	return (
		<div className='watermark'>
			{Array.from({ length: 50 }).map((_, i) => (
				<span
					key={i}
					className='watermark-pattern'
					style={{
						left: `${Math.random() * 100}%`,
						top: `${Math.random() * 100}%`,
						transform: `rotate(${Math.random() * 360}deg)`,
						fontSize: `${Math.random() * 30 + 10}px`,
						color: `hsl(${Math.random() * 360}, 70%, 60%)`,
					}}
				>
					{getRandomPattern()}
				</span>
			))}
		</div>
	)
}

// Компонент страницы 404
function NotFoundPage() {
	const navigate = useNavigate()

	return (
		<div className='not-found-container'>
			<Watermark />
			<h1>404</h1>
			<p>Такой страницы не существует</p>
			<button onClick={() => navigate('/')} className='back-to-main'>
				Вернуться на главную
			</button>
		</div>
	)
}

function Leaderboard() {
	const [searchTerm, setSearchTerm] = useState('')

	const filteredUsers = Users.filter(user =>
		user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
	)

	const handleUpdateUsers = () => {
		const updatedUsers = Users.map(user => ({
			...user,
			exp: String(Number(user.exp) + 10),
		}))
		updateUsersData(updatedUsers)
		window.location.reload()
	}

	return (
		<div className='app-container'>
			<Watermark />
			<header className='header'>
				<button
					className='back-button'
					onClick={() =>
						(window.location.href = 'https://it-course-six.vercel.app/')
					}
				>
					← На главную
				</button>
				<h1 className='page-title' style={{ marginRight: '20px' }}>
					🏆 Таблица лидеров
				</h1>
				<button className='update-button' onClick={handleUpdateUsers}>
					Обновить
				</button>
			</header>

			<div className='search-container'>
				<input
					type='text'
					placeholder='Поиск по имени...'
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					className='search-input'
				/>
			</div>

			<div className='users-grid'>
				{filteredUsers.length > 0 ? (
					filteredUsers.map((user, index) => (
						<Link to={`/user/${user.id}`} className='user-card' key={user.id}>
							<div className='user-rank'>#{index + 1}</div>
							<div className='user-avatar'>{user.avatar}</div>
							<div className='user-info'>
								<h3>{user.fullName}</h3>
								<div className='exp-container'>
									<div className='exp-bar'>
										<div
											className='exp-progress'
											style={{ width: `${user.progress}%` }}
										></div>
									</div>
									<span className='exp-value'>{user.exp} XP</span>
								</div>
							</div>
						</Link>
					))
				) : (
					<div className='no-results'>Пользователи не найдены</div>
				)}
			</div>
		</div>
	)
}

function UserProfile() {
	const { id } = useParams()
	const navigate = useNavigate()
	const user = Users.find(u => u.id === parseInt(id))

	if (!user) {
		return (
			<div className='app-container'>
				<Watermark />
				<header className='header'>
					<button className='back-button' onClick={() => navigate(-1)}>
						← Назад
					</button>
					<h1 className='page-title'>Ошибка</h1>
				</header>
				<div className='profile-content'>
					<div className='user-not-found'>
						<h2>Такого пользователя не существует</h2>
						<p>Пользователь с ID {id} не найден в системе</p>
						<button onClick={() => navigate('/')} className='back-to-main'>
							Вернуться к таблице лидеров
						</button>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className='app-container'>
			<Watermark />
			<header className='header'>
				<button className='back-button' onClick={() => navigate(-1)}>
					← Назад
				</button>
				<h1 className='page-title'>Профиль</h1>
			</header>

			<div className='profile-content'>
				<div className='profile-header'>
					<div className='avatar-container'>
						<div className='profile-avatar'>{user.avatar}</div>
						<div className='level-badge'>{user.level}</div>
					</div>
					<div className='profile-main-info'>
						<h2 className='profile-name'>{user.fullName}</h2>
						<div className='profile-stats'>
							<div className='stat-item'>
								<div className='stat-value'>{user.exp}</div>
								<div className='stat-label'>XP</div>
							</div>
							<div className='stat-item'>
								<div className='stat-value'>{user.achievements.length}</div>
								<div className='stat-label'>Достижения</div>
							</div>
						</div>
					</div>
				</div>

				<div className='progress-container'>
					<div className='progress-info'>
						<span>Прогресс</span>
						<span>{user.progress}%</span>
					</div>
					<div className='progress-bar'>
						<div
							className='progress-fill'
							style={{ width: `${user.progress}%` }}
						></div>
					</div>
				</div>

				<div className='profile-section'>
					<h3 className='section-title'>Обо мне</h3>
					<p className='about-text'>{user.about}</p>
				</div>

				<div className='profile-section'>
					<h3 className='section-title'>Навыки</h3>
					<div className='skills-container'>
						{user.skills.map((skill, index) => (
							<span key={index} className='skill-tag'>
								{skill}
							</span>
						))}
					</div>
				</div>

				<div className='profile-section'>
					<h3 className='section-title'>Достижения</h3>
					<div className='achievements-grid'>
						{user.achievements.map((achievement, index) => (
							<div key={index} className='achievement-card'>
								<div className='achievement-icon'>🏅</div>
								<div className='achievement-text'>{achievement}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Leaderboard />} />
				<Route path='/user/:id' element={<UserProfile />} />
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</Router>
	)
}

export default App
