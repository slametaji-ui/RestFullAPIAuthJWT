 Rest Full API in Auth JWT

This repository contains the backend and frontend setup for a web application, with the backend built using Express.js and the frontend using React.js.

## Backend Setup (Express.js)

1. **Clone Repository:**
```
git clone https://github.com/slametaji-ui/RestFullAPIAuthJWT.git
```
2. **Navigate to Backend Directory:**
```
cd backend
```    
3. **Install Dependencies:**
```
npm install
```
4. **Set Up Environment Variables:**
- Create a `.env` file based on the `.env.example` provided.
```
PORT=5000
DB_DIALECT=mysql
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_DATABASE=db_auth

ACCESS_TOKEN_SECRET = alksjalkjdna92iaje9asdsajdklajsk3j9ewr0dsakljdklsaadua905inklds
REFRESH_TOKEN_SECRET = alksjalkjdnapoalhriikeub92iaje93j9ewr0dsakljdklkjoli54n6lk4dua

```
- Configure the required environment variables such as database connection details, API ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET.

5. **Run Development Server:**
```
npm start
```
This command will start the Express.js server.

6. **Testing:**
- Utilize tools like Postman or curl to test your endpoints.
- The default base URL would be `http://localhost:5000`.

7. **Deployment:**
- Configure your preferred deployment method (e.g., Heroku, AWS, etc.).
- Ensure all environment variables are set correctly in the production environment.

## Frontend Setup (React.js)

1. **Navigate to Frontend Directory:**
```
cd frontend
```

2. **Install Dependencies:**
```
npm install
```

3. **Run Development Server:**
```
npm start
```
This command will start the React development server.

4. **Testing:**
- Access your application in a web browser at `http://localhost:3000`.
- Test all features and components to ensure proper functionality.

5. **Deployment:**
- To deploy your React application, build it first using:
  ```
  npm run build
  ```
- This will create an optimized production build in the `build` directory.
- Deploy the contents of the `build` directory to your chosen hosting service (e.g., Netlify, Vercel, AWS S3, etc.).

## Additional Notes

- Ensure both backend and frontend are configured to communicate properly, considering CORS policies.
- Follow best practices for security, error handling, and documentation.
- Keep dependencies updated regularly to maintain security and stability.
## Authors

- [@slametaji-ui](https://www.github.com/slametaji-ui)
