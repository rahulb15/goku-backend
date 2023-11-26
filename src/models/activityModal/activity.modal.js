const { ActivitySchema } = require("./activity.schema");

const insertActivityDetails = (userObj) => {
    return new Promise((resolve, reject) => {
        ActivitySchema(userObj)
        .save()
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
    }

  const getActivityByUser = (userId, type) => {
    return new Promise((resolve, reject) => {
        try {
            let query = { 'clientId': userId };

            // If type is specified and not an empty array or 'all', add activityType to the query
            if (type && (type !== 'all' && type.length > 0)) {
                query['activityType'] = { $in: type };
            }

            ActivitySchema.find(query, (error, data) => {
                if (error) {
                    reject(error);
                }
                resolve(data);
                console.log(data,"datasssssssssssssss")
            }).populate('clientId').sort({ createdAt: -1 });
        } catch (error) {
            reject(error);
        }
    });
};

    





//get activity by enum type
const getActivityByType = (type) => {
    return new Promise((resolve, reject) => {
        try {
            ActivitySchema.find(
                {'activityType':type} 
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
    insertActivityDetails,
    getActivityByUser,
    getActivityByType,
 
  };

