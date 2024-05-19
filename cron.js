const cron = require('node-cron');
// Schedule tasks to be run on the server.

function stay(){
    const res = fetch('https://www.google.com');
    if (res.ok) {
      const data = res.json();
      console.log("great");
    }
}
function stayUp(){ cron.schedule('5 * * * * *', function() {
 stay();
})};
module.exports = { stayUp }