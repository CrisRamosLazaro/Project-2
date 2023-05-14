| HTTP |                   URL PATH                    |                   DESCRIPTION                   | JSON  |                AUTH |
| :--- | :-------------------------------------------: | :---------------------------------------------: | :---: | ------------------: |
| GET  |                       /                       |          Index Page with a search bar           |   ❌   |                   ❌ |
| --   |                      --                       |                       --                        |  --   |                  -- |
| GET  |                   /register                   |              New user form render               |   ❌   |                   ❌ |
| POST |                   /register                   |              New user form handler              |   ❌   |                   ❌ |
| GET  |                    /log-in                    |                User form render                 |   ❌   |                   ❌ |
| POST |                    /log-in                    |                User form handler                |   ❌   |                   ❌ |
| --   |                      --                       |                       --                        |  --   |                  -- |
| GET  |            /movies/{movie_id}/api             | Availability of the movie the user has searched |   ✅   |                   ❌ |
| --   |                      --                       |                       --                        |  --   |                  -- |
| GET  |                /user/{user_id}                |                  User profile                   |   ❌   | ✅ (owner and admin) |
| GET  |     /user/{user_id}/favourite-movies/api      |       List of the users favourite movies        |   ✅   |                   ✅ |
| POST |   /user/{user_id}/make-favourite/{movie_id}   |      The user adds movie to its favourites      |   ?   |                   ✅ |
| POST |   /user/{user_id}/non-favourite/{movie_id}    |   The user removes movie from its favourites    |   ?   |                   ✅ |
| --   |                      --                       |                       --                        |  --   |                  -- |
| GET  |                 /events/list                  |            List of events available             |   ❌   | ✅ (users and admin) |
| GET  |              /events/{event_id}               |       Event information of specific event       |   ❌   | ✅ (users and admin) |
| GET  |                /events/create                 |             New events form render              |   ❌   |           ✅ (ADMIN) |
| POST |                /events/create                 |             New events form handler             |   ❌   |           ✅ (ADMIN) |
| GET  |            /events/{event_id}/edit            |             Edit events form render             |   ❌   |           ✅ (ADMIN) |
| POST |            /events/{event_id}/edit            |            Edit events form handler             |   ❌   |           ✅ (ADMIN) |
| POST |           /events/{event_id}/delete           |                  Delete event                   |   ❌   |           ✅ (ADMIN) |
| POST | /events/{user_id}/attend-intention/{event_id} |           The user confirms interest            |   ❌   |           ✅ (ADMIN) |
| POST | /events/{user_id}/attend-intention/{event_id} |            The user removes interest            |   ❌   |           ✅ (ADMIN) |