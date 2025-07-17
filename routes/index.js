const router = require('express').Router();

// router.get('/', (req, res) => {
//   res.send('Welcome to the CRUD Project!');
// });


// I created this route to serve as the main entry point for the application.
// It provides a simple welcome message and links to the employees and tasks sections.
router.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to the Employee Task Management System!</h1>
    <h2>Available Routes:</h2>
    <p>Use the links below to navigate:</p>
    <ul>
      <li><a href="/employees">View Employees</a></li>
      <li><a href="/tasks">View Tasks</a></li>
    </ul>
  `);
});

router.use('/employees', require('./employees'));

router.use('/tasks', require('./tasks'));

module.exports = router;