module.exports = (app) => {
  app.use((req, res, next) => {
    res.status(404).render('not-found');
  });

  app.use((err, req, res, next) => {
    console.log('ERROR', req.method, req.path, err);
    if (!req.headersSent) {
      res.status(500).render('error');
    }
  });
};
