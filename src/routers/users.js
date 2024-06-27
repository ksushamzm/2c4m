import { Router, DBJson } from '../../core/index.js';

const usersRouter = new Router();

usersRouter.get('/users', (request, response) => {
    response.writeHead(200, { 'Content-type': 'application/json' });
    try {
        const DBUsers = new DBJson('./src/db/users.json');
        response.end(JSON.stringify(DBUsers.getAll()));
    } catch (error) {
        response.end(JSON.stringify({ error: 'Ошибка при получении данных' }));
    }
});

usersRouter.post('/users', (request, response) => {
    response.writeHead(200, { 'Content-type': 'application/json' });
    let data = '';
    request
        .on('data', (chunk) => {
            data += chunk;
        })
        .on('end', () => {
            try {
                const newUser = JSON.parse(data);
                const DBUsers = new DBJson('./src/db/users.json');
                const success = DBUsers.add(newUser);
                if (success) {
                    response.end(JSON.stringify(DBUsers.getAll()));
                } else {
                    response.end('Не удалось добавить пользователя');
                }
            } catch (error) {
                response.end(JSON.stringify({ error: 'Ошибка при добавлении пользователя' }));
            }
        });
});

usersRouter.post('/addTrip', (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'application/json'
    });

    let data = '';

    request
        .on('data', (chunk) => {
            data += chunk;
        })
        .on('end', () => {
            const requestData = JSON.parse(data);

            console.log(requestData);

            const DBUsers = new DBJson('./src/db/trip.json');

            const info = DBUsers.addDataById({
                comps: [
                    {
                        name: requestData.name,
                        description: requestData.description,
                        users: requestData.users,
                        dateStart: requestData.dateStart,
                        dateEnd: requestData.dateEnd,
                        place: requestData.place,
                    }
                ]
            });

            response.end(JSON.stringify({
                ok: true,
                info: info,
            }));
        });
});

usersRouter.delete('/deleteTrip', (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'application/json'
    });

    let data = '';

    request
        .on('data', (chunk) => {
            data += chunk;
        })
        .on('end', () => {
            const requestData = JSON.parse(data);

            console.log(requestData);

            const DBUsers = new DBJson('./src/db/trip.json');

            const info = DBUsers.DeleteDataById(requestData.id);

            response.end(JSON.stringify({
                ok: info,
            }));
        });
});

usersRouter.put('/editTrip', (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'application/json'
    });

    let data = '';

    request
        .on('data', (chunk) => {
            data += chunk;
        })
        .on('end', () => {
            const requestData = JSON.parse(data);

            console.log(requestData);

            const DBUsers = new DBJson('./src/db/trip.json');

            const info = DBUsers.EditDataById(requestData);

            response.end(JSON.stringify({
                ok: info,
            }));
        });
});

usersRouter.get('/getTrip', (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'application/json'
    });

    let data = '';

    request
        .on('data', (chunk) => {
            data += chunk;
        })
        .on('end', () => {
            const requestData = JSON.parse(data);

            console.log(requestData);

            const DBUsers = new DBJson('./src/db/trip.json');

            const info = DBUsers.GetDataById(requestData.id);

            response.end(JSON.stringify({
                ok: true,
                info: info,
            }));
        });
});


export {
    usersRouter
};