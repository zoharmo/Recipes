/*l
 * GET home page.
 */

exports.index = function(req, res){
  console.log("casfasf");
  res.sendFile('../index.html');
};
