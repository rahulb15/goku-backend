const mongoose = require('mongoose');
const fs = require('fs/promises');

// Define the schema for the NFT collection
const propertySchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true,
    },
    name: String,
    description: String,
    attributes: [{
        trait_type: String,
        value: String,
    }],
    creators: Array,
    collectionName: {
        name: String,
        family: String,
    },
    symbol: String,
    seller_fee_basis_points: Number,
    image: String,
    hash: String,
});

// Define the model using the schema
const Property = mongoose.model('Property', propertySchema);

// Function to initialize the database with the provided JSON data
async function initDatabase() {
    try {
        // Connect to the MongoDB database
        await mongoose.connect(`${process.env.DB_URL}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Check if the NFT collection is empty
        const count = await Property.countDocuments();

        // If the collection is empty, insert the data from the JSON file
        if (count === 0) {
           // Read the JSON data from the file
            const jsonData = await fs.readFile('./src/models/properties/DBC_metadata.json', 'utf8');

            const data = JSON.parse(jsonData);

            // Insert each NFT item into the database
            for (const key in data) {
                // await Property.create(data[key]);
                await Property.create({ key, ...data[key] });

            }

            console.log('Data inserted into the database.');
        } else {
            console.log('Database already contains data.');
        }
    } catch (error) {
        console.error('Error initializing the database:', error);
    } finally {
        // Disconnect from the database after initialization
        // mongoose.disconnect();
    }
}

// Call the initDatabase function to initialize the database
initDatabase();

// Export the NFT model
module.exports = Property;
