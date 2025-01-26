# Quest Search

A sophisticated full-stack application designed to revolutionize educational content management through an intuitive search and filtering system. This platform specializes in handling diverse question types including Anagrams, Multiple Choice Questions (MCQ), Read Along exercises, and Content-Only materials, making it an ideal solution for educators, and educational institutions.

## Folder Structure

```
project-root/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── header.tsx
│   │   │   │   └── skeleton.tsx
│   │   │   └── search/
│   │   │       ├── searchBar/
│   │   │       ├── questionTypeFilter/
│   │   │       ├── searchResults/
│   │   │       └── pagination/
│   │   ├── App.tsx
│   │   └── App.css
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── server/
│   ├── src/
│   │   ├── model/
│   │   │   └── Question.ts
│   │   ├── scripts/
│   │   │   ├── importData.ts
│   │   │   └── questions.json
│   │   ├── route.ts
│   │   └── server.ts
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── docker-compose.yaml
└── README.md
```


## Deployed Application

The application is deployed and accessible via the following links:
- Frontend: [https://qsfrontend-frf9ezfcg2btbwbk.centralindia-01.azurewebsites.net/](https://qsfrontend-frf9ezfcg2btbwbk.centralindia-01.azurewebsites.net/)
- Backend: [https://qsbackend-cthjeue6exguaydd.centralindia-01.azurewebsites.net/](https://qsbackend-cthjeue6exguaydd.centralindia-01.azurewebsites.net/)

## Running Locally

To run the project locally, follow these steps:

1. *Clone the Repository:*

   ```bash
   git clone https://github.com/ArpitaAgrahari/QuestSearch
   ```
   
2. *For runnning backend locally*

    ```bash
    npm run start:server
    ```

3. *For running frontend locally*

    ```bash
    npm run start:client
    ```
   

2. *Using Docker Compose:*

   - Ensure you have Docker and Docker Compose installed.
   - Set the MONGO_URI environment variable with your MongoDB connection string.
   - Run the following command to start the services:

     ```bash
     docker-compose up --build
     ```

3. *Running Manually:*

   - Create .env files in apps/backend based on .env.example.
   - Navigate to the root directory and run following commands in different terminals:

     ```bash
     npm run start:server
     npm run start:client
     ```

4. *Access the Application:*

   - Alternatively, you can access the deployed application directly:
     - Frontend: [https://qsfrontend-frf9ezfcg2btbwbk.centralindia-01.azurewebsites.net/](https://qsfrontend-frf9ezfcg2btbwbk.centralindia-01.azurewebsites.net/)
     - Backend: [https://qsbackend-cthjeue6exguaydd.centralindia-01.azurewebsites.net/](https://qsbackend-cthjeue6exguaydd.centralindia-01.azurewebsites.net/)