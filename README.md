# kyc-app

# Tech Stack

## Fontend : React js , Redux Thunk , Chakra UI (component library)

## Backend : Node js , Express , MongoDb

## Deployment : Digital Ocean

## Set Up :

### run the following commands:

    mkdir uploads
    npm i  (in root foler)
    npm i (in frontend folder)
    create .env file with environment varials
        NODE_ENV=development
        PORT=8000
        MONGO_URI=your_mongo_uri
        JWT_SECRET=your_secret_key

## Admin Login

email : admin@gmail.com
password : 123456

# Live Demo : http://206.189.133.164/

## Assumtions

    File Storage Location:

    Assumed that storing files in the uploads/ folder is sufficient.
    Not considering cloud storage (AWS S3, Firebase Storage) for scalability.

    State Management :

    Used Redux Thunk for better control over actions and reducers
