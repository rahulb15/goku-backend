const {DbCooperSchema}=require("./dbCooper.schema")

const insertPass = (Obj) => {
    return new Promise((resolve, reject) => {
        DbCooperSchema.update({id:"100"},{$set:{passNumber:Obj.passNumber,totalMintNumber:Obj.totalMintNumber,totalPass:Obj.totalPass}},{upsert:true})
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  };


  const getPassById = (id) => {
	return new Promise((resolve, reject) => {
		if (!id) return false;

		try {
			DbCooperSchema.findOne({ id }, (error, data) => {
				if (error) {
					
					reject(error);
				}
				resolve(data);
			});
		} catch (error) {
			reject(error);
		}
	});
};

const getAllPasses = () => {
	return new Promise((resolve, reject) => {
		try {
			DbCooperSchema.find()
				.then((data) => resolve(data))
				.catch((error) => reject(error));
		} catch (error) {
			reject(error);
		}
	});
};

  module.exports = {
    insertPass,
    getPassById,
    getAllPasses
  };