const {db} = require('../firebase')

const productUploadController = async(req,res)=>{
    try {
        const { name, price,description,quantity,category} = req.body;
        console.log(req.body)
        // Get file details
        const imagePath = req.file ? `../uploads/${req.file.filename}` : null;
    
        if (!name || !price || !imagePath) {
          return res.status(400).json({ message: 'All fields are required' });
        }
    
        // Add product details to Firestore
        const newProduct = {
          name,
          description,
          quantity,
          category,
          price: parseFloat(price), // Convert to number
          image: imagePath,
          createdat: new Date().toISOString(),
        };
    
        const docRef = await db.collection('allproducts').add(newProduct);
    
        res.status(200).json({
          message: 'Product uploaded successfully',
          productId: docRef.id,
          product: newProduct,
          success:true
        });
      } catch (error) {
        console.error('Error uploading product:', error);
        res.status(500).json({ error: 'Failed to upload product' });
      }
}

module.exports = {
    productUploadController
}