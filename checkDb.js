const mongoose = require('mongoose');
const TourSchema = new mongoose.Schema({}, { strict: false });
const Tour = mongoose.model('Tour', TourSchema, 'tours');
mongoose.connect("mongodb+srv://tasleemasad33:Asad5762%40@cluster0.cgidqcu.mongodb.net/dubai-desert-adventures?retryWrites=true&w=majority&appName=Cluster0")
  .then(async () => {
    console.log('Tour count:', await Tour.countDocuments());
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
