# Transcendent

Welcome to our web-based gaming platform, where players can engage in thrilling matches against random opponents, challenge AI competitors, or participate in exciting tournaments. Our platform meticulously tracks users' achievements and ranks, allowing players to showcase their progress and compare standings with friends. Enjoy seamless communication through our messaging and live chat features, and create chat groups to stay connected with your gaming community. Join us and immerse yourself in a dynamic and competitive gaming environment where every match brings new opportunities for victory and camaraderie.
This repository contains the code and resources necessary to understand, install, and contribute to the project.

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

Transcendent is web-based gaming platform, where players can engage in thrilling matches against random opponents, challenge AI competitors, or participate in exciting tournaments. Our platform meticulously tracks users' achievements and ranks, allowing players to showcase their progress and compare standings with friends. Enjoy seamless communication through our messaging and live chat features, and create chat groups to stay connected with your gaming community. Join us and immerse yourself in a dynamic and competitive gaming environment where every match brings new opportunities for victory and camaraderie.

## Technologies Used


- **Frontend:**
  - ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
  - ![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)
  - ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  - ![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)

- **Backend:**
  - ![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
  - ![Django REST Framework](https://img.shields.io/badge/Django_REST_Framework-092E20?style=for-the-badge&logo=django&logoColor=white)
  - ![Django Channels](https://img.shields.io/badge/Django_Channels-092E20?style=for-the-badge&logo=django&logoColor=white)

- **Database:**
  - ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
  - ![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)

## Project Structure

The project structure is as follows:

```
transcendent/
├── src
│   ├── backend
│   │   ├── api
│   │   │   ├── migrations
│   │   │   └── tests
│   │   ├── authentication
│   │   │   ├── migrations
│   │   │   └── tests
│   │   ├── build-tools
│   │   ├── chat
│   │   │   ├── consumers
│   │   │   └── migrations
│   │   ├── game
│   │   │   ├── consumers
│   │   │   ├── managers
│   │   │   ├── migrations
│   │   │   ├── seed
│   │   │   ├── tests
│   │   │   └── utils
│   │   ├── media
│   │   ├── transcendent
│   │   │   └── tests
│   │   └── user
│   │       ├── migrations
│   │       ├── seed
│   │       └── tests
│   ├── frontend
│   │   ├── build-tools
│   │   └── src
│   │       ├── api
│   │       ├── app
│   │       │   ├── auth
│   │       │   │   └── register
│   │       │   │       ├── context
│   │       │   │       └── forms
│   │       │   ├── (dashboard)
│   │       │   │   ├── game
│   │       │   │   │   └── ingame
│   │       │   │   ├── home
│   │       │   │   │   ├── all-players
│   │       │   │   │   └── friends
│   │       │   │   ├── messenger
│   │       │   │   │   └── group
│   │       │   │   │       ├── choice-members
│   │       │   │   │       └── context
│   │       │   │   ├── notifications
│   │       │   │   ├── profile
│   │       │   │   │   ├── components
│   │       │   │   │   └── [username]
│   │       │   │   ├── ranking
│   │       │   │   ├── settings
│   │       │   │   │   ├── block-list
│   │       │   │   │   ├── components
│   │       │   │   │   └── Forms
│   │       │   │   └── tournaments
│   │       │   │       ├── create_tournament
│   │       │   │       └── [id]
│   │       │   ├── (game)
│   │       │   │   └── match-making
│   │       │   ├── provider
│   │       │   └── ui
│   │       │      
│   │       ├── constant
│   │       │   └── dashboard
│   │       ├── hooks
│   │       ├── lib
│   │       ├── redux
│   │       │   └── slices
│   │       └── type
│   │           ├── auth
│   │           └── dashboard
│   ├── nginx
│   │   └── conf
│   ├── redis
│   └── docker-compose.yml
└── makefile
```

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/ayoub-aitouna/Transcendent.git
   cd Transcendent
   ```

2. **Install Required Tools:**

   ```sh
   sudo apt-get install -y docker docker-compose make
   ```

3. **Run the development server:**

   ```sh
    make
   ```
4. **Set up the database:** run this command in a separate terminal window

   ```sh
   make db
   ```
5. **Open your browser and navigate to:**
   ```
   https://localhost
   ```
6. **To stop the server:**

   ```sh
   make down
   ```

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`
3. Make your changes and commit them: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature-branch`
5. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contributors

This project would not have been possible without the vision and dedication of its founders. Their relentless pursuit of excellence and innovative spirit have been the driving force behind this platform's success:
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="33.33%">
        <a href="https://github.com/ayoub-aitouna">
          <img src="https://avatars.githubusercontent.com/u/29020220?v=4?s=100" width="100px;" alt="Ayoub Aitouna"/><br />
          <sub><b>Ayoub Aitouna</b></sub>
        </a><br />
        Lead Developer
      </td>
      <td align="center" valign="top" width="33.33%">
        <a href="https://github.com/khadija-mahdi">
          <img src="https://avatars.githubusercontent.com/u/116581015?v=4?s=100" width="100px;" alt="Khadija Mahdi"/><br />
          <sub><b>Khadija Mahdi</b></sub>
        </a><br />
        Lead Developer
      </td>
      <td align="center" valign="top" width="33.33%">
        <a href="https://github.com/placeholder">
          <img src="https://avatars.githubusercontent.com/u/98095867?v=4?s=100" width="100px;" alt="Oussama"/><br />
          <sub><b>Oussama SDx</b></sub>
        </a><br />
        Game Developer
      </td>
    </tr>
  </tbody>
</table>

## Contact

Feel free to reach out to us with any questions or concerns:
- **LinkedIn:** [Ayoub Aitouna](https://www.linkedin.com/in/ayoub-aitouna/)
- **LinkedIn:** [Khadija Mahdi](https://www.linkedin.com/in/khadija-mahdi/)
- **LinkedIn:** [Oussama SDx](https://www.linkedin.com/in/oussama-sdx/)
- **Website:** [My Portfolio](https://ayoub-aitouna.github.io/AyoubAitouna/)
---

Thank you for checking out Transcendent!
