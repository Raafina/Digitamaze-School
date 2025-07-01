## Sekonekti
Sekonekti is a simple school management system that focuses on school data storage. This system helps schools track information about students, parents, teachers, and classes in one centralized location. With basic summary and reporting features, Sekonekti offers an efficient solution for schools that need structure without unnecessary complexity.

## 🛠️ Tech Stack
<ol>
    <li>Laravel</li>
    <li>Typescript</li>
    <li>Tailwind</li>
    <li>Inertia</li>
    <li>React</li>
    <li>MySQL/SQLite</li>
</ol>

## 🚀 Key Feature
<ul>
    <li>Student, Student Parent, Teacher, and Class Management</li>
    <li>Recap data feature</li>
</ul>

## 🎯How To Use
<ol>
    <li>
        <p>Clone this repository</p>
        <p><pre>git clone https://github.com/Raafina/Sekonekti</pre></p>
    </li>
    <li>
        <p>Navigate to the project directory</p>
        <p><pre>cd Sekonekti</pre></p>
    </li>
    <li>
        <p>Install dependencies</p>
        <p><pre>composer install</pre></p>
        <p><pre>npm install</pre></p>
    </li>
    <li>
        <p>Configure the .env file/SQLite</p>
        <ul>
            <li>Duplicate .env.example and rename it to .env</li>
            <li>Adjust the database and environment configurations</li>
        </ul>
        <p><pre>php artisan key:generate</pre></p>
    </li>
    <li>
        <p>Run database migrations</p>
        <p><pre>php artisan migrate --seed</pre></p>
    </li>
    <li>
        <p>Start the application</p>
        <p><pre>npm run dev</pre></p>
        <p><pre>php artisan serve</pre></p>
    </li>
</ol>

## 🔐 Login Credentials

Use the following credentials to access the application after running the seeders:

- **Email:** test@example.com  
- **Password:** 123

> You can update these credentials in the `users` table after seeding.

