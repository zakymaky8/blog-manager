# Blog Manager
Front end for CRUDing blogs with interfaces built using next js typescript tailwindcss

## Contents

[Description](#description)

[Tech Stack](#tech-stack-used)

[Installation](#installation)

[Contribution](#contribution)

1. [option 1](#option-1)
2. [option 2](#option-2)

[Liscense](#license)

[Deployement](#deployement)

[Live Demo](#live-demo)


## Description
- This is a blog application to manage posts which are published or directed to [TipLogger](https://zach-log.vercel.app) blog website. Refer the code [here](https://github.com/zakymaky8/public-blog) for more information. This blog manager application helps to CRUD blog posts, manage comments and replies by users ( tracking unusual behavior of users ), manage users, and even more manage the suggestions of users as inceptional benefit of the post's idea.

## Preview


#### How it works

- The live version of this application is not accessible as it requries special admin password, but after forking and manipulating it as per your need and interest you might have your own password, which enables you to manage your posts in your own live version app.

- Here the admin can create blog post in two different ways, first by directly clicking **create post** button, or second from visiting suggestions there will be a button to take him/her to the form to create a post which is adopted from that suggestion. the former way will create a post which is conceived out of author's mind, but the later is suggested and the post will be written according to the suggestion's real intention.

- Posts from suggestions are always include those suggestions at footer of every post on Tiplogger application.
- Admin can track the activities of users for instance likes, dislikes, views, comments and replies, and can take actions based on the mannnerism users show on this actions, like warning and terminating the accounts of users.


## Tech Stack used

1. **Front end frameword** : Here ***Next js*** is used to build interfaces, to aquire benefits from server side rendering and good user experience.
2. **CSS framework**: ***TailwindCSS***, utility first framework which flourished this applications in almost every stylings and micro-interactive functionalities for better user experience.
3. **Type safe development**: **TypeScript**, has been the go to languange these days to make typing perfect, so I used it.
4. **TinyMCE** : as an editor with enhanced formatting



## Features


## Installation

To install the packages, use the following steps
1. open your terminal in VS code( if you use so):
    `ctrl + backtick `

2. Then do

```bash
npm install
```

3. To Run the app in your dev server

```bash
npm run dev #then develpement server will start listening on port 3003, you can change it from package.json file
```
## Features

1. Creating, updating, viewing and deleting posts, comments and replies.
2. Publishing and unpublishing posts on every desired instances, even more creating drafted version of a post from the inception.
3. Liking and disliking a post, comments and replies.
4. admin restriction on updating comments and replies.
5. tracking suggestions and create a post based on them.
6. tracking the who of actions eg. who liked, who replied who viewed, who commented and who liked or disliked that comment
7. warning and terminating user account.
8. marking suggestions with different statuses of addressing.
9. pagination of list of items like posts, users, and comments. there is also a way to limit the number of items per page.


## Contribution

Contributions are welcome. Your suggestions are invaulable to me. If you plan to do so, follow the following steps in two different ways.
#### Option 1

1. Fork the repository, if you want to work on it on your dedicated repository,
2. Optimize per use suitability in your local machine (it is all yours after that, but I would love to see your suggestions)
3. And code around limitlesslly

#### Option 2
1. Clone the repository (have the exact copy of the codebase on your local machine);
2. Create an issue for your intended changes.
3. Create a branch for that issue.
4. Then change to the root directory while your are at it do,
``` bash
    git fetch --all
    git checkout [your_branch_name]
```
5. Make changes on that branch.
6. After you are comfortable with your new feature or suggestions (whatever), you would be benefited from
    ```
    git pull origin [main_branch]
    ```
7. Finally push your changes
    ```
    git push
    ```
8. Create pull request, I am there to approve.

## License
This project is licensed under the [MIT License](https://github.com/Uwancha/memory-card/blob/main/LICENSE). Feel free to play around manipulating it.

## Deployement

This front end application is deployed on [vercel](https://vercel.com/), and the

1. **API**: is served from [Render](https://render.com), which serves the frontend app
2. **Database**: postgresql database is awesomely served from [Railway](https://railway.com/), which keeps track of **CRUDing** attempts.


## Live Demo

Application is Live at [Zach Logger](https://zach-logger.vercel.app/).