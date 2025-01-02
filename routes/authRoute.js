const route = require('express').Router()
const multer = require('multer')
const { login } = require('../controllers/authController')
const {loginValidation} = require('../middleware/authMiddleware')
const { productUploadController } = require('../controllers/productUploadController')
const path = require('path')
const {db} = require('../firebase')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
    },
});

const upload = multer({ storage });

route.post('/login',loginValidation,login)

route.post('/productupload', upload.single('image'), async (req, res) => {
    try {
        // Access the uploaded file and form data
        console.log('File:', req.file); // Logs the uploaded file details
        console.log('Body:', req.body); // Logs form fields

        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Image is required' });
        }

        const { name, price, description,quantity,category } = req.body;

        if (!name || !price) {
            return res.status(400).json({ success: false, message: 'Product name and price are required' });
        }

        // Save product data to Firebase
        const productData = {
            name,
            description,
            category,
            quantity,
            price: parseFloat(price),
            image: `../uploads/${req.file.filename}`, // Local storage path
            createdAt: new Date().toISOString(),
        };

        // Save to Firestore (Firebase)
        const productRef = db.collection('Allproducts');
        const docRef = await productRef.add(productData);

        console.log('Product added to Firebase with ID:', docRef.id);

        res.status(201).json({
            success: true,
            message: 'Product uploaded successfully',
            data: {
                id: docRef.id,
                ...productData,
            },
        });
    } catch (error) {
        console.error('Error during product upload:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

route.get('/getproducts',async(req,res)=>{
    try{
        const productRef = db.collection('Allproducts')
        const snapshot = await productRef.get()

        if(snapshot.empty){
            res.status(404).json({success:false,message:"No products found"})
        }

        const products = []
        snapshot.forEach((doc)=>{
            products.push({id:doc.id, ...doc.data()})
        })
        console.log(products)
        return res.status(200).json({success:true,data:products})
    }catch(err){
        console.log('Error fetching products',err)
    }
})

module.exports = {
    route
}