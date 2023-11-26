const Property = require('./properties.schema');

const insertPropertyDetails = async (jsonData) => {
    console.log(jsonData, "jsonDatasssssssssss");
   return new Promise((resolve, reject) => {
        try {
            // Property.insertMany(jsonData, (error, data) => {
            //     if (error) {
            //         reject(error);
            //     }
            //     resolve(data);
            // });
             // Insert each NFT item into the database
             for (const key in jsonData) {
                // await Property.create({ key, ...data[key] });
                Property.insertMany({ key, ...jsonData[key] }, (error, data) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(data);
                }
                );

            }
        } catch (error) {
            reject(error);
        }
    }
    );
        
}


const getPropertyByUser = (userId, type) => {
    return new Promise((resolve, reject) => {
        try {
            let query = { 'clientId': userId };

            // If type is specified and not an empty array or 'all', add activityType to the query
            if (type && (type !== 'all' && type.length > 0)) {
                query['activityType'] = { $in: type };
            }

            Property.find(query, (error, data) => {
                if (error) {
                    reject(error);
                }
                resolve(data);
                console.log(data, "datasssssssssssssss")
            }).populate('clientId').sort({ createdAt: -1 });
        } catch (error) {
            reject(error);
        }
    });
};



//get activity by enum type
const getPropertyByToken = (token) => {
    console.log(token, "token1")
    return new Promise((resolve, reject) => {
        try {
            Property.find(
                { 'key': token }
                , (error, data) => {
                    if (error) {

                        reject(error);
                    }
                    resolve(data);
                });
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    insertPropertyDetails,
    getPropertyByUser,
    getPropertyByToken
}

