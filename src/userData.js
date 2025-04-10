// src/usersData.js
export const Users = [
  {
    id: 1,
    name: 'Артем',
    exp: '?',
    level: '10',
    achievements: ['Золотой знак', 'Быстрое обучение', 'Помощник сообщества', 'admin'],
    about: 'Frontend разработчик с 2-летним опытом. Люблю React.',
    avatar: '👨‍💻',
    skills: ['JavaScript', 'React'],
    progress: 100
  },
];

// Функция для обновления данных
export const updateUsersData = (newUsers) => {
  // В реальном приложении здесь может быть запрос к API или сохранение в localStorage
  console.log('Данные пользователей обновлены:', newUsers);
  return [...newUsers];
};