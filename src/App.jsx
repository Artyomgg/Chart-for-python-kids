import {
	Link,
	Route,
	BrowserRouter as Router,
	Routes,
	useParams,
} from 'react-router'
import './index.css'
import { Users, updateUsersData } from './userData'

function Leaderboard() {
	// Для примера: функция обновления данных
	const handleUpdateUsers = () => {
		const updatedUsers = Users.map(user => ({
			...user,
			exp: String(Number(user.exp) + 10), // Увеличиваем XP на 10 для примера
		}))
		updateUsersData(updatedUsers)
		window.location.reload() // В реальном приложении используйте state
	}

	return (
		<div className='app-container'>
			<header className='header'>
				<button
					className='back-button'
					onClick={() =>
						(window.location.href = 'https://it-course-six.vercel.app/')
					}
				>
					← На главную
				</button>
				<h1 className='page-title' style={{marginRight:'20px'}}>🏆 Таблица лидеров</h1>
				<button className='update-button' onClick={handleUpdateUsers}>
					Обновить
				</button>
			</header>

			<div className='users-grid'>
				{Users.map((user, index) => (
					<Link to={`/user/${user.id}`} className='user-card' key={index}>
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
				))}
			</div>
		</div>
	)
}

// ... остальной код (UserProfile и App компоненты остаются без изменений)

function UserProfile() {
	const { id } = useParams()
	const user = Users.find(u => u.id === parseInt(id))

	if (!user) {
		return <div className='not-found'>Пользователь не найден</div>
	}

	return (
		<div className='app-container'>
			<header className='header'>
				<button className='back-button' onClick={() => window.history.back()}>
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
			</Routes>
		</Router>
	)
}

export default App
