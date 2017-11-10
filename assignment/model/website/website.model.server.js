var mongoose = require("mongoose");
var WebsiteSchema = require("./website.schema.server");
var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);
var UserModel = require('../user/user.model.server');

WebsiteModel.createWebsiteForUser = createWebsiteForUser;
WebsiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
WebsiteModel.findWebsiteById = findWebsiteById;
WebsiteModel.updateWebsite = updateWebsite;
WebsiteModel.deleteWebsite = deleteWebsite;

module.exports = WebsiteModel;

function createWebsiteForUser(userId, website) {
 // website._user = userId;
  var newWebsite = null;
  return WebsiteModel
    .create(website)
    .then(function (website){
      newWebsite = website;
      UserModel.findUserById(newWebsite._user)
        .then(function (user) {
          user.websites.push(newWebsite);
          return user.save();
        });
    });
}

function findAllWebsitesForUser(userId){
  return WebsiteModel
    .find({_user:userId})
    .populate('_user')
    .exec();
}

function findWebsiteById(websiteId){
  return WebsiteModel.findOne({_id: websiteId});
}

function updateWebsite(websiteId, website){
  return WebsiteModel.update({_id: websiteId}, website);

}

function deleteWebsite(websiteId){
return WebsiteModel.deleteOne({_id: websiteId});
}
