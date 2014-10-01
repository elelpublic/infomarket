exports.updateEntity = function( entity, req ) {
  entity.keyword = req.body.keyword;
  entity.visitCount = req.body.visitCount;
  entity.timeCreated = req.body.timeCreated;
  entity.lastModified = req.body.lastModified;
  entity.stars = req.body.stars;
}      

