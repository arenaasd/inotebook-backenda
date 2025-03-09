const mongoose = require('mongoose');
const debug = require('debug')('development:mongoose');

// Use the environment variable for MongoDB URI
const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri)
    .then(() => {
        debug("Connected to MongoDB Atlas");

        // Test inserting a document into a collection
        const testSchema = new mongoose.Schema({ name: String });
        const TestModel = mongoose.model('Test', testSchema);

        // Insert a document
        const testDocument = new TestModel({ name: 'Test User' });

        testDocument.save()
            .then(() => {
                debug("Document saved successfully!");
            })
            .catch((err) => {
                debug("Error saving document:", err);
            });
    })
    .catch((err) => {
        debug("Error connecting to MongoDB:", err);
    });

module.exports = mongoose.connection;
