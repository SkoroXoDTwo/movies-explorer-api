# movies-explorer-api

Api для сервиса movies-explorer

К серверу можно обратится по [ссылке](https://api.skoroxod.nomoredomains.monster/)

## В API есть 7 роутов:

- создаёт пользователя с переданными в теле
email, password и name
POST /signup

- проверяет переданные в теле почту и пароль
возвращает JWT
POST /signin 

- возвращает информацию о пользователе (email и имя)
GET /users/me

- обновляет информацию о пользователе (email и имя)
PATCH /users/me

- возвращает все сохранённые текущим  пользователем фильмы
GET /movies

- создаёт фильм с переданными в теле
country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId 
POST /movies

- удаляет сохранённый фильм по id
DELETE /movies/_id
