<div align="center">

  <h1>Blogs Lab ReadME</h1>
  
<h4>
    <a href="https://ejm-dev-blogs.fly.dev/">Live Site</a>
</div>

<br />

<!-- Table of Contents -->

# Table of Contents

- [About the Project](#about-the-project)
  - [Screenshots](#screenshots)
  - [Tech Stack](#tech-stack)
  - [Features](#features)
- [Roadmap](#roadmap)
- [Contact](#contact)

<!-- About the Project -->

## About the Project

### Overview

This Full-Stack CRUD application is the last major lab in the Covalence Full-Stack course, bringing all the previous learning together in one nice package. Users sign up with an email, and are issued a JSON Web Token for authentication / authorization purposes. Once registered, users may view other blog authors, or view and create blogs, and may edit or delete their own blogs. The JWT is utilized for editing and deleting blogs, verifying the author is the only one capable of editing or deleting their own content.

My Blogs Lab also incorporates Mailgun and Stripe. I've implemented Mailgun with a feature allowing users to send an email to an author. Stripe processes credit card payments, which I've implemented into a donate feature, letting users donate to other authors.

<!-- Screenshots -->

### Screenshots

<div align="center"> 
  <img src="public\Assets\BlogsLab.PNG" alt="screenshot" />
</div>

<!-- TechStack -->

### Tech Stack

<details>
  <summary>Client</summary>
  <ul>
    <li>Typescript</li>
    <li>React.js</li>
    <li>Bootstrap v5</li>
  </ul>
</details>

<details>
  <summary>Server</summary>
  <ul>
    <li>Typescript</li>
    <li>Express.js</li>
    <li>Node.js</li>

  </ul>
</details>

<details>
<summary>Database</summary>
  <ul>
    <li>PostgreSQL</li>
  </ul>
</details>

<!-- Features -->

### Features

- Full-Stack CRUD app where users can securely register, view other authors, read, write, edit, and delete blogs.
- Mailgun implemented allowing users to send emails to authors.
- Stripe implemented allowing users to safely send money to authors.

<!-- Roadmap -->

## Roadmap

- [ ] Allow users to create their own tags
- [ ] Allow users to add multiple tags to a post
- [ ] Add a search feature to search by author / title / tags
- [ ] Public and private profile pages

## Contact

Eric Moran - emoran0403@gmail.com
