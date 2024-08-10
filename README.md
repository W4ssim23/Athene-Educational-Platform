# Athene Educational Platform

An alternative to Google Classroom, this full stack Next.js project offers comprehensive features for school management. The platform allows admins to manage teachers, students, classes, modules, and courses. It features a user-friendly interface for both PC and mobile views, live chat rooms for each module, and multi-role authentication.

## Features

- Admin management of teachers, students, classes, and modules
- Course management with various types
- Responsive UI for both PC and mobile
- Live chat rooms for each module
- Multi-role authentication

### Upcoming Features

- Video calls
- WPA (Web Progressive App)

## Screenshots

### PC View

![PC View](src/assets/images/Screenshot%202024-08-03%20185435.png)
![PC View](src/assets/images/Screenshot%202024-08-03%20185812.png)
![PC View](src/assets/images/Screenshot%202024-08-03%20185843.png)
![PC View](src/assets/images/Screenshot%202024-08-03%20185856.png)
![PC View](src/assets/images/Screenshot%202024-08-03%20185928.png)
![PC View](src/assets/images/Screenshot%202024-08-03%20185945.png)
![PC View](src/assets/images/Screenshot%202024-08-03%20185954.png)
![PC View](src/assets/images/Screenshot%202024-08-03%20190012.png)
![PC View](src/assets/images/Screenshot%202024-08-03%20190029.png)
![PC View](src/assets/images/Screenshot%202024-08-03%20190251.png)
![PC View](src/assets/images/Screenshot%202024-08-03%20190302.png)
![PC View](src/assets/images/Screenshot%202024-08-03%20190325.png)
![PC View](src/assets/images/Screenshot%202024-08-03%20190407.png)

### Mobile View

![Mobile View](src/assets/images/Screenshot%202024-08-10%20151356.png)
![Mobile View](src/assets/images/Screenshot%202024-08-10%20151412.png)
![Mobile View](src/assets/images/Screenshot%202024-08-10%20151443.png)
![Mobile View](src/assets/images/Screenshot%202024-08-10%20151518.png)
![Mobile View](src/assets/images/Screenshot%202024-08-10%20151604.png)
![Mobile View](src/assets/images/Screenshot%202024-08-10%20151643.png)
![Mobile View](src/assets/images/Screenshot%202024-08-10%20151703.png)
![Mobile View](src/assets/images/Screenshot%202024-08-10%20151731.png)

## Installation

To run this project locally, follow these steps:

### Prerequisites

- Node.js
- MongoDB
- Firebase account
- Cloudinary account

### Steps

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/educational-platform.git
   cd athene-educational-platform
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root directory and include the following variables:

   ```sh
   NEXTAUTH_SECRET=your_nextauth_secret
   INCRYPT_SECRET=your_incrypt_secret
   MONGODB_URI=your_mongodb_uri
   NEXTAUTH_URL=your_nextauth_url
   CLOUDINARY_IMG_API=your_cloudinary_img_api
   CLOUDINARY_FILE_API=your_cloudinary_file_api
   NEXT_PUBLIC_FIREBASE_CONFIG=your_firebase_config
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   FIREBASE_PRIVATE_KEY=your_firebase_private_key
   FIREBASE_CLIENT_EMAIL=your_firebase_client_email
   ```

4. **Run the development server:**

   ```sh
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## License

This project is licensed under the [GNU General Public License v3.0](https://choosealicense.com/licenses/gpl-3.0/). This means you are free to use, modify, and distribute the code as long as your work remains open source.

## Contributing

Contributions are welcome! Please fork the repository and use a feature branch. Pull requests are warmly welcome.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## Contact

For any questions, feel free to reach out to me:

[@W4ssim23](https://github.com/W4ssim23)

- Email: [o_zouiten@estin.dz](mailto:o_zouiten@estin.dz)

Design by: [@yasserbachta](https://github.com/yasserbachta/)
